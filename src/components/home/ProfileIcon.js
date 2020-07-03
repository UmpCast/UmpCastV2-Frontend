import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBaseballBall} from "@fortawesome/free-solid-svg-icons";
import React from "react";

const ProfileIcon = () => (
    <div className="d-inline-flex flex-wrap bg-primary rounded p-2">
        <FontAwesomeIcon className="text-white fa-2x" transform={{rotate: 30}}
                         icon={faBaseballBall}/>
    </div>
)

export default ProfileIcon