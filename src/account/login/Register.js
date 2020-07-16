import React, { useState, useContext, cloneElement } from "react"
import { Link, Redirect } from "react-router-dom"
import axios from "axios"

import UserContext from "../../UserContext"
import { myUrl, config, tokenCreateBody } from "../../tools/Api"

import { Layout } from "./styles/Layout";
import RegisterEmail from "./Email";
import RegisterDetail from "./Detail";

export default function Register() {

    const [User,] = useContext(UserContext)

    const { isAuthenticated, isConfigured } = User

    const [step, setStep] = useState(0)

    const [migrated, setMigrated] = useState({})

    if (isConfigured) {
        return <Redirect to="/" />
    } else if (isAuthenticated) {
        return <Redirect to="/login" />
    }

    const updateStep = (newValues) => {
        const newStep = step + 1

        setMigrated({...migrated, ...newValues})
        setStep(newStep)
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
                    {cloneElement(formSteps[Math.min(step, 1)], {migrated: migrated})}
                    <p>
                        Have an account?
                            <Link to="/login"> Login</Link>
                    </p>
                </div>
            </div>
        </Layout>
    )
}