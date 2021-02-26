import React from "react"
import dayjs from "dayjs"
import { Link } from "react-router-dom"

import { AppPicture } from "common/components"

import { ListGroup } from "react-bootstrap"

export default function GameListing({ game }) {

    return (
        <ListGroup.Item
            className="d-inline-flex pl-0"
            as={Link}
            to={`/game/${game.pk}`}
            action>
            <DateColumn game={game} />
            <div className="d-flex justify-content-between w-100 ml-3">
                <div className="flex-column mb-0">
                    <GameTitle game={game} />
                    <GameDetails game={game} />
                </div>
                <div className="flex-column d-flex flex-wrap align-items-end">
                    <HourTime game={game} />
                    <GameCast game={game} />
                </div>
            </div>
        </ListGroup.Item>
    )
}

const DateColumn = ({ game }) => {
    const date = dayjs(game.date_time)

    return (
        <div className="flex-column text-center border-right my-auto px-4">
            <strong>{date.format("MMM")}</strong>
            <div
                className="text-primary"
                style={{ "fontSize": 30, "lineHeight": 1 }}>
                <strong>{date.format("DD")}</strong>
            </div>
            <div className="text-muted">
                {date.format("ddd")}
            </div>
        </div>
    )
}

const GameTitle = ({ game }) => (
    <h4 className="mb-auto">
        <strong className="text-primary">
            {game.title}
        </strong>
    </h4>
)

const GameDetails = ({ game }) => (
    <div className="mt-3">
        <p className="mb-0">
            <strong>Division: </strong>
            <span className="text-uppercase">
                {game.division.title}
            </span>
        </p>
        <p className="mb-0">
            <strong>Location: </strong>
            {game.location}
        </p>
    </div>
)

const HourTime = ({ game }) => {
    const date = dayjs(game.date_time)

    return (
        <h5 className="mb-auto">
            <small>
                <strong>{date.format("h:mm A")}</strong>
            </small>
        </h5>
    )
}

const GameCast = ({ game }) => {

    const { posts } = game

    const gallery = posts.map((post, index) =>
        <AppPicture
            casted={post.applications[0]}
            className={index + 1 < posts.length ? "mr-2" : ""}
            role={post.role}
            size={25}
            key={post.pk} />
    )

    return (
        <div className="d-flex flex-column">
            <h5 className="mb-1">
                <strong className="float-right">
                    Cast:
                </strong>
            </h5>
            <div className="d-inline-flex">
                {gallery}
            </div>
        </div >
    )
}