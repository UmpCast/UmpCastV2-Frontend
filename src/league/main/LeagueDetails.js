import React from 'react'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function LeagueDetails() {
    return (
        <div className="ml-3 d-inline-flex align-items-center">
            <FontAwesomeIcon icon={["fas", "meteor"]} className="fa-4x rounded text-white bg-dark p-2 mr-3" />
            <div className="d-flex flex-column">
                <h3 className="my-0 mr-2"><strong>Palo Alto Little League</strong></h3>
                <small className="my-0 text-muted">City-wide little league for kids age 8-14</small>
                <small>
                    <FontAwesomeIcon className="mt-1 fa-sm mr-1 text-primary" icon={['fas', 'link']} />
                    <a href="http://pabaseball.org" className="text-secondary mr-2">pabaseball.org</a>
                    <FontAwesomeIcon className="mt-1 fa-sm mr-1 text-primary" icon={['far', 'envelope']} />
                    <a className="text-secondary">umpcast@gmail.com</a>
                </small>
            </div>
        </div>
    )
}
