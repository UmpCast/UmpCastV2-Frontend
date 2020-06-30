import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";

class Configure extends Component {
    render() {
        return (
            <div>
                hi
                <Button>
                    <Link to="/"/>
                </Button>
            </div>
        );
    }
}

export default Configure;