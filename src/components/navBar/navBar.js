import { Link, NavLink } from "react-router-dom";
import classes from "./navBar.module.css";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import { clearToken } from "../../libs/localStorage";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const submitLogout = () => {
    clearToken();
    navigate("/");
  };
  return (
    <header>
      <div className="px-3 py-2 py-md-3 border border-top-0 border-end-0 border-start-0 border-3 border-dark ">
        <div className="container">
          <div className="d-flex align-items-center justify-content-center">
            <Link
              to="."
              className="d-flex align-items-center me-auto text-dark text-decoration-none"
            >
              <div className={classes.logoContainer}>
                <Logo className={classes.logo} />
              </div>
            </Link>

            <nav className="navbar navbar-expand-md">
              <div className="position-relative">
                <button
                  className="navbar-toggler rounded-0 bg-dark text-light p-2 border-5 px-4"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarTogglerDemo01"
                  aria-controls="navbarTogglerDemo01"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  Menu
                </button>
                <div
                  className={`collapse navbar-collapse ${classes.menuPanel}`}
                  id="navbarTogglerDemo01"
                >
                  <ul className="navbar-nav bg-light justify-content-center text-small border border-dark">
                    <li className="nav-item text-center">
                      <NavLink
                        end
                        to="."
                        className={({ isActive }) =>
                          `nav-link text-dark m-1 p-1 ${
                            isActive
                              ? classes.activeItem
                              : "border border-1 border-white"
                          }`
                        }
                      >
                        <i className="bi bi-newspaper me-2"></i>
                        Home
                      </NavLink>
                    </li>
                    <li className="nav-item text-center">
                      <NavLink
                        end
                        to="post/new"
                        className={({ isActive }) =>
                          `nav-link text-dark m-1 p-1 ${
                            isActive
                              ? classes.activeItem
                              : "border border-1 border-white"
                          }`
                        }
                      >
                        <i className="bi bi-plus-circle me-2"></i>
                        Create
                      </NavLink>
                    </li>
                  </ul>
                  <button
                    type="button"
                    className={`btn btn-dark rounded-0 border-2 p-2 text-white nav-item ${classes.logoutButton}`}
                    onClick={submitLogout}
                  >
                    <i className="bi bi-box-arrow-left me-2"></i>
                    Logout
                  </button>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
