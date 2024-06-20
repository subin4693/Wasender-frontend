import React, { useEffect, useState } from "react";
import "../SCSS/manageDevicesPage.scss";
import { countryCode } from "../countryCode";
import { useNavigate } from "react-router-dom";
import { linkNode } from "../nodelink";
import axios from "axios";
import { DeleteRounded } from "@mui/icons-material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import QrCodeIcon from "@mui/icons-material/QrCode";
import qrimg from "../images/qr.jpg";
import { useDispatch, useSelector } from "react-redux";
import { funSetDevice } from "../reactRedux/action";
import wapImg from "../images/wap.jpg";
import { Grid } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import CancelScheduleSendIcon from "@mui/icons-material/CancelScheduleSend";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import DangerousIcon from "@mui/icons-material/Dangerous";
import CrisisAlertIcon from "@mui/icons-material/CrisisAlert";
// import { Buffer } from "buffer";
import { useParams } from "react-router-dom";
import Loading from "./loader";

export default function ManageDevicesPage() {
  const device = useSelector((state) => state.contactReducer.device);
  const [auth, setAuth] = useState(false);
  const [chance, setChance] = useState(false);
  const [showQr, setShowQr] = useState(true);
  const [qqq, setq] = useState("");
  const [insID, setInsID] = useState("");
  const [insTok, setInsTok] = useState("");
  const [loading, setLoading] = useState(false);
  // const insID = "instance77326";
  // const insTok = "tz4c7nm9r4luh6i4";
  const dispatch = useDispatch();
  const [status, setStatus] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    setInsID(device.instanceID);
    setInsTok(device.token);

    // if (device && device.length > 0) {
    //   device.forEach((dev) => {
    //     if (dev._id == id) {
    //       setInsID(dev.instanceID);
    //       setInsTok(dev.deviceID);
    //       console.log(dev.instanceID);
    //       console.log(dev.deviceID);
    //     }
    //     // if (dev.instanceID && dev.instanceToken) {
    //     //   setInsID(dev.instanceID);
    //     //   setInsTok(dev.instanceToken);
    //     // }
    //   });
    // }
  }, []);

  useEffect(() => {
    try {
      console.log(device);
      // setAuth(device.authenthicate);
      if (auth || device.authenthicate) {
        console.log("hrl");
        handleMessageStatus();
      }
    } catch (err) {
      console.log(err);
    }
    //https://api.ultramsg.com/instance77445/instance/qr?token=gwab0rhjqpa8d539
  }, [auth]);

  useEffect(() => {
    try {
      setStatus(false); ///////////////////////////////////
      getStatus(device.token, device.instanceID);
    } catch (err) {
      console.log(err);
    }
  }, [status]);

  // const handleVerifyBx = async () => {
  //   try {
  //     console.log(device);
  //     let dataObj = {
  //       ...device,
  //       instanceID: "instance77445",
  //       token: "gwab0rhjqpa8d539",
  //     };
  //     await axios.post(`${linkNode}/qrcode`, dataObj).then((res) => {
  //       setChance(true);
  //       let i = 0;
  //       let startFun = async () => {
  //         i++;
  //         console.log(i);
  //         if (i === 20) {
  //           clearInterval(startRun);
  //           setChance(false);
  //           //instance status
  //           //handleInstanceStatus(dataObj);
  //           //
  //         }
  //       };
  //       let startRun = setInterval(startFun, 1000);
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const handleVerifyB = async () => {
  //   let dataObj = {
  //     ...device,
  //     instanceID: "instance77445",
  //     token: "gwab0rhjqpa8d539",
  //   };
  //   handleInstanceStatus(dataObj);
  // };

  const handleVerify = async () => {
    try {
      setLoading(true);
      let config = {
        method: "get",
        url: `https://api.ultramsg.com/${insID}/instance/qr`,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        params: {
          token: insTok,
        },
      };
      await axios(config)
        .then(function (response) {
          setChance(true);
          setq(`https://api.ultramsg.com/${insID}/instance/qr?token=${insTok}`);
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });

      let i = 0;
      let startFun = async () => {
        i++;

        const status = await getStatus(insTok, insID);

        if (status === "authenticated") {
          clearInterval(startRun);
          await handleInstanceStatus(device);
        }
        console.log(i);
        if (i === 20) {
          clearInterval(startRun);

          setChance(false);
        }
      };
      let startRun = setInterval(startFun, 2000);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  const getStatus = async (token, instance) => {
    var config = {
      method: "get",
      url: `https://api.ultramsg.com/${instance}/instance/status`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      params: { token },
    };

    const status = await axios(config)
      .then(function (res) {
        console.log(JSON.stringify(res.data));
        console.log(res?.data?.status?.accountStatus?.status);
        if (res?.data?.status?.accountStatus?.status === "authenticated")
          setAuth(true);
        return res?.data?.status?.accountStatus?.status;
      })
      .catch(function (error) {
        console.log(error);
      });

    return status;
  };

  const handleInstanceStatus = async (dataObj) => {
    console.log("handling instance status");
    try {
      await axios.post(`${linkNode}/instance`, dataObj).then(async (res) => {
        if (res.data?.message === "success") {
          dispatch(funSetDevice({ ...dataObj, authenthicate: true }));
          // await handleInstanceChange(dataObj);
        } else {
          setAuth(false);
          dispatch(funSetDevice({ ...dataObj, authenthicate: false }));
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleInstanceChange = async (dataObj) => {
    try {
      await axios
        .post(`${linkNode}/instancechange`, { dataObj, type: "status" })
        .then((res) => {
          console.log(res);
          setAuth(true);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const handleMessageStatus = async () => {
    try {
      console.log("messStat");
      await axios.post(`${linkNode}/instancedetails`, device).then((res) => {
        console.log(res.data.message.messages_statistics);
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="manageDevicesPage">
      <div className="header">
        <div className="headerTitle">Manage Devices</div>
      </div>
      <div className="bodyA">
        <div className="manBox">
          <table className="manTable">
            <thead className="tabHead">
              <tr>
                <th className="thA">Auth Status</th>
                <th className="thB">Device ID</th>
                <th className="thC">Device Token</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="tdA">
                  <div className="content">
                    {auth ? "Authenthicated" : "standBy"}
                  </div>
                </td>
                <td className="tdB">
                  <div className="content">##98765</div>
                </td>
                <td className="tdC">
                  <div className="content">1qa2fg4y67uji89k</div>
                </td>
                <td className="tdD">
                  <button className="rocketBtn delbtn">
                    <span className="rocketIcon">
                      <DeleteRounded id="rocketIcon" />
                    </span>
                    <span className="rocketTitle">Delete</span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="bodyB">
        {console.log(auth, "Auth", "CHance", chance)}
        {!auth && !chance ? (
          <div className="manB authFalse">
            <div className="manBDiv">
              <div className="firstText">
                Instance WhatsApp #77445 is not authorized and sent on standby
              </div>
              <div className="firstText">
                To authorize again, click 'Verify'
              </div>
              <div className="firstBtn">
                <div
                  class="submitInDiv"
                  onClick={() => {
                    handleVerify();
                  }}
                >
                  {loading ? <Loading /> : "Verify"}
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        {!auth && chance ? (
          <div className="manB">
            <div className="whatsAppText">
              <div className="textTitle">
                To send and receive Messages, authorize the instance
              </div>
              <div className="whatsappList">
                <ol>
                  <li>Open WhatsApp on your Mobile</li>
                  <li>
                    Tap
                    <span className="textIcons">
                      <MoreVertIcon />
                    </span>
                    --- Settings ---
                    <span className="textIcons">
                      <QrCodeIcon />
                    </span>
                    --- Scan QR
                  </li>
                  <li>Capture Code</li>
                </ol>
              </div>
            </div>
            <div className="qrcode">
              <img
                //src="u"
                src={qqq}
                //src="https://api.ultramsg.com/instance77445/instance/qr?token=gwab0rhjqpa8d539"
                //src={`https://api.ultramsg.com/${device.instanceID}/instance/qr?token=${device.token}`}
                //src={`https://api.ultramsg.com/${insID}/instance/qr?token=${insTok}`}
                alt="qrTag"
                className="qrTag"
              ></img>
            </div>
          </div>
        ) : (
          ""
        )}

        {auth ? (
          <>
            <Grid container columnSpacing={2}>
              <Grid item xs={6}>
                <div className="truemanB">
                  <div className="picDiv">
                    <div className="wapPic">
                      <img src={wapImg} alt="" className="wapImg" />
                    </div>
                    <div className="wapText">
                      <div className="wapHead">Connected</div>
                      <div className="wapTextCon">
                        Your phone doesn't need to stay online but your linked
                        devices will be logged out if you don’t use your phone
                        for over 14 days.
                      </div>
                    </div>
                  </div>
                </div>
              </Grid>
              <Grid item xs={6}>
                <div className="statDiv">
                  <table className="iconsTab">
                    <tbody>
                      <tr>
                        <td>
                          <div className="smPic">
                            <SendIcon id="sentIcon" />
                          </div>
                          <div className="smText">
                            <div className="TextA">Sent</div>
                            <div className="TextB">40</div>
                          </div>
                        </td>
                        <td>
                          <div className="smPic">
                            <HourglassBottomIcon id="queueIcon" />
                          </div>
                          <div className="smText">
                            <div className="TextA">Queue</div>
                            <div className="TextB">40</div>
                          </div>
                        </td>
                        <td>
                          <div className="smPic">
                            <CancelScheduleSendIcon id="unsentIcon" />
                          </div>
                          <div className="smText">
                            <div className="TextA">Unsent</div>
                            <div className="TextB">40</div>
                          </div>
                        </td>
                        <td>
                          <div className="smPic">
                            <DangerousIcon id="invalidIcon" />
                          </div>
                          <div className="smText">
                            <div className="TextA">Invalid</div>
                            <div className="TextB">40</div>
                          </div>
                        </td>
                        <td>
                          <div className="smPic">
                            <CrisisAlertIcon id="expIcon" />
                          </div>
                          <div className="smText">
                            <div className="TextA">Expired</div>
                            <div className="TextB">40</div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Grid>
            </Grid>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
