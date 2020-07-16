import React, { Fragment, useState } from "react";
import axios from "axios";

import { myUrl, config } from "../../tools/Api"
import Input from "../../tools/Input";
import { pickFields, isEmpty } from "../../tools/Form"

import RegisterSocial from "./Social"

import { Button } from "react-bootstrap";

export default function RegisterEmail(props) {

    const [values, setValue] = useState({ email: "" })
    const [form, setForm] = useState({ validated: false, errors: {} })

    const onChange = (e, controlId) => {
        setValue({ ...values, [controlId]: e.target.value })
    }

    const onNext = () => {
        axios.post(myUrl("api/users/"), values, config())
            .then()
            .catch(err => {
                const errors = pickFields(err.response.data, ["email"])

                if (isEmpty(errors)) {
                    props.updateStep(values)
                } else {
                    setForm({ validated: true, errors: errors })
                }
            })
    }

    return (
        <Fragment>
            <div className="row mb-2 px-2">
                <RegisterSocial />
            </div>
            <div className="d-inline-flex align-items-center mb-2">
                <hr className="flex-grow-1" />
                <div className="m-2">Or</div>
                <hr className="flex-grow-1" />
            </div>
            <Input
                label="Email"
                controlId="email"
                type="text"
                placeholder="Email address"
                form={form}
                handle={onChange} required
            />
            <Button onClick={() => onNext()} className="btn-block btn-primary rounded my-3">
                Next
            </Button>
        </Fragment>
    )

}
