import axios from "axios"

import { myUrl, config, tokenCreateBody, accessCreateBody } from "common/Api"

export async function inputRegister(body, payload = {}) {

    return axios.post(myUrl("api/users/"), body, config())
        .then(res => {
            const user = res.data

            payload.user = user

            return Promise.resolve(inputLogin(body, payload))
        })
        .catch(err => { return Promise.reject(err) })

}

export async function socialRegister(body, payload = {}) {

    return axios.post(
        myUrl("api/auth/convert-token/"),
        accessCreateBody({ backend: body.provider, token: body.code }),
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

export async function inputLogin(body, payload = {}) {

    return axios.post(myUrl("api/auth/token/"), tokenCreateBody(body), config())
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

export async function configure(headers, body, payload = {}) {

    return axios.patch(myUrl(`api/users/${headers.pk}/`), body, config(headers.token))
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

export async function patchUser(headers, body, payload = {}) {

    return axios.patch(myUrl(`api/users/${headers.pk}/`), body, config(headers.token))
        .then(res => {
            const user = res.data

            payload.User = {
                ...payload.user,
                user: user
            }

            return Promise.resolve(payload)
        })
        .catch(err => { return Promise.reject(err) })
}


export async function tokenLogin(headers, payload = {}) {

    return axios.get(myUrl("api/users/me/"), config(headers.token))
        .then(res => {
            payload.user = {
                ...payload.user,
                isAuthenticated: true,
                isConfigured: res.data.account_type !== "inactive",

                user: res.data,
                token: headers.token
            }
            return Promise.resolve(payload)
        })
        .catch(err => { return Promise.reject(err) })
}