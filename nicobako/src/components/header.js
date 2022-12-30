import { Link } from "react-router-dom";

const Header = () => {
    return <header>
        <Link to={``}><h1>Nico Bako</h1></Link>
        <nav>
            <ul>
                <li><Link to={`about`}>About Me</Link></li>
            </ul>
        </nav>
    
    </header>
}

export default Header;