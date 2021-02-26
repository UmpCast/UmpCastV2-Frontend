import React, { useState } from 'react'

import { useApi } from "common/hooks"

import LeagueItem from "./LeagueItem"

import { Modal, ListGroup, Form, InputGroup } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function LeagueSearch({ useShow }) {

    const Api = useApi(requests)

    const [show, setShow] = useShow
    const [timer, setTimer] = useState()
    const [leagues, setLeagues] = useState([])

    const performSearch = (e) => {
        const searchVal = e.target.value

        if (timer) clearTimeout(timer)

        setTimer(
            setTimeout(() =>
                Api.searchLeagues(searchVal)
                    .then(({ data }) =>
                        setLeagues(data)
                    )
                , 500)
        )
    }

    return (
        <Modal show={show} onHide={() => setShow(false)}>
            <ListGroup>
                <ListGroup.Item>
                    <InputGroup>
                        <Form.Control
                            type="text"
                            placeholder="Search ..."
                            className="rounded-left"
                            onChange={performSearch} />
                        <InputGroup.Append>
                            <InputGroup.Text>
                                <FontAwesomeIcon icon='search' />
                            </InputGroup.Text>
                        </InputGroup.Append>
                    </InputGroup>
                </ListGroup.Item>
                <ListLeagues
                    leagues={leagues} />
            </ListGroup>
        </Modal>
    )
}

const ListLeagues = ({ leagues }) => leagues.map(
    league =>
        <LeagueItem
            league={league}
            key={league.pk} />
)

const requests = {
    searchLeagues: (string) => [
        "api/leagues/public_search/",
        {
            params: {
                title: string
            }
        }
    ]
}