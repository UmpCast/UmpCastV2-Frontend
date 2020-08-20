import React from "react";
import dayjs from "dayjs"
import localizedFormat from "dayjs/plugin/localizedFormat"

dayjs.extend(localizedFormat)

export default function Banner({ game, division }) {
    const { title, location, date_time, description } = game

    const js_time = dayjs(date_time)

    return (
        <div className="row">
            <div className="col">
                <div className="jumbotron py-3 pt-lg-4 ump-main-game-banner">
                    <div className="d-flex justify-content-between">
                        <h1 className="pt-2 font-weight-strong">
                            {title}
                        </h1>
                        <div>
                            <h2 className="flex-shrink-0">
                                <span className="badge btn rounded text-white btn-secondary">
                                    {location}
                                </span>
                            </h2>
                        </div>
                    </div>
                    <h2 className="text-primary font-weight-strong">
                        {js_time.format("MMMM D")}
                        <span className="text-secondary mx-1">·</span>
                        {js_time.format("LT")}
                    </h2>
                    <hr className="my-2 mb-lg-3 mt-lg-3" />
                    <div className="d-inline-flex justify-content-between w-100">
                        <h5 className="text-muted mb-0 mt-auto">
                            <strong className="mr-2">
                                Division:
                            </strong>
                            {division.title}
                        </h5>
                        <h6 className="text-muted mb-0 mt-auto">
                            {description ? description : "No comments"}
                        </h6>
                    </div>
                </div>
            </div>
        </div>
    )
}