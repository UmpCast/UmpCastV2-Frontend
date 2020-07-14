import React, { Fragment } from "react";
import axios from "axios";

import SocialButton from "./SocialButton";

import { myUrl, config } from "../../tools/Api"
import { accessCreateBody } from "../accounts/Api"
import { useLogin } from "./Forms"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faGoogle } from "@fortawesome/free-brands-svg-icons";


export default function Social(props) {
    const onCatch = (err) => {
        console.log(err.response.data)
    }

    const [[values, setValue], [User, setUser]] = useLogin(onCatch)

    const handleSocialLogin = (user) => {
        const code = user._token.accessToken
        axios
            .post(
                myUrl("auth/convert-token/"),
                accessCreateBody({ backend: user._provider, token: code }),
                config())
            .then(res => {
                const token = res.data.access_token
                setValue({ token: token })
            })
            .catch(err => {
                console.log(err.response.data)
            })
    }

    const handleSocialLoginFailure = (err) => {
        console.error(err)
    }

    return (
        <Fragment>
            <div className="col-6 pl-0 p-2">
                <SocialButton
                    className="btn-block rounded p-2 border-0"
                    provider="google"
                    appId="465788009761-4vmel0as85nisk2aqe138cbes2e7r0ra"
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
                    provider="facebook"
                    appId="263365151623275"
                    onLoginSuccess={handleSocialLogin}
                    onLoginFailure={handleSocialLoginFailure}
                    color="#4867AD">
                    <FontAwesomeIcon icon={faFacebookF} className="mr-2" />
                    <strong>Signup with Facebook</strong>
                </SocialButton>
            </div>
        </Fragment>
    )
}