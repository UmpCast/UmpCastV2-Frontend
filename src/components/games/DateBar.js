import React from "react";

const DateBar = (props) => (
    <div className="list-group-item list-group-item-action flex-column text-center p-0 bg-dark text-white">
        <p className="mb-0 text-uppercase">{props.date}</p>
    </div>
)

export default DateBar