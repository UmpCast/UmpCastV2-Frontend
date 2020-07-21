import React from 'react'

import SetMax from "./SetMax"
import UmpireVisibility from "./UmpireVisibility"

import { Badge } from "react-bootstrap"

export default function UmpireRow() {
    return (
        <tr className="border-top">
            <td>
                <div className="d-inline-flex justify-content-center">
                    <div className=" my-auto d-flex flex-column">
                        <div className="my-auto flex-shrink-0">
                            <h5 className="mb-0"><strong>Jonathan K.</strong></h5>
                        </div>
                    </div>
                    <Badge className="text-white bg-info mr-auto ml-2 my-auto" style={{ "background-color": "#B793CF" }}><small><strong>L3</strong></small></Badge>
                </div>
            </td>
            <td className="align-middle">
                <SetMax />
            </td>
            <td className="align-middle">
                <SetMax />
            </td>
            <td className="d-flex justify-content-center border-0">
                <UmpireVisibility />
            </td>
        </tr>
    )
}