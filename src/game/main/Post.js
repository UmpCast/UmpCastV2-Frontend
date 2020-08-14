import React from "react"

import SignupCard from "./SignupCard";
import UmpireCard from "./UmpireCard";
import { statusBadges } from "./GameBadges"

import { Badge } from "react-bootstrap"

export default function Post(props) {
    const { useGame, post, game_status } = props

    const apps = post.applications

    const postCards = apps.map((app, index) => (
        <div className="col-6 col-md-4 col-lg-3 col-xl-2 p-2" key={app.pk}>
            <UmpireCard
                app={app}
                order={index}
                game_status={game_status}
                useGame={useGame} />
        </div>
    ))


    const myBadges = game_status.status === "signups_open" ?
        <Badge variant="success">
            {`Open for ${apps.length === 0 ? "CAST" : "BACKUP"}`}
        </Badge> : statusBadges(game_status)

    return (
        <div className="px-1 pt-4 no-select">
            <div className="row px-2">
                <div className="col d-inline-flex">
                    <div className="ml-auto" />
                    {myBadges}
                </div>
            </div>
            <div className="row pt-2">
                {game_status.status === "signups_open" ?
                    <div className="col-6 col-md-4 col-lg-3 col-xl-2 p-2">
                        <SignupCard post={post} useGame={useGame}/>
                    </div> : null}
                {postCards}
            </div>
        </div>
    );
}