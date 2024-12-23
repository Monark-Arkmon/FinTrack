import React, { useEffect } from "react";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import userPng from "../../assets/user.png";

function Header() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  function logout() {
    auth.signOut();
    navigate("/");
  }

  useEffect(() => {
    if (!user) {
      navigate("/");
    } else {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return (
    <div className="navbar">
      <div className="navbar-heading">
        FinTracker
      </div>
      {user ? (
        <div className="navbar-link" onClick={logout}>
          <img
            src={user.photoURL ? user.photoURL : userPng}
            width={user.photoURL ? "32" : "24"}
            alt="User Profile"
          />
          Logout
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Header;