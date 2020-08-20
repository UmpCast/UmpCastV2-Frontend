import React from "react"

import { Badge } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function statusBadges(game_status) {
    switch (game_status.status) {
        case ("signups_not_open"):
            const { days_before_signup } = game_status
            return (
                <ExpiredBadge
                    reason={`Signups open in ${days_before_signup}d`} />
            )
        case ("scheduled"):
            const { role, order, cancel_expired } = game_status
            const role_status =
                "YOU - " + (order === 0 ? "CASTED" : "BACKUP") + " " + role.toUpperCase()

            return (
                <div className="d-inline-flex">
                    <StatusBadge
                        status={role_status} />
                    <CancelBadge
                        expired={cancel_expired}
                        className="ml-2" />
                </div>
            )
        case ("game_over"):
            return <ExpiredBadge reason="Game is Over" />
        default:
            return null
    }
}

const ExpiredBadge = ({ reason, ...props }) => (
    <Badge
        variant="secondary my-auto px-2 py-1"
        style={{ background: "#DADADA" }}
        {...props}>
        {reason}
        <FontAwesomeIcon
            icon="clock"
            className="ml-2 my-auto"
            style={{ marginBottom: "2px" }} />
    </Badge>
)

const StatusBadge = ({ status, ...props }) => (
    <Badge variant="primary my-auto px-2 py-1" {...props}>
        {status}
        <FontAwesomeIcon
            icon={["far", "calendar-check"]}
            className="ml-2 my-auto"
            style={{ marginBottom: "2px" }} />
    </Badge>
)

const CancelBadge = ({ expired, ...props }) => (
    <Badge variant="danger my-auto px-2 py-1" {...props}>
        {expired ? "Cancellation Expired" : "Cancellations Enabled"}
        <FontAwesomeIcon
            icon="ban"
            className="ml-1 my-auto"
            style={{ marginBottom: "2px" }} />
    </Badge>
)