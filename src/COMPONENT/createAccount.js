import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../SCSS/createAccount.scss";
import SpaIcon from "@mui/icons-material/Spa";
import axios from "axios";
import { linkNode } from "../nodelink";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../reactRedux/action";
import Loader from "./loader";

const CreateAccount = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            setLoading(true);
            if (!email || password.length < 8 || password.length < 8) {
                return alert(
                    "Enter a valid email and password. Password length must be  >= 8",
                );
            }
            if (password !== confirmPassword) {
                alert("Password is not match");
                return;
            }

            await axios
                .post(`${linkNode}/signup`, {
                    email,
                    password,
                })
                .then((res) => {
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
        <div
            className="create-account-container"
            style={{ backgroundColor: "#09b59c" }}
        >
            <div className="regisPage">
                <div className="title">
                    <span className="titleSpanA">
                        <SpaIcon id="spaIcon" />
                    </span>
                    <span className="titleSpanA">
                        WA<span className="senderSpan">sender</span>
                    </span>
                </div>
                <h2>Create Account</h2>
                <form className="create-account-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Confirm Password:</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="create-account-btn">
                        {loading ? <Loader /> : "Create Account"}
                    </button>
                </form>
                <div className="noDiv">
                    <hr></hr>
                    <span className="noDivTitle">Already have an Account?</span>
                </div>
                <div
                    className="signUpDiv"
                    onClick={() => {
                        navigate("/");
                    }}
                >
                    Sign In
                </div>
            </div>
        </div>
    );
};

export default CreateAccount;
