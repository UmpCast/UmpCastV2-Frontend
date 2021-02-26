import React from "react"

import useUser from "common/hooks"
import Loader from "common/components"

import SignupCard from "./SignupCard";
import UmpireCard from "./UmpireCard";
import { statusBadges } from "./GameBadges"

import { Row, Col, Badge } from "react-bootstrap"

export default function Post(props) {
    const { useGame, post, game_status } = props

    const apps = post.applications

    const { user } = useUser()
    const { account_type } = user
    const isUmpire = account_type === "umpire"

    return (
        <div className="px-1 pt-4 no-select">
            <Row className="px-2">
                <Col className="d-inline-flex">
                    <div className="ml-auto" />
                    <PostBadges
                        order={apps.length}
                        game_status={game_status} />
                </Col>
            </Row>
            <Row className="pt-2">
                <Loader dep={game_status.status === "signups_open" && isUmpire}>
                    <Col xs={6} md={4} lg={3} xl={2} className="p-2">
                        <SignupCard
                            post={post}
                            useGame={useGame} />
                    </Col>
                </Loader>
                <ListApps
                    apps={apps}
                    game_status={game_status}
                    useGame={useGame} />
            </Row>
        </div>
    );
}

const ListApps = ({ apps, game_status, useGame }) => (
    apps.map((app, index) => (
        <Col xs={6} md={4} lg={3} xl={2} className="p-2" key={app.pk}>
            <UmpireCard
                app={app}
                order={index}
                game_status={game_status}
                useGame={useGame} />
        </Col>
    ))
)

const PostBadges = ({ game_status, order }) => (
    game_status.status === "signups_open" ?
        <Badge variant="success">
            {`Open for ${order === 0 ? "CAST" : "BACKUP"}`}
        </Badge>
        : statusBadges(game_status)
)