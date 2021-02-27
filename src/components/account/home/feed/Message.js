import React from "react";
import dayjs from "dayjs"
import relativeTime from 'dayjs/plugin/relativeTime'

import Loader, { ProfilePicture } from "common/components"

import umpcastLogo from "assets/umpcast.png"

import { Row, Col, Card } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import darkMeteor from "assets/dark_meteor.png"

dayjs.extend(relativeTime)

export default function Message({ msg }) {

    const {
        subject,
        message,
        notification_date_time
    } = msg
    
    const relative_date = dayjs(notification_date_time).fromNow()
    const messageIcon = MessageIcon(msg)

    return (
        <Row className="mx-auto mb-4">
            <Loader dep={messageIcon !== null}>
                <Col xs={1} className="px-0 d-flex">
                    {messageIcon}
                </Col>
            </Loader>
            <Col>
                <Card variant="bg-light">
                    <Card.Header className="d-flex justify-content-between">
                        <MessageOrigin msg={msg} />
                        <div className="text-muted">
                            {relative_date}
                        </div>
                    </Card.Header>
                    <Card.Body>
                        <h4 className="card-title">{subject}</h4>
                        <p className="card-text">{message}</p>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
}

const MessageIcon = ( msg ) => {
    const { scope, related_object } = msg

    switch (scope) {
        case ("ump-cast"):
            return (
                <ProfilePicture
                    src={umpcastLogo}
                    size={30}
                    className="rounded border border-muted mx-auto" />
            )
        case ("league"):
            return (
                <ProfilePicture
                    src={related_object.league_picture}
                    alt={darkMeteor}
                    size={30}
                    className="rounded border border-muted mx-auto" />
            )
        default:
            return null
    }
}

const MessageOrigin = ({ msg }) => {
    const { scope, related_object } = msg

    const bell = (
        <FontAwesomeIcon
            icon="bell"
            className="mr-2" />
    )

    const [title, link] = (() => {
        switch (scope) {
            case ("ump-cast"):
                return [
                    "UmpCast Official",
                    null
                ]
            case ("league"):
                return [
                    related_object.title,
                    null
                ]
            case ("game"):
                return [
                    <span>{bell} Games</span>,
                    `game/${related_object.pk}/`
                ]
            case ("application"):
                return [
                    <span>{bell} Casts</span>,
                    `game/${related_object.game}`
                ]
            default:
                return [null, null]
        }
    })()

    return (
        <a className="mr-auto" href={link}>
            <strong>
                {title}
            </strong>
        </a>
    )
}