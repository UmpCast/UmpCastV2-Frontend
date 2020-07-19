import React from "react"
import { faBaseballBall } from "@fortawesome/free-solid-svg-icons"

import ProfileIcon from "../../account/icon/ProfileIcon";
import "./styles/game.css"

export default function FullGame(props) {

    const { date, time_start, time_end, title, division, role, location, cast } = props
    const formattedCast = cast.map(formatRole)

    return (
        <div className="d-flex justify-content-between">
            <div className="d-flex flex-column card-title">
                <h4 className="mb-auto">
                    {date} · {title}
                </h4>
                <div className="mt-3">
                    <p className="mb-0">
                        <strong>Role: </strong><span className="text-uppercase">{division} {role}</span>
                    </p>
                    <p className="mb-0">
                        <strong>Location:</strong> {location}
                    </p>
                </div>
            </div>
            <div className="d-flex flex-column text-right card-title flex-shrink-0">
                <h5 className="mb-auto"><small><strong>{time_start} - {time_end}</strong></small></h5>
                <div>
                    <h5 className="mb-2">
                        <strong>Casted:</strong>
                    </h5>
                    <div className="row mx-auto float-right">
                        {formattedCast}
                    </div>
                </div>
            </div>
        </div>
    )
}

const formatRole = (role) => {
    if (role.first_name != null) {
        let tip = `${role.role}: ${role.first_name} ${role.last_name[0]}.`
        return (
            <div className="col-auto text-right p-0 ml-1"
                data-tip={tip}
                key={role.role}>
                <ProfileIcon
                    icon={faBaseballBall}
                    rotation={30}
                    padding="p-1"
                    border="light"
                    variant="primary"
                />
            </div>
        )
    } else {
        let tip = `${role.role}: Open`
        return (
            <div className="col-auto text-right p-0 ml-1"
                data-tip={tip}
                key={role.role}>
                <ProfileIcon
                    icon={faBaseballBall}
                    rotation={30}
                    padding="p-1"
                    border="light border-custom"
                    variant="secondary"
                />
            </div>
        )
    }
}