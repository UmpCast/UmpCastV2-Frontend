import React from 'react'
import SocialLogin from "react-social-login"
import {Button} from "react-bootstrap";


class SocialButton extends React.Component {

    render() {
        const { triggerLogin, color, ...rest } = this.props
        return (
            <Button onClick={triggerLogin} {...rest}
                    style={{"backgroundColor": color}}>
                {this.props.children}
            </Button>
        );
    }
}

export default SocialLogin(SocialButton);