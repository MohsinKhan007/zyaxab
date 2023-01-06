import React from 'react';
import { useState } from 'react';
import { Button, Form, Input } from "antd"
import axios from '../utils/axios';
import { setCookie,isAuth,logout } from '../utils/AuthenticationService';
import { showMessage } from '../utils/alerts';
import Loading from '../utils/Loading';
import Logout from './Logout';

function LoginForm() {
    const [formValue, setFormValue] = useState({
        email: "",
        password: "",
        success: "",
        error: "",
        isLoading:false
    })

    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            let {email,password}=formValue;

            if(!email || !password || !mailformat.test(email)){
                setFormValue({...formValue,error:'Email,Password cannot be empty or invalid'})
                return;
            }

            setFormValue({...formValue,isLoading:true})


        
            const response = await axios({
                method: "post",
                url: "/access",
                data: formValue,
            })

            if (response) {
                setFormValue({
                    email: "",
                    password: "",
                    success: "Login Sucessful",
                    error: "",
                    isLoading: false,
                })

                setCookie(
                    response.data.accessToken,
                    response.data.refreshToken
                )
            }
        } catch (error) {
            setFormValue({
                ...formValue,
                error: error.response.data.error,
                success: "",
                isLoading: false,
            })
        }
    }

    const handleChange = (e) => {
        setFormValue({ ...formValue, [e.target.name]: e.target.value })
    }

    const handleLogout = () => {
        logout()
        setFormValue({ email: "", password: "", success: "Logout Sucessful", error: "" })
    }

    let { email, password, success, error,isLoading } = formValue
    return (
        <>
            {success && showMessage(success,'success')}
            {error && showMessage(error,'error')}
            {!isLoading ? (
                isAuth() ? (
                    <Logout handleLogout={handleLogout} />
                ) : (
                    <form onSubmit={handleSubmit}>
                        <Form.Item
                            label="Email"
                            name="email"
                            className="loginForm-email-custom"
                        >
                            <Input
                                name="email"
                                data-testid="email"
                                value={email}
                                onChange={handleChange}
                            />
                        </Form.Item>

                        <Form.Item label="Password" name="password">
                            <Input.Password
                                name="password"
                                data-testid="password"
                                value={password}
                                onChange={handleChange}
                            />
                        </Form.Item>

                        <Button
                            className="loginForm-submit-custom"
                            type="primary"
                            data-testid="submit"
                            htmlType="submit"
                        >
                            Submit
                        </Button>
                    </form>
                )
            ) : (
                <Loading />
            )}
        </>
    )
}

export default LoginForm;