import React from 'react'

import useUser from "common/hooks"

import { SettingsHeader, SettingsNav, ProfilePicture } from "common/components"

import { Container, Row, Col, Nav } from "react-bootstrap"
import PrimaryBaseball from "assets/primary_baseball.png"

export default function SettingsContainer(props) {

    const { user } = useUser()

    const subjects = [
        "profile",
        "security",
        "notifications",
        "leagues"
    ]

    const { active } = props

    const toPath = subject => (
        `/settings/${subject}`
    )

    return (
        <Container className="mt-4 px-5">
            <Row>
                <Col sm={3}>
                    <Nav
                        variant="pills"
                        className="flex-column ump-settings-nav">
                        <SettingsHeader
                            profilePicture={
                                <ProfilePicture
                                    src={user.profile_picture}
                                    alt={PrimaryBaseball}
                                    size={25}
                                    className="rounded mr-2 my-auto" />
                            }
                            title="Victor Lin"
                            footer="Personal Settings"
                        />
                        <SettingsNav
                            {...{ active, subjects, toPath }} />
                    </Nav>
                </Col>
                <Col sm={9}>
                    {props.children}
                </Col>
            </Row>
        </Container>
    )
}
