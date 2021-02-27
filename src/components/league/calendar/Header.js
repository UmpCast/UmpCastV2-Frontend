import React from "react"
import { Link } from "react-router-dom"

import Loader from "common/components"
import useUser from "common/hooks"

import SyncButton from "./SyncButton"
import AddGameButton from "./AddGameButton"

import { Nav, Button } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function CalendarHeader(props) {
    const { user } = useUser()

    const isManager = user.account_type === "manager"

    const { week_start, handleGames, handleNewGame, league } = props

    const last_week = week_start.add(-7, "day")
    const next_week = week_start.add(7, "day")

    const base_path = `/league/${league.pk}/calendar`

    return (
        <div className="row bg-light border-bottom ump-calendar-title">
            <div className="my-2 my-lg-3 mx-3 d-inline-flex w-100">
                <Nav.Link
                    as={Link}
                    to={`/league/${league.pk}/`}
                    className="ump-absolute-md ml-3 py-0 align-self-center"
                >
                    <h3 className="mb-0">
                        <strong>{league.title}</strong>
                    </h3>
                </Nav.Link>
                <div className="mx-auto">
                    <div className="d-inline-flex">
                        <ArrowButton
                            dir="left"
                            path={base_path}
                            week={last_week}
                            handleGames={handleGames}
                        />

                        <WeekRange {...{ week_start }} />

                        <ArrowButton
                            dir="right"
                            path={base_path}
                            week={next_week}
                            handleGames={handleGames}
                        />
                    </div>
                </div>

                <Loader dep={isManager}>
                    <div className="ump-absolute-md ump-absolute-right mr-3 d-none d-md-block">
                        {league.api_key !== "" ? (
                            <SyncButton
                                week_start={week_start}
                                league={league}
                                user={user}
                                handleGames={handleGames}
                            />
                        ) : null}
                        <AddGameButton
                            league={league}
                            handleNewGame={handleNewGame}
                        />
                    </div>
                </Loader>
            </div>
        </div>
    )
}

const ArrowButton = ({ dir, path, week, handleGames }) => (
    <Button
        as={Link}
        to={`${path}/${week.format("M-D-YYYY")}/`}
        onClick={() => handleGames(week)}
        className="p-0 bg-light border-0 mb-1 my-auto"
    >
        <FontAwesomeIcon
            className="text-primary fa-lg"
            icon={["fas", `chevron-${dir}`]}
        />
    </Button>
)

const WeekRange = ({ week_start }) => {
    const week_end = week_start.endOf("week")

    const range =
        week_start.format("MMM D") +
        " - " +
        week_end.format(week_start.month() === week_end.month() ? "D" : "MMM D")

    return (
        <h3 className="mx-3 my-auto">
            <strong className="mr-2">{range}</strong>
            {week_start.year()}
        </h3>
    )
}
