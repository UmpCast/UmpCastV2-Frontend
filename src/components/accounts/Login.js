import React, {Component} from "react"
import {Link, Redirect} from 'react-router-dom'

import {Layout} from "../common/Layout";
import Input from "./Input";
import {Form} from "react-bootstrap";

class Login extends Component {
    state = {
        phone_number: '',
        form: {validated: false, errors: {}}
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.login(this.state.username, this.state.password, this)
    }

    onChange = (e, controlId) => {
        this.setState({[controlId]: e.target.value})
    }

    render() {

        if (this.props.isAuthenticated) {
            return <Redirect to='/register/configure'/>
        }

        let form = this.state.form

        return (
            <Layout>
                <div style={{"width": "500px"}}>
                    <div className="card card-body mt-5">
                        <h2 className="text-center">Login</h2>
                        <Form noValidate onSubmit={this.handleSubmit}>
                            <Input label="Email"
                                   controlId="email"
                                   type="email"
                                   form={form}
                                   handle={this.onChange} required/>
                            <Input label="Password"
                                   controlId="password"
                                   type="password"
                                   form={form}
                                   handle={this.onChange} required/>
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary">
                                    Login
                                </button>
                            </div>
                        </Form>
                        <p>
                            Don't have an account?
                            <Link to="/register"> Register</Link>
                        </p>
                    </div>
                </div>
            </Layout>
        );
    }
}

export default Login