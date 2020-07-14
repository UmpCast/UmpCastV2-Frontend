import React, { Fragment } from "react";
import axios from "axios";

import { myUrl, config } from "../../tools/Api"
import Input from "../../tools/Input";

import Social from "./Social"
import useFormStep from "./useFormStep"

import { Button } from "react-bootstrap";

export default function Email(props) {

    const [[values, setValue], [form, setForm]] = useFormStep(["email"], props)

    const onChange = (e, controlId) => {
        setValue({ ...values, [controlId]: e.target.value })
    }

    const onNext = () => {
        axios.post(myUrl("api/users/"), values, config())
            .then()
            .catch(err => {
                setForm({ validated: true, errors: err.response.data })
            })
    }

    return (
        <Fragment>
            <div className="row mb-2 px-2">
                <Social />
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
