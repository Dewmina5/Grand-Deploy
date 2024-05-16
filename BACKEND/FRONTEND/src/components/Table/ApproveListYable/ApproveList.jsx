import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { getImageUrl } from "../../../utils";
import "./ApproveList.css";
import axios from "axios";
import toast from "react-hot-toast";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";

export default function ApproveList() {
  const [search, setSearch] = useState("");
  const [Users, setUsers] = useState([]);

  const userInfoString = localStorage.getItem("UserInfo");
  const storedUserInfo = JSON.parse(userInfoString);

  const univercityName = storedUserInfo.Univercity;

  const conponentPDF = useRef(null);

  console.log(search);

  useEffect(() => {
    function getSystemUsers() {
      axios
        .get(
          "http://localhost:8000/api/grant/view-application-univercity/" +
            univercityName,
          getSystemUsers
        )
        .then((res) => {
          console.log(res.data.grantApplications);
          setUsers(res.data.grantApplications);

          toast.success("Data Fetched Successfully!", {
            duration: 3000, // 3 seconds
            position: "top-right", // You can change the position if needed
          });
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    getSystemUsers();
  }, []);

  return (
    <div id="AllSupplier">
      <main className="table">
        <section className="table__header">
          <Link
            to="/aprov-home"
            style={{
              textDecoration: "none",
              backgroundColor: "transparent !important",
            }}
          >
            <h1 style={{ fontFamily: "serif", fontWeight: "600" }}>
              University Grant Applicant Details...
            </h1>
          </Link>
          <div className="input-group">
            <input
              type="search"
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Data..."
            />
          </div>

          <div className="export__file">
            <label
              htmlFor="export-file"
              className="export__file-btn"
              title="Export File"
            >
              <i className="bx bx-menu "></i>
            </label>
            <input type="checkbox" id="export-file" />
            <div className="export__file-options">
              <label>Export As &nbsp; &#10140;</label>
              <label htmlFor="export-file" id="toPDF">
                PDF <img src={getImageUrl("NAV/pdf.png")} alt="" />
              </label>
            </div>
          </div>
        </section>
        <section className="table__body">
          <div ref={conponentPDF} style={{ width: "100%" }}>
            <table>
              <thead>
                <tr>
                  <th>Full Name</th>
                  <th>Current UniverSity</th>
                  <th>Email</th>
                  <th>NIC</th>
                  <th>Status</th>
                  <th>Option</th>
                </tr>
              </thead>
              <tbody>
                {Users && Users.length > 0 ? (
                  Users.filter((dataobj1) => {
                    const lowercaseSearch = search.toLocaleLowerCase();
                    const lowerFirstName = dataobj1.familyName.toLowerCase();
                    const lowerCaseLastName = dataobj1.firstName.toLowerCase();
                    const lowerCaseNIC = dataobj1.nic.toLowerCase();

                    return (
                      lowercaseSearch === "" ||
                      lowerFirstName.includes(lowercaseSearch) ||
                      lowerCaseLastName.includes(lowercaseSearch) ||
                      lowerCaseNIC.includes(lowercaseSearch)
                    );
                  }).map((dataobj) => (
                    <tr key={dataobj._id}>
                      <td style={{ textAlign: "left" }}>
                        <img
                          src={dataobj.photographUrl}
                          alt=""
                          style={{ margin: "10px" }}
                        />
                        {dataobj.firstName} {dataobj.familyName}
                      </td>
                      <td>{dataobj.educationTableData[0].university}</td>
                      <td>{dataobj.email}</td>
                      <td>{dataobj.nic} </td>
                      <td>
                        <a
                          style={{
                            padding: "8px",
                            border: "none",
                            borderRadius: "7px",
                            backgroundColor:
                              dataobj.DHApprooved === "pending" ||
                              dataobj.VCApprooved === "pending" ||
                              dataobj.FHApprooved === "pending"
                                ? "#388e3c" // Green background for Pending
                                : "red", // Red background for Rejected
                            color: "white",
                            fontWeight: "600",
                          }}
                        >
                          {dataobj.DHApprooved === "pending" ||
                          dataobj.VCApprooved === "pending" ||
                          dataobj.FHApprooved === "pending"
                            ? "Pending..."
                            : "Rejected"}
                        </a>
                      </td>
                      <td style={{ marginLeft: "auto" }}>
                        <Link to={`/aprove-home/viewapplication/${dataobj.email}`}>
                          <button
                            className="bx bx-info-circle bx-xs btn btn-outline-primary"
                            style={{ margin: "1px" }}
                          ></button>
                        </Link>
                        <Link to={`/aprove-home/Aprrove-sheet/${dataobj._id}`}>
                          <button
                            className="bx bx-pencil bx-xs btn btn-outline-success"
                            style={{ margin: "1px" }}
                          ></button>
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      style={{ textAlign: "center", color: "GrayText" }}
                    >
                      <center>
                        <PriorityHighIcon />
                      </center>
                      No Users in System.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
