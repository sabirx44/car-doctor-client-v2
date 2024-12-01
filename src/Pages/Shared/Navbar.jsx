import { Link } from "react-router-dom";
// import { useContext } from "react";
// import { AuthContext } from "../../AuthProvider";
import useAuth from "../../hooks/useAuth";

// Separate NavLinks component
const NavLinks = ({ user }) => (
    <>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/services">Services</Link></li>
        {user?.email && (
            <li>
                <Link to="/bookings">My bookings</Link>
            </li>
        )}
    </>
);

const Navbar = () => {
    // const { user, logout } = useContext(AuthContext);
    const { user, logout } = useAuth();

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="navbar bg-base-100 p-0">
            <div className="navbar-start">
                <div className="dropdown">
                    <button tabIndex={0} className="btn btn-ghost lg:hidden p-0 mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </button>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <NavLinks user={user} />
                    </ul>
                </div>
                <a className="text-xl">daisyUI</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <NavLinks user={user} />
                </ul>
            </div>
            <div className="navbar-end">
                {user?.email ? (
                    <button onClick={handleLogout} className="btn">Logout</button>
                ) : (
                    <Link to="/login" className="btn">Login</Link>
                )}
            </div>
        </div>
    );
};

export default Navbar;