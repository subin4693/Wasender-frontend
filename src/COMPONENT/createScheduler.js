import React, { useEffect, useState } from "react";
import "../SCSS/sendPage.scss";
import { Grid } from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ImageIcon from "@mui/icons-material/Image";
import ArticleIcon from "@mui/icons-material/Article";
import AudioFileIcon from "@mui/icons-material/AudioFile";
import VideoFileIcon from "@mui/icons-material/VideoFile";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { MultiSelect } from "react-multi-select-component";
import SendIcon from "@mui/icons-material/Send";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Select from "react-select";
import { linkNode } from "../nodelink";
import axios from "axios";
import FileBase64 from "react-file-base64";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import useFirebaseUpload from "../hooks/use-firebaseUpload";
import Loading from "./loader";

export default function CreateScheduler() {
    const [show, setShow] = useState("chat");
    const [selected, setSelected] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const [fromOptions, setFromOptions] = useState([]);
    const [toOptions, setToOptions] = useState([]);

    const [bodyText, setBodyText] = useState("");
    const [latText, setLatText] = useState("");
    const [lgnText, setLgnText] = useState("");
    const [docTitle, setDocTitle] = useState("");
    const [selectedDate, setSelectedDate] = useState(null);
    const navigate = useNavigate();
    const params = useParams();
    const [editType, setEditType] = useState(false);
    const [value, setValue] = useState(null);
    const [file, setFile] = useState(null);
    const [url, setUrl] = useState("");

    const user = useSelector((state) => state.userReducer.user);
    const { progress, error, downloadURL, fileName } = useFirebaseUpload(file);

    useEffect(() => {
        if (error) {
            console.log(error);
            return alert("Try again later");
        } else if (downloadURL) {
            setUrl(downloadURL);
            setDocTitle(fileName);
        }
    }, [error, downloadURL]);

    useEffect(() => {
        try {
            handleGetDevicesApi();
            if (params?.id) {
                setEditType(true);
                handleGetSch(params.id);
            }
        } catch (err) {
            console.log(err);
        }
    }, []);

    const handleGetDevicesApi = async () => {
        try {
            await axios.post(`${linkNode}/getdevice`, { user }).then((res) => {
                // setDevices(res.data.arrData);
                //fromOptions
                let fromData = res.data.arrData;
                let finalFrom = [];

                for (let i = 0; i < fromData?.length; i++) {
                    finalFrom.push({
                        label: fromData[i].name,
                        value: fromData[i].number,
                        name: fromData[i].name,
                        number: fromData[i].number,
                        instanceID: fromData[i].instanceID,
                        token: fromData[i].token,
                    });
                }
                //
                setFromOptions(finalFrom);
            });
            await axios
                .post(`${linkNode}/getcontacts`, { user })
                .then((res) => {
                    // setContacts(res.data?.msgArr?.reverse());
                    //ToOptions
                    let toData = res.data?.msgArr?.reverse();
                    let toFrom = [];

                    for (let i = 0; i < toData.length; i++) {
                        toFrom.push({
                            label: toData[i].name,
                            value: toData[i].number,
                            name: toData[i].name,
                            number: toData[i].number,
                        });
                    }
                    //
                    setToOptions(toFrom);
                });
        } catch (err) {
            console.log(err);
        }
    };

    const handleGetSch = async (id) => {
        try {
            await axios
                .post(`${linkNode}/idsch`, { id })
                .then((res) => {
                    let dataObj = res.data?.msg;
                    console.log(dataObj);
                    if (dataObj) {
                        setShow(dataObj.type);

                        let fromCon = dataObj.to;
                        let fromObj = [];
                        for (let i = 0; i < fromCon.length; i++) {
                            fromObj.push({
                                label: fromCon[i].label,
                                value: fromCon[i].value,
                                name: fromCon[i].label,
                                number: fromCon[i].value,
                            });
                        }
                        setSelected(fromObj);
                        setSelectedOption(dataObj.from);
                        setBodyText(dataObj.body);
                        setDocTitle(dataObj.fileName);
                        setUrl(dataObj.file);

                        let spanBaseEl = document.querySelector("#spanBase");

                        if (spanBaseEl) {
                            let inputEl = spanBaseEl.querySelector("input");
                            let list = new DataTransfer();
                            let file = new File(
                                [dataObj.file],
                                dataObj.fileName,
                            );
                            list.items.add(file);

                            let myFileList = list.files;
                            inputEl.files = myFileList;
                        }
                        //
                        setLatText(dataObj.lat);
                        setLgnText(dataObj.lng);

                        setSelectedDate(dataObj.date);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        } catch (err) {
            console.log(err);
        }
    };

    const handleSend = async () => {
        try {
            let dataObj = {
                to: selected,
                from: selectedOption,
                file: url,
                fileName: docTitle,
                body: bodyText,
                lat: latText,
                lng: lgnText,
                type: show,
                date: selectedDate,
                instanceID: selectedOption.instanceID,
                token: selectedOption.token,
            };
            console.log(dataObj);
            await axios
                .post(`${linkNode}/createsch`, { dataObj, user })
                .then((res) => {
                    navigate("../schedulers");
                });
        } catch (err) {
            console.log(err);
        }
    };

    const handleEdit = async () => {
        try {
            let dataObj = {
                to: selected,
                from: selectedOption,
                file: url,
                fileName: docTitle,
                body: bodyText,
                lat: latText,
                lng: lgnText,
                type: show,
                date: selectedDate,
            };
            await axios
                .post(`${linkNode}/editsch`, { id: params.id, dataObj })
                .then((res) => {
                    navigate("../schedulers");
                });
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="sendPage">
            <div className="header">
                <div className="headerTitle">
                    {editType ? "Edit Scheduler" : "Create Scheduler"}
                </div>
            </div>
            <div className="bodyA">
                <div className="gridA">
                    <Grid container>
                        <Grid item xs={2}>
                            <div className="buttonsDiv">
                                <div
                                    className="chatBtn"
                                    onClick={() => {
                                        setShow("chat");
                                    }}
                                >
                                    <span className="iconSpan">
                                        <ChatBubbleOutlineIcon id="chatIcon" />
                                    </span>
                                    <span className="textSpan">Chat</span>
                                </div>
                                <div
                                    className="chatBtn"
                                    onClick={() => {
                                        setShow("document");
                                    }}
                                >
                                    <span className="iconSpan">
                                        <ArticleIcon id="chatIcon" />
                                    </span>
                                    <span className="textSpan">Document</span>
                                </div>
                                <div
                                    className="chatBtn"
                                    onClick={() => {
                                        setShow("image");
                                    }}
                                >
                                    <span className="iconSpan">
                                        <ImageIcon id="chatIcon" />
                                    </span>
                                    <span className="textSpan">Image</span>
                                </div>
                                <div
                                    className="chatBtn"
                                    onClick={() => {
                                        setShow("video");
                                    }}
                                >
                                    <span className="iconSpan">
                                        <VideoFileIcon id="chatIcon" />
                                    </span>
                                    <span className="textSpan">Video</span>
                                </div>
                                <div
                                    className="chatBtn"
                                    onClick={() => {
                                        setShow("audio");
                                    }}
                                >
                                    <span className="iconSpan">
                                        <AudioFileIcon id="chatIcon" />
                                    </span>
                                    <span className="textSpan">Audio</span>
                                </div>
                                <div
                                    className="chatBtn"
                                    onClick={() => {
                                        setShow("contact");
                                    }}
                                >
                                    <span className="iconSpan">
                                        <ContactPageIcon id="chatIcon" />
                                    </span>
                                    <span className="textSpan">Contact</span>
                                </div>
                                <div
                                    className="chatBtn"
                                    onClick={() => {
                                        setShow("location");
                                    }}
                                >
                                    <span className="iconSpan">
                                        <LocationOnIcon id="chatIcon" />
                                    </span>
                                    <span className="textSpan">Location</span>
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={10}>
                            <div className="contentDiv">
                                <div className="head">
                                    {show.charAt(0).toUpperCase() +
                                        show.slice(1)}
                                </div>
                                <div className="headContent">
                                    <div className="toDiv">
                                        <div className="spanA">From:</div>
                                        <div className="spanB">
                                            <Select
                                                placeholder="From"
                                                id="selectTag"
                                                value={selectedOption}
                                                // defaultValue={selectedOption}
                                                onChange={setSelectedOption}
                                                options={fromOptions}
                                            />
                                        </div>
                                    </div>

                                    <div className="toDiv">
                                        <div className="spanA">To:</div>
                                        <div className="spanB">
                                            <MultiSelect
                                                id="multiSelect"
                                                options={toOptions}
                                                value={selected}
                                                onChange={setSelected}
                                                labelledBy="Select"
                                            />
                                        </div>
                                    </div>
                                    <div className="toDiv">
                                        <div className="spanA">
                                            Schedule Your <br /> Message :
                                        </div>

                                        <div className="spanB">
                                            {/* <input type="datetime-local" label="Schedule Your Message" placeholder="Write your message" className="fileInput" /> */}
                                            <LocalizationProvider
                                                dateAdapter={AdapterDayjs}
                                            >
                                                <DemoContainer
                                                    components={[
                                                        "DateTimePicker",
                                                    ]}
                                                >
                                                    <DateTimePicker
                                                        label="Schedule Your Message"
                                                        className="timepicker"
                                                        value={
                                                            selectedDate &&
                                                            dayjs(selectedDate)
                                                        }
                                                        onChange={
                                                            setSelectedDate
                                                        }
                                                        sx={{
                                                            width: "fit-content",
                                                        }}
                                                    />
                                                </DemoContainer>
                                            </LocalizationProvider>
                                        </div>
                                    </div>

                                    {show === "chat" ? (
                                        <>
                                            <div className="toDiv">
                                                <div className="spanA">
                                                    Body:
                                                </div>
                                                <div className="spanB">
                                                    <textarea
                                                        className="textArea"
                                                        value={bodyText}
                                                        onChange={(e) => {
                                                            setBodyText(
                                                                e.target.value,
                                                            );
                                                        }}
                                                    ></textarea>
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        ""
                                    )}
                                    {show === "document" ||
                                    show === "video" ||
                                    show === "image" ? (
                                        <>
                                            <div className="toDiv">
                                                <div className="spanA">
                                                    {show
                                                        .charAt(0)
                                                        .toUpperCase() +
                                                        show.slice(1)}
                                                    :
                                                </div>
                                                <div
                                                    className="spanB"
                                                    id="spanBase"
                                                >
                                                    {/* <FileBase64
                                                    //     value={docTitle}
                                                    //     onDone={(e) => {
                                                    //         setDocTitle(e.name);

                                                    //         setBase(e.base64);
                                                    //     }}
                                                    //     id="baseFile"
                                                     /> */}
                                                    <input
                                                        type="file"
                                                        className="fileInput"
                                                        onChange={(e) => {
                                                            // handleUpload(e);
                                                            setFile(
                                                                e.target
                                                                    .files[0],
                                                            );
                                                        }}
                                                    />
                                                </div>
                                            </div>

                                            <div className="toDiv">
                                                <div className="spanA">
                                                    Body:
                                                </div>
                                                <div className="spanB">
                                                    <textarea
                                                        className="textArea"
                                                        value={bodyText}
                                                        onChange={(e) => {
                                                            setBodyText(
                                                                e.target.value,
                                                            );
                                                        }}
                                                    ></textarea>
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        ""
                                    )}
                                    {show === "audio" ? (
                                        <>
                                            <div className="toDiv">
                                                <div className="spanA">
                                                    {show
                                                        .charAt(0)
                                                        .toUpperCase() +
                                                        show.slice(1)}
                                                    :
                                                </div>
                                                <div className="spanB">
                                                    {/* <FileBase64
                                                    //     onDone={(e) => {
                                                    //         setBase(e.base64);
                                                    //     }}
                                                    />*/}
                                                    <input
                                                        type="file"
                                                        className="fileInput"
                                                        onChange={(e) => {
                                                            // handleUpload(e);
                                                            setFile(
                                                                e.target
                                                                    .files[0],
                                                            );
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        ""
                                    )}
                                    {show === "contact" ? (
                                        <>
                                            <div className="toDiv">
                                                <div className="spanA">
                                                    Contact:
                                                </div>
                                                <div className="spanB">
                                                    <input
                                                        type="text"
                                                        className="contactText"
                                                        value={bodyText}
                                                        onChange={(e) => {
                                                            setBodyText(
                                                                e.target.value,
                                                            );
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        ""
                                    )}
                                    {show === "location" ? (
                                        <>
                                            <div className="toDiv">
                                                <div className="spanA">
                                                    Lat:
                                                </div>
                                                <div className="spanB">
                                                    <input
                                                        type="text"
                                                        className="contactText"
                                                        value={latText}
                                                        onChange={(e) => {
                                                            setLatText(
                                                                e.target.value,
                                                            );
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="toDiv">
                                                <div className="spanA">
                                                    Lng:
                                                </div>
                                                <div className="spanB">
                                                    <input
                                                        type="text"
                                                        className="contactText"
                                                        value={lgnText}
                                                        onChange={(e) => {
                                                            setLgnText(
                                                                e.target.value,
                                                            );
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="toDiv">
                                                <div className="spanA">
                                                    Body:
                                                </div>
                                                <div className="spanB">
                                                    <textarea
                                                        className="textArea"
                                                        value={bodyText}
                                                        onChange={(e) => {
                                                            setBodyText(
                                                                e.target.value,
                                                            );
                                                        }}
                                                    ></textarea>
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        ""
                                    )}
                                    <div className="toDiv send">
                                        <div
                                            className="sendDivbtn"
                                            onClick={() => {
                                                if (
                                                    progress > 0 &&
                                                    progress < 100
                                                )
                                                    return;

                                                if (editType) {
                                                    handleEdit();
                                                } else {
                                                    handleSend();
                                                }
                                            }}
                                        >
                                            {progress > 0 && progress < 100 ? (
                                                <>
                                                    <Loading /> &nbsp;{" "}
                                                    {progress}%{" "}
                                                </>
                                            ) : (
                                                <>
                                                    {" "}
                                                    <span className="sendIconSpan">
                                                        <SendIcon id="sendIcon" />
                                                    </span>
                                                    <span className="spanTitle">
                                                        {editType
                                                            ? "Edit"
                                                            : "Create"}
                                                    </span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </div>
    );
}

