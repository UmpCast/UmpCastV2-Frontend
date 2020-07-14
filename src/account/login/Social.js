import React, { Fragment } from "react";
import axios from "axios";
import SocialLogin from "react-social-login"

import { myUrl, config, accessCreateBody } from "../../tools/Api"
import useLogin from "./useLogin"

import { Button } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function RegisterSocial(props) {

    const [[, setValue], [User,]] = useLogin(err => console.log(err))

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
                    <FontAwesomeIcon icon={['fab', 'google']} className="mr-2" />
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
                    <FontAwesomeIcon icon={['fab', 'facebook-f']} className="mr-2" />
                    <strong>Signup with Facebook</strong>
                </SocialButton>
            </div>
        </Fragment>
    )
}

const SocialButton = (props) => {

    const { triggerLogin, color, ...rest } = props

    return (
        SocialLogin(
            <Button
                onClick={triggerLogin} {...rest}
                style={{ "backgroundColor": color }}>
                {this.props.children}
            </Button>
        )
    )
}