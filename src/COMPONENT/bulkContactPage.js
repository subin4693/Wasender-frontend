import React, { useState, useEffect, useRef } from "react";
import "../SCSS/contactsPage.scss";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { countryCode } from "../countryCode";
import axios from "axios";
import { linkNode } from "../nodelink";
import * as XLSX from "xlsx";

export default function BulkContactPage() {
    const [data, setData] = useState();
    const navigate = useNavigate();
    const fileInputRef = useRef();
    const user = useSelector((state) => state.userReducer.user);

    useEffect(() => {
        try {
        } catch (err) {
            console.log(err);
        }
    }, []);

    const handleImportNumber = async (e) => {
        try {
            const file = e.target.files[0];
            const reader = new FileReader();

            const sheetData = await new Promise((resolve, reject) => {
                reader.onload = (event) => {
                    try {
                        const workbook = XLSX.read(event.target.result, {
                            type: "binary",
                        });
                        const sheetName = workbook.SheetNames[0];
                        const sheet = workbook.Sheets[sheetName];
                        const val = XLSX.utils.sheet_to_json(sheet);
                        resolve(val);
                    } catch (err) {
                        reject(err);
                    }
                };
                reader.onerror = (error) => reject(error);
                reader.readAsBinaryString(file);
            });

            console.log("api calling ....");
            console.log(sheetData);

            await axios.post(`${linkNode}/bulknumber`, {
                user,
                contacts: sheetData,
            });
            navigate("../contacts");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="bulkContactPage">
            <div className="header">
                <div className="headerTitle">Import Bulk Contact</div>
            </div>
            <div className="bodyA">
                <div className="bodyAhead">Import contacts from Device</div>
                <div className="inputsDivs">
                    <div className="conDiv">
                        <div className="conInputDiv">
                            <span className="conSpan">
                                <PersonIcon />
                            </span>
                            <select id="countrySelect" className="conInput">
                                <option value="">from</option>
                                {countryCode.map((data) => {
                                    return (
                                        <option value={data.dial_code}>
                                            {data.name}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                    </div>

                    {/*   <button
                            className="submitInDiv"
                            onClick={() => {
                                handleImportNumber();
                            }}
                        >
                            Import Contacts
                        </button>*/}
                    <input
                        type="file"
                        accept=".xlsx, .xls"
                        style={{ display: "none" }}
                        ref={fileInputRef}
                        onChange={handleImportNumber}
                    />

                    <button
                        className="submitInDiv"
                        onClick={() => {
                            fileInputRef.current.click();
                        }}
                    >
                        Import Contacts
                    </button>
                </div>
            </div>
            {/* <div className="bodyB">
        <div className="bodyAhead">Import contacts from File</div>
        <div className="inputsDivs">
          <div className="conDiv">
            <div className="conInputDiv">
              <span className="conSpan">
                <InsertDriveFileIcon />
              </span>
              <input type="file" className="fileInput" />
            </div>
          </div>

          <div
            className="submitInDiv"
            onClick={() => {
              navigate("../contacts");
            }}
          >
            Import Contacts
          </div>
        </div>
      </div> */}
        </div>
    );
}
