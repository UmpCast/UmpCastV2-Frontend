import { useEffect, useState } from "react"

import { fill, pick } from "../../tools/Form"

export default function useFormStep(fields, props) {

    const [values, setValue] = useState(fill(fields))

    const [form, setForm] = useState({
        validated: false,
        errors: {}
    })

    useEffect(() => {
        const { updateStep } = props

        const myErrors = pick(form.errors, Object.keys(values))

        if (form.validated && Object.keys(myErrors).length === 0) {
            updateStep(values)
        }
    }, [form, props, values])

    return [[values, setValue], [form, setForm]]
}
