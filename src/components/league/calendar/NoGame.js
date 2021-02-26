import React from "react"
import dayjs from "dayjs"

import { Card } from "react-bootstrap"

export default function NoGame({date, children}) {
    const day_over = dayjs(date).endOf("day") < dayjs()

    const style = {opacity: day_over ? .75 : 1}

    return (
        <Card className="mb-2 mx-0 w-100" bg="light" style={style}>
            <Card.Body className="p-2">
                <Card.Text
                    className="mb-0 text-muted text-center">
                    {children}
                    </Card.Text>
            </Card.Body>
        </Card>
    )
}
