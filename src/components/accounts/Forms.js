import { useEffect, useState, useContext } from "react"
import axios from "axios"
import { myUrl, config } from "../../Api"

import { tokenCreateBody } from "./Api"

import UserContext from "../../UserContext"

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
    fields.map((field) => filled[field] = "")

    return filled
}

export const useFormStep = (fields, props) => {

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

export const useLogin = (onCatch) => {

    const [User, setUser] = useContext(UserContext)

    const [values, setValue] = useState({
        username: "",
        password: "",
        token: ""
    })

    let userUpdate = {}

    new Promise(resolve => resolve({ success: true }))
        .then(() => {
            if (values.token) {
                userUpdate = { token: values.token}
                return axios.get(myUrl("api/users/36/"), config(values.token))

            } else if (values.username && values.password) {

                axios.post(myUrl("auth/token/"), tokenCreateBody(values), config())
                    .then(res => {
                        let token = res.data.access_token

                        userUpdate = { token: token }
                        localStorage.setItem("token", token)
                        return axios.get(myUrl("api/users/36/"), config(token))
                    })

            }
            return Promise.reject({response: {data: "Not enough inputs"}})
        })
        .then(res => {

            userUpdate = {
                ...userUpdate,
                isAuthenticated: true,
                isConfigured: res.data.account_type !== "inactive",
                user: res.data
            }
            console.log(userUpdate)

            setUser({ ...User, ...userUpdate })

        })
        .catch(err => {
            onCatch(err)
        })
    
    return [[values, setValue], [User, setUser]]
}

// setUser({ ...User, ...userUpdate })

//             setForm({
//                 validated: true,
//                 errors: {
//                     username: "Invalid Credentials given",
//                     password: "Invalid Credentials given",
//                 }
//             })