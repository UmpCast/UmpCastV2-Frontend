import React from "react"

import { CustomToggle } from "../../game/history/HistoryHeader"

import { Button, Dropdown, Pagination } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function CalendarHeader() {
    return (
        <div className="row bg-light border-bottom ump-calendar-title">
            <div className="mt-3 mb-2 mx-3 d-inline-flex w-100">
                <h3 className="ump-absolute-md ml-3"><strong>League Calendar</strong></h3>
                <div className="mx-auto">
                    <div className="d-inline-flex">
                        <Button className="p-0 bg-light border-0 mb-1">
                            <FontAwesomeIcon className="text-primary fa-lg" icon={["fas", "chevron-left"]} />
                        </Button>
                        <h3 className="mx-3"><strong>Aug 9 — 15</strong> 2020</h3>
                        <Button className="p-0 bg-light border-0 mb-1">
                            <FontAwesomeIcon className="text-primary fa-lg" icon={["fas", "chevron-right"]} />
                        </Button>
                    </div>
                </div>
                <Pagination size="sm" className="d-none d-xl-block mt-1 mb-0 ump-absolute-md ump-absolute-right mr-3">
                    <div className="d-inline-flex">
                        <Pagination.Item active>
                            Palo Alto
                        </Pagination.Item>
                        <Pagination.Item>
                            Saratoga
                        </Pagination.Item>
                    </div>
                </Pagination>
                <Dropdown className="d-xl-none mt-md-1">
                    <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                        <span className="cursor-pointer d-inline-flex">
                            <span className="mr-1">Leagues</span>
                            <FontAwesomeIcon className="fa-1x" icon={["fas", "sort-down"]} />
                        </span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-2">Completed</Dropdown.Item>
                        <Dropdown.Item href="#/action-1">Short Notice</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Canceled</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </div>
    )
}
