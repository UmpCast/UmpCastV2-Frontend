import React, { useState, useContext } from "react"
import { Link } from "react-router-dom"

import {UserContext} from "global/Context"
import Loader, { FocusContainer } from "common/Components"

import RegisterEmail from "./Email";
import RegisterDetail from "./Details";

import { Card } from "react-bootstrap"

export default function Register() {

    const [, setUser] = useContext(UserContext)

    const [step, setStep] = useState(0)

    const [migrated, setMigrated] = useState({})

    const updateStep = (newValues) => {
        setMigrated({ ...migrated, ...newValues })
        setStep(step + 1)
    }

    return (
        <FocusContainer>
            <Card
                className="mt-5 px-4"
                style={{ "width": "500px" }}>
                <Card.Body>
                    <h2 className="text-center mb-3">
                        Register
                    </h2>

                    <Loader dep={step === 0}>
                        <RegisterEmail
                            {...{ migrated, setUser, updateStep }} />
                    </Loader>
                    <Loader dep={step === 1}>
                        <RegisterDetail
                            {...{ migrated, setUser, updateStep }} />
                    </Loader>

                    <p className="mt-2 mb-0">
                        Have an account?
                        <Link
                            to="/login"
                            className="ml-2">
                            Login
                        </Link>
                    </p>
                </Card.Body>
            </Card>
        </FocusContainer >
    )
}