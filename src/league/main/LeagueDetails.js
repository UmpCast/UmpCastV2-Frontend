import React from "react"

import ManageUmpires from "./umpire/ManageUmpires"

import { Container, Tab } from "react-bootstrap"

export default function Settings() {
    return (
        <div className="px-3 pt-3">
            <Container className="px-5">
                <Tab.Content>
                    <Tab.Pane eventKey="announcements">
                    </Tab.Pane>
                    <Tab.Pane eventKey="umpires">
                        <ManageUmpires />
                    </Tab.Pane>
                </Tab.Content>
            </Container>
        </div>
    )
}
