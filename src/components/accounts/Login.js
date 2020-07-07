import React, { useState, useContext } from "react"
import { Link, Redirect } from 'react-router-dom'

import { userAPI } from '../../Api'
import UserContext from "../../UserContext"


import { tokenCreate } from './Api'
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

    const onSubmit = () => {
        
        const missingErrors = getMissing(values)

        if ( missingErrors != {}) {
            setForm({
                validated: true, 
                errors: missingErrors
            })
            return
        }

        const [ tokenAPI, body] = tokenCreate(values)
        let token
        tokenAPI.create(body)
            .then(res => {
                token = res.data.access_token
                return userAPI(token).getOne(14)
            })
            .then( res => {
                setUser({...User, 
                    isAuthenticated: true, 
                    isConfigured: res.data.account_type !== "inactive", 
                    user: res.data, 
                    token: token})
            })
            .catch(err => {
                setForm({
                    validated: true, 
                    errors: err.response.data
                })
            })
    }

    const onChange = (e, controlId) => {
        setValue({ ...values, [controlId]: e.target.value })
    }

    return (
        <Layout>
            <div style={{ "width": "500px" }}>
                <div className="card card-body mt-5">
                    <h2 className="text-center">Login</h2>
                    <Form noValidate onSubmit={onSubmit}>
                        <Input label="Username"
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