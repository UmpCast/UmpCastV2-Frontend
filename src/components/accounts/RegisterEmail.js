import React, { Fragment } from "react";
import axios from "axios";

import SocialButton from "./SocialLogin";
import Input from "./Input";
import { myUrl, config } from "../../Api"
import { useFormStep } from "./Forms"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { Button } from "react-bootstrap";

const RegisterEmail = (props) => {

    const [[values, setValue], [form, setForm]] = useFormStep(["email"], props)

    const handleSocialLogin = (user) => {
        console.log(user)
    }

    const handleSocialLoginFailure = (err) => {
        console.error(err)
    }

    const onChange = (e, controlId) => {
        setValue({ ...values, [controlId]: e.target.value })
    }

    const onNext = () => {
        axios.post(myUrl('api/users/'), values, config())
            .then()
            .catch(err => {
                setForm({ validated: true, errors: err.response.data })
            })
    }

    return (
        <Fragment>
            <div className="row mb-2 px-2">
                <div className="col-6 pl-0 p-2">
                    <SocialButton
                        className="btn-block rounded p-2 border-0"
                        provider='google'
                        appId='465788009761-4vmel0as85nisk2aqe138cbes2e7r0ra'
                        onLoginSuccess={handleSocialLogin}
                        onLoginFailure={handleSocialLoginFailure}
                        color="#D95140">
                        <FontAwesomeIcon icon={faGoogle} className="mr-2" />
                        <strong>Signup with Google</strong>
                    </SocialButton>
                </div>
                <div className="col-6 p-2">
                    <SocialButton
                        className="btn-block rounded p-2 border-0"
                        provider='facebook'
                        appId='263365151623275'
                        onLoginSuccess={handleSocialLogin}
                        onLoginFailure={handleSocialLoginFailure}
                        color="#4867AD">
                        <FontAwesomeIcon icon={faFacebookF} className="mr-2" />
                        <strong>Signup with Facebook</strong>
                    </SocialButton>
                </div>
            </div>
            <div className="d-inline-flex align-items-center mb-2">
                <hr className="flex-grow-1" />
                <div className="m-2">Or</div>
                <hr className="flex-grow-1" />
            </div>
            <Input
                label="Email"
                controlId="email"
                type="text"
                placeholder="Email address"
                form={form}
                handle={onChange} required
            />
            <Button onClick={onNext} className="btn-block btn-primary rounded my-3">
                Next
            </Button>
        </Fragment>
    )

}

export default RegisterEmail