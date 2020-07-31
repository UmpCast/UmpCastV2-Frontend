import axios from "axios"

import { myUrl, config} from "tools/Api"

export async function patchUls(headers, body, payload = {}) {

    return axios.patch(myUrl(`api/user-league-status/${headers.pk}/`), body, config(headers.token))
    .then(res => {
        const uls = res.data

        payload.uls = uls

        return Promise.resolve(payload)
    })
    .catch(err => { return Promise.reject(err) })
}

export async function filterUls(headers, params, payload = {}) {

    return axios.get(myUrl("api/user-league-status/"), config(headers.token, params))
    .then(res => {
        const uls = res.data

        payload.uls = uls

        return Promise.resolve(payload)
    })
    .catch(err => { return Promise.reject(err) })
}

export default async function basicApi(endpoint, values, method="get") {

    const {pk, token, params, data} = values

    return axios({
        method: method,
        url: myUrl(`${endpoint}${ pk ? `${pk}/` : "" }`),
        ...config(token, params),
        data: data
    })
    .then(res => {
        return Promise.resolve(res.data)
    })
    .catch(err => { return Promise.reject(err.response.data) })
}