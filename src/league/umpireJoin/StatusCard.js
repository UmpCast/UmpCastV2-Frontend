import React, { Fragment } from 'react'

import useUser from "hooks"

import { Row, Col } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function StatusCard({ status }) {

    const account_type = useUser()[0].user.account_type
    
    switch (status.request_status) {
        case ("pending"):
            return cardSkeleton(
                ['far', 'paper-plane'],
                "Join Request Sent",
                "Sit tight! Your join request has been sent and will be reviewed by Palo Alto " +
                "Little League. We will let you know when they respond."
            )
        case ("rejected"):
            return cardSkeleton(
                "lock",
                "Join Request Rejected",
                "A league manager has decided to dismiss your join request. If you believe this "+
                "was a mistake, please contact a manager to reopen your request."
            )
        case ("accepted"):
            return cardSkeleton(
                "check",
                "Join Request Accepted",
                "Congratulations! You've already been accepted into this league. "
                + (account_type === "umpire" ? 
                "still waiting here for? Go signup for some games!" : "Please head to your league home page.")
            )
        default:
            return null
    }
}

const cardSkeleton = (icon, title, text) => (
    <Fragment>
        <FontAwesomeIcon icon={icon} className="fa-7x text-primary mb-3" /><br />
        <h4 style={{ "lineHeight": 1.7 }}><strong>{title}</strong></h4>
        <Row>
            <Col xs={8} className="mx-auto my-2">
               {text}
        </Col>
        </Row>
    </Fragment>
)