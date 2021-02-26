import React from 'react'

import { ProfilePicture } from "common/components"

import {Card } from "react-bootstrap"
import darkMeteor from "assets/dark_meteor.png"

export default function LeagueVis({status, children}) {
    const { league } = status

    return (
        <Card className="mt-3">
            <Card.Header className="px-3 pb-1">
                <div className="d-inline-flex">
                    <ProfilePicture
                        className="rounded border border-muted mx-auto"
                        src={league.league_picture}
                        alt={darkMeteor}
                        size={25} />
                    <Card.Title className="ml-2 mb-0">
                        <strong>{league.title}</strong>
                    </Card.Title>
                </div>
            </Card.Header>
            <Card.Body className="pb-1">
                {children}
            </Card.Body>
        </Card>
    )
}
