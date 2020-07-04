import React, {Component} from 'react';

import DateBar from "./DateBar";
import UpcomingGame from "./UpcomingGame";

class Upcoming extends Component {
    render() {
        return (
            <div className="card-body p-0">
                <div className="list-group rounded-0">
                    <DateBar date="mar 04"/>
                    <UpcomingGame
                        title="Agile vs. Stanford"
                        start_time="5PM"
                        end_time="7PM"
                        division="Majors"
                        role="Base"
                        status="casted"
                    />
                    <UpcomingGame
                        title="Say Hey Baseball Vs. Carmel Imports"
                        start_time="9AM"
                        end_time="11AM"
                        division="PCL"
                        role="Base"
                        status="canceled"
                    />
                    <DateBar date="mar 07"/>
                    <UpcomingGame
                        title="Yankees vs. White Sox"
                        start_time="2PM"
                        end_time="3PM"
                        division="AAA"
                        role="Plate"
                        status="backup"
                    />
                    <UpcomingGame
                        title="Pirates vs. Blue Jays"
                        start_time="6PM"
                        end_time="8PM"
                        division="Majors"
                        role="Plate"
                        status="casted"
                    />
                </div>
            </div>
        );
    }
}

export default Upcoming;