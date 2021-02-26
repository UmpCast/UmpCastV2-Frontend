import React from "react";

import { Badge } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function AppStatus(props) {
    return (
        <Badge
            className="mt-0 mb-1 px-2"
            variant={props.variant}
            style={{ lineHeight: "1", paddingTop: 0, paddingBottom: 2 }}
            pill>
            <small>
                <FontAwesomeIcon
                    className="mr-2"
                    icon={props.icon} />
                {props.title}
            </small>
        </Badge>
    )
}