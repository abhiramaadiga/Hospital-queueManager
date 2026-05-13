import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav style = {{ background: '#01696f', padding: '12px 24px', display: 'flex', gap: '24px' }}>
            <Link to ="/" style={{ color: 'white', textDecorations: 'none'}} >Register Patient </Link>
            <Link to = "/queue" style={{ color: 'white', textDecoraation: 'none'}}>Live Queue</Link>
            <Link to ="/history" style={{ color: 'white', textDecoration: 'none'}}>History</Link>
            <Link to ="/analytics" style={{ color: 'white', textDecoration: 'none'}}>Analytics</Link>
        </nav>
    );
}

export default Navbar;