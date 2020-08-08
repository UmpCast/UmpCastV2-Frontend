import React from "react";

import CalendarDay from "./Day"

export default function Week(props) {

    const {week_start} = props

    const formatted_week = []
    for (let i = 0; i < 7; i ++ ){
        const date = week_start.add(i, "day")
        formatted_week.push(<CalendarDay date={date} key={i}/>)
    }

    return (
        <div className="row mt-4 mx-3">
            {formatted_week}
        </div>
    )
}