import {Link} from "react-router-dom";

const Navigation = () => {
    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/shop">Shop</Link>
            <Link to="/cart">Cart</Link>
            <Link to="/login">Login</Link>
        </nav>
    )
}

export default Navigation