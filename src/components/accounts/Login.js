import React, { useState } from "react"
import { Link, Redirect } from "react-router-dom"
import axios from "axios"

import { myUrl, config } from "../../Api"
import { useLogin } from "./Forms"


import { tokenCreateBody } from "./Api"
import { getMissing } from "./Forms"
import { Layout } from "../common/Layout";
import Input from "./Input";

const Login = () => {

    const [[values, setValue], [User, setUser]] = useLogin( err => console.log(err.response.data) )

    const { isAuthenticated } = User

    const [form, setForm] = useState({
        validated: false,
        errors: {}
    })

    if (isAuthenticated) {
        return <Redirect to="/register/configure" />
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

    }

    return (
        <Layout>
            <div style={{ "width": "500px" }}>
                <div className="card card-body mt-5">
                    <h2 className="text-center">Login</h2>
                    <Input label="Username (Email)"
                        controlId="username"
                        type="text"
                        form={form}
                        handle={onChange} />
                    <Input label="Password"
                        controlId="password"
                        type="password"
                        form={form}
                        handle={onChange} />
                    <div className="form-group">
                        <button onClick={() => onSubmit()} className="btn btn-primary">
                            Login
                        </button>
                    </div>
                    <p>
                        Don"t have an account?
                        <Link to="/register"> Register</Link>
                    </p>
                </div>
            </div>
        </Layout>
    );
}

export default Login