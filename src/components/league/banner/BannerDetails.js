import React from 'react'

import Loader, { ProfilePicture } from "common/components"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import darkMeteor from "assets/dark_meteor.png"

export default function LeagueDetails(props) {

    const { title, description, email, website_url, league_picture } = props.league

    return (
        <div className="ml-3 d-inline-flex align-items-center">
            <ProfilePicture
                src={league_picture}
                alt={darkMeteor}
                size={60}
                className="rounded mr-3 my-auto" />
            <div className="d-flex flex-column h-100">
                <h3 className="mb-auto mr-2">
                    <strong>
                        {title}
                    </strong>
                </h3>
                <small className="my-0 text-muted">
                    {description}
                </small>
                <small>
                    <Loader dep={website_url}>
                        <FontAwesomeIcon
                            className="mt-1 fa-sm mr-1 text-primary"
                            icon={['fas', 'link']} />
                        <a
                            href={`http://${website_url}/`}
                            className="text-secondary mr-2">
                            {website_url}
                        </a>
                    </Loader>
                    <Loader dep={email}>
                        <FontAwesomeIcon
                            className="mt-1 fa-sm mr-1 text-primary"
                            icon={['far', 'envelope']} />
                        <a
                            href="#!"
                            className="text-secondary">
                            {email}
                        </a>
                    </Loader>
                </small>
            </div>
        </div>
    )
}
