import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';

import axios from '../utils/axios';
import { setCookie,isAuth,logout } from '../utils/AuthenticationService';
import { showSucessMessage,showErrorMessage } from '../utils/alerts';

function LoginForm() {
    const [formValue, setFormValue] = useState({
        email: "",
        password: "",
        success: "",
        error: "",
        isAuth: false,
    })

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()

            if (!formValue.email || !formValue.password) {
                setFormValue({
                    ...formValue,
                    error: "Email or Password cannot be empty",
                })
            } else {
                // console.log("idr aya hai")

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
            }
        } catch (error) {
            setFormValue({
                ...formValue,
                error: error.response.data.error,
                success: "",
            })
            // console.log(error.response.data.error, " Error checking")
            // console.log(error)
        }
    }

    const handleClick = (e) => {
        // console.log([e.target.name], " name")
        // console.log(e.target.value, " sss")
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
              // Could add an component for the logged in page
                <button data-testid="logout" onClick={handleLogout}>Logout</button>
            ) : (
                <form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address:</Form.Label>
                        <Form.Control
                            type="email"
                            onChange={handleClick}
                            data-testid="email"
                            value={email}
                            name="email"
                            placeholder="Enter email"
                        />
                    </Form.Group>

                    <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                    >
                        <Form.Label>Password:</Form.Label>
                        <Form.Control
                            onChange={handleClick}
                            data-testid="password"
                            value={password}
                            name="password"
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Group>

                    <Button data-testid="submit" variant="primary" type="submit">
                        Log in
                    </Button>
                </form>
            )}
        </>
    )
}

export default LoginForm;