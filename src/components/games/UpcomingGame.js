import React from "react";

const UpcomingGame = () => (
    <a href="/"
       className="list-group-item list-group-item-action">
        <div className="d-flex w-100 justify-content-between">
            <h5 className="mb-1 float-left">Agile vs. Stanford</h5>
            <div className="flex-grow-0 flex-shrink-0">
                <small className="text-muted">9AM - 11AM</small>
            </div>
        </div>
        <div className="d-flex w-100 justify-content-between">
            <p className="text-uppercase mb-0">Majors Plate</p>
            <small className="bg-success text-white p-1 text-uppercase"
                   data-tip="Be on-time!">casted</small>
        </div>
    </a>
)

export default UpcomingGame