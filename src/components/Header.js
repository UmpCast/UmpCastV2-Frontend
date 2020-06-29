import React, {Component, Fragment} from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux"
import PropTypes from 'prop-types'
import {logout} from "../actions/auth";
import {Navbar, Nav, Button} from "react-bootstrap";


class Header extends Component {
    static propTypes = {
        auth: PropTypes.object.isRequired,
        logout: PropTypes.func.isRequired
    }

    render() {
        const {isAuthenticated, user} = this.props.auth

        const authLinks = (
            <Nav>
                <Navbar.Text className="mr-3">
                    <strong>
                        {user ? `Welcome ${user.username}` : ''}
                    </strong>
                </Navbar.Text>
                <Button onClick={this.props.logout} className="nav-link btn btn-sm btn-info text-light">
                    Logout
                </Button>
            </Nav>
        )

        const guestLinks = (
            <Nav>
                <Link to="/register" className="nav-link">
                    Register
                </Link>
                <Link to="/login" className="nav-link">
                    Login
                </Link>
            </Nav>
        )

        return (
            <Fragment>
                <Navbar expand="sm" variant="light" bg="light">
                    <Navbar.Brand href="/">UmpCast</Navbar.Brand>
                    <Navbar.Toggle data-toggle="collapse" data-target="#responsive-navbar-nav"/>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto"/>
                        {isAuthenticated ? authLinks : guestLinks}
                    </Navbar.Collapse>
                </Navbar>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {logout})(Header);