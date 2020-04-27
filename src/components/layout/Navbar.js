/* eslint-disable */
import React, { useEffect, useContext } from "react";
import "./css/Navbar.css";
import SignedOutLinks from "./SignedOutLinks";
import SignedInLinks from "./SignedInLinks";
import $ from "jquery";
import firebase from "../../config/fbConfig";
import { AuthContext } from "../../contexts/authContext";
import { getAuth } from "../crudFunctions/authFunctions";

const Navbar = (props) => {
  // console.log(props);
  const { dispatch } = useContext(AuthContext);
  const userName =
    firebase.auth().currentUser && firebase.auth().currentUser.displayName;

  // const [auth, setAuth] = useState(uid);
  // useEffect(() => {
  //   // window.location.reload();
  // }, [auth]);

  useEffect(() => {
    getAuth(dispatch);
  }, []);

  useEffect(() => {
    var yourNavigation = $(".nav");
    const stickyDiv = "sticky";
    const yourHeader = $(".header").height();
    const width = window.innerWidth;
    if (width >= 660) {
      $(".hamBurg-cont").addClass("hide-hamburg");
    }

    $(window).resize(() => {
      if (window.innerWidth >= 660) {
        $(".hamBurg-cont").addClass("hide-hamburg");
      }
      if (window.innerWidth < 660) {
        $(".hamBurg-cont").removeClass("hide-hamburg");
      }
    });

    $(window).scroll(function () {
      if ($(this).scrollTop() > yourHeader) {
        yourNavigation.addClass(stickyDiv);
      } else {
        yourNavigation.removeClass(stickyDiv);
      }
    });
  });

  const loginCode = useContext(AuthContext).authData.loginCode;

  return (
    <div className="nav-container">
      {userName ? (
        <h5 style={{ fontFamily: "Dosis", padding: "10px" }}>Hi {userName},</h5>
      ) : null}
      <div className="header">
        <div className="header-content">
          <div className="header-content-flex">
            <div className="header-logo">
              <img
                src="https://www.svgrepo.com/show/154629/big-owl.svg"
                alt=""
              />
            </div>
            <div className="header-logo-name">
              <span className="logo-name">Marketing Acad</span>
              <br />
              <span className="logo-motto">Learning is free here</span>
            </div>
          </div>
        </div>
      </div>

      {loginCode === 200 ? <SignedInLinks /> : <SignedOutLinks />}
    </div>
  );
};

export default Navbar;
