import React, { useState, useContext, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'

import UserContext from "../../UserContext"
import {userAPI} from "../../Api"
import {tokenCreate} from "./Api"
import {pick} from "./Forms"

import {Layout} from "../common/Layout";
import RegisterEmail from "./RegisterEmail";
import RegisterDetail from "./RegisterDetail";

const Register = () => {

    const [User, setUser] = useContext(UserContext)

    const {isAuthenticated, isConfigured} = User

    const [step, setStep] = useState(0)

    const [values, setValue] = useState({
        email: "",
        first_name: "",
        last_name: "",
        password: "",
        password2: "",
        phone_number: ""
    })

    useEffect( () => {
        if (step === 2) {
            userAPI().create(values)
            .then( res => {
                setUser({...User, user: res.data, isAuthenticated: true})
                const [tokenAPI, body] = tokenCreate(pick(values, ["email", "password"]))
                return tokenAPI(body)
            })
            .then( res => {
                setUser({...User, token: res.data.access_token})
            })
            .catch( err => {
                // TOBE - Create toast or Error page
            })
        }
    })

    if (isConfigured) {
        return <Redirect to='/' />
    } else if (isAuthenticated) {
        return <Redirect to='/login' />
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
                    {formSteps[step]}
                    <p>
                        Have an account?
                            <Link to="/login"> Login</Link>
                    </p>
                </div>
            </div>
        </Layout>
    );
}

export default Register