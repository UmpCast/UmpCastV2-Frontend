import React from "react";

export default function Message(props) {
    return (
        <div className="row mx-auto">
            <div className="col-1 px-0 text-center">
                {props.profileIcon}
            </div>
            <div className="col-11">
                <div className="card bg-light">
                    <div className="card-header">
                        <strong className="mr-1">{props.sender}</strong>
                        <span className="text-muted">delivered {props.date}</span>
                        {props.messageIcon}
                    </div>
                    <div className="card-body">
                        <h4 className="card-title">{props.subject}</h4>
                        <p className="card-text">{props.body}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}