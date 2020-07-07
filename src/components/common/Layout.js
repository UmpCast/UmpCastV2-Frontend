import React from "react"

export const Layout = (props) => (
    <div className="d-flex
                    align-items-center
                    justify-content-center"
         style={{"height": "80vh"}}>
        {props.children}
    </div>
)
