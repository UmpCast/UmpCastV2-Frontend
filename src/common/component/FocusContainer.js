import React from "react"

import Loader from "common/components"

const FocusContainer = ({ children, wrap }) => (
    <div
        className="d-flex align-items-center justify-content-center"
        style={{ height: "80vh" }}>
        <Loader dep={!wrap}>
            {children}
        </Loader>
        <Loader dep={wrap}>
            <CardWrapper>
                {children}
            </CardWrapper>
        </Loader>
    </div>
)

export const CardWrapper = ({ children }) => (
    <div
        className="px-3 px-sm-0"
        style={{ width: 500 }}>
        {children}
    </div>
)

export default FocusContainer