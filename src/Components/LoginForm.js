// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
import React from 'react';
import { useState } from 'react';
import { Button, Form, Input } from "antd"
import axios from '../utils/axios';
import { setCookie,isAuth,logout } from '../utils/AuthenticationService';
import { showSucessMessage,showErrorMessage } from '../utils/alerts';
import Logout from './Logout';
// add custom validations
function LoginForm() {
    const [formValue, setFormValue] = useState({
        email: "",
        password: "",
        success: "",
        error: ""
    })
   
    const handleSubmit = async (e) => {
        console.log("handle submit");
        if(!formValue.email ||!formValue.password){
                
            setFormValue({...formValue,error:'Email or Password cannot be empty'})
            return;
        }
        try {

        
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
                        isAuth: true,
                    }) 
                    // console.log(response)
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
            })
        }
    }

    const handleChange = (e) => {
        setFormValue({ ...formValue, [e.target.name]: e.target.value })
    }

    const handleLogout = () => {
        logout()
        setFormValue({ email: "", password: "", success: "Logout SucessFul", error: "" })
    }

    let { email, password, success, error } = formValue
    return (
        <>
            {success && showSucessMessage(success)}
            {error && showErrorMessage(error)}

            {isAuth() ? (
                <Logout handleLogout={handleLogout}/>
            ) : (
                <Form size='middle' onFinish={handleSubmit}
               
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        style={{marginLeft:'6%'}}
                    >
                        <Input name="email" data-testid="email"  value={email} onChange={handleChange} />
                    </Form.Item>

                    <Form.Item
                   
                        label="Password"
                        name="password"
                        
                    >
                        <Input.Password name="password"  data-testid="password"  value={password} onChange={handleChange} />
                    </Form.Item>

                    <Button  style={{marginLeft:'20%'}} type="primary" data-testid='submit' htmlType="submit">
                        Submit
                    </Button>
                </Form>
            )}
        </>
    )
}

export default LoginForm;