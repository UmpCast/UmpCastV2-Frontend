import React from "react"
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// import {
//     faBan,
//     faCheckCircle,
//     faSortDown
// } from "@fortawesome/free-solid-svg-icons"
// import { Dropdown } from "react-bootstrap"

export const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <p
        ref={ref}
        onClick={(e) => {
            e.preventDefault()
            onClick(e)
        }}
        className="mb-0 text-muted"
    >
        {children}
    </p>
))

const HistoryHeader = (props) => (
    <h6 className="d-inline card-header border p-3">
        History
        {/* <strong>
            <span className="mr-3 text-success">
                <FontAwesomeIcon className="mr-2" icon={faCheckCircle}/>
                {props.completed} Completed
            </span>
            <span className="text-muted">
                <FontAwesomeIcon className="mr-2" icon={faBan}/>
                {props.canceled} Canceled
            </span>
        </strong>
        <Dropdown className="float-right">
            <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                <strong className="mr-1 cursor-pointer">
                    <span className="mr-1">Filter</span>
                    <FontAwesomeIcon className="pb-1" icon={faSortDown}/>
                </strong>
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item href="#/action-2">Completed</Dropdown.Item>
                <Dropdown.Item href="#/action-1">Short Notice</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Canceled</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown> */}
    </h6>
)

export default HistoryHeader
