import React from "react"

import Feed from "./feed/Feed"
import History from "./history/History"
import Visibility from "./visibility/Visibility"
import Upcoming from "./upcoming/Upcoming"

import { Container, Row, Col, Tabs, Tab } from "react-bootstrap"

export default function Dashboard() {

    return (
        <Container fluid={"lg"} className="mt-4">
            <Row>
                <Col className="order-xs-last mt-3">
                    <Tabs defaultActiveKey="visibility">
                        <Tab eventKey="feed" title="Feed">
                            <Feed />
                        </Tab>
                        <Tab eventKey="history" title="History">
                            <History />
                        </Tab>
                        <Tab eventKey="visibility" title="Visibility">
                            <Visibility />
                        </Tab>
                    </Tabs>
                </Col>
                <Col
                    xs={{ span: 12, order: "first" }}
                    md={{ span: 5, order: "last" }}
                    lg={4}
                    className="pr-xl-3 mt-3">
                    <Upcoming />
                </Col>
            </Row>
        </Container>
    )
}