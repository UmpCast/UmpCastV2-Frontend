import React from "react"

import useUser, { useApi, useMountEffect } from "common/hooks"

import Feed from "./feed/Feed"
import Upcoming from "./upcoming/Upcoming"
import History from "./history/History"

import { Container, Row, Col, Tabs, Tab } from "react-bootstrap"

export default function Dashboard() {

    return (
        <Container fluid={"lg"} className="mt-4">
            <Row>
                <Col className="mt-3">
                    <Tabs defaultActiveKey="feed" id="uncontrolled-tab-example">
                        <Tab eventKey="feed" title="Feed">
                            <Feed />
                        </Tab>
                        <Tab eventKey="history" title="History">
                            <History />
                        </Tab>
                        <Tab eventKey="visibility" title="Visibility">

                        </Tab>
                    </Tabs>
                </Col>
                <Col xs={12} md={5} lg={4} className="pr-xl-3 mt-3">
                    <Upcoming />
                </Col>
            </Row>
        </Container>
    )
}