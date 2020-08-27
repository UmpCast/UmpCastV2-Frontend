import React from "react"

export default function FullGame(props) {

    const { date, time_start, time_end, title, division, role, location, cast } = props

    return (
        <div className="d-flex justify-content-between">
            <div className="d-flex flex-column card-title">
                <h4 className="mb-auto">
                    {date} · {title}
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
            <div className="d-flex flex-column text-right card-title flex-shrink-0">
                <h5 className="mb-auto"><small><strong>{time_start} - {time_end}</strong></small></h5>
                <div>
                    <h5 className="mb-2">
                        <strong>Casted:</strong>
                    </h5>
                    <div className="row mx-auto float-right">
                    </div>
                </div>
            </div>
        </div>
    )
}