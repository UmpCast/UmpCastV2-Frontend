import React from "react"
import dayjs from "dayjs"
import AppStatus from "./AppStatus"

import {
    faCheckCircle,
    faBan,
    faMedal
} from "@fortawesome/free-solid-svg-icons"

const PastGame = ({ msg }) => {
    return (
        <div className="list-group-item border-top-0 pb-0">
            <div className="d-flex flex-column">
                <div className="d-inline-flex justify-content-between">
                    <div className="d-inline-flex">
                        <h4 className="mb-auto mr-2 pb-1">
                            <strong className="mr-2">
                                <a href="/" className="text-secondary">
                                    {msg.title}
                                </a>
                            </strong>
                        </h4>
                    </div>
                    <h5 className="mb-auto flex-shrink-0">
                        <small className="text-muted mr-1">
                            {dayjs(msg.date_time).format("h:m A")} ·
                        </small>
                        <strong className="">{dayjs(msg.date_time).format("MMM D")}</strong>
                    </h5>
                </div>
                <div className="d-inline-flex text-right card-title">
                    <p className="mb-0 mt-1 mr-auto">
                        <span className="text-muted">
                            <span className="text-uppercase mr-1">
                                {msg.division}:
                            </span>
                            {msg.role}
                        </span>
                    </p>
                    <h5 className="mb-0 text-muted">
                        {statusBadge(msg.status)}
                    </h5>
                </div>
            </div>
        </div>
    )
}

const statusBadge = (status) => {
    switch (status) {
        case "completed":
            return (
                <AppStatus
                    variant="success"
                    icon={faCheckCircle}
                    title="Completed"
                    data_tip="Successfully completed game role"
                />
            )
        case "canceled":
            return (
                <AppStatus
                    variant="danger"
                    icon={faBan}
                    title="Canceled"
                    data_tip="Umpire canceled their commitment"
                />
            )
        case "short_notice":
            return (
                <AppStatus
                    variant="info"
                    icon={faMedal}
                    title="Short Notice"
                    data_tip="Completed role with <2 days notice"
                />
            )
        default:
            return null
    }
}

export default PastGame
