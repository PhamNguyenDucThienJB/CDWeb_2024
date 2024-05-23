import { Link, To } from "react-router-dom";

interface CustomLinkHeaderProps {
    to: To;
    children?: JSX.Element;
}

function CustomLinkHeader({ to, children }: CustomLinkHeaderProps) {

    return (
        <li> <Link to={to}>{children}</Link></li>
    )
}
export default CustomLinkHeader;