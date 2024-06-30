import React, { useEffect, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { DeleteRounded } from "@mui/icons-material";
import "../SCSS/replypage.scss";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { useNavigate } from "react-router-dom";
import Skleton from "./skleton.jsx";
import { funSetContact } from "../reactRedux/action";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { linkNode } from "../nodelink";
import axios from "axios";
import { useSelector } from "react-redux";
import Pagenation from "./pagenation";

export default function ReplyPage() {
    // const [devices, setDevices] = useState([]);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const navigate = useNavigate();
    // const dispatch = useDispatch();
    const [status, setStatus] = useState(false);
    const user = useSelector((state) => state.userReducer.user);

    useEffect(() => {
        try {
            handleGetReply(page);
            setStatus(false);
        } catch (err) {
            console.log(err);
        }
    }, [status]);
    useEffect(() => {
        try {
            handleGetReply(page);
        } catch (err) {
            console.log(err);
        }
    }, [page]);

    // const handleEditContact = (data) => {
    //   try {
    //     dispatch(funSetContact(data));
    //     navigate("../createcontact");
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };

    const handleGetReply = async (pagee) => {
        try {
            setLoading(true);
            await axios
                .post(`${linkNode}/getreply?page=${pagee}`, { user })
                .then((res) => {
                    console.log(res.data.msg);
                    setMessages(res.data?.msg?.reverse());
                    setTotalPages(res.data?.pagination?.totalPage);
                });
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteReply = async (data) => {
        try {
            console.log(data);
            await axios.post(`${linkNode}/deletereply`, data).then((res) => {
                setStatus(true);
            });
        } catch (err) {
            console.log(err);
        }
    };

    const HandleFrom = (data) => {
        try {
            let contacts = data?.to;
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
    //     await axios.post(`${linkNode}/delcontacts`, data).then((res) => {
    //       setStatus(true);
    //     });
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };

    // const handleDeleteDuplicates = async (data) => {
    //   try {
    //     await axios.post(`${linkNode}/deldup`, data).then((res) => {
    //       setStatus(true);
    //     });
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };

    return (
        <div className="replyPage">
            <div className="header">
                <div className="headerTitle">AutoReplies</div>
                <div className="addTitle">
                    <button
                        className="addBtn"
                        onClick={() => {
                            // dispatch(funSetContact(""));
                            navigate(`../createreply`);
                        }}
                    >
                        <span className="plusBold">
                            <PersonAddAlt1Icon />
                        </span>
                        <span className="addbtntitle">Create Reply</span>
                    </button>
                </div>
            </div>
            <div className="bodyA">
                <div className="bodyAtitle contact">
                    <span className="atcSpan">
                        <PeopleAltIcon id="devFold" />
                        AutoReplies
                    </span>
                    <span className="atdSpan"></span>
                </div>

                <div className="tableDiv">
                    <table className="tableDevices">
                        <thead className="theadDev">
                            <tr>
                                <td className="thA">Message(Keyword)</td>
                                <td className="thC">From(contacts)</td>
                                <td className="thD">To(Device)</td>
                                <td className="thE">ReplyType</td>
                                <td className="thF">Action</td>
                            </tr>
                        </thead>
                        {!loading ? (
                            <tbody>
                                {messages.length &&
                                    messages.map((data) => {
                                        return (
                                            <tr>
                                                <td>{data?.message}</td>
                                                <td>{data.from.label}</td>
                                                <td>{HandleFrom(data)}</td>

                                                <td>{data.type}</td>
                                                <td>{data.body}</td>
                                                <td className="tdE">
                                                    <button
                                                        onClick={() => {
                                                            // handleEditContact(data);
                                                            navigate(
                                                                `../editreply/${data._id}`,
                                                            );
                                                            console.log(data);
                                                        }}
                                                        className="rocketBtn"
                                                        style={{
                                                            backgroundColor:
                                                                "blue",
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
                                                            handleDeleteReply(
                                                                data,
                                                            );
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
