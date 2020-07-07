
import { useEffect, useState } from "react"

export const getMissing = values => {
    return Object.assign(
        ...Object.entries(values).map(
            pair => pair[1] === ""
                ? { [pair[0]]: pair[0] + " is missing" }
                : {}
        ))
}

export const pick = function (obj, props) {

    if (!obj || !props) return;

    var picked = {};

    props.forEach(function (prop) {
        obj[prop] && (picked[prop] = obj[prop])
    });

    return picked;
}

const fill = (fields) => {
    const filled = {}
    fields.map((field) => filled[field] = "" )

    return filled
}

export const useFormStep = (fields, props) => {

    const [values, setValue] = useState(fill(fields))

    const [form, setForm] = useState({
        validated: false,
        errors: {}
    })

    useEffect(() => {
        const {updateStep} = props

        const myErrors = pick(form.errors, Object.keys(values))

        if (form.validated && Object.keys(myErrors).length === 0) {
            updateStep(values)
        }
    }, [form, props, values])

    return [[values, setValue], [form, setForm]]
}