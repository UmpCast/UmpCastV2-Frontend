import React, { useState } from 'react'
import axios from "axios"
import { Redirect, useLocation } from "react-router-dom"

import { useApi, useMountEffect } from "common/hooks"
import { OauthTsToken, TsCallbackUri } from "common/Api"

export default function Teamsnap() {

    const Api = useApi(requests)
    const { search } = useLocation()

    const [fetched, setFetched] = useState(false)

    const aux_url = new URL("https://e/" + search)

    const pk = aux_url.searchParams.get("pk")
    const ts_code = aux_url.searchParams.get("code")

    useMountEffect(() => {
        Api.Submit(() =>
            axios.post(
                "https://auth.teamsnap.com/oauth/token",
                null,
                {
                    header: {
                        "Content-Type": "application/json",
                        "content-length": 0
                    },
                    params: OauthTsToken(ts_code, TsCallbackUri(pk))
                }
            ).then(res =>
                Api.saveApiKey(pk, res.data.access_token)
            )
        )
            .finally(
                () => setFetched(true)
            )
    })

    return fetched ?
        <Redirect to={`/league/${pk}/settings/divisions`} /> : null
}

const requests = {
    saveApiKey: (league_pk, key) => [
        `api/teamsnap/${league_pk}/save/`,
        {
            params: {
                api_key: key
            }
        }
    ]
}