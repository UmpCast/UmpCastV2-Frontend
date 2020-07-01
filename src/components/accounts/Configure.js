import React, {Component} from 'react';
import {Layout} from "../Layout";

import {connect} from "react-redux";
import {configure} from "../../actions/auth";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faBaseballBall, faUser} from '@fortawesome/free-solid-svg-icons'
import {Button} from "react-bootstrap";
import {Redirect} from "react-router-dom";

class Configure extends Component {

    onClick = e => {
        this.props.configure(e.target.configuration)
    }

    render() {
        let auth = this.props.auth
        if (auth.configuration) {
            return <Redirect to='/'/>
        } if (! auth.isAuthenticated){
            return <Redirect to='/login'/>
        }
        return (
            <Layout>
                <div style={{"width": "500px"}}>
                    <div className="card card-body mt-5 mb-5 p-4">
                        <h2 className="text-center">How will you use UmpCast?</h2>
                        <div className="row mt-3">
                            <div className="col-sm-12 col-md-6">
                                <Button configuration="umpire"
                                        onClick={this.onClick}
                                        variant="primary"
                                        className="pt-3 pb-2" block>
                                    <h5>
                                        <strong>
                                            <FontAwesomeIcon icon={faBaseballBall} className="mr-3"/>
                                            As an Umpire
                                        </strong>
                                    </h5>
                                </Button>
                            </div>
                            <div className="col-sm-12 col-md-6">
                                <Button configuration="manager"
                                        onClick={this.onClick}
                                        variant="success"
                                        className="pt-3 pb-2" block>
                                    <h5>
                                        <strong>
                                            <FontAwesomeIcon icon={faUser} className="mr-3"/>
                                            As a Manager
                                        </strong>
                                    </h5>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {configure})(Configure);