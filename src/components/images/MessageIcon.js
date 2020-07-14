import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const MessageIcon = (props) => (
    <span
        className="d-none d-lg-block float-right secondary rounded border-muted px-1 text-muted">
        <FontAwesomeIcon icon={props.icon} />
    </span>
)

export default MessageIcon