import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faWrench} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import ProfileIcon from "./ProfileIcon";

const Message = () => (
    <div className="row mx-auto">
        <div className="col-1 px-0 text-center">
            <ProfileIcon />
        </div>
        <div className="col-11">
            <div className="card bg-light">
                <div className="card-header">
                    <strong className="mr-1">UmpCast</strong>
                    <span className="text-muted">delivered Mar 4, 2020</span>
                    <span
                        className="d-none d-lg-block float-right secondary rounded border-muted px-1 text-muted">
                                         <FontAwesomeIcon icon={faWrench}/>
                                    </span>
                </div>
                <div className="card-body">
                    <h4 className="card-title">Update to our Policy</h4>
                    <p className="card-text">We have recently updated our privacy policy. Please
                        navigate to
                        the home page and
                        review the changes.</p>
                </div>
            </div>
        </div>
    </div>
)

export default Message