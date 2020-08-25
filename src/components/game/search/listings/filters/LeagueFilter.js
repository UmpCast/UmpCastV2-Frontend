import React from 'react'

import useUser from "common/hooks"
import { Dropdown } from "react-bootstrap"

export default function LeagueFilter(props) {

    const { useLeague } = props

    const [league, setLeague] = useLeague

    const { accepted_leagues } = useUser().user

    const curr_league = accepted_leagues.find(({pk}) =>
        pk === league
    )

    return (
        <Dropdown className="mr-auto">
            <Dropdown.Toggle
                variant="primary rounded">
                {curr_league.title}
            </Dropdown.Toggle>

            <Dropdown.Menu className="mt-2 ump-centered-dropdown-menu">
                <ListLeagues
                    leagues={accepted_leagues}
                    setLeague={setLeague} />
            </Dropdown.Menu>
        </Dropdown>
    )
}

const ListLeagues = ({ leagues, setLeague }) => (
    leagues.map(league =>
        <Dropdown.Item
            onClick={() => setLeague(league.pk)}>
            {league.title}
        </Dropdown.Item>
    )
)