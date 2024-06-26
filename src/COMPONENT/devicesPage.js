import React, { useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PaymentIcon from "@mui/icons-material/Payment";
import RocketIcon from "@mui/icons-material/Rocket";
import DevicesFoldIcon from "@mui/icons-material/DevicesFold";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { linkNode } from "../nodelink";
import axios from "axios";
import "../SCSS/devicesPage.scss";
import Skleton from "./skleton.jsx";
import Pagenation from "./pagenation";

import { funSetDevice } from "../reactRedux/action";
import { useSelector, useDispatch } from "react-redux";

export default function DevicesPage() {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.userReducer.user);
  const device = useSelector((state) => state.contactReducer.device);

  useEffect(() => {
    try {
      handleGetDevicesApi(page);
      console.log(device);
    } catch (err) {
      console.log(err);
    }
  }, [page]);

  const handleGetDevicesApi = async (pagee) => {
    try {
      setLoading(true);
      await axios
        .post(`${linkNode}/getdevice?page=${pagee}&pagenate=true`, { user })
        .then((res) => {
          console.log(res.data.arrData);
          setDevices(res.data.arrData);
          setTotalPages(res.data?.pagination?.totalPage);
        });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="devicesPage">
      <div className="header">
        <div className="headerTitle">
          {user.role === "admin" ? "Admin " : "User "}Devices
        </div>
        <div className="addTitle">
          <button
            className="addBtn"
            onClick={() => {
              navigate("../adddevice");
            }}
          >
            <span className="plusBold">
              <b>&#43;</b>
            </span>
            <span className="addbtntitle">Add Device</span>
          </button>
        </div>
      </div>
      <div className="bodyA">
        <div className="bodyAtitle">
          <DevicesFoldIcon id="devFold" />
          Devices
        </div>

        <div className="tableDiv">
          <table className="tableDevices">
            <thead className="theadDev">
              <tr>
                <td className="thA">
                  <DevicesFoldIcon id="devFold" />
                  Device
                </td>
                <td className="thB">Create date</td>
                <td className="thC">Expiry date</td>
                <td className="thD">status</td>
              </tr>
            </thead>
            {!loading ? (
              <tbody>
                {devices?.length &&
                  devices.map((data) => {
                    return (
                      <tr>
                        <td className="tdA">
                          <div className="accSpan">
                            <AccountCircleIcon id="accIcon" />
                          </div>
                          <div className="idSpan">{data.instanceID}</div>
                          <div className="nameNo">
                            <div className="name">{data.name}</div>
                            <div className="no">
                              {data.code}
                              {data.number}
                            </div>
                          </div>
                        </td>
                        <td>{data.created}</td>
                        <td>{data.created}</td>
                        <td>
                          <span className={`success ${data.status}`}>
                            {data.status}
                          </span>
                        </td>
                        <td className="tdE">
                          <button
                            className="rocketBtn"
                            onClick={() => {
                              dispatch(funSetDevice(data));
                              navigate(`../managedevices/${data._id}`);
                            }}
                          >
                            <span className="rocketIcon">
                              <RocketIcon id="rocketIcon" />
                            </span>
                            <span className="rocketTitle  ">Manage</span>
                          </button>
                          <button className="rocketBtn paybtn">
                            <span className="rocketIcon">
                              <PaymentIcon id="rocketIcon" />
                            </span>
                            <span className="rocketTitle">Pay</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            ) : (
              <tr>
                <td>
                  {" "}
                  <Skleton />
                </td>
                <td>
                  {" "}
                  <Skleton />
                </td>
                <td>
                  {" "}
                  <Skleton />
                </td>
                <td>
                  {" "}
                  <Skleton />
                </td>
                <td>
                  {" "}
                  <Skleton />
                </td>
              </tr>
            )}
          </table>
        </div>
      </div>
      <Pagenation totalPages={totalPages} setPage={setPage} page={page} />
    </div>
  );
}
