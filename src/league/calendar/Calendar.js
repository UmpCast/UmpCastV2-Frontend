import React, { Fragment } from "react"

import Header from "./CalendarHeader"
import Body from "./Week"

export default function Calendar() {
    return (
        <Fragment>
            <Header />
            <Body />
        </Fragment>
    )
}
