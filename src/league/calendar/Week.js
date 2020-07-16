import React from "react";

import CalendarDay from "./Day"
import weekGames from "./temp"

export default function Week() {

    const week = weekGames.map(dayGames =>
        <div className="col">
            <CalendarDay {...dayGames} />
        </div>
    )

    return (
        <div className="row mt-4 mx-3">
            {week}
        </div>
    )
}