import React, { useContext } from 'react';
import { Layout } from "../common/Layout";

import UserContext from "../../UserContext"
import { userAPI } from '../../Api'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBaseballBall, faUser } from '@fortawesome/free-solid-svg-icons'
import { Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";

const Configure = () => {

    const [User, setUser] = useContext(UserContext)

    const { isAuthenticated, isConfigured, token } = User

    if (isConfigured) {
        return <Redirect to='/' />
    } if (!isAuthenticated) {
        return <Redirect to='/login' />
    }

    const onClick = (config) => {
        userAPI(token).tweak(14, { account_type: config })
            .then(res => {
                setUser({ ...User, user: res.data, isConfigured: true })
            })
            .catch(
                err => { console.log(err) }
            )
    }

    return (
        <Layout>
            <div style={{ "width": "500px" }}>
                <div className="card card-body mt-5 mb-5 p-4">
                    <h2 className="text-center">How will you use UmpCast?</h2>
                    <div className="row mt-3">
                        <div className="col-sm-12 col-md-6">
                            <Button
                                configuration="umpire"
                                onClick={() => onClick("umpire")}
                                variant="primary"
                                className="pt-3 pb-2" 
                                block>
                                <h5>
                                    <strong>
                                        <FontAwesomeIcon icon={faBaseballBall} className="mr-3" />
                                            As an Umpire
                                        </strong>
                                </h5>
                            </Button>
                        </div>
                        <div className="col-sm-12 col-md-6">
                            <Button
                                configuration="manager"
                                onClick={() => onClick("manager")}
                                variant="success"
                                className="pt-3 pb-2" 
                                block>
                                <h5>
                                    <strong>
                                        <FontAwesomeIcon icon={faUser} className="mr-3" />
                                            As a Manager
                                        </strong>
                                </h5>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Configure;