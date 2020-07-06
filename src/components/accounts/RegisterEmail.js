import React, {Fragment, Component} from "react";
import SocialButton from "./SocialLogin";
import Input from "./Input";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFacebookF, faGoogle} from "@fortawesome/free-brands-svg-icons";
import {Button} from "react-bootstrap";

class RegisterEmail extends Component {
    state = {
        loading: false,
        values:{},
        form: {
            validated: false,
            errors: {}
        }
    }

    handleSocialLogin = (user) => {
        console.log(user)
    }

    handleSocialLoginFailure = (err) => {
        console.error(err)
    }

    onChange = (e, controlId) => {
        this.setState({values: {[controlId]: e.target.value}})
    }

    onNext = (e) => {
        this.setState({loading: true})
        e.preventDefault()
        const form = this.state.form
        if (form.validated && Object.keys(form.errors).length === 0){
            this.props.updateStep(this.state.values)
        }
    }

    render() {
        const form = this.state.form

        return (
            <Fragment>
                <div className="row mb-2 px-2">
                    <div className="col-6 pl-0 p-2">
                        <SocialButton
                            className="btn-block rounded p-2 border-0"
                            provider='google'
                            appId='465788009761-4vmel0as85nisk2aqe138cbes2e7r0ra'
                            onLoginSuccess={this.handleSocialLogin}
                            onLoginFailure={this.handleSocialLoginFailure}
                            color="#D95140">
                            <FontAwesomeIcon icon={faGoogle} className="mr-2"/>
                            <strong>Signup with Google</strong>
                        </SocialButton>
                    </div>
                    <div className="col-6 p-2">
                        <SocialButton
                            className="btn-block rounded p-2 border-0"
                            provider='facebook'
                            appId='263365151623275'
                            onLoginSuccess={this.handleSocialLogin}
                            onLoginFailure={this.handleSocialLoginFailure}
                            color="#4867AD">
                            <FontAwesomeIcon icon={faFacebookF} className="mr-2"/>
                            <strong>Signup with Facebook</strong>
                        </SocialButton>
                    </div>
                </div>
                <div className="d-inline-flex align-items-center mb-2">
                    <hr className="flex-grow-1"/>
                    <div className="m-2">Or</div>
                    <hr className="flex-grow-1"/>
                </div>
                <Input
                    controlId="email"
                    type="email"
                    placeholder="Email address"
                    form={form}
                    handle={this.onChange} required
                />
                <Button onClick={this.onNext} className="btn-block btn-primary rounded my-3">
                    Next
                </Button>
            </Fragment>
        )
    }
}

export default RegisterEmail