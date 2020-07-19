import React, { Fragment, Component, useContext } from "react";
import SocialLogin from "react-social-login"

import UserContext from "../../UserContext"

import { socialRegister } from "../promises"

import { Button } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function RegisterSocial() {

    const [, setUser] = useContext(UserContext)

    const handleSocialLogin = (user) => {

        const code = user._token.accessToken
        const provider = user._provider === "google" ? "google-oauth2" : "facebook"

        socialRegister({provider: provider, code: code})
        .then(payload => setUser(payload.user))
        .catch(err => console.log(err.response.data))
    }

    const handleSocialLoginFailure = (err) => {
        console.error(err)
    }

    const SocialButton = SocialLogin(LoginButton)

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

class LoginButton extends Component {
    render() {
        const { triggerLogin, color, ...rest } = this.props

        return (
            <Button
                onClick={triggerLogin} {...rest}
                style={{ "backgroundColor": color }}>
                {this.props.children}
            </Button>
        )
    }
}