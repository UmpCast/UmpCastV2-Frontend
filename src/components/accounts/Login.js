import React, { useState, useContext } from "react"
import { Link, Redirect } from 'react-router-dom'
import axios from "axios"

import { myUrl, config } from '../../Api'
import UserContext from "../../UserContext"


import { tokenCreateBody } from './Api'
import { getMissing } from "./Forms"
import { Layout } from "../common/Layout";
import Input from "./Input";
import { Form } from "react-bootstrap";

const Login = () => {

    const [User, setUser] = useContext(UserContext)

    const { isAuthenticated } = User

    const [values, setValue] = useState({
        username: "",
        password: ""
    })

    const [form, setForm] = useState({
        validated: false,
        errors: {}
    })

    if (isAuthenticated) {
        return <Redirect to='/register/configure' />
    }

    const onChange = (e, controlId) => {
        setValue({ ...values, [controlId]: e.target.value })
    }

    const onSubmit = () => {

        const missingErrors = getMissing(values)

        if (Object.keys(missingErrors).length !== 0) {
            setForm({
                validated: true,
                errors: missingErrors
            })
            return
        }
        
        let userUpdate = {}

        axios.post(myUrl('auth/token/'), tokenCreateBody(values), config())
            .then(res => {
                let token = res.data.access_token
                
                userUpdate = {token: token}
                localStorage.setItem('token', token)
                return axios.get(myUrl('api/users/34'), config(token))
            })
            .then(res => {
                userUpdate = {
                    ...userUpdate,
                    isAuthenticated: true,
                    isConfigured: res.data.account_type !== "inactive",
                    user: res.data
                }
                setUser({...User, ...userUpdate})
            })
            .catch(() => {
                setUser({...User, ...userUpdate})
                setForm({
                    validated: true,
                    errors: {
                        username: "Invalid Credentials given",
                        password: "Invalid Credentials given",
                    }
                })
            })
    }

    return (
        <Layout>
            <div style={{ "width": "500px" }}>
                <div className="card card-body mt-5">
                    <h2 className="text-center">Login</h2>
                    <Form noValidate onSubmit={() => onSubmit()}>
                        <Input label="Username (Email)"
                            controlId="username"
                            type="text"
                            form={form}
                            handle={onChange} required />
                        <Input label="Password"
                            controlId="password"
                            type="password"
                            form={form}
                            handle={onChange} required />
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary">
                                Login
                                </button>
                        </div>
                    </Form>
                    <p>
                        Don't have an account?
                            <Link to="/register"> Register</Link>
                    </p>
                </div>
            </div>
        </Layout>
    );
}

export default Login