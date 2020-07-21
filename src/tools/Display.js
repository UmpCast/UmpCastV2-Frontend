import React from "react"

import {Nav} from "react-bootstrap"

export const FocusContainer = (props) => (
    <div className="d-flex
                    align-items-center
                    justify-content-center"
         style={{"height": "80vh"}}>
        {props.children}
    </div>
)

export const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <div ref={ref}
        onClick={(e) => {
            e.preventDefault();
            onClick(e);
        }}>
        {children}
    </div>
));

export const SettingsNavHeader = (props) => {
    return (
        <Nav.Item >
            <Nav.Link eventKey="disabled" className="bg-light text-secondary border ump-border-rounded-top disabled">
                <div className="d-inline-flex justify-content-center">
                    <div className="d-inline-flex flex-wrap bg-secondary rounded p-1 mr-2 mt-1">
                        {props.icon}
                    </div>
                    <div className="my-auto d-flex flex-column">
                        <div className="my-auto flex-shrink-0">
                            <p className="mb-0"><strong>{props.title}</strong></p>
                        </div>
                        <small className="text-muted" style={{ "lineHeight": .5 }}>{props.footer}</small>
                    </div>
                </div>
            </Nav.Link>
        </Nav.Item >
    )
}

export const formatSettingsNavs = subjects => {
    return subjects.map(subject => {
        const subject_caps = subject.charAt(0).toUpperCase() + subject.slice(1)
        return (
            <Nav.Item>
                <Nav.Link key={subject} eventKey={subject} className="text-muted rounded-0 ump-border-top-0">
                    {subject_caps}
                </Nav.Link>
            </Nav.Item>
        )
    })
}

export const SettingsHeader = props => {
    return (
        <div>
            <h3><strong>{props.title}</strong></h3>
            <hr class="my-3"/>
        </div>
    )
}