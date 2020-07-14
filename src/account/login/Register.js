import React, { useState, useContext, useEffect } from "react"
import { Link, Redirect } from "react-router-dom"
import axios from "axios"

import UserContext from "../../UserContext"
import { myUrl, config, tokenCreateBody } from "../../tools/Api"

import { Layout } from "./styles/Layout";
import RegisterEmail from "./Email";
import RegisterDetail from "./Detail";

export default function Register() {

    const [User, setUser] = useContext(UserContext)

    const { isAuthenticated, isConfigured } = User

    const [step, setStep] = useState(0)

    const [values, setValue] = useState({
        email: "",
        first_name: "",
        last_name: "",
        password: "",
        password2: "",
        phone_number: ""
    })

    useEffect(() => {
        let userUpdates = {}
        if (step === 2) {
            axios.post(myUrl("api/users/"), values, config())
                .then(res => {
                    userUpdates = { user: res.data, isAuthenticated: true }

                    return axios.post(myUrl("auth/token/"), tokenCreateBody(values), config())
                })
                .then(res => {
                    let token = res.data.access_token
                    localStorage.setItem("token", token)
                    userUpdates = { ...userUpdates, token: token }
                    setUser({ ...User, ...userUpdates })
                })
                .catch(err => {
                    setUser({ ...User, ...userUpdates })
                    // TOBE - Create toast or Error page
                })
        }
    }, [step, User, setUser, values])

    
    if (isConfigured) {
        return <Redirect to="/" />
    } else if (isAuthenticated) {
        return <Redirect to="/login" />
    }


    const updateStep = (newValues) => {
        setStep(step + 1)
        setValue({ ...values, ...newValues })
    }

    const formSteps = (
        [
            <RegisterEmail updateStep={updateStep} />,
            <RegisterDetail updateStep={updateStep} />
        ]
    )

    return (
        <Layout>
            <div style={{ "width": "500px" }}>
                <div className="card card-body mt-5 px-4">
                    <h2 className="text-center mb-3">Register</h2>
                    {formSteps[Math.min(step, 1)]}
                    <p>
                        Have an account?
                            <Link to="/login"> Login</Link>
                    </p>
                </div>
            </div>
        </Layout>
    )
}