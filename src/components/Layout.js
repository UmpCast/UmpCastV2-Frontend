import React from "react"
import {Container} from 'react-bootstrap'

export const Layout = (props) => (
    <Container fluid className="d-flex align-items-center justify-content-center" style={{"height": "80vh"}}>
        {props.children}
    </Container>
)
