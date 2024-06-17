import React, { useEffect, useState } from "react";
import "../SCSS/contactsPage.scss";
import PersonIcon from "@mui/icons-material/Person";
import DialpadIcon from "@mui/icons-material/Dialpad";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { linkNode } from "../nodelink";

export default function CreateContactPage() {
  const navigate = useNavigate();
  const selector = useSelector((state) => state.contactReducer);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const { contact } = selector;
  const user = useSelector((state) => state.userReducer.user);

  useEffect(() => {
    try {
<<<<<<< HEAD
=======
      console.log(contact);
>>>>>>> 4a40780c8889de48ef17dbc976686d1b35c7ba12
      if (contact) {
        setName(contact.name);
        setNumber(contact.number);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  let handleSubmit = async () => {
    try {
      if (!contact) {
<<<<<<< HEAD
=======
        console.log(name, number);

>>>>>>> 4a40780c8889de48ef17dbc976686d1b35c7ba12
        let dataObj = {
          name: name,
          number: number,
        };
        await axios
          .post(`${linkNode}/setcontacts`, { ...dataObj, user })
          .then((res) => {
<<<<<<< HEAD
            navigate("../contacts");
          });
      } else {
=======
            console.log(res.data.message);
            navigate("../contacts");
          });
      } else {
        console.log(name, number);

>>>>>>> 4a40780c8889de48ef17dbc976686d1b35c7ba12
        let dataObj = {
          name: name,
          number: number,
        };
        await axios
          .post(`${linkNode}/editcontacts`, { dataObj, contact })
          .then((res) => {
<<<<<<< HEAD
=======
            console.log(res.data.message);
>>>>>>> 4a40780c8889de48ef17dbc976686d1b35c7ba12
            navigate("../contacts");
          });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="createContactPage">
      <div className="header">
        <div className="headerTitle">
          {contact ? "Edit Contact" : "Add new Contact"}
        </div>
      </div>
      <div className="bodyA">
        <div className="inputsDivs">
          <div className="conDiv">
            <div className="conInputDiv">
              <span className="conSpan">
                <PersonIcon />
              </span>
              <input
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                type="text"
                className="conInput"
                placeholder="name"
              />
            </div>
          </div>
          <div className="conDiv">
            <div className="conInputDiv">
              <span className="conSpan">
                <DialpadIcon />
              </span>
              <input
                value={number}
                onChange={(e) => {
                  setNumber(e.target.value);
                }}
                type="text"
                className="conInput"
                placeholder="mobile"
              />
            </div>
          </div>
<<<<<<< HEAD
          <button
=======
          <div
>>>>>>> 4a40780c8889de48ef17dbc976686d1b35c7ba12
            className="submitInDiv"
            onClick={() => {
              handleSubmit();
            }}
          >
            submit
<<<<<<< HEAD
          </button>
=======
          </div>
>>>>>>> 4a40780c8889de48ef17dbc976686d1b35c7ba12
        </div>
      </div>
    </div>
  );
}
