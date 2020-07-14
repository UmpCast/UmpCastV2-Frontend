import React, {Component} from "react";

import DateBar from "./DateBar";
import UpcomingGame from "./UpcomingGame";

class Upcoming extends Component {
    render() {
        return (
            <div className="card-body p-0">
                <div className="list-group rounded-0">
                    <DateBar date="Aug 10"/>
                    <UpcomingGame
                        title="Mogan-Gault vs. Agile"
                        start_time="3:30 PM"
                        end_time="5:30 PM"
                        division="Majors"
                        role="Base"
                        status="casted"
                    />
                    <UpcomingGame
                        title="Midtown Veterinary Hospital Vs. Ada"s"
                        start_time="5:30 PM"
                        end_time="7:30 PM"
                        division="PCL"
                        role="Base"
                        status="canceled"
                    />
                    <DateBar date="Aug 12"/>
                    <UpcomingGame
                        title="Alhouse vs. Bevy"
                        start_time="5:30 PM"
                        end_time="7:30 PM"
                        division="Majors"
                        role="Scorekeeper"
                        status="backup"
                    />
                    <DateBar date="Aug 14"/>
                    <UpcomingGame
                        title="Venture Construction vs. Ada"s"
                        start_time="2 PM"
                        end_time="4 PM"
                        division="PCL"
                        role="Plate"
                        status="casted"
                    />
                </div>
            </div>
        );
    }
}

export default Upcoming;