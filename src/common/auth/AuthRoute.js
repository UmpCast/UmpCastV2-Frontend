import React, { createElement } from "react";
import { Route } from "react-router-dom";

import useAuthRedirect from "./authRedirect"

export default function AuthRouter(props) {

    const { component, is, not, auth, ...rest } = props
    const { params } = rest.computedMatch

    const redirect = useAuthRedirect(params, is, not ? not : auth)
    
    return (
        <Route
            {...rest}
            render={() =>
                redirect ? redirect : createElement(component)
            }
        />
    )
}
