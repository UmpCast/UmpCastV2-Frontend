import React, { useState } from "react"
import PhoneInput from "react-phone-number-input/input"

import Input from "./Input"
import PhoneFormControl from "./PhoneFormControl"
import { userAPI } from "../../Api"
import { useFormStep } from "./Forms"

import { Form } from "react-bootstrap"

const RegisterDetail = (props) => {

    const fields = ["first_name", "last_name", "password", "password2", "phone_number"]

    const [[values, setValue], [form, setForm]] = useFormStep(fields, props)

    const onChangePhone = (value) => {
        setValue({ ...values, phone_number: value.slice(2) })
    }

    const onChange = (e, controlId) => {
        setValue({ ...values, [controlId]: e.target.value })
    }

    const handleSubmit = () => {
        userAPI().create(values)
            .then()
            .catch(err => {
                setForm({ validated: true, errors: err.response.data })
            })
    }

    return (
        <Form noValidate onSubmit={handleSubmit} className="mt-2">
            <div className="row">
                <div className="col-sm-12 col-md-6">
                    <Input
                        label="First name"
                        controlId="first_name"
                        type="text"
                        form={form}
                        handle={onChange} required />
                </div>
                <div className="col-sm-12 col-md-6">
                    <Input
                        label="Last name"
                        controlId="last_name"
                        type="text"
                        from="register"
                        form={form}
                        handle={onChange} required />
                </div>
            </div>
            <Input
                label="Phone Number"
                controlId="phone_number"
                control={
                    <PhoneInput
                        useNationalFormatForDefaultCountryValue = {false}
                        defaultCountry="US"
                        onChange={onChangePhone}
                        inputComponent={PhoneFormControl}
                    />
                }
                from="register"
                form={form}
                handle={onChange} required />
            <Input label="Password"
                controlId="password"
                type="password"
                from="register"
                form={form}
                handle={onChange} required />
            <Input label="Confirm Password"
                controlId="password2"
                type="password"
                from="register"
                form={form}
                handle={onChange} required />
            <div className="form-group">
                <button type="submit" className="btn btn-primary">
                    Register
                    </button>
            </div>
        </Form>
    )
}

export default RegisterDetail