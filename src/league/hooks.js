import { useState, useEffect } from 'react'

import { fetchLeague } from "./promises"

export const useLeague = (pk, token) => {

    const [myLeague, setMyLeague] = useState(null)

    useEffect(() => {
        fetchLeague({ pk: pk, token: token })
            .then(payload => {
                setMyLeague(payload.league)
            })
            .catch()
    }, [])

    return [myLeague, setMyLeague]
}
