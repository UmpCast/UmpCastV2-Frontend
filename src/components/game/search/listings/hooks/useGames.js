import { useState, useEffect } from 'react'

import { useApi } from "common/hooks"

export default function useGames(filters, setHistory) {

    const Api = useApi(fetchGames)

    const useGames = useState()

    const [, setGames] = useGames

    useEffect(() => {
        if (filters) {
            const { divisions, start_date, page } = filters

            const enabledDivs = divisions.filter(
                div => div.enabled
            ).map(div => div.pk)

            if (enabledDivs.length > 0) {
                Api.fetchGames(enabledDivs, start_date, page)
                    .then(res => {
                        setGames(res.data)

                        if(!page){
                            setHistory([])
                        }
                    })
            } else {
                setGames({
                    count: 0,
                    page_number: 0,
                    page_size: 0,
                    results: []
                })

                if(!page){
                    setHistory([])
                }
            }
        }
    }, [filters, Api, setGames])

    return useGames
}

const fetchGames = (divisions, start_date, page) => [
    "api/games/",
    {
        params: {
            division__in: divisions.toString(),
            date_time_after: start_date.toISOString(),
            page_size: 1,
            page: page
        }
    }
]
