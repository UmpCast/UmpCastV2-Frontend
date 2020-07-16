import axios from "axios"

import { myUrl, config, tokenCreateBody, accessCreateBody } from "../tools/Api"
import { pickFields } from "../tools/Form"

export async function tokenLogin(values, payload = {}) {

    return axios.get(myUrl("api/users/me/"), config(values.token))
        .then(res => {
            payload.user = {
                ...payload.user,
                isAuthenticated: true,
                isConfigured: res.data.account_type !== "inactive",
                user: res.data
            }
            return Promise.resolve(payload)
        })
        .catch(err => { return Promise.reject(err) })
}

export async function socialRegister(values, payload = {}) {

    return axios.post(
        myUrl("auth/convert-token/"),
        accessCreateBody({ backend: values.provider, token: values.code }),
        config())
        .then(res => {

            const token = res.data.access_token

            payload.user = {
                ...payload.user,
                token: token
            }

            return Promise.resolve(tokenLogin({ token: token }, payload))
        })
        .catch(err => { return Promise.reject(err) })
}

export async function inputRegister(values, payload = {}) {

    const requiredFields = ["first_name", "last_name", "password", "email"]

    return axios.post(myUrl("api/users/"), pickFields(values, requiredFields), config())
        .then(res => {
            const user = res.data

            payload.user = user

            return Promise.resolve(inputLogin(values, payload))
        })
        .catch(err => { return Promise.reject(err) })

}

export async function patchUser(values, payload = {}) {

    const optionalFields = ["email_notifications", "phone_number", "phone_notifications"]

    return axios.patch(myUrl(`api/users/${values.pk}/`), pickFields(values, optionalFields), config(values.token))
        .then(res => {
            const user = res.data

            payload.user = {
                ...payload.user,
                user: user
            }

            return Promise.resolve(payload)
        })
        .catch(err => { return Promise.reject(err) })
}

export async function inputLogin(values, payload = {}) {

    return axios.post(myUrl("auth/token/"), tokenCreateBody(values), config())
        .then(res => {
            let token = res.data.access_token

            localStorage.setItem("token", token)
            payload.user = {
                ...payload.user,
                token: token
            }

            return Promise.resolve(tokenLogin({ token: token }, payload))
        })
        .catch(err => { return Promise.reject(err) })
}

export async function configure(values, payload = {}) {

    return axios.patch(myUrl(`api/users/${values.pk}/`), { account_type: values.myConfig }, config(values.token))
        .then(res => {

            payload.user = {
                ...payload.user,
                user: res.data,
                isAuthenticated: true,
                isConfigured: true
            }

            return Promise.resolve(payload)
        })
        .catch(err => { return Promise.reject(err) })
}