import React from "react";
import { Link } from "react-router-dom";
import styles from "./Guideline.module.css";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { red } from "@mui/material/colors";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import DownloadIcon from "@mui/icons-material/Download";
import toast from "react-hot-toast";

export default function Guideline() {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");
  const [checked, setChecked] = React.useState(false);
  const Navigate = useNavigate();

  const NCASUrl = "NCAS.pdf";

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const handleCheck = () => {
    setChecked(!checked);
  };

  const handleAccept = () => {
    console.log("Accept button clicked");
    Navigate("/form");
  };

  const handleDownload = () => {
    toast.loading("Waiting...");

    setTimeout(() => {
      // Perform the download logic here

      // Update the toast with a success message
      toast.success("Download successful!", { autoClose: 3000 }); // 3000ms = 3 seconds
    }, 2000);
  };

  return (
    <div>
      <React.Fragment>
        <Button
          variant="contained"
          style={{  padding: '10px',
            fontSize: 'initial',
            border: '5px solid white',
            backgroundColor: '#5776ff00',
            borderRadius: '15px',}}
          onClick={handleClickOpen("paper")}
        >
          Apply Grant
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          scroll={scroll}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
        >
          <DialogTitle id="scroll-dialog-title" fontWeight={750}>
            Revised Guidelines for Postgraduate Grant Scheme - National Center
            for Advanced Studies (NCAS) in Humanities and Social Sciences
          </DialogTitle>
          <DialogContent dividers={scroll === "paper"}>
            <h5>1. Purpose of the Scheme: </h5>
            <DialogContentText
              id="scroll-dialog-description"
              ref={descriptionElementRef}
              tabIndex={-1}
            >
              The purpose of the Postgraduate Grant Scheme is to strengthen the
              research capacity of state universities and Higher Educational
              Institutions ((HEIs) under the University Grants Commission in the
              fields of Humanities and Social Sciences by way of financially
              supporting academics in such disciplines to acquire required
              postgraduate qualifications for their career advancement.
            </DialogContentText>

            <h5>2. General Requirements </h5>
            <DialogContentText
              id="scroll-dialog-description"
              ref={descriptionElementRef}
              tabIndex={-1}
            >
              <p>
                <span style={{ color: "black" }}>2.1 </span> The applicant shall
                be a permanent member of the academic staff of a University/HEI
                operating under the University Grants Commission and from a core
                discipline of humanities, social sciences and arts or recognized
                associated disciplines (management, law, education, library
                science etc.){" "}
              </p>

              <p>
                <span style={{ color: "black" }}>2.2 </span> The Maximum age
                limit for this grant scheme to the closing date of the
                application is as follows:
              </p>

              <p>
                <span style={{ color: "black" }}>2.3 </span> Grants shall be
                available generally for local/foreign PhDs, and MPhils leading
                to PhDs and equivalents. In exceptional circumstances grants
                shall be available for foreign Masters provided there is a
                strong justification from the Head of Department endorsed by the
                Dean of the Faculty and approved by the Vice Chancellor of the
                University/Head of the HEI.
              </p>

              <p>
                <span style={{ color: "black" }}>2.4 </span> No applicant is
                eligible for funding from the NCAS for his or her postgraduate
                studies if he/she receives financial support from the
                postgraduate funding scheme operated by the University Grants
                Commission, a Government project (i.e. World Bank, Asian
                Development Bank sponsored projects) or a recipient of
                foreign/local scholarship through the Government or a related
                institution for the same purpose. However, a candidate who has
                received partial funding support for his/her PhD/MPhil from any
                other source less than the maximum permissible level of funding
                per candidate under the NCAS grant scheme can seek additional
                funding support from the NCAS for the same study programme. All
                applicants need to declare any form of foreign and local funding
                (scholarships, tuition waivers, partial funding, research
                support, and living stipend etc.) available for his or her
                intended postgraduate studies with the application for funding.
                If such funding is available the amount/s has/have to be
                disclosed with the source/s.
                <p>
                  Applicants shall also be required to declare any subsequent
                  funding from other sources that would be available for the
                  study programme after the NCAS has decided to grant an award
                  to support his/her postgraduate studies.
                </p>
                <p>
                  The NCAS reserves the right to revise the already approved
                  grant amount at the event of revealing alternative source/s of
                  funding for the same purpose in the form of grant,
                  scholarship, tuition/ fee waiver etc.
                </p>
              </p>

              <p>
                <span style={{ color: "black" }}>2.5 </span>All applicants of
                NCAS grants for postgraduate studies are required to achieve the
                following minimum overall band score of IELTS (Academic) in
                order to qualify for a grant under this scheme.
                <p>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th></th>
                        <th></th>
                        <th>Overall minimum Band Score</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>(1)</td>
                        <td>
                          The applicants who wish to follow Doctoral (Ph.D)
                          degrees
                        </td>
                        <td>6.5</td>
                      </tr>
                      <tr>
                        <td>(II)</td>
                        <td>
                          The applicants who wish to follow Master’s Degree in
                          English Medium
                        </td>
                        <td>6.5</td>
                      </tr>
                    </tbody>
                  </Table>
                </p>
                If the IELTS requirement other than the above is specified by
                the Study University and it differs from the above, the IELTS
                requirement of the respective University will be considered as
                the IELTS requirement to be fulfilled by the candidates of the
                NCAS Grant Scheme who wish to apply for that University
                <p>
                  <p>
                    The applicants who wish to follow Masters/Doctoral program
                    in any language other than English and the expected
                    University/Institute does not require fulfilling English
                    proficiency test are exempted from IELTS bench mark
                    requirement. (This exemption will only be applicable for
                    those who wish to apply for local Universities and certain
                    other Universities that does not require English as a
                    requirement.)
                  </p>
                  <p>
                    <b>
                      (Applications can be submitted pending submission of
                      English language requirements)
                    </b>
                  </p>

                  <p>
                    The NCAS also accepts the IELTS equivalents i.e. TOFEL or
                    PTE (Academic) for this purpose.
                  </p>
                  <p>
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>English Test</th>
                          <th>Overall</th>
                          <th>Listening</th>
                          <th>Reading</th>
                          <th>Writing</th>
                          <th>Speaking</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <b>IELTS</b>
                          </td>
                          <td>6.5</td>
                          <td>06</td>
                          <td>06</td>
                          <td>06</td>
                          <td>06</td>
                        </tr>
                        <tr>
                          <td>
                            <b>TOFEL IBT</b>
                          </td>
                          <td>79-93</td>
                          <td>20-23</td>
                          <td>19-23</td>
                          <td>24-26 </td>
                          <td>20-22</td>
                        </tr>
                        <tr>
                          <td>
                            <b>PTE Academic</b>
                          </td>
                          <td>59-64</td>
                          <td>57-60 </td>
                          <td>61-64 </td>
                          <td>74-77</td>
                          <td>54-57</td>
                        </tr>
                      </tbody>
                    </Table>
                  </p>
                </p>
              </p>
              <p>
                <span style={{ color: "black" }}>2.6 </span>All applicants for
                NCAS grants are expected to register in recognized universities
                for their postgraduate studies. Therefore, it is the
                responsibility of the applicant to check the credentials of the
                intuitions and the prospective supervisor/s prior to
                registration for the intended postgraduate programme. For this
                purpose the NCAS recommends the applicants to visit the latest
                versions of the following databases recognized by the University
                Grants Commission of Sri Lanka.
                <br />
                <br />
                <p>
                  <span>1.</span>Commonwealth University book :
                  <a href="https://www.acu.ac.uk/our-members/">
                    https://www.acu.ac.uk/our-members/{" "}
                  </a>
                </p>
                <p>
                  <span>2.</span>International hand book of Universities:
                  <a href="https://www.iau-aiu.net/List-of-IAU-Members?lang=en">
                    https://www.iau-aiu.net/List-of-IAU- Members?lang=en{" "}
                  </a>
                </p>
                <p>
                  The NCAS may also request the candidate to provide the
                  credentials of prospective supervisor/s in terms of
                  his/her/their qualifications and research publications, by way
                  of a short profile/ curriculum Vitae of the intended
                  supervisor.
                </p>
              </p>

              <p>
                <span style={{ color: "black" }}>2.7 </span>All the applicants
                are required to submit a copy of the letter of registration or
                the letter of acceptance for the intended postgraduate programme
                issued by the HEI at which he/she intends to start or has
                already started his/her postgraduate studies.
              </p>
              <p>
                <span style={{ color: "black" }}>2.8 </span>The NCAS Grant
                Scheme provides a maximum of only o3 years funding for
                PhD/Doctoral studies and 02 years funding for Masters. A
                candidate applied for the NCAS funding after registration for
                his or her postgraduate studies might not be eligible for
                funding for the full period as indicated below.
                <br />
                <br />
                <p>
                  <span style={{ color: "black" }}>i. </span>A candidate applied
                  within six months of registration could be considered for
                  funding for full period of his or her studies subject to a
                  maximum of o3 years for PhD and equivalent and 02 years for
                  Master’s.
                </p>
                <p>
                  <span style={{ color: "black" }}>ii. </span>A candidate
                  applied within second six months of registration could be
                  considered for funding for 2 years and 6 months or 1 year and
                  6 months of his or her PhD or Master’s respectively.
                </p>
                <p>
                  <span style={{ color: "black" }}>iii. </span>A candidate
                  applied within third six months of registration could be
                  considered for funding for 2 years or 1year funding for his or
                  her PhD or Master’s respectively.
                </p>
                <p>
                  <span style={{ color: "black" }}>iv. </span>A candidate
                  applied within forth six months of registration could be
                  considered for funding for 1 year and 6 months of his or her
                  PhD.
                </p>
                <p>
                  <span style={{ color: "black" }}>v. </span>In case of
                  PhD/Doctoral studies, a candidate applied within sixth six
                  months of registration or after could not be considered for
                  funding under the NCAS grant scheme. Similarly, in case of
                  Master’s, a candidate applied within forth six months of
                  registration or after could not be considered for funding
                  under the NCAS grant scheme.
                </p>
                <p>
                  <span style={{ color: "black" }}>vi. </span>In case of
                  PhD/Doctoral studies, a candidate applied within sixth six
                  months of registration or after could not be considered for
                  funding under the NCAS grant scheme. Similarly, in case of
                  Master’s, a candidate applied within forth six months of
                  registration or after could not be considered for funding
                  under the NCAS grant scheme.
                </p>
              </p>

              <p>
                <span style={{ color: "black" }}>2.9 </span> In case of
                candidates registering with foreign universities/HEIS for
                his/her postgraduate studies, the amount of grant will be
                determined based on the academic fees payable to the respective
                university/HEIs by the candidate and the country specific living
                allowance subject to a maximum ceiling determined by the NCAS
                from time to time. However, living stipend could be
                proportionately reduced for the period the candidate lives in
                Sri Lanka within his period of study.
              </p>

              <p>
                <span style={{ color: "black" }}>2.10 </span> In case of
                candidates registering with local HEIs for his/her postgraduate
                studies, the amount of grant will be determined based on the
                academic fees payable to the respective HEI by the candidate and
                research expenses for the intended study.
              </p>

              <p>
                <span style={{ color: "black" }}>2.10 </span> All candidates who
                qualified to receive financial support under this scheme shall
                report periodic progress of his/her studies once in every six
                months to the NCAS through his supervisor through the proper
                channel. Non submission of due progress reports will cause for
                non-disbursement of grants on time.
                <p>
                  In addition to the half yearly progress report, each applicant
                  is required to submit
                </p>
                <p>
                  a.
                  <b>
                    Evidence of presenting his/her research findings in
                    National/International Conferences. (Minimum 1 abstract per
                    year)
                  </b>
                </p>
                <p>
                  b.
                  <b>
                    Evidence of publishing full research papers in reputed/ peer
                    reviewed/ refereed journals based on the research findings.
                    (Minimum 1 article per year) in order to release the
                    succeeding disbursement of grants.
                  </b>
                </p>
                <p>
                  In either case, the applicant must submit the manuscript
                  (abstract/ article), the place and date of
                  presenting/publication (to be proved by the cover page and the
                  content page/ the link, in the case of E-Journals),
                </p>
              </p>

              <p>
                <span style={{ color: "black" }}>2.13 </span> The candidates who
                register with foreign University/HEIs are supposed to fully
                spend his intended period of studies in respective foreign
                countries in order to disburse the full amount of grant. If they
                wish to visit Sri Lanka during the intended period of studies
                they shall inform the NCAS of such visits with justifications
                and the dates of travel. The living stipend will not cover the
                period the grantee stays in Sri Lanka.
              </p>

              <p>
                <span style={{ color: "black" }}>2.12 </span> A selected
                candidate for a NCAS award under the NCAS Postgraduate Research
                grants should fulfill all the requirements and make a formal
                request for the release of the first installment of the grant
                within a period of one year. If any candidate fails to fulfill
                this requirement his or her grant will automatically come to
                cease after one year from the award of the grant.
              </p>

              <p>
                <span style={{ color: "black" }}>2.13 </span> If the applicant
                is a probationary lecturer, not confirmed in service he/she
                should show the evidence that he/she could complete the intended
                postgraduate programme at least six months prior the expiry of
                his/her probationary period, i.e., in case of a candidate who
                wishes to use the grant for 3 year PhD programme, his/her
                probationary lecturer status should be valid (extendable) to a
                minimum of another 3 years and 6 months from the time of
                commencement of his planned studies. Moreover, every grantee
                should submit a detailed work plan of his/her studies approved
                by the supervisor within three months of commencement of his/her
                postgraduate programme.
              </p>
            </DialogContentText>

            <h5>3. Decision of the Grant: </h5>
            <DialogContentText
              id="scroll-dialog-description"
              ref={descriptionElementRef}
              tabIndex={-1}
            >
              The final decision of the grant with regard to each applicant will
              be taken by the Governing Council of the NCAS based on the
              recommendation of the panel appointed by it. The panel will peruse
              all the documents submitted by each candidate including research
              proposals and will call the candidate for an interview before
              making its recommendation.
            </DialogContentText>

            <h5>4.Documents to be submitted with the Application: </h5>
            <DialogContentText
              id="scroll-dialog-description"
              ref={descriptionElementRef}
              tabIndex={-1}
            >
              <p>
                <span>i.</span> Registration letter /Placement letter for the
                intended postgraduate programme. In case of an applicant
                intended to register with a foreign university/HEI, acceptable
                level of communication with the university/HEI is sufficient at
                the application stage.
              </p>

              <p>
                <span>ii. </span>A well written research proposal (approximately
                1500 words for Masters and 2000 words for PhDs)
              </p>

              <p>
                <span>iii. </span>A letter issued by the University/HEI where
                the applicant is employed at, certifying the availability of
                study leave
              </p>

              <p>
                <span>iv. </span>Each applicant will need to provide the details
                of two referees as specified in the application who can provide
                academic references written in English.
              </p>

              <p>
                <span>v. </span>Candidates applying after six months of his
                registration shall submit a progress report of his or her
                studies through his or her supervisor.
              </p>

              <p>
                <span>vi. </span>Documentary evidence for the relevant course
                fees payable to the intended postgraduate programme
              </p>

              <p>
                <span>vii. </span>A declaration of other sources of funding
                available for the intended study programme by way of
                scholarships partial funding, tuition waivers, living stipend
                etc. by the applicant. (any subsequent funding secured by the
                candidate should be declared to the NCAS immediately by the
                candidate)
              </p>

              <p>
                <span>vii. </span>A declaration of other sources of funding
                available for the intended study programme by way of
                scholarships partial funding, tuition waivers, living stipend
                etc. by the applicant. (any subsequent funding secured by the
                candidate should be declared to the NCAS immediately by the
                candidate)
              </p>

              <p>
                <span>viii. </span> record of research and publication by the
                candidate.
              </p>

              <p>
                <span>ix. </span> Certified copies of IELTS results sheet.
              </p>

              <p>
                <span>x. </span>The total budget of the research expenses
              </p>

              <p>
                <span>xi. </span>Credential of his/her prospective supervisors
                in terms of qualifications and research Publications. Locally
                registered candidates should provide a letter from the Registrar
                of the university certifying the name of the supervisor
                appointed by the Senate with his/her institutional affiliation.
              </p>

              <p>
                <span>xii. </span>A copy of the National Identity Card
              </p>
            </DialogContentText>

            <h5>
              <b>
                5. Documents to be submitted prior to the release of first
                installment of the grant{" "}
              </b>
            </h5>
            <DialogContentText
              id="scroll-dialog-description"
              ref={descriptionElementRef}
              tabIndex={-1}
            >
              <p>
                <b>i.</b> An applicant can request further time to submit
                documents mentioned under item ix to xi of the section for 4
                above at the time of interview if those documents are not ready.
                Such candidates are supposed to submit them prior to the release
                of first installment of the grant.
              </p>

              <p>
                <b>ii.</b>A certificate from the Vice Chancellor of the
                university or Head of the HEI where the applicant is currently
                employed whether the applicant has secured any funding in the
                form of scholarships, tuition waivers, partial funding, research
                support, and living stipend etc. from the university/HEI at
                which applicant is employed or any other local or foreign
                organization. If such funding is available the amount/s has/have
                to be disclosed with the source/s.
              </p>

              <p>
                <b>iii.</b> Every candidate shall submit an intended plan of
                activities in relation to his or her study programme including
                date of commencement and the intended date of completion. In
                this plan, intended activities shall be divided into six monthly
                periods from the date of commencement. In case of a candidate
                who is going to start or already started their postgraduate
                studies in foreign universities, and intended to spend a part of
                the study period locally, should indicate the period/s planned
                to spend locally within his intended study programme with
                justifications.
              </p>

              <p>
                <b>iv.</b> A personal health report endorsed by the University
                Medical Officer of the University at which the applicant is
                employed.
              </p>

              <p>
                <b>v.</b> A certified copy of the surety bond and the agreement
                with University/HEI including the breakdown of the bond.
              </p>

              <p>
                <b>vi.</b>A letter certifying the approval of the study leave
                for the intended postgraduate studies by the university/HEI at
                which the applicant is employed.
              </p>
            </DialogContentText>

            <FormControlLabel
              value="end"
              control={
                <Checkbox
                  sx={{ color: red[800] }}
                  checked={checked}
                  onClick={handleCheck}
                />
              }
              label={
                <Typography variant="body1" fontWeight="bold">
                  I Accept All Revised Guidelines for Postgraduate Grant Scheme
                </Typography>
              }
              labelPlacement="end"
            />
          </DialogContent>

          <DialogActions>
            <a href={NCASUrl} download>
              <Button onClick={handleDownload}>
                <DownloadIcon sx={{ color: "red" }} end />
              </Button>{" "}
            </a>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleAccept} disabled={!checked}>
              Accept
            </Button>{" "}
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </div>
  );
}
