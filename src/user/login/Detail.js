import React, { forwardRef } from "react"
import axios from "axios"
import PhoneInput from "react-phone-number-input/input"

import { myUrl, config } from "../../Api"
import Input from "../../Input"

import useFormStep from "./useFormStep"

import { Form, InputGroup } from "react-bootstrap"

const PhoneFormControl = (props, ref) => {
    return (
        forwardRef(<Form.Control {...props} ref={ref} className="rounded-right" />)
    )
}

export default function Detail(props) {

    const fields = ["first_name", "last_name", "password", "password2", "phone_number"]

    const [[values, setValue], [form, setForm]] = useFormStep(fields, props)

    const onChangePhone = (value) => {
        setValue({ ...values, phone_number: value.slice(2) })
    }

    const onChange = (e, controlId) => {
        setValue({ ...values, [controlId]: e.target.value })
    }

    const handleSubmit = () => {

        axios.post(myUrl("api/users/"), values, config())
            .then(res => console.log(res))
            .catch(err => {
                setForm({ validated: true, errors: err.response.data })
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
            <Input
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
                        inputComponent={PhoneFormControl}
                    />
                }
                prepend={<InputGroup.Text>+1</InputGroup.Text>}
                form={form}
                handle={onChange} required />
            <Input label="Password"
                controlId="password"
                type="password"
                form={form}
                handle={onChange} required />
            <Input label="Confirm Password"
                controlId="password2"
                type="password"
                form={form}
                handle={onChange} required />
            <div className="form-group">
                <button onClick={() => handleSubmit()} className="btn btn-primary">
                    Register
                    </button>
            </div>
        </div>
    )
}
