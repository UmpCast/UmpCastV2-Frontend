import React from "react";

import GameBadge from "../history/GameBadge";

import {faCheckCircle, faBan, faMedal} from "@fortawesome/free-solid-svg-icons";

const PastGame = (props) => (
    <div className="list-group-item border-top-0 pb-0">
        <div className="d-flex justify-content-between">
            <div className="d-flex flex-column card-title">
                <div className="d-inline-flex">
                    <h4 className="mb-auto mr-2">
                        <strong>
                            <a href="/" className="text-secondary">{props.title}</a>
                        </strong>
                    </h4>
                    {statusBadge(props.status)}
                </div>
                <p className="mb-0 mt-1">
                    <span className="text-uppercase text-muted">{props.division} {props.role}</span>
                </p>
            </div>
            <div className="d-flex flex-column text-right card-title flex-shrink-0">
                <h5 className="mb-auto mt-1 mr-1"><strong>{props.date}</strong></h5>
                <h5 className="mb-0 text-muted mr-1"><small>{props.start_time} - {props.end_time}</small></h5>
            </div>
        </div>
    </div>
)

const statusBadge = (status) => {
    switch (status) {
        case "completed":
            return (
                <GameBadge
                    variant="success"
                    icon={faCheckCircle}
                    title="Completed"
                    data_tip="Successfully completed game role"
                />
            )
        case "canceled":
            return (
                <GameBadge
                    variant="danger"
                    icon={faBan}
                    title="Canceled"
                    data_tip="Umpire canceled their commitment"
                />
            )
        case "short_notice":
            return (
                <GameBadge
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