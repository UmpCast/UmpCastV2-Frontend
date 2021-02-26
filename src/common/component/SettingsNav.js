import React from "react"
import { Link } from "react-router-dom"

import { Nav } from "react-bootstrap"

const SettingsNav = ({ active, subjects, toPath }) => (
    subjects.map(subject => {

        const subject_caps = subject.charAt(0).toUpperCase() + subject.slice(1)
        const isActive = active === subject ? "active" : null
        
        return (
            <Nav.Item 
            key={subject}
            className = {subject === "umpires" ? " d-none d-lg-block" : null}>
                <Nav.Link
                    as={Link}
                    to={toPath(subject)}
                    className={`text-muted rounded-0 ump-border-top-0 ${isActive}`}
                >
                    {subject_caps}
                </Nav.Link>
            </Nav.Item>
        )
    })
)

export default SettingsNav