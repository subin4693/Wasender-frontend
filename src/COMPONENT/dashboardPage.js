import React, { useEffect } from "react";
import "../SCSS/dashboardPage.scss";
import LayersIcon from "@mui/icons-material/Layers";
import KeyboardTabIcon from "@mui/icons-material/KeyboardTab";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { linkNode } from "../nodelink";
import axios from "axios";

export function DashBoardPage() {
  const [status, setStatus] = useState();
  const user = useSelector((state) => state.userReducer.user);

  const handleGetDashboardStatus = async () => {
    try {
      await axios.post(`${linkNode}/getdashboard`, { user }).then((res) => {
        console.log(res.data);
        setStatus(res.data.data);
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    try {
      handleGetDashboardStatus();
    } catch (err) {
      console.log(err);
    }
  }, []);

  const navigate = useNavigate();
  return (
    <div className="dashBoardPage">
      <div className="header">
        <div className="headerTitle">
          {user.role === "admin" ? "Admin " : "User "}DashBoard
        </div>
      </div>
      <div className="bodyA">
        <div className="bodyDash">
          <div className="activeDiv">
            <div className="activeTop">
              <div className="activeLeft">
                <div className="activeNumber">{status?.Active}</div>
                <div className="activeText">ACTIVE</div>
              </div>
              <div className="activeRight">
                <div className="activeIcon">
                  <LayersIcon id="actIcon" />
                </div>
              </div>
            </div>
            <div className="activeBottom">
              <div className="botText">view Details</div>
              <div className="botIcon">
                <KeyboardTabIcon
                  id="deIcon"
                  onClick={() => {
                    navigate("../devices");
                  }}
                />
              </div>
            </div>
          </div>
          <div className="activeDiv inactive">
            <div className="activeTop inactive">
              <div className="activeLeft">
                <div className="activeNumber">{status?.Inactive}</div>
                <div className="activeText">INACTIVE</div>
              </div>
              <div className="activeRight">
                <div className="activeIcon">
                  <LayersIcon id="actIcon" />
                </div>
              </div>
            </div>
            <div className="activeBottom">
              <div className="botText">view Details</div>
              <div className="botIcon">
                <KeyboardTabIcon
                  id="deIcon"
                  onClick={() => {
                    navigate("../devices");
                  }}
                />
              </div>
            </div>
          </div>
          <div className="activeDiv expiry">
            <div className="activeTop expiry">
              <div className="activeLeft">
                <div className="activeNumber">{status?.Expired}</div>
                <div className="activeText">EXPIRED</div>
              </div>
              <div className="activeRight">
                <div className="activeIcon">
                  <LayersIcon id="actIcon" />
                </div>
              </div>
            </div>
            <div className="activeBottom">
              <div className="botText">view Details</div>
              <div className="botIcon">
                <KeyboardTabIcon
                  id="deIcon"
                  onClick={() => {
                    navigate("../devices");
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
