import { myUrl, config } from "common/Api"
import axios from "axios"

export async function patchUls(headers, body, payload = {}) {

    return axios.patch(myUrl(`api/user-league-status/${headers.pk}/`), body, config(headers.token))
        .then(res => {
            const uls = res.data

            payload.uls = uls

            return Promise.resolve(payload)
        })
        .catch(err => { return Promise.reject(err) })
}

export default async function basicApi(endpoint, values, method = "get") {

    const { pk, token, params, data } = values

    return axios({
        method: method,
        url: myUrl(`${endpoint}${pk ? `${pk}/` : ""}`),
        ...config(token, params),
        data: data
    })
}