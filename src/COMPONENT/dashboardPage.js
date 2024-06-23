import React, { useEffect } from "react";
import "../SCSS/dashboardPage.scss";
import LayersIcon from "@mui/icons-material/Layers";
import KeyboardTabIcon from "@mui/icons-material/KeyboardTab";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { linkNode } from "../nodelink";
import axios from "axios";
import { PieChart } from "@mui/x-charts/PieChart";
import { Padding } from "@mui/icons-material";
import { LineChart } from "@mui/x-charts/LineChart";

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
      <div className="div__container">
        <div className="parent-flex-db">
          <div className="flex-tile-db">
            <div className="tile-row1">
              <div className="tiles-db">
                <div className="number-tile" style={{ color: "green" }}>
                  {status?.Active}
                </div>
                <div>
                  Active <LayersIcon />
                </div>
              </div>
              <div className="tiles-db">
                <div className="number-tile" style={{ color: "#000d2452" }}>
                  {status?.Inactive}
                </div>
                <div>
                  Inactive <LayersIcon />
                </div>
              </div>
              <div className="tiles-db">
                <div className="number-tile" style={{ color: "red" }}>
                  {status?.Expired}
                </div>
                <div>
                  Expired <LayersIcon />
                </div>
              </div>
            </div>
            <div className="tile-row1">
              <div className="tiles-db">
                <div className="number-tile" style={{ color: "#000d2452" }}>
                  83
                </div>
                <div>Send</div>
              </div>
              <div className="tiles-db">
                <div className="number-tile" style={{ color: "#000d2452" }}>
                  6
                </div>
                <div>Unsend</div>
              </div>
              <div className="tiles-db">
                <div className="number-tile" style={{ color: "#000d2452" }}>
                  11
                </div>
                <div>Bot</div>
              </div>
            </div>
          </div>
          <div className="flex-chart-db">
            <div className="chart-area-db">
              <h3 style={{}}>Message Count Details</h3>
              {/* <PieChart
                colors={['red', 'blue', 'green']} // Use palette
                series={[
                  {
                    data: [
                      { value: 30, color: 'green', label: 'Sent'  },
                      { value: 15, color: 'blue', label: 'Pending'  },
                      { value: 10, color: 'red', label: 'Un-Sent'  }, // Use color property
                      // ...
                    ],
                  },
                ]}
              /> */}
              <PieChart
                series={[
                  {
                    data: [
                      { value: 30, color: "#29fc18", label: "Sent" },
                      { value: 15, color: "#e5ee4a", label: "Bot" },
                      { value: 10, color: "#ede19f", label: "Un-Sent" },
                    ],
                    innerRadius: 30,
                    outerRadius: 100,
                    paddingAngle: 5,
                    cornerRadius: 5,
                    startAngle: -90,
                    endAngle: 180,
                    cx: 150,
                    cy: 150,
                  },
                ]}
              />
            </div>
          </div>
        </div>
        {/* <div className="bodyA">
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
      </div> */}
        <div className="chart-container">
          <LineChart
            xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
            series={[
              {
                data: [2, 5.5, 2, 8.5, 1.5, 5],
              },
            ]}
            height={400}
          />
        </div>
      </div>
    </div>
  );
}
