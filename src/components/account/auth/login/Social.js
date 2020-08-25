import React, { Component } from "react";
import SocialLogin from "react-social-login"

import { useApi, useTokenLogin } from "common/hooks"

import { OauthConvertToken } from "common/Api"

import { Row, Col, Button } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const client_id = process.env.REACT_APP_CLIENT_ID
const client_secret = process.env.REACT_APP_CLIENT_SECRET

export default function Social(props) {

    const { action } = props

    const Api = useApi(socialToken)
    const tokenLogin = useTokenLogin()

    const handleSocialLogin = (user) => {
        const code = user._token.accessToken

        const provider = user._provider === "google" ?
            "google-oauth2" : "facebook"

        Api.socialToken(provider, code)
            .then(res =>
                tokenLogin(res.data.access_token)
            )
    }

    const SocialButton = SocialLogin(LoginButton)

    return (
        <Row className="mb-2 px-2">
            <Col xs={12} md={6} className="pl-0 p-2">
                <SocialButton
                    className="btn-block rounded p-2 border-0"
                    provider="google"
                    appId="465788009761-4vmel0as85nisk2aqe138cbes2e7r0ra"
                    onLoginSuccess={handleSocialLogin}
                    color="#D95140">
                    <FontAwesomeIcon
                        icon={['fab', 'google']}
                        className="mr-2" />
                    <strong>{action} with Google</strong>
                </SocialButton>
            </Col>
            <Col xs={12} md={6} className="pl-0 p-2">
                <SocialButton
                    className="btn-block rounded p-2 border-0"
                    provider="facebook"
                    appId="263365151623275"
                    onLoginSuccess={handleSocialLogin}
                    color="#4867AD">
                    <FontAwesomeIcon
                        icon={['fab', 'facebook-f']}
                        className="mr-2" />
                    <strong>{action} with Facebook</strong>
                </SocialButton>
            </Col>
        </Row>
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

const socialToken = (provider, code) => [
    "api/auth/convert-token/",
    { data: OauthConvertToken(provider, code) },
    "POST"
]