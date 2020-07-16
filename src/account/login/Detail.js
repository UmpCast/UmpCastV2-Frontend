import React, { useState, forwardRef, useContext } from "react"
import axios from "axios"
import PhoneInput from "react-phone-number-input/input"

import UserContext from "../../UserContext"
import Input from "../../tools/Input"
import { fillFields, isRequest, isEmpty, pickFields } from "../../tools/Form"

import { inputRegister, patchUser } from "../promises"

import { Form, InputGroup } from "react-bootstrap"

export default function RegisterDetail(props) {

    const [, setUser] = useContext(UserContext)

    const fields = ["email", "first_name", "last_name", "password"]

    const [values, setValue] = useState(fillFields([fields]))
    const [form, setForm] = useState({ validated: false, errors: {} })

    const onChangePhone = (value) => {
        setValue({ ...values, phone_number: value.slice(2) })
    }

    const onChange = (e, controlId) => {
        setValue({ ...values, [controlId]: e.target.value })
    }

    const handleSubmit = () => {
        inputRegister({ ...props.migrated, ...values })
            .then( payload => setUser(payload.user) )
            .catch(err => {
                const errors = err.response.data
                setForm({ validated: true, errors: errors })
            })
    }

    return (
        <div className="mt-2">
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
                        form={form}
                        handle={onChange} required />
                </div>
            </div>
            <Input label="Password"
                controlId="password"
                type="password"
                form={form}
                handle={onChange} required />
            {/* <Input label="Confirm Password"
                controlId="password2"
                type="password"
                form={form}
                handle={onChange} required /> */}
            {/* <Input
                label={
                    <div>
                        Phone Number
                    <small className="text-muted ml-1">
                            (Optional, used for notifications)
                    </small>
                    </div>
                }
                controlLabel="Phone Number"
                controlId="phone_number"
                control={
                    <PhoneInput
                        useNationalFormatForDefaultCountryValue={false}
                        defaultCountry="US"
                        onChange={onChangePhone}
                        inputComponent={PhoneRef}
                    />
                }
                prepend={<InputGroup.Text>+1</InputGroup.Text>}
                form={form}
                handle={onChange} required /> */}
            <div className="form-group">
                <button onClick={() => handleSubmit()} className="btn btn-primary">
                    Register
                    </button>
            </div>
        </div>
    )
}

const PhoneControl = (props, ref) => {
    return (
        <Form.Control
            {...props}
            ref={ref}
            className="rounded-right"
        />)
}

const PhoneRef = forwardRef(PhoneControl)
