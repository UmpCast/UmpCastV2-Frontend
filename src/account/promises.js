import axios from "axios"

import { myUrl, config, tokenCreateBody } from "../tools/Api"

export async function tokenLogin(values, payload = {}) {
    return axios.get(myUrl("api/users/38/"), config(values.token))
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

export async function inputLogin(values, payload = {}) {
    return axios.post(myUrl("auth/token/"), tokenCreateBody(values), config())
        .then(res => {
            let token = res.data.access_token

            localStorage.setItem("token", token)
            payload.user = {
                ...payload.user,
                token: token
            }

            return Promise.resolve(tokenLogin({token: token}, payload))
        })
        .catch(err => { return Promise.reject(err) })
}


export async function configure(values, payload = {}) {
    return axios.patch(myUrl("api/users/38/"), { account_type: values.myConfig }, config(values.token))
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
