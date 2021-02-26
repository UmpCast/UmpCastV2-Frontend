import React from 'react'
import { Link } from "react-router-dom"

import { ProfilePicture } from "common/components"

import { ListGroup } from "react-bootstrap"
import darkMeteor from "assets/dark_meteor.png"

export default function LeagueItem({ league, children }) {
    return (
        <ListGroup.Item className="p-3 pt-4">
            <div className="d-inline-flex justify-content-between w-100">
                <div className="d-flex align-middle">
                    <ProfilePicture
                        src={league.league_picture}
                        alt={darkMeteor}
                        size={25}
                        className="rounded mr-3" />
                    <Link
                        to={`/league/${league.pk}`}
                        className="font-weight-strong">
                        {league.title}
                    </Link>
                </div>
                {children}
            </div>
        </ListGroup.Item>
    )
}
