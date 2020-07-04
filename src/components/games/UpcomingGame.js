import React from "react";

const UpcomingGame = (props) => (
    <a href="/"
       className="list-group-item list-group-item-action">
        <div className="d-flex w-100 justify-content-between">
            <h5 className="mb-1 float-left">{props.title}</h5>
            <div className="flex-grow-0 flex-shrink-0">
                <small className="text-muted">{props.start_time} - {props.end_time}</small>
            </div>
        </div>
        <div className="d-flex w-100 justify-content-between">
            <p className="text-uppercase mb-0">{props.division} {props.role}</p>
            {statusTip(props.status)}
        </div>
    </a>
)

const statusTip = (status) => {
    switch(status) {
        case 'casted':
            return <small className="bg-success text-white p-1 text-uppercase"
                          data-tip="Be on-time!">casted</small>
        case 'backup':
            return <small className="bg-warning text-white p-1 text-uppercase"
                          data-tip="You're a backup">backup</small>
        case 'canceled':
            return <small className="bg-danger text-white p-1 text-uppercase"
                          data-tip="Game is canceled" style={{'pointer-events': 'auto'}}>cancel</small>
        default:
            return 'foo';
    }
}

export default UpcomingGame