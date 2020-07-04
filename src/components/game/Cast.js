import React, {Component} from 'react';

import SignupCard from "./SignupCard";
import UmpireCard from "./UmpireCard";

import './game.css'

class Cast extends Component {
    render() {
        return (
            <div className="px-1 pt-4 noselect">
                <div className="row px-2">
                    <div className="col text-center">
                        <h5 className="mx-auto"><span className="badge badge-success">Open for Backups</span></h5>
                    </div>
                </div>
                <div className="row pt-2">
                    <div className="col-6 col-md-4 col-lg-3 col-xl-2 p-2">
                        <SignupCard/>
                    </div>
                    <div className="col-6 col-md-4 col-lg-3 col-xl-2 p-2">
                        <UmpireCard
                            title="Casted"
                            border="border-primary-custom"
                            name="Max Campbell"
                            />
                    </div>
                    <div className="col-6 col-md-4 col-lg-3 col-xl-2 p-2">
                        <UmpireCard
                            title="Backup"
                            border="border-secondary-custom"
                            name="Jonathan Kao"
                        />
                    </div>
                    <div className="col-6 col-md-4 col-lg-3 col-xl-2 p-2">
                        <UmpireCard
                            title="Backup"
                            border="border-secondary-custom"
                            name="Ingrid Lee"
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default Cast;