import React, {Fragment} from 'react'

import SearchBanner from "./SearchBanner"
import SearchTable from "./SearchTable"

export default function Search() {
    return (
        <Fragment>
            <SearchBanner />
            <SearchTable />
        </Fragment>
    )
}
