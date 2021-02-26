// import React, { useState } from 'react'
// import { useParams } from "react-router-dom"

// import { useApi, useFetchLeague } from "common/hooks"

// import LeagueContainer from "components/league/LeagueContainer"
// import SearchGame from "components/game/search/listings/GameListing"

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { Card } from "react-bootstrap"

// export default function UrgentGame() {

//     const { pk } = useParams()

//     const [league, setLeague] = useFetchLeague(pk)

//     return (
//         <LeagueContainer league={league} active="urgent">
//             <Card>
//                 <Card.Header>
//                     <span className="text-danger">
//                         <FontAwesomeIcon icon={['fas', 'fire']} className="mr-2" />2 days left
//                             </span>
//                     <span className="float-right text-muted">
//                         <FontAwesomeIcon icon={['fas', 'user-slash']} className="ml-1 fa-sm" />
//                         <FontAwesomeIcon icon={['fas', 'user-slash']} className="ml-1 fa-sm" />
//                         <FontAwesomeIcon icon={['fas', 'user-slash']} className="ml-1 fa-sm" />
//                     </span>
//                 </Card.Header>
//                 <Card.Body className="pl-0">
                   
//                 </Card.Body>
//             </Card>
//         </LeagueContainer>
//     )
// }

// const cast = [
//     {
//         role: "Base",
//         first_name: null,
//         last_name: null
//     },
//     {
//         role: "Plate",
//         first_name: null,
//         last_name: null
//     },
//     {
//         role: "Scorekeeper",
//         first_name: null,
//         last_name: null
//     }
// ]
// TODO