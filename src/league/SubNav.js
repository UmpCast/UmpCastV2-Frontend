import React, {Fragment} from "react"

import LeagueBanner from "./LeagueBanner"

import { Container } from "react-bootstrap"

export default function SubNav(props) {

    const {pk, active, league, children} = props
    return (
        <Fragment>
            <LeagueBanner pk={pk} active={active} league={league}/>
            <div className="px-3 pt-3">
                <Container className="px-5">
                    {children}
                </Container>
            </div>
        </Fragment>
    )
}
