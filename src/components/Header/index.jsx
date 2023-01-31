import { Link } from "react-router-dom";

const Header = () => {
    return (<div className="header__Container">
        <Link className="header__Title" to='/'>{'Podcaster'}</Link>
    </div>);
};

export default Header;