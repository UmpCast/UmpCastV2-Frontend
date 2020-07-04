import React, {Component} from 'react';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle} from "@fortawesome/free-solid-svg-icons";
import {Card} from "react-bootstrap";

import "../home/dashboard.css"
import PastGame from "./PastGame";
import HistoryHeader from "./HistoryHeader";


class History extends Component {

    render() {
        return (
            <div className="px-1 mt-3">
                <div className="card border-0 mb-3">
                    <HistoryHeader
                        completed="5"
                        canceled="1"/>
                    <Card.Body className="p-0">
                        <PastGame
                            date="Mar 04"
                            start_time="5PM"
                            end_time="7PM"
                            title="Agile vs. Stanford"
                            division="Majors"
                            role="Base"
                            status="completed"
                        />
                        <PastGame
                            date="Mar 01"
                            start_time="9AM"
                            end_time="11AM"
                            title="Say Hey Baseball Vs. Carmel Imports"
                            division="PCL"
                            role="Base"
                            status="short_notice"
                        />
                        <PastGame
                            date="Feb 25"
                            start_time="2PM"
                            end_time="3PM"
                            title="Yankees Vs. White Sox"
                            division="AAA"
                            role="Plate"
                            status="canceled"
                        />
                    </Card.Body>
                </div>
            </div>
        );
    }
}

export default History;