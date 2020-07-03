import React from "react"
import {Tabs, Tab} from "react-bootstrap"
import Feed from "./Feed"
import History from "../games/History";
import Upcoming from "../games/Upcoming";
import ReactTooltip from "react-tooltip";

const Dashboard = () => (
    <div className="row mt-3 mx-xl-3">
        <div className="col-12 col-md-4 pr-xl-3 mt-3">
            <div className="card mb-3 border-0">
                <h5 className="card-header border border-bottom-0"><strong>Your Signups</strong></h5>
                <Upcoming />
            </div>
        </div>
        <div className="col-12 col-md-8 mt-3">
            <Tabs defaultActiveKey="feed" id="uncontrolled-tab-example">
                <Tab eventKey="feed" title="Feed">
                    <Feed/>
                </Tab>
                <Tab eventKey="history" title="History">
                    <History/>
                </Tab>
                <Tab eventKey="visibility" title="Visibility">

                </Tab>
            </Tabs>
        </div>
        <ReactTooltip place="bottom"/>
    </div>
)

export default Dashboard