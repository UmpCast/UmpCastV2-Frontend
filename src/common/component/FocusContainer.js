import React from "react"

const FocusContainer = (props) => (
    <div className="d-flex
                    align-items-center
                    justify-content-center"
        style={{ "height": "80vh" }}>
        {props.children}
    </div>
)

export default FocusContainer