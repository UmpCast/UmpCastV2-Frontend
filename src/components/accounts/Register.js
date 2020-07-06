import React, {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'

import {Layout} from "../common/Layout";
import RegisterEmail from "./RegisterEmail";
import RegisterDetail from "./RegisterDetail";

class Register extends Component {
    state = {
        values: {},
        step: 0
    }

    updateStep = (values) => {
        console.log("hi")
        this.setState({values: {...this.state.values, ...values}, step: this.state.step + 1})
    }

    formSteps = (
        [
            <RegisterEmail updateStep={this.updateStep}/>,
            <RegisterDetail updateStep={this.updateStep}/>
        ]
    )

    render() {
        if (this.props.isAuthenticated) {
            return <Redirect to='/register/configure'/>
        }

        return (
            <Layout>
                <div style={{"width": "500px"}}>
                    <div className="card card-body mt-5 px-4">
                        <h2 className="text-center mb-3">Register</h2>
                        {this.formSteps[this.state.step]}
                        <p>
                            Have an account?
                            <Link to="/login"> Login</Link>
                        </p>
                    </div>
                </div>
            </Layout>
        );
    }
}

export default Register