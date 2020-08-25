import React, { Fragment } from 'react'

import GameListings from "./listings/SearchListings"

export default function Search() {

    return (
        <Fragment>
            <div className="bg-light border-bottom mb-4 py-4">
                <div className="display-4 my-0 mr-2 text-center">
                    <strong>Game Signup</strong>
                </div>
                <h5 className="text-center text-primary mt-2">
                    Find your next Game
                </h5>
            </div>
            <GameListings />
        </Fragment>
    )
}