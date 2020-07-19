import React, { useState, useContext } from "react"
import { Link, Redirect } from "react-router-dom"

import UserContext from "../../UserContext"

import { Layout } from "./styles/Layout";
import RegisterEmail from "./Email";
import RegisterDetail from "./Detail";

export default function Register() {

    const [User, setUser] = useContext(UserContext)

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

        setStep(newStep)
        setMigrated({ ...migrated, ...newValues })
    }

    return (
        <Layout>
            <div style={{ "width": "500px" }}>
                <div className="card card-body mt-5 px-4">
                    <h2 className="text-center mb-3">Register</h2>
                    {formSteps(Math.min(step, 1))
                    ({updateStep: updateStep, setUser: setUser, migrated: migrated})}
                    <p className="mt-2 mb-0">
                        Have an account?
                            <Link to="/login"> Login</Link>
                    </p>
                </div>
            </div>
        </Layout>
    )
}

const formSteps = (step) => {
    switch (step) {
        case (0):
            return RegisterEmail
        case (1):
            return RegisterDetail
        default:
            return RegisterEmail
    }
}