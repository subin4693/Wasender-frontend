import React, { useEffect, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { DeleteRounded } from "@mui/icons-material";
import "../SCSS/addDevicePage.scss";
import Skleton from "./skleton.jsx";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { funSetContact } from "../reactRedux/action";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { linkNode } from "../nodelink";
import axios from "axios";
import Pagenation from "./pagenation";

export default function ContactsPage() {
    const [devices, setDevices] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [status, setStatus] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);
    const user = useSelector((state) => state.userReducer.user);

    useEffect(() => {
        try {
            handleGetContacts(page);
            setStatus(false);
        } catch (err) {
            console.log(err);
        }
    }, [status, page]);

    const handleEditContact = (data) => {
        try {
            dispatch(funSetContact(data));
            navigate("../createcontact");
        } catch (err) {
            console.log(err);
        }
    };

    const handleGetContacts = async (pagee) => {
        try {
            setLoading(true);
            await axios
                .post(`${linkNode}/getcontacts?page=${pagee}&pagenate=true`, {
                    user,
                })
                .then((res) => {
                    console.log(res.data.pagination);
                    setDevices(res.data?.msgArr?.reverse());
                    setTotalPages(res.data?.pagination?.totalpage);
                });
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteContacts = async (data) => {
        try {
            await axios
                .post(`${linkNode}/delcontacts`, { data })
                .then((res) => {
                    setStatus(true);
                });
        } catch (err) {
            console.log(err);
        }
    };

    const handleDeleteDuplicates = async (data) => {
        try {
            await axios.post(`${linkNode}/deldup`, data).then((res) => {
                setStatus(true);
            });
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="contactsPage">
            <div className="header">
                <div className="headerTitle">
                    {user.role === "admin" ? "Admin " : "User "}Contacts
                </div>
                <div className="addTitle">
                    <button
                        className="addBtn bulk"
                        onClick={() => {
                            dispatch(funSetContact(""));
                            navigate("../bulkcreatecontact");
                        }}
                    >
                        <span className="plusBold bulk">
                            <GroupAddIcon />
                        </span>
                        <span className="addbtntitle">Add Bulk</span>
                    </button>
                    <button
                        className="addBtn"
                        onClick={() => {
                            dispatch(funSetContact(""));
                            navigate("../createcontact");
                        }}
                    >
                        <span className="plusBold">
                            <PersonAddAlt1Icon />
                        </span>
                        <span className="addbtntitle">Add Contact</span>
                    </button>
                </div>
            </div>
            <div className="bodyA">
                <div className="bodyAtitle contact">
                    <span className="atcSpan">
                        <PeopleAltIcon id="devFold" />
                        Contacts
                    </span>
                    <span className="atdSpan">
                        <button
                            className="rocketBtn"
                            style={{ backgroundColor: "#f15438" }}
                            onClick={() => {
                                handleDeleteDuplicates();
                            }}
                        >
                            <span className="rocketIcon">
                                <DeleteRounded id="rocketIcon" />
                            </span>
                            <span className="rocketTitle">
                                Delete Duplicates
                            </span>
                        </button>
                    </span>
                </div>

                <div className="tableDiv">
                    <table className="tableDevices">
                        <thead className="theadDev">
                            <tr>
                                <td></td>
                                <td className="thA">
                                    <PeopleAltIcon id="devFold" />
                                    Contact
                                </td>
                                <td className="thB">Name</td>
                                <td className="thB">Created</td>
                                <td className="thC"></td>
                            </tr>
                        </thead>
                        {!loading ? (
                            <tbody>
                                {devices.map((data) => {
                                    return (
                                        <tr>
                                            <td>
                                                <div className="accSpan">
                                                    <AccountCircleIcon id="accIcon" />
                                                </div>
                                            </td>
                                            <td>{data.number}</td>
                                            <td>{data.name}</td>
                                            <td>{data.created}</td>
                                            <td className="tdE">
                                                <button
                                                    onClick={() => {
                                                        handleEditContact(data);
                                                    }}
                                                    className="rocketBtn"
                                                    style={{
                                                        backgroundColor:
                                                            "black",
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
                                                        handleDeleteContacts(
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
                            </tr>
                        )}
                    </table>
                </div>
            </div>
            <Pagenation totalPages={totalPages} setPage={setPage} page={page} />
        </div>
    );
}
