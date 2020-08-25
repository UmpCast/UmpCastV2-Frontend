import React, { Fragment } from 'react'

import useUser from "common/hooks"

import { Row, Col } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    JoinRequestPending,
    JoinRequestAccepted,
    JoinRequestRejected
} from 'components/league/settings/Text'

export default function StatusCard({ status }) {

    const { account_type } = useUser().user

    switch (status.request_status) {
        case ("pending"):
            return cardSkeleton(
                ['far', 'paper-plane'],
                "Join Request Sent",
                <JoinRequestPending />
            )
        case ("accepted"):
            return cardSkeleton(
                "check",
                "Join Request Accepted",
                <JoinRequestAccepted
                    account_type={account_type} />
            )
        case ("rejected"):
            return cardSkeleton(
                "lock",
                "Join Request Rejected",
                <JoinRequestRejected />
            )
        default:
            return null
    }
}

const cardSkeleton = (icon, title, text) => (
    <Fragment>
        <FontAwesomeIcon
            icon={icon}
            className="fa-7x text-primary mb-3" />
        <br />
        <h4
            className="font-weight-strong"
            style={{ "lineHeight": 1.7 }}>
            {title}
        </h4>
        <Row>
            <Col xs={8} className="mx-auto my-2">
                {text}
            </Col>
        </Row>
    </Fragment>
)