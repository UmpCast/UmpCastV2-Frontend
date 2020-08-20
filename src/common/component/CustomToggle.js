import React from "react"

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <div ref={ref}
        onClick={(e) => {
            e.preventDefault();
            onClick(e);
        }}>
        {children}
    </div>
));

export default CustomToggle