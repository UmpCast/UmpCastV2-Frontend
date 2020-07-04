import React from "react";

const GameBanner = (props) => (
    <div className="row">
        <div className="col">
            <div className="jumbotron pb-2 pt-3 pt-lg-4">
                <div className="d-flex justify-content-between">
                    <h1 className="pt-2"><strong>{props.title}</strong></h1>
                    <div>
                        <h2 className="flex-shrink-0">
                            <span className="badge btn rounded text-white btn-primary">{props.location}</span>
                        </h2>
                    </div>
                </div>
                <h2 className="text-primary"><strong>{props.date}</strong>
                    <span className="text-secondary">·</span> {props.start_time} - {props.end_time}</h2>
                <hr className="mt-2 mb-2 mb-lg-3 mt-lg-3"/>
                <h5 className="text-muted">
                    <span className="mr-3"><strong>Division:</strong> {props.division} </span>
                    <span className="mr-3"><strong>Comments:</strong> {props.comments ? props.comments : "None"} </span>
                </h5>
            </div>
        </div>
    </div>
)

export default GameBanner