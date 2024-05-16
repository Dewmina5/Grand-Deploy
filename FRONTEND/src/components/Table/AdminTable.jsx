import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { getImageUrl } from "../../utils";
import "./AdminTable.css";
import axios from "axios";
import toast from "react-hot-toast";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";

export default function AdminTable() {
  const [search, setSearch] = useState("");
  const [Users, setUsers] = useState([]);

  const conponentPDF = useRef(null);

  console.log(search);

  useEffect(() => {
    function getSystemUsers() {
      axios
        .get("http://localhost:8000/api/admin/getSYSusers", getSystemUsers)
        .then((res) => {
          console.log(res.data.SystemUsers);
          setUsers(res.data.SystemUsers);

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
            to="/admin-nav"
            style={{
              textDecoration: "none",
              backgroundColor: "transparent !important",
            }}
          >
            <h1 style={{ fontFamily: "serif", fontWeight: "600" }}>
              System User's Details...
            </h1>
          </Link>
          <div className="input-group">
            <input
              type="search"
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Data..."
            />
          </div>
          <Link to="/admin-nav/registration">
            <Button variant="outline-primary" size="md">
              Add Administrator
            </Button>
          </Link>
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
                  <th>Administrator Name</th>
                  <th>Email</th>
                  <th>UniverSity</th>
                  <th>Position</th>
                  <th>UserName</th>
                  <th>Option</th>
                </tr>
              </thead>
              <tbody>
                {Users && Users.length > 0 ? (
                  Users.filter((dataobj1) => {
                    const lowercaseSearch = search.toLocaleLowerCase();
                    const lowerFirstName = dataobj1.FirstName.toLowerCase();
                    const lowerCaseLastName = dataobj1.LastName.toLowerCase();
                    const lowerCaseUnivercity =
                      dataobj1.Univercity.toLowerCase();
                    const lowerCaseUnivercityPosition =
                      dataobj1.UnivercityPosition.toLowerCase();
                    const lowerCaseAdminisrationPosition =
                      dataobj1.AdminisrationPosition.toLowerCase();

                    return (
                      lowercaseSearch === "" ||
                      lowerFirstName.includes(lowercaseSearch) ||
                      lowerCaseLastName.includes(lowercaseSearch) ||
                      lowerCaseUnivercity.includes(lowercaseSearch) ||
                      lowerCaseUnivercityPosition.includes(lowercaseSearch) ||
                      lowerCaseAdminisrationPosition.includes(lowercaseSearch)
                    );
                  }).map((dataobj) => (
                    <tr key={dataobj._id}>
                      <td style={{ textAlign: "left" }}>
                        <img
                          src="https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg"
                          alt=""
                          style={{ margin: "10px" }}
                        />
                        {dataobj.FirstName} {dataobj.LastName}
                      </td>
                      <td>{dataobj.Email}</td>
                      <td>{dataobj.Univercity}</td>
                      <td>
                        {dataobj.UnivercityPosition === "Other"
                          ? dataobj.AdminisrationPosition
                          : dataobj.UnivercityPosition}{" "}
                      </td>
                      <td>{dataobj.UserName}</td>
                      <td style={{ marginLeft: "auto" }}>
                        <button
                          className="bx bx-trash bx-xs btn btn-outline-danger"
                          style={{ margin: "1px" }}
                        ></button>
                        <Link to={`/Admin/Sup/Profile/${dataobj._id}`}>
                          <button
                            className="bx bx-info-circle bx-xs btn btn-outline-primary"
                            style={{ margin: "1px" }}
                            //
                          ></button>
                        </Link>
                        <Link to={`/Admin/profile/update/${dataobj._id}`}>
                          <button
                            className="bx bx-pencil bx-xs btn btn-outline-warning"
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
