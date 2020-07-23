import axios from "axios"

import {tokenLogin} from "../account/promises"

import { myUrl, config } from "tools/Api"

export async function createRole(values, payload = {}) {

    return axios.post(myUrl("api/roles/"), values, config(values.token))
    .then(res => {
        const role = res.data

        payload.role = role

        return Promise.resolve(payload)
    })
    .catch(err => { return Promise.reject(err) })
}

export async function deleteRole(values, payload = {}) {

    return axios.delete(myUrl(`api/roles/${values.pk}/`), config(values.token))
    .then(() => {
        return Promise.resolve(payload)
    })
    .catch(err => { return Promise.reject(err) })
}

export async function fetchLeague(values, payload = {}) {

    return axios.get(myUrl(`api/leagues/${values.pk}/`), config(values.token))
    .then(res => {
        const league = res.data

        payload.league = league

        return Promise.resolve(payload)
    })
    .catch(err => { return Promise.reject(err) })
}

export async function createLeague(values, payload = {}) {

    return axios.post(myUrl("api/leagues/"), values, config(values.token))
    .then(res => {
        const league = res.data

        payload.league = league

        return Promise.resolve(tokenLogin({token: values.token}, payload))
    })
    .catch(err => { return Promise.reject(err) })
}