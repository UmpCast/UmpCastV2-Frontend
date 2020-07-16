import React from "react";

import SignupCard from "./SignupCard";
import UmpireCard from "./UmpireCard";

import "./styles/game.css"

export default function Post(props) {

    const postCards = props.cast.map(casted =>
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
                {postCards}
            </div>
        </div>
    );
}