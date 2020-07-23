import React, {Fragment} from "react"

import LeagueBanner from "./LeagueBanner"

import { Container } from "react-bootstrap"

export default function SubNav(props) {
    return (
        <Fragment>
            <LeagueBanner pk={props.pk} active={props.active} />
            <div className="px-3 pt-3">
                <Container className="px-5">
                    {props.children}
                </Container>
            </div>
        </Fragment>
    )
}
