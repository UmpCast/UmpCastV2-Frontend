import React, { Component } from "react";

import SignupCard from "./SignupCard";
import UmpireCard from "./UmpireCard";

import "./game.css"

const Cast = (props) => {

    const castedCards = props.cast.map(casted =>
        <div className="col-6 col-md-4 col-lg-3 col-xl-2 p-2">
            <UmpireCard
                title={casted.title}
                border={casted.title === "Casted" ? "border-primary-custom" : "border-secondary-custom" }
                name={casted.name}
            />
        </div>
    )

    return (
        <div className="px-1 pt-4 noselect">
            <div className="row px-2">
                <div className="col text-center">
                    <h5 className="mx-auto"><span className="badge badge-success">Open for Backups</span></h5>
                </div>
            </div>
            <div className="row pt-2">
                <div className="col-6 col-md-4 col-lg-3 col-xl-2 p-2">
                    <SignupCard />
                </div>
                {castedCards}
            </div>
        </div>
    );
}

export default Cast;