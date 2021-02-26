import React from 'react'

import { OverlayTrigger, Tooltip } from "react-bootstrap"

export default function ToolTip({ children, tip, placement = "bottom", show, hide}) {
    return (
        <OverlayTrigger
            delay={{show, hide}}
            placement={placement}
            overlay={<Tooltip>{tip}</Tooltip>}>
            {children}
        </OverlayTrigger>
    )
}
