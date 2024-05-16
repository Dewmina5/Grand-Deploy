import React from 'react';
import styles from "../styles/AdminProfile.module.css";
import axios from 'axios';
import AdminHeader from '../components/AdminHeader/AdminHeader';
import UserSideBar from '../components/UserSideBar/UserSidebar';
import formStyle from '../styles/formStyle.module.css';
import { useState, useRef, useEffect } from 'react';
import { Container, Form, Row, Col } from 'react-bootstrap';
import { Box, Stepper, Step, StepLabel, Button, Typography, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Table, Switch } from '@mui/material';
import Textarea from '@mui/joy/Textarea';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';

const steps = ['Personal Information', 'Details Of the Study', 'Financial Information', 'University Approval'];

const UserFormViewScreen = () => {

    const [sidebarActive, setSidebarActive] = useState(true);
    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set());
    const [userFormData, setUserFormData] = useState('');
    const userInfoString = localStorage.getItem("UserInfo");
    const storedUserInfo = JSON.parse(userInfoString);

    const userID = storedUserInfo.Email;

    console.log(userFormData);
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/grant/view-single-application-ByEmail/' + userID); // Make request to backend API endpoint
            setUserFormData(response.data.GrantAplication); // Update state with retrieved data
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [userID])

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const handleReset = () => {
        setActiveStep(0);
    };
    const isStepOptional = (step) => {
        return step === 1 || step === 0 || step === 2;
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };
    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);

    };

    const toggleSidebar = () => {
        setSidebarActive(!sidebarActive);
    };



    return (
        <div className={styles.bodyD}>
            <div>
                <UserSideBar sidebarActive={sidebarActive}
                    toggleSidebar={toggleSidebar} />
            </div>

            <div
                style={{
                    marginTop: "25px",
                    marginLeft: sidebarActive ? "250px" : "80px",
                    justifyContent: sidebarActive ? "center" : "right",
                    transition: " all 0.6s ease",
                }}
            >

                <Container style={{ padding: '20px' }} >
                    <Box sx={{ width: '100%' }}>
                        <Stepper activeStep={activeStep}>
                            {steps.map((label, index) => {
                                const stepProps = {};
                                const labelProps = {};
                                if (isStepOptional(index)) {
                                    labelProps.optional = (
                                        <Typography variant="caption">Optional</Typography>
                                    );
                                }
                                if (isStepSkipped(index)) {
                                    stepProps.completed = false;
                                }
                                return (
                                    <Step key={label} {...stepProps}>
                                        <StepLabel {...labelProps}>{label}</StepLabel>
                                    </Step>
                                );
                            })}
                        </Stepper>
                        {activeStep === steps.length ? (
                            <React.Fragment>
                                <Typography sx={{ mt: 2, mb: 1 }}>
                                    All steps completed - you&apos;re finished
                                </Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                    <Box sx={{ flex: '1 1 auto' }} />
                                    <Button onClick={handleReset}>Reset</Button>
                                </Box>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <Row>
                                    <Col>
                                        {activeStep === 0 && (
                                            <div className={formStyle.formDiv}>
                                                <Row>
                                                    <Form >
                                                        <Row>
                                                            <Col>
                                                                <Form.Group controlId="familyNameInput">
                                                                    <Form.Label>Family name <span style={{ color: 'red' }}>*</span></Form.Label>
                                                                    <Form.Control type="text" placeholder="Family name" value={userFormData.familyName} readOnly />
                                                                </Form.Group>
                                                            </Col>
                                                            <Col>
                                                                <Form.Group controlId="firstNameInput">
                                                                    <Form.Label>First name <span style={{ color: 'red' }}>*</span></Form.Label>
                                                                    <Form.Control type="text" placeholder="First name" value={userFormData.firstName} readOnly />
                                                                </Form.Group>
                                                            </Col>
                                                            <Col>
                                                                <center>
                                                                    <div style={{ height: '150px' }} >
                                                                        <img src={userFormData.photographUrl} alt="Image Preview" style={{ maxWidth: '100%', maxHeight: '150px', borderRadius: '50%', display: 'inline-block', }} />
                                                                    </div>
                                                                </center>
                                                            </Col>
                                                        </Row>

                                                        <Row>
                                                            <Col>

                                                                <Form.Group controlId="firstNameInput">
                                                                    <Form.Label>Gender <span style={{ color: 'red' }}>*</span></Form.Label>
                                                                    <Form.Control type="text" placeholder="Gender" value={userFormData.gender} readOnly />
                                                                </Form.Group>

                                                            </Col>
                                                            <Col>
                                                                <Form.Group controlId="firstNameInput">
                                                                    <Form.Label>Date of Birth <span style={{ color: 'red' }}>*</span></Form.Label>
                                                                    <Form.Control type="text" placeholder="Gender" value={userFormData.dateOfBirth} readOnly />
                                                                </Form.Group>

                                                            </Col>
                                                            <Col>

                                                                <>
                                                                    <p>
                                                                        <b>Age at the time of closing the application</b>
                                                                    </p>
                                                                    <p>
                                                                        Age: {userFormData.age && userFormData.age.years} years,  {userFormData.age && userFormData.age.months} months,  {userFormData.age && userFormData.age.days} days
                                                                    </p>
                                                                </>

                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col>
                                                                <Form.Group controlId="nicInput">
                                                                    <Form.Label>NIC<span style={{ color: 'red' }}>*</span> </Form.Label>
                                                                    <Form.Control value={userFormData.nic} type="text" placeholder="NIC" />
                                                                </Form.Group>
                                                            </Col>
                                                            <Col>
                                                            </Col>
                                                        </Row>
                                                        <br />
                                                        <Row>
                                                            <Col>
                                                                <Form.Label>
                                                                    Address to which correspondence should be sent{" "}
                                                                    <span style={{ color: "red" }}>*</span>
                                                                </Form.Label>
                                                                <br></br>
                                                                <FormLabel>Home, Street</FormLabel>
                                                                <Textarea
                                                                    minRows={2}
                                                                    value={userFormData.permanentAddress && userFormData.permanentAddress.street}

                                                                    required
                                                                />
                                                                <FormLabel>
                                                                    City<span style={{ color: "red" }}>*</span>
                                                                </FormLabel>
                                                                <Form.Control
                                                                    type="text"
                                                                    placeholder="City"
                                                                    value={userFormData.permanentAddress && userFormData.permanentAddress.city}

                                                                    required
                                                                />
                                                                <FormLabel>
                                                                    CV PDF
                                                                </FormLabel>
                                                                <br />
                                                                <br></br>
                                                                <a href={userFormData.cvPdfLink} target="_blank" style={{
                                                                    textDecoration: ' none',
                                                                    color: 'black',
                                                                    backgroundColor: '#dd7e7e',
                                                                    padding: "10px",
                                                                    borderRadius: '10px',
                                                                    marginLeft: '4%'
                                                                }}>View PDF<img src={"assets/NAV/pdf.png"} width={25} /></a>
                                                            </Col>

                                                            <Col>
                                                                <Row>
                                                                    <Form.Group controlId="formBasicEmail">
                                                                        <Form.Label>E Mail<span style={{ color: 'red' }}>*</span></Form.Label>
                                                                        <Form.Control value={userFormData.email} type="email" placeholder="Email" />
                                                                    </Form.Group>

                                                                </Row>
                                                                <br />
                                                                <Row>
                                                                    <Form.Group controlId="phoneNumberInput">
                                                                        <Form.Label>Tel<span style={{ color: 'red' }}>*</span></Form.Label>
                                                                        <Form.Control value={userFormData.telephoneNo} type="text" placeholder="Tel" />
                                                                    </Form.Group>

                                                                </Row>
                                                                <br />
                                                                <Row>
                                                                    <Form.Group controlId="faxInput">
                                                                        <Form.Label>Fax<span style={{ color: 'red' }}>*</span></Form.Label>
                                                                        <Form.Control value={userFormData.fax} type="text" placeholder="Fax" />
                                                                    </Form.Group>

                                                                </Row>
                                                            </Col>
                                                        </Row>
                                                        <br />
                                                        <Row>
                                                            <h5> University Education</h5> <p>Give full details in chronological order. (From latest to the Oldest)</p>
                                                        </Row>

                                                        <Row>
                                                            <TableContainer component={Paper}>
                                                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                                                    <TableHead>
                                                                        <TableRow>
                                                                            <TableCell>From Month/year</TableCell>
                                                                            <TableCell >To Month/year (Degree effective date)</TableCell>
                                                                            <TableCell >University (name, place) </TableCell>
                                                                            <TableCell >Certificates, Degrees obtained</TableCell>
                                                                            <TableCell >Main field(s) or Subject(s) of study</TableCell>
                                                                            <TableCell >Certificate</TableCell>
                                                                        </TableRow>
                                                                    </TableHead>
                                                                    <TableBody>
                                                                        {userFormData.educationTableData && userFormData.educationTableData.map((row, index) => (
                                                                            <TableRow >
                                                                                <TableCell>
                                                                                    <TextField id="standard-basic" variant="standard" value={row.fromMonthYear}
                                                                                    />
                                                                                </TableCell>
                                                                                <TableCell>
                                                                                    <TextField id="standard-basic" variant="standard" value={row.toMonthYear}
                                                                                    />
                                                                                </TableCell>
                                                                                <TableCell>
                                                                                    <TextField id="standard-basic" variant="standard" value={row.university}
                                                                                    />
                                                                                </TableCell>
                                                                                <TableCell>
                                                                                    <TextField id="standard-basic" variant="standard" value={row.degreesObtained}
                                                                                    />
                                                                                </TableCell>
                                                                                <TableCell>
                                                                                    <TextField id="standard-basic" variant="standard" value={row.fieldsOfStudy}
                                                                                    />
                                                                                </TableCell>
                                                                                <TableCell>
                                                                                    <a href={userFormData.certificatesPdfs && userFormData.certificatesPdfs[index]} target="_blank" style={{
                                                                                        textDecoration: ' none',
                                                                                        color: 'black',
                                                                                        backgroundColor: '#dd7e7e',
                                                                                        borderRadius: '10px',
                                                                                        marginLeft: '4%'
                                                                                    }}>View PDF</a>
                                                                                </TableCell>

                                                                            </TableRow>
                                                                        ))}
                                                                    </TableBody>
                                                                </Table>
                                                            </TableContainer>

                                                        </Row>
                                                        <br />
                                                        <Row>
                                                            <h5> Current university,</h5>
                                                        </Row>
                                                        <Row>
                                                            <Col>
                                                                <Form.Group>
                                                                    <Form.Label>Depatment Head Email <span style={{ color: 'red' }}>*</span></Form.Label>
                                                                    <Form.Control value={userFormData.DepartmentHeadEmail} type="email" placeholder="Depatment Head Email" />
                                                                </Form.Group>
                                                            </Col>
                                                            <Col>
                                                                <Form.Group>
                                                                    <Form.Label>Facalty Head Email<span style={{ color: 'red' }}>*</span></Form.Label>
                                                                    <Form.Control value={userFormData.FacaltyHeadEmail} type="email" placeholder="Facalty Head Email" />
                                                                </Form.Group>
                                                            </Col>
                                                            <Col>
                                                                <Form.Group>
                                                                    <Form.Label>University Head Email<span style={{ color: 'red' }}>*</span></Form.Label>
                                                                    <Form.Control value={userFormData.UnivercityHeadEmail} type="email" placeholder="University Head Email" />
                                                                </Form.Group>
                                                            </Col>
                                                        </Row>
                                                        <br></br>
                                                        <Row>
                                                            <h5> Language Capability
                                                            </h5> <p>Indicate whether
                                                                Average
                                                                Good or
                                                                Excellent
                                                                Type an asterisk next to your
                                                                mother tongue</p>
                                                        </Row>
                                                        <Row>
                                                            <TableContainer component={Paper}>
                                                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                                                    <TableHead>
                                                                        <TableRow>
                                                                            <TableCell > </TableCell>
                                                                            <TableCell >Speaking</TableCell>
                                                                            <TableCell >Reading </TableCell>
                                                                            <TableCell >Writing </TableCell>
                                                                        </TableRow>

                                                                    </TableHead>
                                                                    <TableBody>

                                                                        <TableRow >
                                                                            <TableCell>
                                                                                Sinhala
                                                                            </TableCell>
                                                                            <TableCell>
                                                                                <p>{userFormData.SinhalaSkill && userFormData.SinhalaSkill.speaking}</p>
                                                                            </TableCell>
                                                                            <TableCell>
                                                                                <p>{userFormData.SinhalaSkill && userFormData.SinhalaSkill.reading}</p>
                                                                            </TableCell>
                                                                            <TableCell>
                                                                                <p>{userFormData.SinhalaSkill && userFormData.SinhalaSkill.writing}</p>
                                                                            </TableCell>
                                                                        </TableRow>

                                                                        <TableRow >
                                                                            <TableCell>
                                                                                Tamil
                                                                            </TableCell>
                                                                            <TableCell>
                                                                                <p>{userFormData.TamilSkill && userFormData.TamilSkill.speaking}</p>
                                                                            </TableCell>
                                                                            <TableCell>
                                                                                <p>{userFormData.TamilSkill && userFormData.TamilSkill.reading}</p>
                                                                            </TableCell>
                                                                            <TableCell>
                                                                                <p>{userFormData.TamilSkill && userFormData.TamilSkill.writing}</p>
                                                                            </TableCell>
                                                                        </TableRow>

                                                                        <TableRow >
                                                                            <TableCell>
                                                                                English
                                                                            </TableCell>
                                                                            <TableCell>
                                                                                <p>{userFormData.EnglishSkill && userFormData.EnglishSkill.speaking}</p>
                                                                            </TableCell>
                                                                            <TableCell>
                                                                                <p>{userFormData.EnglishSkill && userFormData.EnglishSkill.reading}</p>
                                                                            </TableCell>
                                                                            <TableCell>
                                                                                <p>{userFormData.EnglishSkill && userFormData.EnglishSkill.writing}</p>
                                                                            </TableCell>
                                                                        </TableRow>

                                                                    </TableBody>
                                                                </Table>
                                                            </TableContainer>
                                                        </Row>

                                                        <br />
                                                        <Row>
                                                            <h5> Employment Record.</h5> <p>Starting with your present post, list in reverse order positions held.</p>
                                                        </Row>

                                                        <Row>
                                                            {userFormData.employmentTableData && userFormData.employmentTableData.length > 0 ? (<><TableContainer component={Paper}>
                                                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                                                    <TableHead>
                                                                        <TableRow>
                                                                            <TableCell colSpan={2}>Period (Month/Year) </TableCell>
                                                                            <TableCell rowSpan={2} >Exact title of your post</TableCell>
                                                                            <TableCell rowSpan={2} >Faculty </TableCell>
                                                                            <TableCell rowSpan={2} >Department </TableCell>
                                                                            <TableCell rowSpan={2} >Name of the University</TableCell>
                                                                            <TableCell rowSpan={2} >Current University</TableCell>

                                                                        </TableRow>
                                                                        <TableRow>
                                                                            <TableCell >From </TableCell>
                                                                            <TableCell >To </TableCell>
                                                                        </TableRow>
                                                                    </TableHead>
                                                                    <TableBody>
                                                                        {userFormData.employmentTableData && userFormData.employmentTableData.map((row) => (
                                                                            <TableRow >
                                                                                <TableCell>
                                                                                    <TextField id="standard-basic" variant="standard" value={row.fromMonthYear}
                                                                                    />
                                                                                </TableCell>
                                                                                <TableCell>
                                                                                    <TextField id="standard-basic" variant="standard" value={row.toMonthYear}
                                                                                    />
                                                                                </TableCell>
                                                                                <TableCell>
                                                                                    <TextField id="standard-basic" variant="standard" value={row.exactPost}
                                                                                    />
                                                                                </TableCell>
                                                                                <TableCell>
                                                                                    <TextField id="standard-basic" variant="standard" value={row.faculty}
                                                                                    />
                                                                                </TableCell>
                                                                                <TableCell>
                                                                                    <TextField id="standard-basic" variant="standard" value={row.department}
                                                                                    />
                                                                                </TableCell>
                                                                                <TableCell>
                                                                                    <TextField id="standard-basic" variant="standard" value={row.universityName}
                                                                                    />
                                                                                </TableCell>
                                                                                <TableCell>
                                                                                    <TextField id="standard-basic" variant="standard" value={row.isCurrent}
                                                                                    />
                                                                                </TableCell>


                                                                            </TableRow>
                                                                        ))}

                                                                    </TableBody>
                                                                </Table>
                                                            </TableContainer></>) : (<>
                                                                <Row>
                                                                    <Col>
                                                                        No data
                                                                    </Col>
                                                                </Row>
                                                            </>)}


                                                        </Row>
                                                        <br />
                                                        <Row>
                                                            <h5> References </h5>
                                                        </Row>

                                                        <Row>
                                                            <TableContainer component={Paper}>
                                                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                                                    <TableHead>
                                                                        <TableRow>
                                                                            <TableCell >Name </TableCell>
                                                                            <TableCell >Fax </TableCell>
                                                                            <TableCell >E-mail </TableCell>
                                                                            <TableCell >Position </TableCell>

                                                                        </TableRow>

                                                                    </TableHead>
                                                                    <TableBody>
                                                                        {userFormData.references && (<>
                                                                            <TableRow >
                                                                                <TableCell>
                                                                                    <TextField id="standard-basic" variant="standard"
                                                                                        value={userFormData.references[0].name}

                                                                                    />
                                                                                </TableCell>

                                                                                <TableCell>
                                                                                    <TextField id="standard-basic" variant="standard"
                                                                                        value={userFormData.references[0].fax}
                                                                                    />
                                                                                </TableCell>
                                                                                <TableCell>
                                                                                    <TextField id="standard-basic" variant="standard"
                                                                                        value={userFormData.references[0].email}
                                                                                    />
                                                                                </TableCell>
                                                                                <TableCell>
                                                                                    <TextField id="standard-basic" variant="standard"
                                                                                        value={userFormData.references[0].position}
                                                                                    />
                                                                                </TableCell>

                                                                            </TableRow>
                                                                            <TableRow >
                                                                                <TableCell>
                                                                                    <TextField id="standard-basic" variant="standard"
                                                                                        value={userFormData.references[1].name}

                                                                                    />
                                                                                </TableCell>

                                                                                <TableCell>
                                                                                    <TextField id="standard-basic" variant="standard"
                                                                                        value={userFormData.references[1].fax}

                                                                                    />
                                                                                </TableCell>
                                                                                <TableCell>
                                                                                    <TextField id="standard-basic" variant="standard"
                                                                                        value={userFormData.references[1].email}

                                                                                    />
                                                                                </TableCell>
                                                                                <TableCell>
                                                                                    <TextField id="standard-basic" variant="standard"
                                                                                        value={userFormData.references[1].position}

                                                                                    />
                                                                                </TableCell>

                                                                            </TableRow></>)}

                                                                    </TableBody>
                                                                </Table>
                                                            </TableContainer>
                                                        </Row>
                                                        <h5>7) Publications(Abstracts/ Full papers)</h5>
                                                        <Row>
                                                            <TableContainer component={Paper}>
                                                                <Table
                                                                    sx={{ minWidth: 650 }}
                                                                    aria-label="simple table"
                                                                >
                                                                    <TableHead>
                                                                        <TableRow>
                                                                            <TableCell>Title</TableCell>
                                                                            <TableCell>Publisher</TableCell>
                                                                            <TableCell>Place </TableCell>
                                                                            <TableCell>Date </TableCell>
                                                                            <TableCell>
                                                                                Attach the publication
                                                                            </TableCell>
                                                                            <TableCell></TableCell>
                                                                        </TableRow>
                                                                    </TableHead>
                                                                    <TableBody>
                                                                        {userFormData.publications && userFormData.publications.length > 0 && userFormData.publications.map((row, index) => (
                                                                            <TableRow>
                                                                                <TableCell>
                                                                                    {console.log("row" + row.title)}
                                                                                    <TextField
                                                                                        id="standard-basic"
                                                                                        variant="standard"
                                                                                        value={row.title}

                                                                                    />
                                                                                </TableCell>
                                                                                <TableCell>
                                                                                    <TextField
                                                                                        id="standard-basic"
                                                                                        variant="standard"
                                                                                        value={row.publisher}

                                                                                    />
                                                                                </TableCell>
                                                                                <TableCell>
                                                                                    <TextField
                                                                                        id="standard-basic"
                                                                                        variant="standard"
                                                                                        value={row.place}

                                                                                    />
                                                                                </TableCell>
                                                                                <TableCell>
                                                                                    <TextField
                                                                                        id="standard-basic"
                                                                                        variant="standard"
                                                                                        value={row.date}

                                                                                    />
                                                                                </TableCell>
                                                                                <TableCell>
                                                                                    <Col>
                                                                                        <a href={userFormData.publicationPdfs[index]} target="_blank" style={{
                                                                                            textDecoration: ' none',
                                                                                            color: 'black',
                                                                                            backgroundColor: '#dd7e7e',
                                                                                            padding: "10px",
                                                                                            borderRadius: '10px',
                                                                                            marginLeft: '4%'
                                                                                        }}>View PDF<img src={"assets/NAV/pdf.png"} width={25} /></a>
                                                                                    </Col>
                                                                                </TableCell>
                                                                            </TableRow>
                                                                        ))}
                                                                    </TableBody>
                                                                </Table>
                                                            </TableContainer>

                                                        </Row>
                                                    </Form>
                                                </Row>
                                            </div>
                                        )}
                                    </Col>
                                </Row>
                                {activeStep === 1 && (
                                    <div className={formStyle.formDiv}>
                                        <Row>
                                            <Form >
                                                <Row>
                                                    <Col>
                                                        <FormLabel id="demo-row-radio-buttons-group-label">Degree Sought:</FormLabel>
                                                        {userFormData.degreeSought}

                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col>
                                                        <Form.Group controlId="">
                                                            <Form.Label>Title of Research</Form.Label>
                                                            <Form.Control type="text" placeholder="Title of Research" value={userFormData.titleOfResearch} />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col>
                                                        <Form.Group controlId="">
                                                            <Form.Label>Research Field (Please specify)</Form.Label>
                                                            <Form.Control type="text" placeholder="Research Field" value={userFormData.researchField} />
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <br />
                                                {(userFormData.registeredForDegree = "Yes") || (userFormData.validPlacementLetter = "Yes") && (<><Row>
                                                    <Col>
                                                        <Form.Group controlId="">
                                                            <Form.Label>Name of the University/Institution</Form.Label>
                                                            <Form.Control type="text" placeholder="Name of the University/Institution" value={userFormData.universityInstitution} />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col>
                                                        <Form.Group controlId="">
                                                            <Form.Label>Faculty/ Department</Form.Label>
                                                            <Form.Control type="text" placeholder="Faculty/ Department" value={userFormData.facultyDepartment} />
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                    <br />
                                                    <Row>
                                                        <Col>
                                                            <FormLabel>Period of Registration</FormLabel>
                                                        </Col>



                                                        <Col>
                                                            <FormLabel>Registration or placement letter</FormLabel><a href={userFormData.placmentPDFDownURL} target="_blank" style={{
                                                                textDecoration: ' none',
                                                                color: 'black',
                                                                backgroundColor: '#dd7e7e',
                                                                padding: "10px",
                                                                borderRadius: '10px',
                                                                marginLeft: '4%'
                                                            }}>View PDF<img src={"assets/NAV/pdf.png"} width={25} /></a>
                                                        </Col>
                                                    </Row>
                                                    <br />
                                                    <Row>
                                                        <Col>

                                                            <Form.Group controlId="textInput">
                                                                <FormLabel>Name/s of Supervisor</FormLabel>
                                                                <Form.Control type="text" placeholder="Name/s of Supervisor" value={userFormData.supervisorName} />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col>
                                                            <Row>
                                                                <Form.Group controlId="formBasicEmail">
                                                                    <Form.Label>E Mail</Form.Label>
                                                                    <Form.Control type="email" placeholder="Email" value={userFormData.supervisorEmail} />
                                                                </Form.Group>

                                                            </Row>
                                                            <Row>
                                                                <Form.Group controlId="phoneNumberInput">
                                                                    <Form.Label>Tel</Form.Label>
                                                                    <Form.Control type="text" placeholder="Tel" value={userFormData.supervisorContactNo} />
                                                                </Form.Group>

                                                            </Row>
                                                            <Row>
                                                                <Form.Group controlId="faxInput">
                                                                    <Form.Label>Fax</Form.Label>
                                                                    <Form.Control type="text" placeholder="Fax" value={userFormData.supervisorFax} />
                                                                </Form.Group>

                                                            </Row>
                                                        </Col>
                                                    </Row></>)}

                                                <br />
                                                <Row>
                                                    <Col>
                                                        <Col>
                                                            <b> Detailed work plan</b><a href={userFormData.detailedWorkPlanPDFURL} target="_blank" style={{
                                                                textDecoration: ' none',
                                                                color: 'black',
                                                                backgroundColor: '#dd7e7e',
                                                                padding: "10px",
                                                                borderRadius: '10px',
                                                                marginLeft: '4%'
                                                            }}>View PDF<img src={"assets/NAV/pdf.png"} width={25} /></a>
                                                        </Col>
                                                    </Col>
                                                    <Col>
                                                        <Col>
                                                            <b>research proposal for PhD</b><a href={userFormData.researchProposalPdfURL} target="_blank" style={{
                                                                textDecoration: ' none',
                                                                color: 'black',
                                                                backgroundColor: '#dd7e7e',
                                                                padding: "10px",
                                                                borderRadius: '10px',
                                                                marginLeft: '4%'
                                                            }}>View PDF<img src={"assets/NAV/pdf.png"} width={25} /></a>
                                                        </Col>
                                                    </Col>
                                                </Row>
                                                <br /><br />
                                                <FormLabel>Research Description - Summary of research proposal (50 words)</FormLabel>
                                                <Textarea minRows={3} value={userFormData.researchProposalSummary} />
                                                <br />
                                            </Form>
                                        </Row>
                                    </div>
                                )
                                }
                                {activeStep === 2 && (
                                    <div className={formStyle.formDiv}>
                                        <Row>
                                            <Form >
                                                <Row>
                                                    <h5>Estimated Cost of Degree Study (in Rupees)</h5>
                                                    <Col>
                                                        <Form.Group controlId="">
                                                            <Form.Label>Country</Form.Label>
                                                            <Form.Control type="text" placeholder="Country" value={userFormData.country} />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col>
                                                        <Form.Group controlId="">
                                                            <Form.Label>University</Form.Label>
                                                            <Form.Control type="text" placeholder="University" value={userFormData.university} />
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <br />
                                                <Row>
                                                    <TableContainer component={Paper}>
                                                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                                            <TableHead>
                                                                <TableRow>
                                                                    <TableCell > </TableCell>
                                                                    <TableCell >Year 1 (Rs)</TableCell>
                                                                    <TableCell >Year 2 (Rs)</TableCell>
                                                                    <TableCell >Year 3 (Rs)</TableCell>
                                                                    <TableCell >Total  (Rs)</TableCell>
                                                                </TableRow>

                                                            </TableHead>
                                                            <TableBody>

                                                                <TableRow >
                                                                    <TableCell>
                                                                        <p style={{}}>1. Institutional Costs</p>
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        <TextField id="standard-basic" variant="standard"
                                                                            value={userFormData.institutionalCost.y1}
                                                                        />
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        <TextField id="standard-basic" variant="standard"
                                                                            value={userFormData.institutionalCost.y2}
                                                                        />
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        <TextField id="standard-basic" variant="standard"
                                                                            value={userFormData.institutionalCost.y3}
                                                                        />
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        <TextField id="standard-basic" variant="standard"
                                                                            value={parseFloat(userFormData.institutionalCost.y1) + parseFloat(userFormData.institutionalCost.y2) + parseFloat(userFormData.institutionalCost.y3)}
                                                                        />
                                                                    </TableCell>

                                                                </TableRow>
                                                                <TableRow >
                                                                    <TableCell align='right'>
                                                                        <p>Registration fees</p>
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        <TextField id="standard-basic" variant="standard"
                                                                            value={userFormData.registrationFees.y3}
                                                                        />
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        <TextField id="standard-basic" variant="standard"
                                                                            value={userFormData.registrationFees.y2}
                                                                        />
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        <TextField id="standard-basic" variant="standard"
                                                                            value={userFormData.registrationFees.y3}
                                                                        />
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        <TextField id="standard-basic" variant="standard"
                                                                            value={parseFloat(userFormData.registrationFees.y1) + parseFloat(userFormData.registrationFees.y2) + parseFloat(userFormData.registrationFees.y3)}
                                                                        />
                                                                    </TableCell>

                                                                </TableRow>

                                                                <TableRow >
                                                                    <TableCell align='right'>
                                                                        <p>Tuition fees</p>
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        <TextField id="standard-basic" variant="standard"
                                                                            value={userFormData.tutionFees.y1}
                                                                        />
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        <TextField id="standard-basic" variant="standard"
                                                                            value={userFormData.tutionFees.y2}
                                                                        />
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        <TextField id="standard-basic" variant="standard"
                                                                            value={userFormData.tutionFees.y3}
                                                                        />
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        <TextField id="standard-basic" variant="standard"
                                                                            value={parseFloat(userFormData.tutionFees.y1) + parseFloat(userFormData.tutionFees.y2) + parseFloat(userFormData.tutionFees.y3)}
                                                                        />
                                                                    </TableCell>

                                                                </TableRow>
                                                                <TableRow >
                                                                    <TableCell align='right'>
                                                                        <p>Other fees (specify)</p>
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        <TextField id="standard-basic" variant="standard"
                                                                            value={userFormData.otherFees.y1}
                                                                        />
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        <TextField id="standard-basic" variant="standard"
                                                                            value={userFormData.otherFees.y2}
                                                                        />
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        <TextField id="standard-basic" variant="standard"
                                                                            value={userFormData.otherFees.y3}
                                                                        />
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        <TextField id="standard-basic" variant="standard"
                                                                            value={parseFloat(userFormData.otherFees.y1) + parseFloat(userFormData.otherFees.y2) + parseFloat(userFormData.otherFees.y3)}
                                                                        />
                                                                    </TableCell>

                                                                </TableRow>
                                                                <TableRow >
                                                                    <TableCell>
                                                                        <p>2. Research expenses</p>
                                                                        <p style={{ fontStyle: 'italic' }}>(Detailed budget of research expenses recommended by supervisor should be attached separately)</p>

                                                                    </TableCell>
                                                                    <TableCell>
                                                                        <TextField id="standard-basic" variant="standard"
                                                                            value={userFormData.researchExpenses.y1}
                                                                        />
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        <TextField id="standard-basic" variant="standard"
                                                                            value={userFormData.researchExpenses.y2}
                                                                        />
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        <TextField id="standard-basic" variant="standard"
                                                                            value={userFormData.researchExpenses.y3}
                                                                        />
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        <TextField id="standard-basic" variant="standard"
                                                                            value={parseFloat(userFormData.researchExpenses.y1) + parseFloat(userFormData.researchExpenses.y2) + parseFloat(userFormData.researchExpenses.y3)}
                                                                        />
                                                                    </TableCell>

                                                                </TableRow>

                                                            </TableBody>
                                                        </Table>
                                                    </TableContainer>
                                                </Row>
                                                <br />
                                                <Row>
                                                    <p>Other Financial Support</p>
                                                </Row>

                                                {userFormData.otherFinancialSup && (
                                                    <>
                                                        <TableContainer component={Paper}>
                                                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                                                <TableHead>
                                                                    <TableRow>
                                                                        <TableCell > Name of Granting Organization</TableCell>
                                                                        <TableCell >Amount per year </TableCell>
                                                                        <TableCell >Duration</TableCell>
                                                                    </TableRow>

                                                                </TableHead>
                                                                <TableBody>

                                                                    <TableRow >

                                                                        <TableCell>
                                                                            <TextField id="standard-basic" variant="standard"
                                                                                value={userFormData.otherFinancialSup.orgName}
                                                                            />
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            <TextField id="standard-basic" variant="standard"
                                                                                value={userFormData.otherFinancialSup.amountYear}
                                                                            />
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            <TextField id="standard-basic" variant="standard"
                                                                                value={userFormData.otherFinancialSup.duration}
                                                                            />
                                                                        </TableCell>

                                                                    </TableRow>
                                                                </TableBody>
                                                            </Table>
                                                        </TableContainer>
                                                    </>)}
                                                <Row>
                                                    <Row>
                                                        <p>Other supportive Documents</p>
                                                    </Row>
                                                    {userFormData.otherSupDocs && (
                                                        <>
                                                            <TableContainer component={Paper}>
                                                                <Table sx={{ minWidth: 650 }} aria-label="simple table">

                                                                    <TableBody>

                                                                        <TableRow >

                                                                            <TableCell>
                                                                                Self-Declaration Letter *
                                                                            </TableCell>
                                                                            <TableCell>
                                                                                {userFormData.otherSupDocs.selfLetter}
                                                                            </TableCell>
                                                                            <TableCell>
                                                                                Work Plan
                                                                            </TableCell>
                                                                            <TableCell>
                                                                                {userFormData.otherSupDocs.workPlan}
                                                                            </TableCell>

                                                                        </TableRow>

                                                                        <TableRow >

                                                                            <TableCell>
                                                                                Personal Health Report
                                                                            </TableCell>
                                                                            <TableCell>
                                                                                {userFormData.otherSupDocs.personalHealt}
                                                                            </TableCell>
                                                                            <TableCell>
                                                                                IELTS/TOEFL/PTE
                                                                                (Attach a Certified Copy)

                                                                            </TableCell><TableCell>
                                                                                {userFormData.otherSupDocs.ielts}

                                                                            </TableCell>

                                                                        </TableRow>

                                                                        <TableRow >

                                                                            <TableCell>
                                                                                Study Leave Letter
                                                                            </TableCell>
                                                                            <TableCell>
                                                                                {userFormData.otherSupDocs.studyLetter}
                                                                            </TableCell>
                                                                        </TableRow>

                                                                    </TableBody>
                                                                </Table>
                                                            </TableContainer>
                                                        </>)}
                                                </Row>
                                            </Form>
                                        </Row>
                                    </div>
                                )
                                }

                                {activeStep === 3 && (
                                    <div className={formStyle.formDiv}>
                                        <Row>
                                            pending approval
                                        </Row>
                                    </div>
                                )
                                }

                                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>

                                    <Button
                                        color="inherit"
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                        sx={{ mr: 1 }}
                                    >
                                        Back
                                    </Button>
                                    <Box sx={{ flex: '1 1 auto' }} />
                                    {isStepOptional(activeStep) && (
                                        <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                                            Skip
                                        </Button>
                                    )}
                                    <Button onClick={handleNext} style={{ padding: '4px', border: '1px #17376e solid', marginRight: ' 3%', backgroundColor: '#17376e', color: 'white', fontWeight: 'bold', }}>
                                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                    </Button>

                                </Box>
                            </React.Fragment >
                        )}
                    </Box >
                </Container >

            </div>
        </div>
    )
}


export default UserFormViewScreen
