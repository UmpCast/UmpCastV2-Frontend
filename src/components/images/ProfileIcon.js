import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";

const ProfileIcon = (props) => (
    <div className={`d-inline-flex flex-wrap rounded
                    bg-${props.variant} 
                    ${props.padding}
                    ${props.border && ('border border-' + props.border)}
                    ${props.custom && props.custom}`}>
        <FontAwesomeIcon
            className={`text-white ${props.size}`}
            transform={props.rotation && {rotate: props.rotation}}
            icon={props.icon}/>
    </div>
)

export default ProfileIcon