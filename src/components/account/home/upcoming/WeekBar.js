import React from "react";

import { ListGroup } from "react-bootstrap"
const WeekBar = ({ week_start }) => {

    const week_end = week_start.endOf("week")

    const week_range = week_start.format("MMM D") + " - " +
        week_end.format(
            week_start.month() === week_end.month() ?
                "D" : "MMM D"
        )

    return (
        <ListGroup.Item
            className="bg-dark text-white text-center p-0">
            <p className="mb-0 text-uppercase">
                {week_range}
            </p>
        </ListGroup.Item>
    )
}

export default WeekBar