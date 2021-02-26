import React, { useState } from "react"
import { Link } from "react-router-dom"
import dayjs from "dayjs"
import localizedFormat from "dayjs/plugin/localizedFormat"

import useUser, { useApi } from "common/hooks"

import { AppPicture } from "common/components"
import { BasicConfirm } from "common/forms"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { Card } from "react-bootstrap"

dayjs.extend(localizedFormat)

export default function CalendarGame({ game, handleDeleteGame }) {
    const { user } = useUser()
    const Api = useApi(requests)

    const useShow = useState(false)
    const [, setShow] = useShow

    const { date_time } = game
    const game_over = dayjs(date_time) < dayjs()

    const style = { opacity: game_over ? 0.8 : 1 }

    const onDeleteConfirm = () =>
        // TODO Manager does not have permission to delete game
        Api.Submit(() => Api.deleteGame(game.pk))
            .then(() => setShow(false))
            .finally(() => handleDeleteGame(game))

    return (
        <Card className="mb-2 mx-0 w-100" style={style}>
            <GameHeader {...{ game }} />

            <Card.Body className="pb-2 px-3 pt-3">
                <TitleLink {...{ game, user, setShow }} />

                <GameDetails {...{ game }} />

                <CastGallery {...{ game }} />
            </Card.Body>

            <BasicConfirm
                action="Delete Game"
                consequences="Any umpires currently signed up will be removed"
                action_text="Delete"
                useShow={useShow}
                onConfirm={onDeleteConfirm}
            />
        </Card>
    )
}

const GameHeader = ({ game }) => {
    const { posts, date_time } = game

    const hour_time = dayjs(date_time).format("LT")

    const num_posts = posts.length

    let num_casts = 0

    for (const post of posts) {
        if (post.applications.length > 0) num_casts++
    }

    const [bg_color, text_color] = headerStyles(num_casts, num_posts)

    return (
        <Card.Header className={`${bg_color} ${text_color} p-2 pl-3`}>
            {hour_time}
            <span className="float-right">
                <strong>
                    {num_casts} / {num_posts}
                </strong>
            </span>
        </Card.Header>
    )
}

const headerStyles = (num_casts, num_posts) => {
    if (num_casts === num_posts) {
        return ["bg-dark", "text-light"]
    } else if (num_casts === 0) {
        return ["bg-light", "text-muted"]
    } else {
        return ["bg-primary", "text-light"]
    }
}

const TitleLink = ({ game, user, setShow }) => (
    <Card.Title className="mb-0 d-flex justify-content-between">
        <Link to={`/game/${game.pk}/`}>
            <h6 className="mb-0 text-secondary">
                <strong>{game.title}</strong>
            </h6>
        </Link>
        {user.account_type === "manager" ? (
            <span
                className="float-right text-warning"
                style={{ cursor: "pointer" }}
                onClick={() => setShow(true)}
            >
                <FontAwesomeIcon icon="ban" className="ml-1 mb-1 fa-xs" />
            </span>
        ) : null}
    </Card.Title>
)

const GameDetails = ({ game }) => (
    <p className="text-muted small my-1" style={{ lineHeight: 1.2 }}>
        {game.location} · {game.division.title}
    </p>
)

const CastGallery = ({ game }) => {
    const { posts } = game

    const gallery = game.posts.map((post, index) => {
        const { pk, applications, role } = post

        const casted = applications[0]
        const className = index + 1 === posts.length ? "" : "mr-2"

        return (
            <AppPicture
                className={className}
                casted={casted}
                role={role}
                size={25}
                key={pk}
            />
        )
    })

    return <div className="d-flex justify-content-end mt-1">{gallery}</div>
}

const requests = {
    deleteGame: (game) => [
        "api/games/",
        {
            pk: game.pk
        },
        "DELETE"
    ]
}
