import React, { useContext } from "react";
import { Redirect } from "react-router-dom";

import UserContext from "UserContext"
import { FocusContainer } from "tools/Display"

import { configure } from "../promises"

import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Configure = () => {

    const [User, setUser] = useContext(UserContext)

    const { isAuthenticated, isConfigured, token } = User

    if (isConfigured) {
        return <Redirect to="/" />
    } if (!isAuthenticated) {
        return <Redirect to="/login" />
    }

    const onClick = (myConfig) => {
        configure({pk: User.user.pk, myConfig: myConfig, token: token})
        .then( payload => setUser(payload.user))
        .catch(err => console.log(err.response.data))
    }

    return (
        <FocusContainer>
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
                                        <FontAwesomeIcon icon={['fas', 'baseball-ball']} className="mr-3" />
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
                                        <FontAwesomeIcon icon={['fas', 'user']} className="mr-3" />
                                            As a Manager
                                        </strong>
                                </h5>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </FocusContainer>
    )
}

export default Configure;