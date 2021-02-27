import React, { useState } from "react"

import { Card } from "react-bootstrap"

import useUser, { useApi, useMountEffect } from "common/hooks"

import PastGame from "./PastGame"
import HistoryHeader from "./HistoryHeader"
import Loader, { NotifsPage } from "common/components"

const History = () => {
    const Api = useApi(requests)
    const { user } = useUser()

    const useLeagues = useState()
    const [leagues, setLeagues] = useLeagues

    useMountEffect(() => {
        Api.fetchUls(user)
            .then((res) => {
                const fetches = res.data.results.map(({ league }) =>
                    Api.fetchLeague(league.pk)
                )
                return Promise.all(fetches)
            })
            .then((res) => setLeagues(res.map(({ data }) => data)))
    })

    const fetchNotifs = {
        fetchNotifs(page) {
            return [
                "api/games/",
                {
                    params: {
                        user: user.pk,
                        date_time_before: new Date().toISOString(),
                        page,
                        page_size: 10
                    }
                }
            ]
        }
    }

    const processPageResult = (leagues) => ({ results }) =>
        results.reduce((filtered, game) => {
            const post = game.posts.find(
                (post) => post.applications[0].user.pk === user.pk
            )

            if (post !== undefined) {
                const league = leagues.find(({ pk }) => pk === game.league)
                const division = league.divisions.find(
                    ({ pk }) => pk === game.division
                )
                const role = division.roles.find(({ pk }) => pk === post.role)

                filtered.push({
                    title: game.title,
                    division: division.title,
                    role: role.title,
                    date_time: game.date_time,
                    pk: game.pk,
                    status: "completed"
                })
            }

            return filtered
        }, [])

    return (
        <Loader dep={[leagues]}>
            <div className="px-1 mt-3">
                <div className="card border-0 mb-3">
                    <HistoryHeader completed="5" canceled="1" />
                    <Card.Body className="p-0">
                        <NotifsPage
                            fetchNotifs={fetchNotifs}
                            msgTemplate={PastGame}
                            processNotifs={processPageResult(leagues)}
                        />
                    </Card.Body>
                </div>
            </div>
        </Loader>
    )
}

const requests = {
    fetchUls: (user) => [
        "api/user-league-status/",
        {
            params: {
                user: user.pk,
                request_status: "accepted",
                page_size: 100
            }
        }
    ],
    fetchLeague: (league_pk) => [
        "api/leagues/",
        {
            pk: league_pk
        }
    ]
}

export default History
