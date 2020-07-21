import React from "react"
import { faBaseballBall } from "@fortawesome/free-solid-svg-icons"

import ProfileIcon from "../../account/icon/ProfileIcon";

export default function SearchGame(props) {

    const { date, time_start, time_end, title, division, role, location, cast } = props
    const formattedCast = cast.map(formatRole)

    return (
        <div className="d-inline-flex w-100">
            <div className="d-inline-flex flex-column my-auto mb-0 px-4 text-center border-right">
                <strong>Aug</strong>
                <div className="mb-0 text-primary" style={{ "fontSize": 30, "lineHeight": 1 }}>
                    <strong>10</strong>
                </div>
                <div className="text-muted">Mon</div>
            </div>
            <div className="w-100 ml-3">
                <div className="d-flex justify-content-between">
                    <div className="d-flex flex-column card-title mb-0">
                        <h4 className="mb-auto">
                            {title}
                        </h4>
                        <div className="mt-3">
                            {role ?
                                <p className="mb-0">
                                    <strong>Role: </strong><span className="text-uppercase">{division} {role}</span>
                                </p> :
                                <p className="mb-0">
                                    <strong>Division: </strong><span className="text-uppercase">{division}</span>
                                </p>
                            }
                            <p className="mb-0">
                                <strong>Location:</strong> {location}
                            </p>
                        </div>
                    </div>
                    <div className="d-flex flex-column text-right card-title flex-shrink-0 mb-0">
                        <h5 className="mb-auto"><small><strong>{time_start} - {time_end}</strong></small></h5>
                        <div>
                            <h5 className="mb-2">
                                <strong>Casted</strong>
                            </h5>
                            <div className="row mx-auto float-right">
                                {formattedCast}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const formatRole = (role) => {
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
                    border="muted"
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
                    color="muted"
                    border="muted"
                    variant="light"
                />
            </div>
        )
    }
}
