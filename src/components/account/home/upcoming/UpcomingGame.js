import React from "react";
import { Link } from "react-router-dom"
import dayjs from "dayjs"

import { ToolTip } from "common/components"
import useUser from "common/hooks"

import { ListGroup, Badge } from "react-bootstrap"

const UpcomingGame = ({ game, league }) => {

    const { user } = useUser()

    const { title, date_time, pk } = game

    const {
        div_title,
        role_title,
        order
    } = extractUserInfo(user.pk, game, league)

    const division = div_title.toUpperCase()
    const role = role_title.toUpperCase()

    return (
        <ListGroup.Item
            as={Link}
            to={`/game/${pk}`}
            action>
            <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">
                    {title}
                </h5>
                <div className="flex-grow-0 flex-shrink-0">
                    <small className="text-muted">
                        {dayjs(date_time).format("h:mm A")}
                    </small>
                </div>
            </div>
            <div className="d-flex w-100 justify-content-between">
                <p className="text-uppercase mb-0">
                    {division} {role}
                </p>
                <StatusBadge order={order} />
            </div>
        </ListGroup.Item>
    )
}

const extractUserInfo = (user_pk, game, league) => {
    const { division } = game

    const gameDiv = league.divisions.find(
        ({ pk }) => pk === division
    )

    let gamePost, order;

    postsLoop:
    for (const post of game.posts) {
        for (const app of post.applications) {
            if (app.user.pk === user_pk) {
                gamePost = post
                order = app.order

                break postsLoop
            }
        }
    }

    const gameRole = gameDiv.roles.find(
        ({ pk }) => pk === gamePost.role
    )

    return {
        div_title: gameDiv.title,
        role_title: gameRole.title,
        order: order
    }
}

const StatusBadge = ({ order }) => {
    const [title, variant, tip] = (
        order === 0 ?
            ["CASTED", "success", "Be on time!"]
            : ["BACKUP", "warning", "You are a backup"]
    )

    return (
        <ToolTip tip={tip}>
            <Badge variant={variant} className="mt-auto">
                {title}
            </Badge>
        </ToolTip>
    )
}

export default UpcomingGame