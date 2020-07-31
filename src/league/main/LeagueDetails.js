import React from 'react'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function LeagueDetails(props) {

    if (!props.league) {
        return (
            <div className="ml-3 d-inline-flex align-items-center">
                <FontAwesomeIcon icon={["fas", "meteor"]} className="fa-4x rounded text-white bg-dark p-2 my-1 mr-3" />
            </div>
        )
    }

    const { title, description, email, website_url } = props.league

    return (
        <div className="ml-3 d-inline-flex align-items-center">
            <FontAwesomeIcon icon={["fas", "meteor"]} className="fa-4x rounded text-white bg-dark p-2 my-1 mr-3" />
            <div className="d-flex flex-column h-100">
                <h3 className="mb-auto mr-2"><strong>{title}</strong></h3>
                <small className="my-0 text-muted">{description}</small>
                <small>
                    <FontAwesomeIcon className="mt-1 fa-sm mr-1 text-primary" icon={['fas', 'link']} />
                    <a href={`http://${website_url}/`} className="text-secondary mr-2">{website_url}</a>
                    <FontAwesomeIcon className="mt-1 fa-sm mr-1 text-primary" icon={['far', 'envelope']} />
                    <a href="#!" className="text-secondary">{email}</a>
                </small>
            </div>
        </div>
    )
}
