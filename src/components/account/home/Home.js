import React from "react"

import useUser from "common/hooks"

import Feed from "./feed/Feed"
import History from "./history/History"
import Visibility from "./visibility/Visibility"
import Upcoming from "./upcoming/Upcoming"

import { Container, Row, Col, Tabs, Tab } from "react-bootstrap"

export default function Dashboard() {
    const { user } = useUser()

    return (
        <Container fluid={"lg"} className="mt-4">
            <Row>
                <Col className="order-xs-last mt-3">
                    <Tabs defaultActiveKey="feed">
                        <Tab eventKey="feed" title="Feed">
                            <Feed />
                        </Tab>
                        {user.account_type === "umpire" ? (
                            <Tab eventKey="history" title="History">
                                <History />
                            </Tab>
                        ) : null}
                        {user.account_type === "umpire" ? (
                            <Tab eventKey="visibility" title="Visibility">
                                <Visibility />
                            </Tab>
                        ) : null}
                    </Tabs>
                </Col>
                {user.account_type === "umpire" ? (
                    <Col
                        xs={{ span: 12, order: "first" }}
                        md={{ span: 5, order: "last" }}
                        lg={4}
                        className="pr-xl-3 mt-3"
                    >
                        <Upcoming />
                    </Col>
                ) : null}
            </Row>
        </Container>
    )
}
