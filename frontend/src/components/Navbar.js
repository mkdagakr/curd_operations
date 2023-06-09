import { React, useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import empContext from '../context/empContext';

const Navbar = () => {

    const context = useContext(empContext);
    const {userInfo}  = context;

    let location = useLocation(); {/*useLocation use for pathname*/ }

    const navigate = useNavigate();

    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem('token');
        localStorage.removeItem('department');
        navigate('/');
    }


    return (
        <>
            {/* ternary operator use */}

            {localStorage.getItem('token')?

                <nav className="navbar navbar-expand-lg  bg-body-tertiary" >
                    <div className="container">
                        <Link className="navbar-brand" to="/home">Navbar</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""} `} to="/about">About</Link>
                                </li>
                            </ul>
                            <div>
                                <Link className={`nav-link ${location.pathname === "/home" ? "active" : ""} mx-3`} aria-current="page" to="/home"> {userInfo.name}</Link>
                            </div>
                            <button className="btn btn-outline-success" onClick={handleLogout}>Log out</button>
                        </div>
                    </div>
                </nav> : ""
            }
        </>
    )
}

export default Navbar