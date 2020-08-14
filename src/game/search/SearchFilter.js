import React from 'react'
import { DateRange } from 'react-date-range';

import { Dropdown } from "react-bootstrap"

export default function SearchFilter() {

    const handleSelect = (date)=>{
        console.log(date); 
      }

    return (
        <div className="my-auto d-inline-flex">
            <Dropdown>
                <Dropdown.Toggle
                    variant="light"
                    className="rounded-pill bg-light text-muted py-1 debug mx-1"
                    id="dropdown-basic"
                    style={{ "border": "1px solid #E2E4E8", "lineHeight": 1.7 }}
                >
                    All Days
            </Dropdown.Toggle>

                <Dropdown.Menu className="mt-2">
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <Dropdown>
                <Dropdown.Toggle
                    variant="light"
                    className="rounded-pill bg-light text-muted py-1 debug mx-1"
                    id="dropdown-basic"
                    style={{ "border": "1px solid #E2E4E8", "lineHeight": 1.7 }}
                >
                    All Dates
            </Dropdown.Toggle>

                <Dropdown.Menu className="mt-2">
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <Dropdown>
                <Dropdown.Toggle
                    variant="light"
                    className="rounded-pill bg-light text-muted py-1 debug mx-1"
                    id="dropdown-basic"
                    style={{ "border": "1px solid #E2E4E8", "lineHeight": 1.7 }}
                >
                    All Divisions
            </Dropdown.Toggle>

                <Dropdown.Menu className="mt-2">
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <Dropdown>
                <Dropdown.Toggle
                    alignRight
                    variant="light"
                    className="rounded-pill bg-light text-muted py-1 debug mx-1"
                    id="dropdown-basic"
                    style={{ "border": "1px solid #E2E4E8", "lineHeight": 1.7 }}
                >
                    Sort by date
            </Dropdown.Toggle>

                <Dropdown.Menu className="mt-1">
                    <DateRange
                        ranges={[{
                            startDate: new Date(),
                            endDate: new Date(),
                            key: 'selection',
                          }]}
                        onChange={handleSelect}
                    />
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}
