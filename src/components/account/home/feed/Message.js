import React from "react";
import dayjs from "dayjs"
import relativeTime from 'dayjs/plugin/relativeTime'

import Loader, { ProfilePicture } from "common/components"

import umpcastLogo from "assets/umpcast.png"

import { Row, Col, Card } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

dayjs.extend(relativeTime)

export default function Message({ msg, noIcon }) {

    const {
        subject,
        message,
        notification_date_time
    } = msg

    const relative_date = dayjs(notification_date_time).fromNow()

    return (
        <Row className="mx-auto mb-4">
            <Loader dep={!noIcon}>
                <Col xs={1} className="px-0 d-flex">
                    <MessageIcon msg={msg} />
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

const MessageIcon = ({ msg }) => {
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
                    <span>{bell} Game Changes</span>,
                    `game/${related_object.pk}/`
                ]
            case ("application"):
                return [
                    <span>{bell}Cast Changes</span>,
                    `game/${related_object.game}`
                ]
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