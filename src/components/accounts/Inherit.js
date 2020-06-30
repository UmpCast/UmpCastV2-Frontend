import {Component, Children, cloneElement} from 'react';

export class Inherit extends Component {
    render() {
        const {children, ...props} = this.props
        return (
            Children.map(children, child =>
                cloneElement(child, {...props})
            )
        );
    }
}

export default Inherit;