import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/Auth";
import toast from "react-hot-toast";
import SearchInput from "../Forms/SearchInput";
import { useCart } from "../../context/Cart";
import { Badge } from "antd";
const Header = () => {
  const [cart] = useCart();
  const [authData, setAuthData] = useAuth();
  const handleLogOut = () => {
    setAuthData({
      ...authData,
      user: null,
      token: "",
    });
    localStorage.removeItem("authData");
    toast.success("Logout Successfully");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link to='/' className="navbar-brand"> 🛍️ Ecommerce App</Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="text-center" style={{display:'flex',justifyContent:'center'}}> <SearchInput /></div>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0" style={{marginRight:5,letterSpacing:2}}>
             
              <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/">
                  Home
                </NavLink>
              </li>

              {!authData.user ? (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/register">
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/login">
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li class="nav-item dropdown">
                    <Link
                      class="nav-link dropdown-toggle active"
                      to="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {authData?.user?.name}
                    </Link>
                    <ul class="dropdown-menu">
                      <li>
                        <Link
                          className="dropdown-item"
                          to={`/dashboard/${
                            authData?.user?.role === 1 ? "admin" : "user"
                          }`}
                        >
                          Dashboard
                        </Link>
                      </li>
                      <li>
                        {" "}
                        <Link
                          className="dropdown-item"
                          onClick={handleLogOut}
                          to="/login"
                        >
                          Logout
                        </Link>
                      </li>
                    </ul>
                  </li>
                </>
              )}

              <li className="nav-item">
                <Badge count={cart?.length} showZero>
                  <NavLink className="nav-link" to="/cart">
                    Cart
                  </NavLink>
                </Badge>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
