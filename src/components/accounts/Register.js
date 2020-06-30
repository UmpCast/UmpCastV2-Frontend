import React, {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types';

import PhoneInput from 'react-phone-number-input/input'

import {register} from "../../actions/auth";

import {Form} from "react-bootstrap";
import {Layout} from "../Layout";
import Input from "./Input";
import './accounts.css'

class Register extends Component {
    state = {
        phone_number: ''
    }

    static propTypes = {
        register: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool
    }

    handleSubmit = (e) => {
        const {first_name, last_name, email, phone, password, password2} = this.state
        e.preventDefault();
        this.props.register(first_name, last_name, email, phone, password, password2)
    };

    onChange = (e, controlId) => {
        this.setState({[controlId]: e.target.value})
    }

    render() {
        if (this.props.isAuthenticated) {
            return <Redirect to='/register/configure'/>
        }

        const phone_control = <PhoneInput
            inputComponent={Form.Control}
            isValid={true}
            value={this.state.phone_number}
            onChange={phone_number => this.setState({phone_number})}
            style={{"width": "100%"}}
        />

        const phone_label = <div>
            Phone Number
            <small className="text-muted ml-1">
                (Optional, used for notifications)
            </small>
        </div>

        return (
            <Layout>
                <div style={{"width": "500px"}}>
                    <div className="card card-body mt-5">
                        <h2 className="text-center">Register</h2>
                        <Form noValidate onSubmit={this.handleSubmit}>
                            <div className="row">
                                <div className="col-sm-12 col-md-6">
                                    <Input
                                        label="First name"
                                        controlId="first_name"
                                        type="text"
                                        from="register" handle={this.onChange} required/>
                                </div>
                                <div className="col-sm-12 col-md-6">
                                    <Input
                                        label="Last name"
                                        controlId="last_name"
                                        type="text"
                                        from="register" handle={this.onChange} required/>
                                </div>
                            </div>
                            <Input label="Email"
                                   controlId="email"
                                   type="email"
                                   from="register" handle={this.onChange} required/>
                            <Input label={phone_label}
                                   from="register"
                                   controlId="phone_number"
                                   control={phone_control}/>
                            <Input label="Password"
                                   controlId="password"
                                   type="password"
                                   from="register" handle={this.onChange} required/>
                            <Input label="Confirm Password"
                                   controlId="password2"
                                   type="password"
                                   from="register" handle={this.onChange} required/>
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary">
                                    Register
                                </button>
                            </div>
                        </Form>
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

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {register})(Register);