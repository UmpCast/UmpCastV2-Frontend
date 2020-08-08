import React, { useState } from "react";
import { useParams } from "react-router-dom"

import useUser, { useFetch } from "hooks"
import basicApi from "promises"

import GameBanner from "./GameBanner"
import Post from "./Post"
import { gameStatus } from "./GameBadges"

import { Tabs, Tab } from "react-bootstrap";

export default function GamePage() {

    const { pk } = useParams()

    const { token, user } = useUser()[0]

    const useGame = useState()
    const [game, setGame] = useGame

    const [division, setDivision] = useState()
    const [league, setLeague] = useState()

    const myGame = useFetch(async () => {
        let game = null
        return basicApi("api/games/", { pk: pk, token: token })
            .then(res => {
                game = res.data

                setGame(game)

                return basicApi("api/leagues/", { pk: game.league, token: token })
            })
            .then(res => {
                const league = res.data
                const { divisions } = league

                const myDivision = divisions.find(division =>
                    division.pk === game.division
                )
                setDivision(myDivision)

                delete league.divisions
                setLeague(league)
            })
    })

    if (!(game && division && league)) {
        return null
    }

    const roles = getRolesDict(division)

    let { posts } = game
    posts = posts.map(post => ({
        ...post,
        role: roles[post.role]
    }))

    const user_app = findUserApp(user.pk, posts)
    const game_status = gameStatus(game, league, user_app)

    const formatted_posts = posts.map(post =>
        <Tab eventKey={post.pk} title={post.role.title} key={post.pk}>
            <Post post={post} useGame={useGame} game_status={game_status} />
        </Tab>
    )

    return (
        <div className="m-3 mx-xl-5 mt-xl-5 mb-xl-0">
            <GameBanner game={game} division={division} />
            <div className="row">
                <div className="col">
                    <Tabs>
                        {formatted_posts}
                    </Tabs>
                </div>
            </div>
        </div >
    )
}

const getRolesDict = division => {
    const roles = {}
    division.roles.map(role => roles[role.pk] = role)

    return roles
}

const findUserApp = (user_pk, posts) => {
    for (const post of posts) {
        const index = post.applications.findIndex(app => app.user.pk === user_pk)
        if (index !== -1) {
            return { post: post, index: index }
        }
    }
    return null
}