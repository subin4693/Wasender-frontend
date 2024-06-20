import React, { useEffect, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { DeleteRounded } from "@mui/icons-material";
import "../SCSS/replypage.scss";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { useNavigate } from "react-router-dom";

import { funSetContact } from "../reactRedux/action";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { linkNode } from "../nodelink";
import axios from "axios";
import { useSelector } from "react-redux";

export default function SchedulerPage() {
    // const [devices, setDevices] = useState([]);
    const [messages, setMessages] = useState([]);
    const navigate = useNavigate();
    // const dispatch = useDispatch();
    const [status, setStatus] = useState(false);
    const user = useSelector((state) => state.userReducer.user);

    useEffect(() => {
        try {
            handleGetSch();
            setStatus(false);
        } catch (err) {
            console.log(err);
        }
    }, [status]);

    // const handleEditContact = (data) => {
    //   try {
    //     dispatch(funSetContact(data));
    //     navigate("../createcontact");
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };

    const handleGetSch = async () => {
        try {
            await axios.post(`${linkNode}/getsch`, { user }).then((res) => {
                console.log(res.data.msg);
                setMessages(res.data?.msg?.reverse());
            });
        } catch (err) {
            console.log(err);
        }
    };

    const handleDeleteSch = async (data) => {
        try {
            console.log(data);
            await axios.post(`${linkNode}/deletesch`, data).then((res) => {
                setStatus(true);
            });
        } catch (err) {
            console.log(err);
        }
    };

    const HandleFrom = (data) => {
        try {
            let contacts = data?.from;
            let fromNames = [];

            for (let i = 0; i < contacts.length; i++) {
                fromNames.push(contacts[i].name);
            }
            console.log(fromNames, "fromNames");
            if (fromNames.length) {
                return fromNames.join(", ");
            }
        } catch (err) {
            console.log(err);
        }
    };

    // const handleDeleteContacts = async (data) => {
    //   try {
    //     console.log(data);
    //     await axios.post(${linkNode}/delcontacts, data).then((res) => {
    //       setStatus(true);
    //     });
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };

    // const handleDeleteDuplicates = async (data) => {
    //   try {
    //     await axios.post(${linkNode}/deldup, data).then((res) => {
    //       setStatus(true);
    //     });
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };

    return (
        <div className="replyPage">
            <div className="header">
                <div className="headerTitle">Scheduler</div>
                <div className="addTitle">
                    <button
                        className="addBtn"
                        onClick={() => {
                            // dispatch(funSetContact(""));
                            navigate("../createsch");
                        }}
                    >
                        <span className="plusBold">
                            <PersonAddAlt1Icon />
                        </span>
                        <span className="addbtntitle">Create Schedule</span>
                    </button>
                </div>
            </div>
            <div className="bodyA">
                <div className="bodyAtitle contact">
                    <span className="atcSpan">
                        <PeopleAltIcon id="devFold" />
                        Scheduled Messages
                    </span>
                    <span className="atdSpan"></span>
                </div>

                <div className="tableDiv">
                    <table className="tableDevices">
                        <thead className="theadDev">
                            <tr>
                                <td className="thA">From(contacts)</td>
                                <td className="thC">To(Device)</td>
                                <td className="thD">Scheduled Time</td>
                                <td className="thE">Message Type</td>
                                <td className="thF">Action</td>
                            </tr>
                        </thead>
                        <tbody>
                            {messages.length &&
                                messages.map((data) => {
                                    return (
                                        <tr>
                                            <td>{HandleFrom(data)}</td>
                                            <td>{data.to.label}</td>
                                            <td>{data?.date}</td>
                                            <td>{data.type}</td>
                                            {<td>{data.body}</td>}
                                            <td className="tdE">
                                                <button
                                                    onClick={() => {
                                                        // handleEditContact(data);
                                                        navigate(
                                                            `../editsch/${data._id}`,
                                                        );
                                                        console.log(data);
                                                    }}
                                                    className="rocketBtn"
                                                    style={{
                                                        backgroundColor: "blue",
                                                    }}
                                                >
                                                    <span className="rocketIcon">
                                                        <ModeEditIcon id="rocketIcon" />
                                                    </span>
                                                    <span className="rocketTitle">
                                                        Edit
                                                    </span>
                                                </button>
                                                <button
                                                    className="rocketBtn"
                                                    style={{
                                                        backgroundColor:
                                                            "#f15438",
                                                    }}
                                                    onClick={() => {
                                                        handleDeleteSch(data);
                                                    }}
                                                >
                                                    <span className="rocketIcon">
                                                        <DeleteRounded id="rocketIcon" />
                                                    </span>
                                                    <span className="rocketTitle">
                                                        Delete
                                                    </span>
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
