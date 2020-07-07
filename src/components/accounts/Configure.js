import React, { useContext } from 'react';
import axios from "axios"

import UserContext from "../../UserContext"
import { Layout } from "../common/Layout";
import { myUrl, config } from '../../Api'

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

    const onClick = (myConfig) => {
        axios.patch(myUrl('api/users/34/'), { account_type: myConfig }, config(token))
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
                    <div className="row mt-1">
                        <div className="col-sm-12 col-md-6 p-3">
                            <Button
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
                        <div className="col-sm-12 col-md-6 p-3">
                            <Button
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