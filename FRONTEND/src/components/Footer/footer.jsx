import React from "react";
import styles from "./footer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faDribbble,
  faTwitter,
  faGooglePlusG,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    
      <div>
        <footer
          className="text-white text-center text-lg-start"
          style={{ backgroundColor: "#17376e" }}
        >
          {/* Grid container */}
          <div className="container p-4" style={{ textAlign: "" }}>
            {/* Grid row */}
            <div className="row mt-4">
              {/* Grid column 1 */}
              <div className="col-lg-4 col-md-12 mb-4 mb-md-0">
                <h5 className="text-uppercase mb-4">About Grant</h5>
                <p>
                  At vero eos et accusamus et iusto odio dignissimos ducimus qui
                  blanditiis praesentium voluptatum deleniti atque corrupti.
                </p>
                <p>
                  Blanditiis praesentium voluptatum deleniti atque corrupti quos
                  dolores et quas molestias.
                </p>
                <div className="mt-4 p-lg-4 ">
                  {/* Facebook */}
                  <a
                    href="#"
                    className="btn btn-floating btn-primary m-3 btn-lg pd-5"
                  >
                    <FontAwesomeIcon icon={faFacebookF} />
                  </a>
                  {/* Dribbble */}
                  <a
                    href="#"
                    className="btn btn-floating btn-primary m-3 btn-lg"
                  >
                    <FontAwesomeIcon icon={faDribbble} />
                  </a>
                  {/* Twitter */}
                  <a
                    href="#"
                    className="btn btn-floating btn-primary m-3 btn-lg"
                  >
                    <FontAwesomeIcon icon={faTwitter} />
                  </a>
                  {/* Google + */}
                  <a
                    href="#"
                    className="btn btn-floating btn-primary m-3 btn-lg"
                  >
                    <FontAwesomeIcon icon={faGooglePlusG} />
                  </a>
                  {/* Linkedin */}
                </div>
              </div>

              {/* Grid column 2 */}
              <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
                <ul className="fa-ul" style={{ marginLeft: "3.65em" }}>
                  <li className="mb-2">
                    <span className="fa-li">
                      <i className="fas fa-home"></i>
                    </span>
                    <span className="ms-2">
                      6A , Sukahastan Gardens, Ward Place
                    </span>
                  </li>
                  <li className="mb-2">
                    <span className="fa-li">
                      <i className="fas fa-envelope"></i>
                    </span>
                    <span className="ms-2">Colombo -07</span>
                  </li>
                  <li className="mb-2">
                    <span className="fa-li">
                      <i className="fas fa-envelope"></i>
                    </span>
                    <span className="ms-2">000700</span>
                  </li>
                  <li className="mb-3">
                    <span className="fa-li">
                      <i className="fas fa-envelope"></i>
                    </span>
                    <span className="ms-2">Sri Lanka</span>
                  </li>

                  <li className="mb-2">
                    <span className="fa-li">
                      <i className="fas fa-envelope"></i>
                    </span>
                    <span className="ms-2">info@ncas.ac.</span>
                  </li>
                  <li className="mb-3">
                    <span className="fa-li">
                      <i className="fas fa-phone"></i>
                    </span>
                    <span className="ms-2">+ 11 268 5850</span>
                  </li>
                </ul>
              </div>

              {/* Grid column 3 */}
              <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
                <h5 className="text-uppercase mb-4">Opening hours</h5>
                <table
                  className="table text-center text-white"
                  style={{ opacity: 0.8 }}
                >
                  <tbody className="font-weight-normal">
                    <tr>
                      <td>Mon - Thu:</td>
                      <td>8am - 9pm</td>
                    </tr>
                    <tr>
                      <td>Fri - Sat:</td>
                      <td>8am - 1am</td>
                    </tr>
                    <tr>
                      <td>Sunday:</td>
                      <td>9am - 10pm</td>
                    </tr>
                    <tr>
                      <td>Mon - Thu:</td>
                      <td>8am - 9pm</td>
                    </tr>
                    <tr>
                      <td>Fri - Sat:</td>
                      <td>8am - 1am</td>
                    </tr>
                    <tr>
                      <td>Sunday:</td>
                      <td>9am - 10pm</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div
            className="text-center p-3"
            style={{ backgroundColor: " #181922d9" }}
          >
            © 2024 Copyright :
            <a className="text-white" href="https://ncas.ac.lk/">
              National Centre for Advanced Studies in Humanities & Social
              Science
            </a>
          </div>
        </footer>
      </div>

  );
};

export default Footer;
