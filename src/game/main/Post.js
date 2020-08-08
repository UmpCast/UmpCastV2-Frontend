import React from "react"

import useUser, { useDisplay, ApiSubmit } from "hooks"
import basicApi from "promises"

import SignupCard from "./SignupCard";
import UmpireCard from "./UmpireCard";
import {statusBadges} from "./GameBadges"

import { Badge, Button } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Post(props) {

    const { user, token } = useUser()[0]
    const myDisplay = useDisplay()

    const { useGame, post, game_status } = props

    const [game, setGame] = useGame
    const { pk } = post
    const apps = post.applications

    const onClick = () => {
        ApiSubmit(
            myDisplay,
            () => basicApi(
                "api/applications/",
                { token: token, data: { user: user.pk, post: pk } },
                "post"
            )
        ).then(res => {
            const new_apps = apps.concat(res.data)
            const new_posts = game.posts.map(post => post.pk === pk ?
                { ...post, applications: new_apps } : post
            )

            setGame({
                ...game,
                posts: new_posts
            })
        })
    }

    const onCancel = () => {

    }

    const postCards = apps.map((app, index) => {
        const { pk, user } = app
        let { first_name, last_name, user_pk } = user

        first_name = first_name.charAt(0).toUpperCase() + first_name.slice(1)
        last_name = last_name.charAt(0).toUpperCase()

        const isCasted = index === 0

        return <div className="col-6 col-md-4 col-lg-3 col-xl-2 p-2" key={pk}>
            <UmpireCard
                title={isCasted ? "Casted" : "Backup"}
                border={isCasted ? "border-primary-custom" : "border-secondary-custom"}
                name={`${first_name} ${last_name}.`}
                cancel_button={user_pk === user.pk ?
                    <Button
                        variant="danger rounded p-0 px-1 mr-2 mt-2"
                        style={{ position: "absolute", right: 0 }}
                        disabled={game_status.cancel_expired}
                        onClick={onCancel}>
                        <FontAwesomeIcon icon="ban" />
                    </Button>: null}
            />
        </div>
    })


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
                {game_status.status !== "scheduled" ?
                    <div className="col-6 col-md-4 col-lg-3 col-xl-2 p-2">
                        <SignupCard onClick={onClick} />
                    </div> : null}
                {postCards}
            </div>
        </div>
    );
}