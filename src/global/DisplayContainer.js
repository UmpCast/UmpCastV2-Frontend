import React, { Fragment } from 'react'
import ClipLoader from "react-spinners/ClipLoader"

import { useDisplay } from "common/hooks"

import Loader from "common/components"

import { Container } from "react-bootstrap"

export default function DisplayContainer({ children }) {

    const [Display] = useDisplay()

    return (
        <Fragment>
            {Display.alert}
            < Container
                fluid
                className={`p-0 no-select ${Display.isLoading ? "ump-loading-container" : null}`}>
                {children}
                <Loader dep={[Display.isLoading]}>
                    <div className="ump-loading-spinner">
                        <ClipLoader
                            size={75}
                            color={"#2375DF"} />
                    </div>
                </Loader>
            </Container >
        </Fragment>

    )
}
