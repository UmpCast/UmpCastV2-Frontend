import React from "react"

import ProfileIcon from "../../account/icon/ProfileIcon"

import { Card } from "react-bootstrap"


const statusColor = (props) => {
    if (props.casted === props.roles) {
        return "dark"
    } else if (props.casted === 0) {
        return "primary"
    } else {
        return "light"
    }
}

export default function CalendarGame(props){

    let castPreview = []

    const bg_color = statusColor(props)

    for (let i = 0; i < props.casted; i++) {
        castPreview.push(
            <ProfileIcon icon={["fas", "user-alt"]}
                variant="light" padding="p-1" color="muted" custom={`rounded-circle mb-2 mr-2 border-${bg_color} border`} />
        )
    }

    for (let i = 0; i < props.roles - props.casted; i++) {
        castPreview.push(
            <ProfileIcon icon={["fas", "user-alt"]}
                variant="light" padding="p-1" color="muted" custom="border-custom mb-2 mr-2 rounded-circle fa-sm" />
        )
    }

    return (
        <Card className="mb-2 mx-0 w-100">
            <Card.Header className={`bg-${bg_color} p-2 pl-3 text-${bg_color === "light" ? "secondary" : "white"}`}>
                {props.start_time} - {props.end_time}
                <span className="float-right"><strong>{props.casted}/{props.roles}</strong></span>
            </Card.Header>
            <Card.Body className="pb-2 px-3 pt-3">
                <Card.Title className="mb-0">
                    <h6><strong><a href="#/game/1/" className="text-secondary">{props.title}</a></strong></h6>
                </Card.Title>
                <div><small className="text-muted">{props.division} · {props.location}</small></div>
                <div className="mt-2">
                    {castPreview}
                </div>
            </Card.Body>
        </Card>
    )
}