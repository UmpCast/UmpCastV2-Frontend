import React, { Component } from "react";

import { Card } from "react-bootstrap";

import PastGame from "./PastGame";
import HistoryHeader from "./HistoryHeader";

class History extends Component {

    render() {
        return (
            <div className="px-1 mt-3">
                <div className="card border-0 mb-3">
                    <HistoryHeader
                        completed="5"
                        canceled="1" />
                    <Card.Body className="p-0">
                        <PastGame
                            date="Mar 03"
                            start_time="5:30 PM"
                            end_time="7:30 PM"
                            title="Agile Vs. Stanford Shopping Center"
                            division="Majors"
                            role="Plate"
                            status="canceled"
                        />
                        <PastGame
                            date="Feb 29"
                            start_time="1:30 PM"
                            end_time="3:30 PM"
                            title="Bevy Vs. The Old Pro"
                            division="Majors"
                            role="Base"
                            status="short_notice"
                        />
                        <PastGame
                            date="Feb 29"
                            start_time="11 AM"
                            end_time="1 PM"
                            title="Alhouse vs. Agile"
                            division="Majors"
                            role="Base"
                            status="completed"
                        />
                    </Card.Body>
                </div>
            </div>
        );
    }
}

export default History;