import React, { useState, useContext } from "react"
import { Link, Redirect } from "react-router-dom"
import axios from "axios"

import userContext from "../../UserContext"
import Input from "../../tools/Input"

import { inputLogin } from "../promises"
import { Layout } from "./styles/Layout"

export default function Login() {

    const [User, setUser] = useContext(userContext)

    const { isAuthenticated } = User

    const [values, setValue] = useState({username: "", password: ""})

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

        const missingFields = getMissingFields(values)

        if (Object.keys(missingFields).length !== 0) {
            setForm({
                validated: true,
                errors: missingFields
            })
        } else {
            inputLogin({...values, payload: {}})
            .then( payload => { setUser({...payload.user}) } )
            .catch( err => {
                let errors = err.response.data
                console.log(errors)
                // TEMP FIX
                const description = errors["error_description"]
                if(description) {
                    errors = {username: "Invalid credentials", password: "Invalid credentials"}
                }
                //
                setForm({validated: true, errors: errors})
            })
        }
    }


    return (
        <Layout>
            <div style={{ "width": "500px" }}>
                <div className="card card-body mt-5">
                    <h2 className="text-center">Login</h2>
                    <Input label="Username (Email)"
                        validLabel="Username"
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

export const getMissingFields = values => {
    return Object.assign(
        ...Object.entries(values).map(
            pair => pair[1] === ""
                ? { [pair[0]]: pair[0] + " is missing" }
                : {}
        ))
}