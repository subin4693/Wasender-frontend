import React, { useState } from "react";
import SpaIcon from "@mui/icons-material/Spa";
import MailIcon from "@mui/icons-material/Mail";
import KeyIcon from "@mui/icons-material/Key";
import LoginIcon from "@mui/icons-material/Login";
import "../SCSS/registerPage.scss";
import { useNavigate } from "react-router-dom";
import { linkNode } from "../nodelink";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../reactRedux/action";
import Loading from "./loader";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log("signin called");
    if (!email || !password) return alert("Enter a valid Email and Password");
    setLoading(true);
    try {
      await axios
        .post(`${linkNode}/signin`, {
          email,
          password,
        })
        .then((res) => {
          console.log(res.data.data);
          dispatch(setUserDetails(res.data.data));
          navigate("/filearea/dashboard");
        });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="registerPage">
        <div className="regisPage">
          <div className="title">
            <span className="titleSpanA">
              <SpaIcon id="spaIcon" />
            </span>
            <span className="titleSpanA">
              WA<span className="senderSpan">sender</span>
            </span>
          </div>
          <div className="welcome">Welcome</div>
          <div className="signInTitle">Sign into your account</div>
          <div className="mailDiv">
            <div className="mailInputDiv">
              <span className="mailSpan">
                <MailIcon id="mailIcon" />
              </span>
              <input
                type="text"
                className="mailInput"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="passwordDiv">
            <div className="passwordInputDiv">
              <span className="passwordSpan">
                <KeyIcon />
              </span>
              <input
                type="password"
                className="passwordInput"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="forgot">Forgot Password ?</div>
          <div className="signInDiv" onClick={handleSubmit}>
            {loading ? <Loading /> : "Sign In"}
          </div>
          <div className="noDiv">
            <hr></hr>
            <span className="noDivTitle">Don't have an Account?</span>
          </div>
          <div
            className="signUpDiv"
            onClick={() => {
              navigate("/SignUp");
            }}
          >
            Sign Up
          </div>
        </div>
      </div>
    </>
  );
}
