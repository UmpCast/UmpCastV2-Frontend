import Input from "./Input";
import {Form} from "react-bootstrap";
import React, {Component} from "react";
import PhoneInput from "react-phone-number-input/input";
import PhoneFormControl from "./PhoneFormControl";

class RegisterDetail extends Component {
    state = {
        form: {
            validated: false,
            errors: {}
        }
    }

    onChangePhone = (number) => {
        this.setState({phone_number: number})
    }

    handleSubmit = (e) => {
        const {first_name, last_name, email, phone, password, password2} = this.state
        e.preventDefault();
        this.this.register(first_name, last_name, email, phone, password, password2, this)
    }
    
    render() {
        const form = this.state.form

        return (
            <Form noValidate onSubmit={this.handleSubmit} className="mt-2">
                <div className="row">
                    <div className="col-sm-12 col-md-6">
                        <Input
                            label="First name"
                            controlId="first_name"
                            type="text"
                            form={form}
                            handle={this.onChange} required/>
                    </div>
                    <div className="col-sm-12 col-md-6">
                        <Input
                            label="Last name"
                            controlId="last_name"
                            type="text"
                            from="register"
                            form={form}
                            handle={this.onChange} required/>
                    </div>
                </div>
                <Input
                    label="Phone Number"
                    controlId="phone_number"
                    control={
                        <PhoneInput
                            onChange={this.onChangePhone}
                            inputComponent={PhoneFormControl}
                        />
                    }
                    from="register"
                    form={form}
                    handle={this.onChange} required/>
                <Input label="Password"
                       controlId="password"
                       type="password"
                       from="register"
                       form={form}
                       handle={this.onChange} required/>
                <Input label="Confirm Password"
                       controlId="password2"
                       type="password"
                       from="register"
                       form={form}
                       handle={this.onChange} required/>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">
                        Register
                    </button>
                </div>
            </Form>
        )
    }
}
export default RegisterDetail