import React from 'react'
import dayjs from "dayjs"

import { Card } from "react-bootstrap"

export default function Message({ msg }) {

    const {
        subject,
        message,
        notification_date_time
    } = msg

    const relative_date = dayjs(notification_date_time).fromNow()

    return (
        <Card className="mb-3">
            <Card.Header>
                {relative_date}
            </Card.Header>
            <Card.Body>
                <h4 className="card-title">{subject}</h4>
                <p className="card-text">{message}</p>
            </Card.Body>
        </Card>
    )
}
