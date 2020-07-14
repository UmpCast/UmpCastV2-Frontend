import React from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function ProfileIcon(props) {
    return (
        <div className={`d-inline-flex flex-wrap rounded
                    bg-${props.variant} 
                    ${props.padding}
                    ${props.border && ("border border-" + props.border)}
                    ${props.custom && props.custom}`}>
            <FontAwesomeIcon
                className={`text-${props.color ? props.color : "white"} ${props.size}`}
                transform={props.rotation && { rotate: props.rotation }}
                icon={props.icon} />
        </div>
    )
}