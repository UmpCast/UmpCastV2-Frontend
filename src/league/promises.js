import axios from "axios"

import { tokenLogin } from "../account/promises"

import { myUrl, config } from "tools/Api"

export async function createRole(header, body, payload = {}) {

    return axios.post(myUrl("api/roles/"), body, config(header.token))
        .then(res => {
            const role = res.data

            payload.role = role

            return Promise.resolve(payload)
        })
        .catch(err => { return Promise.reject(err) })
}

export async function deleteRole(header, payload = {}) {

    return axios.delete(myUrl(`api/roles/${header.pk}/`), config(header.token))
        .then(() => {
            return Promise.resolve(payload)
        })
        .catch(err => { return Promise.reject(err) })
}

export async function deleteDivision(header, body, payload = {}) {

    return axios.post(myUrl("api/divisions/"), body, config(header.token))
        .then(res => {
            const division = res.data

            payload.division = division

            return Promise.resolve(payload)
        })
        .catch(err => { return Promise.reject(err) })
}

export async function createDivision(header, body, payload = {}) {

    return axios.post(myUrl("api/divisions/"), body, config(header.token))
        .then(res => {
            const division = res.data

            payload.division = division

            return Promise.resolve(payload)
        })
        .catch(err => { return Promise.reject(err) })
}

export async function fetchLeague(header, payload = {}) {

    return axios.get(myUrl(`api/leagues/${header.pk}/`), config(header.token))
        .then(res => {
            const league = res.data

            payload.league = league

            return Promise.resolve(payload)
        })
        .catch(err => { return Promise.reject(err) })
}

export async function joinLeague(header, body, payload = {}) {

    return axios.post(myUrl("api/user-league-status/"), body, config(header.token))
        .then(res => {
            const uls = res.data

            payload.uls = uls

            return Promise.resolve(payload)
        })
        .catch(err => { return Promise.reject(err) })
}

export async function patchLeague(header, body, payload = {}) {

    return axios.patch(myUrl(`api/leagues/${header.pk}/`), body, config(header.token))
        .then(res => {
            const league = res.data

            payload.league = league

            return Promise.resolve(payload)
        })
        .catch(err => { return Promise.reject(err) })
}

export async function createLeague(header, body, payload = {}) {

    return axios.post(myUrl("api/leagues/"), body, config(header.token))
        .then(res => {
            const league = res.data

            payload.league = league

            return Promise.resolve(tokenLogin({ token: header.token }, payload))
        })
        .catch(err => { return Promise.reject(err) })
}