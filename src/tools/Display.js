import React, {useState, useEffect, useContext} from 'react'
import { Link } from "react-router-dom"

import UserContext from "UserContext"

import { Nav, Alert } from "react-bootstrap"

export const FocusContainer = (props) => (
    <div className="d-flex
                    align-items-center
                    justify-content-center"
        style={{ "height": "80vh" }}>
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

    const { icon, title, footer } = props
    return (
        <Nav.Item >
            <Nav.Link eventKey="disabled" className="bg-light text-secondary border ump-border-rounded-top disabled">
                <div className="d-inline-flex justify-content-center">
                    {icon && <div className="d-inline-flex flex-wrap bg-secondary rounded p-1 mr-2 mt-1">{icon}</div>}
                    <div className="my-auto d-flex flex-column">
                        <div className="my-auto flex-shrink-0">
                            <p className="mb-0"><strong>{title}</strong></p>
                        </div>
                        {footer && <small className="text-muted" style={{ "lineHeight": .5 }} >{footer}</small>}
                    </div>
                </div>
            </Nav.Link>
        </Nav.Item >
    )
}

export const formatSettingsNavs = (active, subjects, toPath) => {
    return subjects.map(subject => {
        const subject_caps = subject.charAt(0).toUpperCase() + subject.slice(1)
        return (
            <Nav.Item key={subject}>
                <Nav.Link
                    as={Link}
                    to={toPath(subject)}
                    className={`text-muted rounded-0 ump-border-top-0 ${active === subject ? "active" : null}`}
                >
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
            <hr className="my-3" />
        </div>
    )
}

export const MyAlert = props => {
    
    const [User, setUser] = useContext(UserContext)

    const [show, setShow] = useState(true)

    useEffect( () => { 
        setTimeout( () => setShow(false), props.delay ? props.delay : 3000 )
    })

    useEffect( () => {
        if (!show) {
            setUser({...User, alert: null})
        }
    })

    return (
        <Alert {...props} show={show} onClose={() => setShow(false)} dismissible>
            {props.children}
        </Alert>
    )
}