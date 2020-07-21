import React from "react";

import Post from "./Post";

import { Tab, Tabs } from "react-bootstrap";
import GameBanner from "./GameBanner";

export default function MainGame(){

    const posts = casts.map(post =>
        <Tab eventKey={post.role} title={post.role}>
            <Post cast={post.cast}/>
        </Tab>
    )

    return (
        <div className="m-3 mx-xl-5 mt-xl-5 mb-xl-0">
            <GameBanner
                title="Morgan-Gault vs. Agile"
                date="August 10"
                start_time="3:30 PM"
                end_time="5:30 PM"
                division="Majors"
                location="Middlefield Ballpark"
                comments={null}
            />
            <div className="row">
                <div className="col">
                    <Tabs defaultActiveKey="Base" id="uncontrolled-tab-example">
                        {posts}
                    </Tabs>
                </div>
            </div>
        </div>
    )
}

const casts = [
    {
        role: "Base",
        cast: [
            {
                title: "Casted",
                name:"Victor Lin"
            },
            {
                title:"Backup",
                name:"Jonathan Kao"
            }
        ]
    },
    {
        role: "Plate",
        cast: [
            {
                title: "Casted",
                name: "Ingrid Lee"
            }
        ]
    },
    {
        role: "Scorekeeper",
        cast: [
            {
                title:"Casted",
                name:"Max Campbell"
            }
        ]
    }
]