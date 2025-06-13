import { NavLink } from "react-router-dom";

import pages from "../../assets/js/data/pages";

export default function Header () {
    return (
    <header>
        <nav className="navbar navbar-expand-lg bg-dark border-bottom border-body" data-bs-theme="dark">
            <div className="container-fluid">
                <NavLink className='navbar-brand' to={pages.HOME()}>
                    FB
                </NavLink>
                {/* <a className="navbar-brand" href="/">
                    FB
                </a> */}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className='nav-link' to={pages.HOME()}>
                                Home
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className='nav-link' to={pages.ABOUT()}>
                                Chi siamo
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className='nav-link' to={pages.POSTS()}>
                                Posts
                            </NavLink>
                        </li>
                        {/* <li className="nav-item">
                            <NavLink className='nav-link' to='test'>
                                Test 404
                            </NavLink>
                        </li> */}
                    </ul>
                </div>
            </div>
        </nav>
    </header>
    );
};