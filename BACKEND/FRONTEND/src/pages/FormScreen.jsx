import React from "react";
import axios from "axios";
import formStyle from "../styles/formStyle.module.css";
import { useState, useRef, useEffect } from "react";
import { Container, Form, Row, Col } from "react-bootstrap";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Table,
  Switch,
  Checkbox,
} from "@mui/material";
import styled from "styled-components";
import Textarea from "@mui/joy/Textarea";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { storage } from "../firebase.js";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import LinearProgress from "@mui/material/LinearProgress";

const steps = [
  "Personal Information",
  "Details Of the Study",
  "Financial Information",
  "University Approval",
];

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const FormScreen = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const formRef = useRef(null);
  const [famName, setFamName] = useState("");
  const [fstName, setFstName] = useState("");
  const [gender, setGender] = useState("");
  const [profileImg, setProfileImg] = useState(null);
  const [dob, setDob] = useState();
  const [age, setAge] = useState({ years: 0, months: 0, days: 0 });
  const [nic, setNic] = useState("");
  const [upfNo, setUPFNo] = useState("");
  const [address, setAddress] = useState({
    street: "",
    city: "",
  });
  const [cv, setCv] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [fax, setFax] = useState("");

  const [educationTableData, setEducationTableData] = useState([
    {
      fromMonthYear: "",
      toMonthYear: "",
      university: "",
      degreesObtained: "",
      fieldsOfStudy: "",
      certificate: "",
    },
  ]);

  const [cDepartmentHeadEmail, setCDepartmentHeadEmail] = useState("");
  const [cFacaltyHeadEmail, setCFacaltyHeadEmail] = useState("");
  const [cUniversityHeadEmail, setCUniversityHeadEmail] = useState("");

  const [sinSp, setSinSp] = useState("");
  const [sinR, setSinR] = useState("");
  const [sinW, setSinW] = useState("");
  const [tamSp, setTamSp] = useState("");
  const [tamR, setTamR] = useState("");
  const [tamW, setTamW] = useState("");
  const [engSp, setEngSp] = useState("");
  const [engR, setEngR] = useState("");
  const [engW, setEngW] = useState("");

  const [employeeTableData, setEmployeeTableData] = useState([
    {
      fromMonthYear: "",
      toMonthYear: "",
      exactPost: "",
      faculty: "",
      department: "",
      universityName: "",
      isCurrent: false,
    },
  ]);

  const [publicationTableData, setPublicationTableData] = useState([
    {
      title: "",
      publisher: "",
      place: "",
      date: "",
      publication: "",
      publicationDownLink: "",
    },
  ]);

  const [degreeSought, setDegreeSought] = useState("");
  const [titleOfR, setTitleOfR] = useState("");
  const [researchF, setResearchF] = useState("");
  const [rDegree, setRDegree] = useState("");
  const [pLetter, setPLetter] = useState("");
  const [universityIns, setUniversityIns] = useState("");
  const [facaltyDep, setFacaltyDep] = useState("");
  const [regPlacementPdf, setRegPlacementPdf] = useState(null);
  const [cGrant, setCGrant] = useState("");
  const [elsFunding, setElsFunding] = useState("");
  const [regFromDate, setRegFromDate] = useState("");
  const [regToDate, setRegToDate] = useState("");
  const [sName, setSName] = useState("");
  const [sEmail, setSEmail] = useState("");
  const [sTel, setSTel] = useState("");
  const [sFax, setSFax] = useState("");
  const [detailedWPPdf, setDetailedWPPdf] = useState(null);
  const [proposalPdf, setProposalPdf] = useState(null);
  const [rDescription, setRDescription] = useState("");

  const [fullOrPartTime, setfullOrPartTime] = useState("");
  const [isTeaching, setIsTeaching] = useState(false);
  const [teachingHours, setTeachingHours] = useState("");
  const [aPositions, setAPositions] = useState(false);
  const [positionName, setPositionName] = useState("");
  const [otherReaserchW, setOtherReaserchW] = useState(false);

  const [countryP3, setCountryP3] = useState("");
  const [universityP3, setUniversityP3] = useState("");
  const [researchExpensesPdf, setResearchExpensesPdf] = useState(null);

  const [instCost, setInstCost] = useState({
    y1: "",
    y2: "",
    y3: "",
    total: "",
  });
  const [regFees, setRegFees] = useState({
    y1: "",
    y2: "",
    y3: "",
    total: "",
  });

  const [tutionFees, setTutionFees] = useState({
    y1: "",
    y2: "",
    y3: "",
    total: "",
  });

  const [otherFees, setOtherFees] = useState({
    y1: "",
    y2: "",
    y3: "",
    total: "",
  });

  const [researchExpenses, setResearchExpenses] = useState({
    y1: "",
    y2: "",
    y3: "",
    total: "",
  });

  const [otherFin, setOtherFin] = useState({
    orgName: "",
    amountYear: "",
    duration: "",
  });

  const [otherSupDocs, setOtherSupDocs] = useState({
    selfLetter: "",
    workPlan: "",
    personalHealt: "",
    ielts: "",
    studyLetter: "",
  });
  const [References, setReferences] = useState([
    {
      name: "",
      fullAddress: "",
      tel: "",
      fax: "",
      email: "",
      position: "",
    },
    {
      name: "",
      fullAddress: "",
      tel: "",
      fax: "",
      email: "",
      position: "",
    },
  ]);
  const [additionalSkills, setAdditionalSkills] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      setProfileImg(selectedFile);

      // Read the selected image file and set it as a preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setProfileImg(null);
      setPreviewImage(null);
    }
  };

  useEffect(() => {
    document.title = "Apply Form | NCAS";
    return () => {
      document.title = "NCAS";
    };
  }, []);

  const updateInstCostField = (fieldName, newValue) => {
    setInstCost((prevState) => ({
      ...prevState,
      [fieldName]: newValue,
    }));
  };

  const updateRegFees = (fieldName, newValue) => {
    setRegFees((prevState) => ({
      ...prevState,
      [fieldName]: newValue,
    }));
  };

  const updateTutionFees = (fieldName, newValue) => {
    setTutionFees((prevState) => ({
      ...prevState,
      [fieldName]: newValue,
    }));
  };

  const updateOtherFees = (fieldName, newValue) => {
    setOtherFees((prevState) => ({
      ...prevState,
      [fieldName]: newValue,
    }));
  };

  const updateResearchExpenses = (fieldName, newValue) => {
    setResearchExpenses((prevState) => ({
      ...prevState,
      [fieldName]: newValue,
    }));
  };
  const updateOterFin = (fieldName, newValue) => {
    setOtherFin((prevState) => ({
      ...prevState,
      [fieldName]: newValue,
    }));
  };

  const updateAddress = (fieldName, newValue) => {
    setAddress((prevState) => ({
      ...prevState,
      [fieldName]: newValue,
    }));
  };

  const updateOtherSupDocs = (fieldName, newValue) => {
    setOtherSupDocs((prevState) => ({
      ...prevState,
      [fieldName]: newValue,
    }));
  };
  const updateReference = (index, field, value) => {
    setReferences((prevReferences) => {
      // Create a copy of the previous state
      const newReferences = [...prevReferences];
      // Update the specific reference at the given index with new data
      newReferences[index] = { ...newReferences[index], [field]: value };
      // Return the updated state
      return newReferences;
    });
  };

  const handleAddRowEdu = () => {
    setEducationTableData((prevData) => [
      ...prevData,
      {
        fromMonthYear: "",
        toMonthYear: "",
        university: "",
        degreesObtained: "",
        fieldsOfStudy: "",
        certificate: "",
      },
    ]);
  };
  const handleRemoveRowEdu = (index) => {
    setEducationTableData((prevData) => {
      const newData = [...prevData];
      newData.splice(index, 1);
      return newData;
    });
  };

  const handleAddRowEmp = () => {
    setEmployeeTableData((prevData) => [
      ...prevData,
      {
        fromMonthYear: "",
        toMonthYear: "",
        exactPost: "",
        faculty: "",
        department: "",
        universityName: "",
        isCurrent: false,
      },
    ]);
  };
  const handleRemoveRowEmp = (index) => {
    setEmployeeTableData((prevData) => {
      const newData = [...prevData];
      newData.splice(index, 1);
      return newData;
    });
  };

  const handleAddRowPub = () => {
    setPublicationTableData((prevData) => [
      ...prevData,
      {
        title: "",
        publisher: "",
        place: "",
        date: "",
        publication: "",
        publicationDownLink: "",
      },
    ]);
  };
  const handleRemoveRowPub = (index) => {
    setPublicationTableData((prevData) => {
      const newData = [...prevData];
      newData.splice(index, 1);
      return newData;
    });
  };

  const handleInputChangeEdu = (index, field, value) => {
    setEducationTableData((prevData) => {
      const newData = [...prevData];
      newData[index][field] = value;
      return newData;
    });
  };
  const handleInputChangeEmp = (index, field, value) => {
    setEmployeeTableData((prevData) => {
      const newData = [...prevData];
      newData[index][field] = value;
      return newData;
    });
  };
  const handleInputChangePub = (index, field, value) => {
    setPublicationTableData((prevData) => {
      const newData = [...prevData];
      newData[index][field] = value;
      return newData;
    });
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

    // Trigger form validation
    if (formRef.current) {
      if (formRef.current.checkValidity()) {
        // Move to the next step if the form is valid
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
      } else {
        // If the form is not valid, focus on the first invalid field
        formRef.current.reportValidity();
      }
    }
  };

  const uploadProfileImage = async () => {
    return new Promise((resolve, reject) => {
      if (profileImg == null) {
        resolve(null); // Resolve with null if no image is provided
      } else {
        const ProfileImageRef = ref(
          storage,
          `profileImages/${profileImg.name + v4()}`
        );

        uploadBytes(ProfileImageRef, profileImg)
          .then(() => {
            getDownloadURL(ProfileImageRef)
              .then((downloadURL) => {
                alert("Image uploaded. Download URL: " + downloadURL);
                resolve(downloadURL);
              })
              .catch((error) => {
                // Error getting download URL
                reject(error);
              });
          })
          .catch((error) => {
            // Error uploading image
            reject(error);
          });
      }
    });

  };
  const uploadPdf = async () => {
    return new Promise((resolve, reject) => {
      if (regPlacementPdf == null) {
        resolve(null); // Resolve with null if no PDF is provided
      } else {
        const pdfRef = ref(
          storage,
          `PlacementLetters/${regPlacementPdf.name + v4()}`
        );

        uploadBytes(pdfRef, regPlacementPdf)
          .then(() => {
            getDownloadURL(pdfRef)
              .then((downloadURL) => {
                resolve(downloadURL); // Resolve with download URL
              })
              .catch((error) => {
                console.error("Error getting download URL:", error);
                reject(error); // Reject if error occurs during URL retrieval
              });
          })
          .catch((error) => {
            console.error("Error uploading PDF:", error);
            reject(error); // Reject if error occurs during upload
          });
      }
    });
  };

  const uploadDetailedWPPdf = async () => {
    return new Promise((resolve, reject) => {
      if (detailedWPPdf == null) {
        resolve(null); // Resolve with null if no PDF is provided
      } else {
        const pdfRef = ref(
          storage,
          `DetailedWorkPlans/${detailedWPPdf.name + v4()}`
        );

        uploadBytes(pdfRef, detailedWPPdf)
          .then(() => {
            getDownloadURL(pdfRef)
              .then((downloadURL) => {
                resolve(downloadURL); // Resolve with download URL
              })
              .catch((error) => {
                console.error("Error getting download URL:", error);
                reject(error); // Reject if error occurs during URL retrieval
              });
          })
          .catch((error) => {
            console.error("Error uploading PDF:", error);
            reject(error); // Reject if error occurs during upload
          });
      }
    });
  };

  const uploadProposalPdf = async () => {
    return new Promise((resolve, reject) => {
      if (proposalPdf == null) {
        resolve(null); // Resolve with null if no PDF is provided
      } else {
        const pdfRef = ref(
          storage,
          `Proposal/${proposalPdf.name + v4()}`
        );

        uploadBytes(pdfRef, proposalPdf)
          .then(() => {
            getDownloadURL(pdfRef)
              .then((downloadURL) => {
                resolve(downloadURL); // Resolve with download URL
              })
              .catch((error) => {
                console.error("Error getting download URL:", error);
                reject(error); // Reject if error occurs during URL retrieval
              });
          })
          .catch((error) => {
            console.error("Error uploading PDF:", error);
            reject(error); // Reject if error occurs during upload
          });
      }
    });
  };

  const uploadResearchExpensesPdf = async () => {
    return new Promise((resolve, reject) => {
      if (researchExpensesPdf == null) {
        resolve(null); // Resolve with null if no PDF is provided
      } else {
        const pdfRef = ref(
          storage,
          `ResearchExpenses/${researchExpensesPdf.name + v4()}`
        );

        uploadBytes(pdfRef, researchExpensesPdf)
          .then(() => {
            getDownloadURL(pdfRef)
              .then((downloadURL) => {
                resolve(downloadURL); // Resolve with download URL
              })
              .catch((error) => {
                console.error("Error getting download URL:", error);
                reject(error); // Reject if error occurs during URL retrieval
              });
          })
          .catch((error) => {
            console.error("Error uploading PDF:", error);
            reject(error); // Reject if error occurs during upload
          });
      }
    });
  };

  const uploadCvPdf = async () => {
    return new Promise((resolve, reject) => {
      if (cv == null) {
        resolve(null); // Resolve with null if no PDF is provided
      } else {
        const pdfRef = ref(
          storage,
          `Cv/${cv.name + v4()}`
        );

        uploadBytes(pdfRef, cv)
          .then(() => {
            getDownloadURL(pdfRef)
              .then((downloadURL) => {
                resolve(downloadURL); // Resolve with download URL
              })
              .catch((error) => {
                console.error("Error getting download URL:", error);
                reject(error); // Reject if error occurs during URL retrieval
              });
          })
          .catch((error) => {
            console.error("Error uploading PDF:", error);
            reject(error); // Reject if error occurs during upload
          });
      }
    });
  };


  const uploadPublicationsPdfs = async () => {
    return new Promise((resolve, reject) => {
      let row = 0;
      const promises = [];
      const downloadURLs = []; // Array to store download URLs

      for (const i of publicationTableData) {
        console.log(row);
        if (i.publication == "") continue; // Skip if publication is empty

        const pdfRef = ref(storage, `Publications/${i.publication.name + v4()}`);

        const uploadPromise = uploadBytes(pdfRef, i.publication)
          .then(() => {
            return getDownloadURL(pdfRef)
              .then((downloadURL) => {
                downloadURLs.push(downloadURL); // Push URL to array
              })
              .catch((error) => {
                console.error("Error getting download URL:", error);
                throw error;
              });
          });

        promises.push(uploadPromise);
        row = row + 1;
      }

      Promise.all(promises)
        .then(() => {
          resolve(downloadURLs); // Resolve with array of download URLs
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const uploadCertificatePdfs = async () => {
    return new Promise((resolve, reject) => {
      let row = 0;
      const promises = [];
      const downloadURLs = []; // Array to store download URLs

      for (const i of educationTableData) {
        console.log(row);
        if (i.certificate == "") continue; // Skip if publication is empty

        const pdfRef = ref(storage, `Certificates/${i.certificate.name + v4()}`);

        const uploadPromise = uploadBytes(pdfRef, i.certificate)
          .then(() => {
            return getDownloadURL(pdfRef)
              .then((downloadURL) => {
                downloadURLs.push(downloadURL); // Push URL to array
              })
              .catch((error) => {
                console.error("Error getting download URL:", error);
                throw error;
              });
          });

        promises.push(uploadPromise);
        row = row + 1;
      }

      Promise.all(promises)
        .then(() => {
          resolve(downloadURLs); // Resolve with array of download URLs
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  console.log(publicationTableData);
  const handleFinish = async () => {
    setIsLoading(true);
    const downloadPURL = await uploadProfileImage();
    const regPlacementdownloadLink = await uploadPdf();
    const detailedPdfDownLink = await uploadDetailedWPPdf();
    const proposalDownLink = await uploadProposalPdf();
    const researchExpencDownLink = await uploadResearchExpensesPdf();
    const publicationsDownLinks = await uploadPublicationsPdfs();
    const certificateDownLinks = await uploadCertificatePdfs();
    const cvDownLink = await uploadCvPdf();

    let isApplied = false;

    const newGrantHolderData = {
      firstName: fstName,
      familyName: famName,
      gender: gender,
      dateOfBirth: dob,
      age: age,
      photographUrl: downloadPURL,
      nic: nic,
      upfNo: upfNo,
      cvPdfLink:cvDownLink,
      permanentAddress: address,
      email: email,
      telephoneNo: tel,
      fax: fax,
      educationTableData: educationTableData,
      certificatesPdfs:certificateDownLinks,
      SinhalaSkill: {
        speaking: sinSp,
        reading: sinR,
        writing: sinW,
      },
      EnglishSkill: {
        speaking: engSp,
        reading: engR,
        writing: engW,
      },
      TamilSkill: {
        speaking: tamSp,
        reading: tamR,
        writing: tamW,
      },
      employmentTableData: employeeTableData,
      references: References,
      additionalSkillsAndFacts: additionalSkills,
      publications: publicationTableData,
      publicationPdfs: publicationsDownLinks,
      DepartmentHeadEmail: cDepartmentHeadEmail,
      FacaltyHeadEmail: cFacaltyHeadEmail,
      UnivercityHeadEmail: cUniversityHeadEmail,

      degreeSought: degreeSought,
      titleOfResearch: titleOfR,
      researchField: researchF,
      registeredForDegree: rDegree,
      validPlacementLetter: pLetter,
      placmentPDFDownURL: regPlacementdownloadLink,
      universityInstitution: universityIns,
      facultyDepartment: facaltyDep,
      facultyDepartmentRegistrationFromDate: regFromDate,
      facultyDepartmentRegistrationToDate: regToDate,
      supervisorName: sName,
      supervisorEmail: sEmail,
      supervisorContactNo: sTel,
      supervisorFax: sFax,
      detailedWorkPlanPDFURL: detailedPdfDownLink,
      researchProposalPdfURL: proposalDownLink,
      researchProposalSummary: rDescription,
      teaching: isTeaching,
      teachingHours: teachingHours,
      AdminPosition: aPositions,
      AdminPositionNames: positionName,
      otherReaserchW: otherReaserchW,

      country: countryP3,
      university: universityP3,

      institutionalCost: instCost,
      registrationFees: regFees,
      tutionFees: tutionFees,
      otherFees: otherFees,
      researchExpenses: researchExpenses,
      researchExpensesPdfURL: researchExpencDownLink,
      otherFinancialSup: otherFin,
      otherSupDocs: otherSupDocs,
    };

    console.log(newGrantHolderData);
    await axios
      .post("http://localhost:8000/api/grant/apply-user", newGrantHolderData)
      .then((response) => {

        setIsLoading(false);
        if (response.data.message == "GrantHolder created successfully") {
          isApplied = true;
        }
        if (response.data.message == "You are already Use this Email to Register.") {
          alert("Email Already used");
          window.location.replace("/form");
        }
      })
      .catch((error) => {
        console.error("Error Creating grantHolder:", error);
        window.location.replace("/form");
      });




    const newGrantReg = {
      FirstName: fstName,
      LastName: famName,
      Email: email,
      Password: nic,
      UserType: "User",
      UserName: email,
    };

    if (isApplied) {
      await axios
        .post("http://localhost:8000/api/admin/add", newGrantReg)
        .then((response1) => {
          console.log("grantUser registered:", response1.data);
          alert("Use these credentials to login,  UserName : " + email + "Password : " + nic);
          window.location.replace("/login");
        })
        .catch((error1) => {
          console.error("Error registering grant:", error1);
          alert("Email Already used");
          window.location.replace("/form");
        });
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

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

  const calculateAge = () => {
    const dobDate = new Date(dob);
    const currentDate = new Date();

    if (isNaN(dobDate.getTime())) {
      // Handle invalid date input
      setAge({ years: 0, months: 0, days: 0 });
    } else {
      let yearsDiff = currentDate.getUTCFullYear() - dobDate.getUTCFullYear();
      let monthsDiff = currentDate.getUTCMonth() - dobDate.getUTCMonth();
      let daysDiff = currentDate.getUTCDate() - dobDate.getUTCDate();

      if (daysDiff < 0) {
        monthsDiff -= 1;
        daysDiff += 30; // Assuming a month is 30 days for simplicity
      }

      if (monthsDiff < 0) {
        yearsDiff -= 1;
        monthsDiff += 12;
      }

      setAge({ years: yearsDiff, months: monthsDiff, days: daysDiff });
    }
  };

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1; // Month is zero-indexed
    let day = today.getDate();

    // Ensure month and day are two digits
    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    return `${year}-${month}-${day}`;
  };

  const getMinDate = () => {
    const today = new Date();
    const minYear = today.getFullYear() - 50;
    const month = today.getMonth() + 1; // Month is zero-indexed
    let day = today.getDate();

    // Ensure day is two digits
    day = day < 10 ? `0${day}` : day;

    return `${minYear}-${month}-${day}`;
  };

  return (
    <div className={formStyle.bodyD}>
      <Container style={{ marginTop: "90px", padding: "20px" }}>
        <Box sx={{ width: "100%" }}>
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
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Box sx={{ flex: "1 1 auto" }} />
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
                        <Form ref={formRef}>
                          <Row>
                            <Col>
                              <Form.Group controlId="familyNameInput">
                                <Form.Label>
                                  1) Family name{" "}
                                  <span style={{ color: "red" }}>*</span>
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="Family name"
                                  value={famName}
                                  onChange={(e) => setFamName(e.target.value)}
                                  required
                                />
                              </Form.Group>
                            </Col>
                            <Col>
                              <Form.Group controlId="firstNameInput">
                                <Form.Label>
                                  First name{" "}
                                  <span style={{ color: "red" }}>*</span>
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="First name"
                                  value={fstName}
                                  onChange={(e) => setFstName(e.target.value)}
                                  required
                                />
                              </Form.Group>
                            </Col>
                            <Col>
                              <center>
                                {previewImage ? (
                                  <div style={{ height: "150px" }}>
                                    <img
                                      src={previewImage}
                                      alt="Image Preview"
                                      style={{
                                        maxWidth: "100%",
                                        maxHeight: "150px",
                                        borderRadius: "50%",
                                        display: "inline-block",
                                      }}
                                    />
                                  </div>
                                ) : (
                                  <>
                                    <div style={{ height: "150px" }}>
                                      <img
                                        src={
                                          "https://www.freeiconspng.com/thumbs/profile-icon-png/am-a-19-year-old-multimedia-artist-student-from-manila--21.png"
                                        }
                                        alt="Image Preview"
                                        style={{
                                          maxWidth: "100%",
                                          maxHeight: "150px",
                                          borderRadius: "50%",
                                          display: "inline-block",
                                        }}
                                      />
                                    </div>
                                  </>
                                )}
                                <div className="App">
                                  <>
                                    <input
                                      type="file"
                                      onChange={handleFileChange}
                                    />
                                  </>
                                </div>
                              </center>
                            </Col>
                          </Row>

                          <Row>
                            <Col>
                              <FormLabel id="demo-row-radio-buttons-group-label">
                                Gender <span style={{ color: "red" }}>*</span>
                              </FormLabel>
                              <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                required
                              >
                                <FormControlLabel
                                  value="female"
                                  control={<Radio />}
                                  label="Female"
                                />
                                <FormControlLabel
                                  value="male"
                                  control={<Radio />}
                                  label="Male"
                                />
                              </RadioGroup>
                            </Col>
                            <Col>
                              <div>
                                <label>
                                  Date of Birth{" "}
                                  <span style={{ color: "red" }}>*</span>:
                                </label>
                                <br></br>
                                <input
                                  type="date"
                                  value={dob}
                                  onChange={(e) => setDob(e.target.value)}
                                  onBlur={calculateAge}
                                  style={{
                                    padding: "3%",
                                    border: "0px",
                                    borderRadius: "5px",
                                  }}
                                  required
                                  min={getMinDate()}
                                  max={getCurrentDate()}
                                />
                              </div>
                            </Col>
                            <Col>
                              {age !== null && (
                                <>
                                  <p>
                                    <b>
                                      Age at the time of closing the application
                                    </b>
                                  </p>
                                  <p>
                                    Age: {age.years} years, {age.months} months,{" "}
                                    {age.days} days
                                    {age.years > 50 && (
                                      <>
                                        <br></br>
                                        <span style={{ color: "red" }}>
                                          You can't apply Age shuold be less
                                          than 50
                                        </span>
                                      </>
                                    )}
                                  </p>
                                </>
                              )}
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <Form.Group controlId="nicInput">
                                <Form.Label>
                                  NIC<span style={{ color: "red" }}>*</span>{" "}
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="NIC"
                                  value={nic}
                                  onChange={(e) => setNic(e.target.value)}
                                  maxLength={10}
                                  minLength={10}
                                  required
                                />
                              </Form.Group>
                            </Col>
                            <Col>
                              <Form.Group controlId="upfInput">
                                <Form.Label>
                                  UPF No<span style={{ color: "red" }}>*</span>{" "}
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="NIC"
                                  value={upfNo}
                                  onChange={(e) => setUPFNo(e.target.value)}
                                  required
                                />
                              </Form.Group>
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
                              <FormLabel>Home, Street <span style={{ color: "red" }}>*</span></FormLabel>
                              <Textarea
                                minRows={2}
                                value={address.street}
                                onChange={(e) =>
                                  updateAddress("street", e.target.value)
                                }
                                required
                              />
                              <FormLabel>
                                City<span style={{ color: "red" }}>*</span>
                              </FormLabel>
                              <Form.Control
                                type="text"
                                placeholder="City"
                                value={address.city}
                                onChange={(e) =>
                                  updateAddress("city", e.target.value)
                                }
                                required
                              />
                              <br/>
                                Upload your CV<span style={{ color: "red" }}>* </span>
                              
                              <Button
                                          component="label"
                                          variant="contained"
                                          startIcon={<CloudUploadIcon />}
                                          style={{
                                            fontSize: "10px",
                                            padding: "8px",
                                            width: "140px",
                                            maxHeight: "50px",
                                            overflow: "hidden",
                                          }}
                                        >
                                          {cv ? (<>{cv.name} is uploaded</>) : (<>Upload file</>)}
                                          <VisuallyHiddenInput
                                            type="file"
                                            onChange={(e) =>
                                              setCv(e.target.files[0])
                                            }
                                          />
                                        </Button>
                                        
                            </Col>
                            
                            <Col>
                              <Row>
                                <Form.Group controlId="formBasicEmail">
                                  <Form.Label>
                                    E Mail
                                    <span style={{ color: "red" }}>*</span>
                                  </Form.Label>
                                  <Form.Control
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                  />
                                </Form.Group>
                              </Row>
                              <br />
                              <Row>
                                <Form.Group controlId="phoneNumberInput">
                                  <Form.Label>
                                    Tel<span style={{ color: "red" }}>*</span>
                                  </Form.Label>
                                  <Form.Control
                                    type="text"
                                    placeholder="Tel"
                                    value={tel}
                                    onChange={(e) => setTel(e.target.value)}
                                    required
                                  />
                                </Form.Group>
                              </Row>
                              <br />
                              <Row>
                                <Form.Group controlId="faxInput">
                                  <Form.Label>
                                    Fax
                                  </Form.Label>
                                  <Form.Control
                                    type="text"
                                    placeholder="Fax"
                                    value={fax}
                                    onChange={(e) => setFax(e.target.value)}

                                  />
                                </Form.Group>
                              </Row>
                            </Col>
                          </Row>
                          <br/>
                          <Row>
                            <h5>2) University Education</h5>{" "}
                            <p>
                              Give full details in chronological order. (From
                              latest to the Oldest)
                            </p>
                          </Row>

                          <Row>
                            <TableContainer component={Paper}>
                              <Table
                                sx={{ minWidth: 650 }}
                                aria-label="simple table"
                              >
                                <TableHead>
                                  <TableRow>
                                    <TableCell>From Month/year</TableCell>
                                    <TableCell>
                                      To Month/year (Degree effective date)
                                    </TableCell>
                                    <TableCell>
                                      University (name, place){" "}
                                    </TableCell>
                                    <TableCell>
                                      Certificates, Degrees obtained
                                    </TableCell>
                                    <TableCell>
                                      Main field(s) or Subject(s) of study
                                    </TableCell>
                                    <TableCell>
                                      Certificate
                                    </TableCell>
                                    <TableCell>Action</TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {educationTableData.map((row, index) => (
                                    <TableRow key={index}>
                                      <TableCell>
                                        <TextField
                                          id="standard-basic"
                                          variant="standard"
                                          value={row.fromMonthYear}
                                          onChange={(e) =>
                                            handleInputChangeEdu(
                                              index,
                                              "fromMonthYear",
                                              e.target.value
                                            )
                                          }
                                        />
                                      </TableCell>
                                      <TableCell>
                                        <TextField
                                          id="standard-basic"
                                          variant="standard"
                                          value={row.toMonthYear}
                                          onChange={(e) =>
                                            handleInputChangeEdu(
                                              index,
                                              "toMonthYear",
                                              e.target.value
                                            )
                                          }
                                        />
                                      </TableCell>
                                      <TableCell>
                                        <TextField
                                          id="standard-basic"
                                          variant="standard"

                                          value={row.university}
                                          onChange={(e) =>
                                            handleInputChangeEdu(
                                              index,
                                              "university",
                                              e.target.value
                                            )
                                          }
                                        />
                                      </TableCell>
                                      <TableCell>
                                        <TextField
                                          id="standard-basic"
                                          variant="standard"
                                          value={row.degreesObtained}
                                          onChange={(e) =>
                                            handleInputChangeEdu(
                                              index,
                                              "degreesObtained",
                                              e.target.value
                                            )
                                          }
                                        />
                                      </TableCell>
                                      <TableCell>
                                        <TextField
                                          id="standard-basic"
                                          variant="standard"
                                          value={row.fieldsOfStudy}
                                          onChange={(e) =>
                                            handleInputChangeEdu(
                                              index,
                                              "fieldsOfStudy",
                                              e.target.value
                                            )
                                          }
                                        />
                                      </TableCell>
                                      <TableCell>
                                        <Button
                                          component="label"
                                          variant="contained"
                                          startIcon={<CloudUploadIcon />}
                                          style={{
                                            fontSize: "10px",
                                            padding: "8px",
                                            width: "140px",
                                            maxHeight: "50px",
                                            overflow: "hidden",
                                          }}
                                        >
                                          {row.certificate ? (<>{row.certificate.name} is uploaded</>) : (<>Upload file</>)}
                                          <VisuallyHiddenInput
                                            type="file"
                                            onChange={(e) =>
                                              handleInputChangeEdu(
                                                index,
                                                "certificate",
                                                e.target.files[0]
                                              )
                                            }
                                          />
                                        </Button>
                                      </TableCell>

                                      <TableCell>
                                        <Button
                                          variant="outlined"
                                          color="secondary"
                                          size="small"
                                          onClick={() =>
                                            handleRemoveRowEdu(index)
                                          }
                                        >
                                          Remove
                                        </Button>
                                      </TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </TableContainer>
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={handleAddRowEdu}
                            >
                              Add
                            </Button>
                          </Row>
                          <br />

                          <br></br>
                          <Row>
                            <h5>3) Language Capability</h5>{" "}
                            <p>
                              Indicate whether Average Good or Excellent Type an
                              asterisk next to your mother tongue
                            </p>
                          </Row>
                          <Row>
                            <TableContainer component={Paper}>
                              <Table
                                sx={{ minWidth: 650 }}
                                aria-label="simple table"
                              >
                                <TableHead>
                                  <TableRow>
                                    <TableCell> </TableCell>
                                    <TableCell>Speaking</TableCell>
                                    <TableCell>Reading </TableCell>
                                    <TableCell>Writing </TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  <TableRow>
                                    <TableCell>Sinhala</TableCell>
                                    <TableCell>
                                      <FormControl
                                        variant="standard"
                                        sx={{ m: 1, minWidth: 120 }}
                                      >
                                        <InputLabel id="demo-simple-select-standard-label"></InputLabel>
                                        <Select
                                          labelId="demo-simple-select-standard-label"
                                          id="demo-simple-select-standard"
                                          value={sinSp}
                                          onChange={(e) =>
                                            setSinSp(e.target.value)
                                          }
                                          label=""
                                        >
                                          <MenuItem value={"Average"}>
                                            Average
                                          </MenuItem>
                                          <MenuItem value={"Good"}>
                                            Good
                                          </MenuItem>
                                          <MenuItem value={"Excellent"}>
                                            Excellent
                                          </MenuItem>
                                        </Select>
                                      </FormControl>
                                    </TableCell>
                                    <TableCell>
                                      <FormControl
                                        variant="standard"
                                        sx={{ m: 1, minWidth: 120 }}
                                      >
                                        <InputLabel id="demo-simple-select-standard-label"></InputLabel>
                                        <Select
                                          labelId="demo-simple-select-standard-label"
                                          id="demo-simple-select-standard"
                                          value={sinR}
                                          onChange={(e) =>
                                            setSinR(e.target.value)
                                          }
                                          label=""
                                        >
                                          <MenuItem value={"Average"}>
                                            Average
                                          </MenuItem>
                                          <MenuItem value={"Good"}>
                                            Good
                                          </MenuItem>
                                          <MenuItem value={"Excellent"}>
                                            Excellent
                                          </MenuItem>
                                        </Select>
                                      </FormControl>
                                    </TableCell>
                                    <TableCell>
                                      <FormControl
                                        variant="standard"
                                        sx={{ m: 1, minWidth: 120 }}
                                      >
                                        <InputLabel id="demo-simple-select-standard-label"></InputLabel>
                                        <Select
                                          labelId="demo-simple-select-standard-label"
                                          id="demo-simple-select-standard"
                                          value={sinW}
                                          onChange={(e) =>
                                            setSinW(e.target.value)
                                          }
                                          label=""
                                        >
                                          <MenuItem value={"Average"}>
                                            Average
                                          </MenuItem>
                                          <MenuItem value={"Good"}>
                                            Good
                                          </MenuItem>
                                          <MenuItem value={"Excellent"}>
                                            Excellent
                                          </MenuItem>
                                        </Select>
                                      </FormControl>
                                    </TableCell>
                                  </TableRow>

                                  <TableRow>
                                    <TableCell>Tamil</TableCell>
                                    <TableCell>
                                      <FormControl
                                        variant="standard"
                                        sx={{ m: 1, minWidth: 120 }}
                                      >
                                        <InputLabel id="demo-simple-select-standard-label"></InputLabel>
                                        <Select
                                          labelId="demo-simple-select-standard-label"
                                          id="demo-simple-select-standard"
                                          value={tamSp}
                                          onChange={(e) =>
                                            setTamSp(e.target.value)
                                          }
                                          label=""
                                        >
                                          <MenuItem value={"Average"}>
                                            Average
                                          </MenuItem>
                                          <MenuItem value={"Good"}>
                                            Good
                                          </MenuItem>
                                          <MenuItem value={"Excellent"}>
                                            Excellent
                                          </MenuItem>
                                        </Select>
                                      </FormControl>
                                    </TableCell>
                                    <TableCell>
                                      <FormControl
                                        variant="standard"
                                        sx={{ m: 1, minWidth: 120 }}
                                      >
                                        <InputLabel id="demo-simple-select-standard-label"></InputLabel>
                                        <Select
                                          labelId="demo-simple-select-standard-label"
                                          id="demo-simple-select-standard"
                                          value={tamR}
                                          onChange={(e) =>
                                            setTamR(e.target.value)
                                          }
                                          label=""
                                        >
                                          <MenuItem value={"Average"}>
                                            Average
                                          </MenuItem>
                                          <MenuItem value={"Good"}>
                                            Good
                                          </MenuItem>
                                          <MenuItem value={"Excellent"}>
                                            Excellent
                                          </MenuItem>
                                        </Select>
                                      </FormControl>
                                    </TableCell>
                                    <TableCell>
                                      <FormControl
                                        variant="standard"
                                        sx={{ m: 1, minWidth: 120 }}
                                      >
                                        <InputLabel id="demo-simple-select-standard-label"></InputLabel>
                                        <Select
                                          labelId="demo-simple-select-standard-label"
                                          id="demo-simple-select-standard"
                                          value={tamW}
                                          onChange={(e) =>
                                            setTamW(e.target.value)
                                          }
                                          label=""
                                        >
                                          <MenuItem value={"Average"}>
                                            Average
                                          </MenuItem>
                                          <MenuItem value={"Good"}>
                                            Good
                                          </MenuItem>
                                          <MenuItem value={"Excellent"}>
                                            Excellent
                                          </MenuItem>
                                        </Select>
                                      </FormControl>
                                    </TableCell>
                                  </TableRow>

                                  <TableRow>
                                    <TableCell>English</TableCell>
                                    <TableCell>
                                      <FormControl
                                        variant="standard"
                                        sx={{ m: 1, minWidth: 120 }}
                                      >
                                        <InputLabel id="demo-simple-select-standard-label"></InputLabel>
                                        <Select
                                          labelId="demo-simple-select-standard-label"
                                          id="demo-simple-select-standard"
                                          value={engSp}
                                          onChange={(e) =>
                                            setEngSp(e.target.value)
                                          }
                                          label=""
                                        >
                                          <MenuItem value={"Average"}>
                                            Average
                                          </MenuItem>
                                          <MenuItem value={"Good"}>
                                            Good
                                          </MenuItem>
                                          <MenuItem value={"Excellent"}>
                                            Excellent
                                          </MenuItem>
                                        </Select>
                                      </FormControl>
                                    </TableCell>
                                    <TableCell>
                                      <FormControl
                                        variant="standard"
                                        sx={{ m: 1, minWidth: 120 }}
                                      >
                                        <InputLabel id="demo-simple-select-standard-label"></InputLabel>
                                        <Select
                                          labelId="demo-simple-select-standard-label"
                                          id="demo-simple-select-standard"
                                          value={engR}
                                          onChange={(e) =>
                                            setEngR(e.target.value)
                                          }
                                          label=""
                                        >
                                          <MenuItem value={"Average"}>
                                            Average
                                          </MenuItem>
                                          <MenuItem value={"Good"}>
                                            Good
                                          </MenuItem>
                                          <MenuItem value={"Excellent"}>
                                            Excellent
                                          </MenuItem>
                                        </Select>
                                      </FormControl>
                                    </TableCell>
                                    <TableCell>
                                      <FormControl
                                        variant="standard"
                                        sx={{ m: 1, minWidth: 120 }}
                                      >
                                        <InputLabel id="demo-simple-select-standard-label"></InputLabel>
                                        <Select
                                          labelId="demo-simple-select-standard-label"
                                          id="demo-simple-select-standard"
                                          value={engW}
                                          onChange={(e) =>
                                            setEngW(e.target.value)
                                          }
                                          label=""
                                        >
                                          <MenuItem value={"Average"}>
                                            Average
                                          </MenuItem>
                                          <MenuItem value={"Good"}>
                                            Good
                                          </MenuItem>
                                          <MenuItem value={"Excellent"}>
                                            Excellent
                                          </MenuItem>
                                        </Select>
                                      </FormControl>
                                    </TableCell>
                                  </TableRow>
                                </TableBody>
                              </Table>
                            </TableContainer>
                          </Row>

                          <br />
                          <Row>
                            <h5>4) Employment Record.</h5>{" "}
                            <p>
                              Starting with your present post, list in reverse
                              order positions held.
                            </p>
                          </Row>

                          <Row>
                            <TableContainer component={Paper}>
                              <Table
                                sx={{ minWidth: 650 }}
                                aria-label="simple table"
                              >
                                <TableHead>
                                  <TableRow>
                                    <TableCell colSpan={2}>
                                      Period (Month/Year){" "}
                                    </TableCell>
                                    <TableCell rowSpan={2}>
                                      Exact title of your post
                                    </TableCell>
                                    <TableCell rowSpan={2}>Faculty </TableCell>
                                    <TableCell rowSpan={2}>
                                      Department{" "}
                                    </TableCell>
                                    <TableCell rowSpan={2}>
                                      Name of the University
                                    </TableCell>

                                    <TableCell rowSpan={2}>
                                      Is Current
                                    </TableCell>
                                    <TableCell rowSpan={2}>Action</TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell>From </TableCell>
                                    <TableCell>To </TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {employeeTableData.map((row, index) => (
                                    <TableRow key={index}>
                                      <TableCell>
                                        <TextField
                                          id="standard-basic"
                                          variant="standard"
                                          value={row.fromMonthYear}
                                          onChange={(e) =>
                                            handleInputChangeEmp(
                                              index,
                                              "fromMonthYear",
                                              e.target.value
                                            )
                                          }
                                        />
                                      </TableCell>
                                      <TableCell>
                                        <TextField
                                          id="standard-basic"
                                          variant="standard"
                                          value={row.toMonthYear}
                                          onChange={(e) =>
                                            handleInputChangeEmp(
                                              index,
                                              "toMonthYear",
                                              e.target.value
                                            )
                                          }
                                        />
                                      </TableCell>
                                      <TableCell>
                                        <TextField
                                          id="standard-basic"
                                          variant="standard"
                                          value={row.exactPost}
                                          onChange={(e) =>
                                            handleInputChangeEmp(
                                              index,
                                              "exactPost",
                                              e.target.value
                                            )
                                          }
                                        />
                                      </TableCell>
                                      <TableCell>
                                        <TextField
                                          id="standard-basic"
                                          variant="standard"
                                          value={row.faculty}
                                          onChange={(e) =>
                                            handleInputChangeEmp(
                                              index,
                                              "faculty",
                                              e.target.value
                                            )
                                          }
                                        />
                                      </TableCell>
                                      <TableCell>
                                        <TextField
                                          id="standard-basic"
                                          variant="standard"
                                          value={row.department}
                                          onChange={(e) =>
                                            handleInputChangeEmp(
                                              index,
                                              "department",
                                              e.target.value
                                            )
                                          }
                                        />
                                      </TableCell>
                                      <TableCell>
                                        <FormControl size="small" >
                                          <InputLabel id="demo-simple-select-label">
                                            University
                                          </InputLabel>
                                          <Select

                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={row.universityName}
                                            label="University"
                                            onChange={(e) =>
                                              handleInputChangeEmp(
                                                index,
                                                "universityName",
                                                e.target.value
                                              )
                                            }
                                            style={{ maxWidth: "150px", minWidth: "120px" }}
                                          >
                                            <MenuItem

                                              value={"University of Colombo"}
                                            >
                                              University of Colombo
                                            </MenuItem>
                                            <MenuItem
                                              value={"University of Peradeniya"}
                                            >
                                              University of Peradeniya
                                            </MenuItem>
                                            <MenuItem
                                              value={"University of Moratuwa"}
                                            >
                                              University of Moratuwa
                                            </MenuItem>
                                            <MenuItem
                                              value={
                                                "University of Sri Jayewardenepura"
                                              }
                                            >
                                              University of Sri Jayewardenepura
                                            </MenuItem>
                                            <MenuItem
                                              value={"University of Jaffna"}
                                            >
                                              University of Ruhuna
                                            </MenuItem>
                                            <MenuItem
                                              value={
                                                "Eastern University, Sri Lanka"
                                              }
                                            >
                                              Eastern University, Sri Lanka
                                            </MenuItem>
                                            <MenuItem
                                              value={
                                                "South Eastern University of Sri Lanka"
                                              }
                                            >
                                              South Eastern University of Sri
                                              Lanka
                                            </MenuItem>
                                            <MenuItem
                                              value={
                                                "Rajarata University of Sri Lanka"
                                              }
                                            >
                                              Rajarata University of Sri Lanka
                                            </MenuItem>
                                            <MenuItem
                                              value={
                                                "Sabaragamuwa University of Sri Lanka"
                                              }
                                            >
                                              Sabaragamuwa University of Sri
                                              Lanka
                                            </MenuItem>
                                            <MenuItem
                                              value={
                                                "Wayamba University of Sri Lanka"
                                              }
                                            >
                                              Wayamba University of Sri Lanka
                                            </MenuItem>
                                            <MenuItem
                                              value={" Uva Wellassa University"}
                                            >
                                              {" "}
                                              Uva Wellassa University
                                            </MenuItem>
                                            <MenuItem
                                              value={
                                                "University of the Visual & Performing Arts"
                                              }
                                            >
                                              University of the Visual &
                                              Performing Arts
                                            </MenuItem>
                                            <MenuItem
                                              value={
                                                "University of Vauniya, Sri Lanka"
                                              }
                                            >
                                              University of Vauniya, Sri Lanka
                                            </MenuItem>
                                          </Select>
                                        </FormControl>

                                      </TableCell>

                                      <TableCell>
                                        <FormControlLabel
                                          control={<Switch />}
                                          value={row.isCurrent}
                                          onChange={(e) =>
                                            handleInputChangeEmp(
                                              index,
                                              "isCurrent",
                                              e.target.checked
                                            )
                                          }
                                        />
                                      </TableCell>

                                      <TableCell>
                                        <Button
                                          variant="outlined"
                                          color="secondary"
                                          size="small"
                                          onClick={() =>
                                            handleRemoveRowEmp(index)
                                          }
                                        >
                                          Remove
                                        </Button>
                                      </TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </TableContainer>
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={handleAddRowEmp}
                            >
                              Add
                            </Button>
                          </Row>
                          <br />
                          <Row>
                            <h5> Current university,</h5>
                          </Row>
                          <Row>
                            <Col>
                              <Form.Group>
                                <Form.Label>
                                  Depatment Head Email{" "}
                                  <span style={{ color: "red" }}>*</span>
                                </Form.Label>
                                <Form.Control
                                  type="email"
                                  placeholder="Depatment Head Email"
                                  value={cDepartmentHeadEmail}
                                  onChange={(e) =>
                                    setCDepartmentHeadEmail(e.target.value)
                                  }
                                  required
                                />
                              </Form.Group>
                            </Col>
                            <Col>
                              <Form.Group>
                                <Form.Label>
                                  Dean Email
                                  <span style={{ color: "red" }}>*</span>
                                </Form.Label>
                                <Form.Control
                                  type="email"
                                  placeholder="Facalty Head Email"
                                  value={cFacaltyHeadEmail}
                                  onChange={(e) =>
                                    setCFacaltyHeadEmail(e.target.value)
                                  }
                                  required
                                />
                              </Form.Group>
                            </Col>
                            <Col>
                              <Form.Group>
                                <Form.Label>
                                  Vice Chancellor Email
                                  <span style={{ color: "red" }}>*</span>
                                </Form.Label>
                                <Form.Control
                                  type="email"
                                  placeholder="University Head Email"
                                  value={cUniversityHeadEmail}
                                  onChange={(e) =>
                                    setCUniversityHeadEmail(e.target.value)
                                  }
                                  required
                                />
                              </Form.Group>
                            </Col>
                          </Row>
                          <br></br>
                          <Row>
                            <h5>5) References </h5>{" "}
                            <p>
                              List Two Senior Academics who are familiar with
                              your qualifications and capabilities. (Please
                              ensure that you include the two referee reports
                              with this application)
                            </p>
                          </Row>

                          <Row>
                            <TableContainer component={Paper}>
                              <Table
                                sx={{ minWidth: 650 }}
                                aria-label="simple table"
                              >
                                <TableHead>
                                  <TableRow>
                                    <TableCell>Name </TableCell>
                                    <TableCell>Full address</TableCell>
                                    <TableCell>Telephone </TableCell>
                                    <TableCell>Fax </TableCell>
                                    <TableCell>E-mail </TableCell>
                                    <TableCell>Position </TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  <TableRow>
                                    <TableCell>
                                      <TextField
                                        id="standard-basic"
                                        variant="standard"
                                        onChange={(e) =>
                                          updateReference(
                                            0,
                                            "name",
                                            e.target.value
                                          )
                                        }
                                      />
                                    </TableCell>
                                    <TableCell>
                                      <Textarea
                                        minRows={1}
                                        style={{
                                          border: "none",
                                          borderBottom: "1px solid #000",
                                          borderRadius: "0",
                                        }}
                                        onChange={(e) =>
                                          updateReference(
                                            0,
                                            "fullAddress",
                                            e.target.value
                                          )
                                        }
                                      />
                                    </TableCell>
                                    <TableCell>
                                      <TextField
                                        id="standard-basic"
                                        variant="standard"
                                        onChange={(e) =>
                                          updateReference(
                                            0,
                                            "tel",
                                            e.target.value
                                          )
                                        }
                                      />
                                    </TableCell>
                                    <TableCell>
                                      <TextField
                                        id="standard-basic"
                                        variant="standard"
                                        onChange={(e) =>
                                          updateReference(
                                            0,
                                            "fax",
                                            e.target.value
                                          )
                                        }
                                      />
                                    </TableCell>
                                    <TableCell>
                                      <TextField
                                        id="standard-basic"
                                        variant="standard"
                                        onChange={(e) =>
                                          updateReference(
                                            0,
                                            "email",
                                            e.target.value
                                          )
                                        }
                                      />
                                    </TableCell>
                                    <TableCell>
                                      <TextField
                                        id="standard-basic"
                                        variant="standard"
                                        onChange={(e) =>
                                          updateReference(
                                            0,
                                            "position",
                                            e.target.value
                                          )
                                        }
                                      />
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell>
                                      <TextField
                                        id="standard-basic"
                                        variant="standard"
                                        onChange={(e) =>
                                          updateReference(
                                            1,
                                            "name",
                                            e.target.value
                                          )
                                        }
                                      />
                                    </TableCell>
                                    <TableCell>
                                      <Textarea
                                        minRows={1}
                                        style={{
                                          border: "none",
                                          borderBottom: "1px solid #000",
                                          borderRadius: "0",
                                        }}
                                        onChange={(e) =>
                                          updateReference(
                                            1,
                                            "fullAddress",
                                            e.target.value
                                          )
                                        }
                                      />
                                    </TableCell>
                                    <TableCell>
                                      <TextField
                                        id="standard-basic"
                                        variant="standard"
                                        onChange={(e) =>
                                          updateReference(
                                            1,
                                            "tel",
                                            e.target.value
                                          )
                                        }
                                      />
                                    </TableCell>
                                    <TableCell>
                                      <TextField
                                        id="standard-basic"
                                        variant="standard"
                                        onChange={(e) =>
                                          updateReference(
                                            1,
                                            "fax",
                                            e.target.value
                                          )
                                        }
                                      />
                                    </TableCell>
                                    <TableCell>
                                      <TextField
                                        id="standard-basic"
                                        variant="standard"
                                        onChange={(e) =>
                                          updateReference(
                                            1,
                                            "email",
                                            e.target.value
                                          )
                                        }
                                      />
                                    </TableCell>
                                    <TableCell>
                                      <TextField
                                        id="standard-basic"
                                        variant="standard"
                                        onChange={(e) =>
                                          updateReference(
                                            1,
                                            "position",
                                            e.target.value
                                          )
                                        }
                                      />
                                    </TableCell>
                                  </TableRow>
                                </TableBody>
                              </Table>
                            </TableContainer>
                          </Row>
                          <br />
                          <h5>
                            6) State any additional skills and relevant facts
                            which might help to evaluate your application
                          </h5>
                          <Textarea
                            minRows={3}
                            value={additionalSkills}
                            onChange={(e) =>
                              setAdditionalSkills(e.target.value)
                            }
                          />

                          <br />
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
                                  {publicationTableData.map((row, index) => (
                                    <TableRow key={index}>
                                      <TableCell>
                                        <TextField
                                          id="standard-basic"
                                          variant="standard"
                                          value={row.fromMonthYear}
                                          onChange={(e) =>
                                            handleInputChangePub(
                                              index,
                                              "title",
                                              e.target.value
                                            )
                                          }
                                        />
                                      </TableCell>
                                      <TableCell>
                                        <TextField
                                          id="standard-basic"
                                          variant="standard"
                                          value={row.toMonthYear}
                                          onChange={(e) =>
                                            handleInputChangePub(
                                              index,
                                              "publisher",
                                              e.target.value
                                            )
                                          }
                                        />
                                      </TableCell>
                                      <TableCell>
                                        <TextField
                                          id="standard-basic"
                                          variant="standard"
                                          value={row.exactPost}
                                          onChange={(e) =>
                                            handleInputChangePub(
                                              index,
                                              "place",
                                              e.target.value
                                            )
                                          }
                                        />
                                      </TableCell>
                                      <TableCell>
                                        <TextField
                                          id="standard-basic"
                                          variant="standard"
                                          value={row.facalty}
                                          onChange={(e) =>
                                            handleInputChangePub(
                                              index,
                                              "date",
                                              e.target.value
                                            )
                                          }
                                        />
                                      </TableCell>
                                      <TableCell>
                                        <Button
                                          component="label"
                                          variant="contained"
                                          startIcon={<CloudUploadIcon />}
                                          style={{
                                            fontSize: "10px",
                                            padding: "8px",
                                            width: "140px",
                                            maxHeight: "50px",
                                            overflow: "hidden",
                                          }}
                                        >
                                          {row.publication ? (<>{row.publication.name} is uploaded</>) : (<>Upload file</>)}
                                          <VisuallyHiddenInput
                                            type="file"
                                            onChange={(e) =>
                                              handleInputChangePub(
                                                index,
                                                "publication",
                                                e.target.files[0]
                                              )
                                            }
                                          />
                                        </Button><br></br>

                                      </TableCell>

                                      <TableCell>
                                        <Button
                                          variant="outlined"
                                          color="secondary"
                                          size="small"
                                          onClick={() =>
                                            handleRemoveRowPub(index)
                                          }
                                        >
                                          Remove
                                        </Button>
                                      </TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </TableContainer>
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={handleAddRowPub}
                            >
                              Add
                            </Button>
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
                    <Form ref={formRef}>
                      <Row>
                        <Col>
                          <Form.Label id="demo-row-radio-buttons-group-label">
                            Degree Sought:
                          </Form.Label>
                          <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            value={degreeSought}
                            onChange={(e) => setDegreeSought(e.target.value)}
                          >
                            <FormControlLabel
                              value="M Phil Leading to PhD"
                              control={<Radio />}
                              label="M Phil Leading to PhD"
                            />
                            <FormControlLabel
                              value="Ph D"
                              control={<Radio />}
                              label="Ph D"
                            />
                            <FormControlLabel
                              value="Master"
                              control={<Radio />}
                              label="Master"
                            />
                          </RadioGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Form.Group controlId="">
                            <Form.Label>Title of Research</Form.Label>
                            <Textarea
                              type="text"
                              placeholder="Title of Research"
                              value={titleOfR}
                              onChange={(e) => setTitleOfR(e.target.value)}
                              required
                              minRows={1}
                            />
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group controlId="">
                            <Form.Label>
                              Research Field (Please specify)
                            </Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Research Field"
                              value={researchF}
                              onChange={(e) => setResearchF(e.target.value)}
                              required
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <br />
                      <Row>
                        <Col>
                          <Form.Label id="demo-row-radio-buttons-group-label">
                            Are you already registered for degree?
                          </Form.Label>
                        </Col>
                        <Col>
                          <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            value={rDegree}
                            onChange={(e) => setRDegree(e.target.value)}
                          >
                            <FormControlLabel
                              value="Yes"
                              control={<Radio />}
                              label="Yes"
                            />
                            <FormControlLabel
                              value="No"
                              control={<Radio />}
                              label="No"
                            />
                          </RadioGroup>
                        </Col>
                        <Col>
                          <Form.Label id="demo-row-radio-buttons-group-label">
                            Or do you have a valid placement letter?
                          </Form.Label>
                        </Col>
                        <Col>
                          <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            value={pLetter}
                            onChange={(e) => setPLetter(e.target.value)}
                          >
                            <FormControlLabel
                              value="Yes"
                              control={<Radio />}
                              label="Yes"
                            />
                            <FormControlLabel
                              value="No"
                              control={<Radio />}
                              label="No"
                            />
                          </RadioGroup>
                        </Col>
                      </Row>
                      {rDegree == "Yes" || pLetter == "Yes" ? (
                        <>
                          <FormLabel>
                            If yes, please give the following details.
                          </FormLabel>
                          <Row>
                            <Col>
                              <Form.Group controlId="">
                                <Form.Label>
                                  Name of the University/Institution
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="Name of the University/Institution"
                                  value={universityIns}
                                  onChange={(e) =>
                                    setUniversityIns(e.target.value)
                                  }
                                  required
                                />
                              </Form.Group>
                            </Col>
                            <Col>
                              <Form.Group controlId="">
                                <Form.Label>Faculty/ Department</Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="Faculty/ Department"
                                  value={facaltyDep}
                                  onChange={(e) =>
                                    setFacaltyDep(e.target.value)
                                  }
                                  required
                                />
                              </Form.Group>
                            </Col>
                          </Row>
                          <br />
                          <Row>
                            <Col>
                              <Form.Label>Period of Registration</Form.Label>
                            </Col>
                            <Col>
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer
                                  components={["DatePicker", "DatePicker"]}
                                >
                                  <DatePicker
                                    label="From"
                                    value={regFromDate}
                                    onChange={(e) => setRegFromDate(e)}
                                    style={{
                                      width: "150px",
                                      fontSize: "14px",
                                    }}
                                  />
                                  <DatePicker
                                    label="To"
                                    value={regToDate}
                                    onChange={(e) => setRegToDate(e)}
                                  />
                                </DemoContainer>
                              </LocalizationProvider>
                            </Col>
                            <Col>
                              <Row>
                                <Col>
                                  <br />
                                  <Button
                                    component="label"
                                    variant="contained"
                                    startIcon={<CloudUploadIcon />}
                                  >
                                    {regPlacementPdf ? (<>{regPlacementPdf.name} is uploaded</>) : (<>Upload file</>)}
                                    <VisuallyHiddenInput
                                      type="file"
                                      onChange={(e) =>
                                        setRegPlacementPdf(e.target.files[0])
                                      }
                                    />
                                  </Button>
                                </Col>
                              </Row>
                            </Col>
                            <Col>
                              <Form.Label>
                                * Please attach the registration or placement
                                letter
                              </Form.Label>
                            </Col>
                          </Row>
                          <br />
                          <Row>
                            <Col>
                              <Form.Group controlId="textInput">
                                <Form.Label>Name/s of Supervisor</Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="Name/s of Supervisor"
                                  value={sName}
                                  onChange={(e) => setSName(e.target.value)}
                                />
                              </Form.Group>
                            </Col>
                            <Col>
                              <Row>
                                <Form.Group controlId="formBasicEmail">
                                  <Form.Label>E Mail</Form.Label>
                                  <Form.Control
                                    type="email"
                                    placeholder="Email"
                                    value={sEmail}
                                    onChange={(e) => setSEmail(e.target.value)}
                                  />
                                </Form.Group>
                              </Row>
                              <Row>
                                <Form.Group controlId="phoneNumberInput">
                                  <Form.Label>Tel</Form.Label>
                                  <Form.Control
                                    type="text"
                                    placeholder="Tel"
                                    value={sTel}
                                    onChange={(e) => setSTel(e.target.value)}
                                  />
                                </Form.Group>
                              </Row>
                              <Row>
                                <Form.Group controlId="faxInput">
                                  <Form.Label>Fax</Form.Label>
                                  <Form.Control
                                    type="text"
                                    placeholder="Fax"
                                    value={sFax}
                                    onChange={(e) => setSFax(e.target.value)}
                                  />
                                </Form.Group>
                              </Row>
                            </Col>
                          </Row>
                          <br />
                          <br />
                          <Form.Label>
                            Research Description - Summary of research proposal
                            (50 words)
                          </Form.Label>
                          <Textarea
                            minRows={3}
                            value={rDescription}
                            onChange={(e) => setRDescription(e.target.value)}
                          />
                          <br />
                        </>
                      ) : (
                        <></>
                      )}
                      <br />
                      <Row>
                        <Col>
                          <Col>
                            <b>
                              {" "}
                              Detailed work plan – Please attach the intended
                              detailed work plan for the total duration of study
                              (3 years), including period/s planned to study in
                              different countries with intended activity plan/s
                            </b>
                          </Col>
                          <Col>
                            <Button
                              component="label"
                              variant="contained"
                              startIcon={<CloudUploadIcon />}
                            >
                              {detailedWPPdf ? (<>{detailedWPPdf.name} is uploaded</>) : (<>Upload file</>)}
                              <VisuallyHiddenInput
                                type="file"
                                onChange={(e) =>
                                  setDetailedWPPdf(e.target.files[0])
                                }
                              />
                            </Button>
                            <font style={{ color: "red" }}></font>
                          </Col>
                        </Col>
                        <Col>
                          <Col>
                            <b>
                              Please attach your research proposal approximately
                              1500 words for Masters and 2000 words for PhD
                            </b>
                          </Col>

                          <Col>
                            <Button
                              component="label"
                              variant="contained"
                              startIcon={<CloudUploadIcon />}
                            >
                              {proposalPdf ? (<>{proposalPdf.name} is uploaded</>) : (<>Upload file</>)}
                              <VisuallyHiddenInput
                                type="file"
                                onChange={(e) =>
                                  setProposalPdf(e.target.files[0])
                                }
                              />
                            </Button>
                          </Col>
                        </Col>
                      </Row>
                      <br />
                      <Row>
                        <Col>
                          <Form.Label id="demo-row-radio-buttons-group-label">
                            Full time or Part time{" "}
                          </Form.Label>
                          <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            value={fullOrPartTime}
                            onChange={(e) => setfullOrPartTime(e.target.value)}
                          >
                            <FormControlLabel
                              value="Full time"
                              control={<Radio />}
                              label="Full time"
                            />
                            <FormControlLabel
                              value="Part time"
                              control={<Radio />}
                              label="Part time"
                            />
                          </RadioGroup>
                        </Col>
                        <Col>
                          {fullOrPartTime == "Part time" && (
                            <>
                              <p>Do you undertake</p>
                              <Row>
                                <Col>
                                  <Checkbox
                                    checked={isTeaching}
                                    onChange={(e) =>
                                      setIsTeaching(e.target.checked)
                                    }
                                    inputProps={{ "aria-label": "controlled" }}
                                  />
                                  <Form.Label id="demo-row-radio-buttons-group-label">
                                    Teaching
                                  </Form.Label>
                                </Col>

                                {isTeaching && (
                                  <>
                                    <Col>
                                      <Form.Group controlId="">
                                        <Form.Control
                                          type="text"
                                          placeholder="No of hours per week"
                                          value={teachingHours}
                                          onChange={(e) =>
                                            setTeachingHours(e.target.value)
                                          }
                                          required
                                        />
                                      </Form.Group>
                                    </Col>
                                  </>
                                )}
                              </Row>

                              <br />
                              <Row>
                                <Col>
                                  <Checkbox
                                    checked={aPositions}
                                    onChange={(e) =>
                                      setAPositions(e.target.checked)
                                    }
                                    inputProps={{ "aria-label": "controlled" }}
                                  />
                                  <Form.Label id="demo-row-radio-buttons-group-label">
                                    Administrative position
                                  </Form.Label>
                                </Col>

                                {aPositions && (
                                  <>
                                    <Col>
                                      <Form.Group controlId="">
                                        <Form.Control
                                          type="text"
                                          placeholder="Position Name"
                                          value={positionName}
                                          onChange={(e) =>
                                            setPositionName(e.target.value)
                                          }
                                          required
                                        />
                                      </Form.Group>
                                    </Col>
                                  </>
                                )}
                              </Row>

                              <Checkbox
                                checked={otherReaserchW}
                                onChange={(e) =>
                                  setOtherReaserchW(e.target.checked)
                                }
                                inputProps={{ "aria-label": "controlled" }}
                              />
                              <Form.Label id="demo-row-radio-buttons-group-label">
                                Other research work
                              </Form.Label>
                              <br />
                            </>
                          )}
                        </Col>
                      </Row>
                    </Form>
                  </Row>
                </div>
              )}
              {activeStep === 2 && (
                <div className={formStyle.formDiv}>
                  <Row>
                    <Form ref={formRef}>
                      <Row>
                        <h5>Estimated Cost of Degree Study (in Rupees)</h5>
                        <Col>
                          <Form.Group controlId="">
                            <Form.Label>Country</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Country"
                              value={countryP3}
                              onChange={(e) => setCountryP3(e.target.value)}
                              required
                            />
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group controlId="">
                            <Form.Label>University</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="University"
                              value={universityP3}
                              onChange={(e) => setUniversityP3(e.target.value)}
                              required
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <br />
                      <Row>
                        <TableContainer component={Paper}>
                          <Table
                            sx={{ minWidth: 650 }}
                            aria-label="simple table"
                          >
                            <TableHead>
                              <TableRow>
                                <TableCell> </TableCell>
                                <TableCell>Year 1 (Rs)</TableCell>
                                <TableCell>Year 2 (Rs)</TableCell>
                                <TableCell>Year 3 (Rs)</TableCell>
                                <TableCell>Total (Rs)</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              <TableRow>
                                <TableCell>
                                  <p style={{}}>1. Institutional Costs</p>
                                </TableCell>
                                <TableCell>
                                  <TextField
                                    id="standard-basic"
                                    variant="standard"
                                    value={instCost.y1}
                                    onChange={(e) =>
                                      updateInstCostField("y1", e.target.value)
                                    }
                                  />
                                </TableCell>
                                <TableCell>
                                  <TextField
                                    id="standard-basic"
                                    variant="standard"
                                    value={instCost.y2}
                                    onChange={(e) =>
                                      updateInstCostField("y2", e.target.value)
                                    }
                                  />
                                </TableCell>
                                <TableCell>
                                  <TextField
                                    id="standard-basic"
                                    variant="standard"
                                    value={instCost.y3}
                                    onChange={(e) =>
                                      updateInstCostField("y3", e.target.value)
                                    }
                                  />
                                </TableCell>
                                <TableCell>
                                  <TextField
                                    id="standard-basic"
                                    variant="standard"
                                    value={instCost.total}
                                    onChange={(e) =>
                                      updateInstCostField(
                                        "total",
                                        e.target.value
                                      )
                                    }
                                  />
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell align="right">
                                  <p>Registration fees</p>
                                </TableCell>
                                <TableCell>
                                  <TextField
                                    id="standard-basic"
                                    variant="standard"
                                    value={regFees.y1}
                                    onChange={(e) =>
                                      updateRegFees("y1", e.target.value)
                                    }
                                  />
                                </TableCell>
                                <TableCell>
                                  <TextField
                                    id="standard-basic"
                                    variant="standard"
                                    value={regFees.y2}
                                    onChange={(e) =>
                                      updateRegFees("y2", e.target.value)
                                    }
                                  />
                                </TableCell>
                                <TableCell>
                                  <TextField
                                    id="standard-basic"
                                    variant="standard"
                                    value={regFees.y3}
                                    onChange={(e) =>
                                      updateRegFees("y3", e.target.value)
                                    }
                                  />
                                </TableCell>
                                <TableCell>
                                  <TextField
                                    id="standard-basic"
                                    variant="standard"
                                    value={regFees.total}
                                    onChange={(e) =>
                                      updateRegFees("total", e.target.value)
                                    }
                                  />
                                </TableCell>
                              </TableRow>

                              <TableRow>
                                <TableCell align="right">
                                  <p>Tuition fees</p>
                                </TableCell>
                                <TableCell>
                                  <TextField
                                    id="standard-basic"
                                    variant="standard"
                                    value={tutionFees.y1}
                                    onChange={(e) =>
                                      updateTutionFees("y1", e.target.value)
                                    }
                                  />
                                </TableCell>
                                <TableCell>
                                  <TextField
                                    id="standard-basic"
                                    variant="standard"
                                    value={tutionFees.y2}
                                    onChange={(e) =>
                                      updateTutionFees("y2", e.target.value)
                                    }
                                  />
                                </TableCell>
                                <TableCell>
                                  <TextField
                                    id="standard-basic"
                                    variant="standard"
                                    value={tutionFees.y3}
                                    onChange={(e) =>
                                      updateTutionFees("y3", e.target.value)
                                    }
                                  />
                                </TableCell>
                                <TableCell>
                                  <TextField
                                    id="standard-basic"
                                    variant="standard"
                                    value={tutionFees.total}
                                    onChange={(e) =>
                                      updateTutionFees("total", e.target.value)
                                    }
                                  />
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell align="right">
                                  <p>Other fees (specify)</p>
                                </TableCell>
                                <TableCell>
                                  <TextField
                                    id="standard-basic"
                                    variant="standard"
                                    value={otherFees.y1}
                                    onChange={(e) =>
                                      updateOtherFees("y1", e.target.value)
                                    }
                                  />
                                </TableCell>
                                <TableCell>
                                  <TextField
                                    id="standard-basic"
                                    variant="standard"
                                    value={otherFees.y2}
                                    onChange={(e) =>
                                      updateOtherFees("y2", e.target.value)
                                    }
                                  />
                                </TableCell>
                                <TableCell>
                                  <TextField
                                    id="standard-basic"
                                    variant="standard"
                                    value={otherFees.y3}
                                    onChange={(e) =>
                                      updateOtherFees("y3", e.target.value)
                                    }
                                  />
                                </TableCell>
                                <TableCell>
                                  <TextField
                                    id="standard-basic"
                                    variant="standard"
                                    value={otherFees.total}
                                    onChange={(e) =>
                                      updateOtherFees("total", e.target.value)
                                    }
                                  />
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>
                                  <p>
                                    2. Research expenses (only for the
                                    candidates registered in local universities)
                                  </p>
                                  <Button
                                    component="label"
                                    variant="contained"
                                    startIcon={<CloudUploadIcon />}
                                  >
                                    {researchExpensesPdf ? (researchExpensesPdf.name) : (<>Upload</>)}
                                    <VisuallyHiddenInput
                                      type="file"
                                      onChange={(e) =>
                                        setResearchExpensesPdf(
                                          e.target.files[0]
                                        )
                                      }
                                    />
                                  </Button>
                                  <p style={{ fontStyle: "italic" }}>
                                    (Detailed budget of research expenses
                                    recommended by supervisor should be attached
                                    separately)
                                  </p>
                                </TableCell>
                                <TableCell>
                                  <TextField
                                    id="standard-basic"
                                    variant="standard"
                                    value={researchExpenses.y1}
                                    onChange={(e) =>
                                      updateResearchExpenses(
                                        "y1",
                                        e.target.value
                                      )
                                    }
                                  />
                                </TableCell>
                                <TableCell>
                                  <TextField
                                    id="standard-basic"
                                    variant="standard"
                                    value={researchExpenses.y2}
                                    onChange={(e) =>
                                      updateResearchExpenses(
                                        "y2",
                                        e.target.value
                                      )
                                    }
                                  />
                                </TableCell>
                                <TableCell>
                                  <TextField
                                    id="standard-basic"
                                    variant="standard"
                                    value={researchExpenses.y3}
                                    onChange={(e) =>
                                      updateResearchExpenses(
                                        "y3",
                                        e.target.value
                                      )
                                    }
                                  />
                                </TableCell>
                                <TableCell>
                                  <TextField
                                    id="standard-basic"
                                    variant="standard"
                                    value={researchExpenses.total}
                                    onChange={(e) =>
                                      updateResearchExpenses(
                                        "total",
                                        e.target.value
                                      )
                                    }
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
                      <Row>
                        <Col>
                          <FormLabel id="demo-row-radio-buttons-group-label">
                            {" "}
                            Is the proposed Degree study currently being
                            supported by any other grant?{" "}
                          </FormLabel>
                          <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            value={cGrant}
                            onChange={(e) => setCGrant(e.target.value)}
                          >
                            <FormControlLabel
                              value="Yes"
                              control={<Radio />}
                              label="Yes"
                            />
                            <FormControlLabel
                              value="No"
                              control={<Radio />}
                              label="No"
                            />
                          </RadioGroup>
                        </Col>
                      </Row>
                      {cGrant == "Yes" && (
                        <>
                          <TableContainer component={Paper}>
                            <Table
                              sx={{ minWidth: 650 }}
                              aria-label="simple table"
                            >
                              <TableHead>
                                <TableRow>
                                  <TableCell>
                                    {" "}
                                    Name of Granting Organization
                                  </TableCell>
                                  <TableCell>Amount per year </TableCell>
                                  <TableCell>Duration</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                <TableRow>
                                  <TableCell>
                                    <TextField
                                      id="standard-basic"
                                      variant="standard"
                                      value={otherFin.orgName}
                                      onChange={(e) =>
                                        updateOterFin("orgName", e.target.value)
                                      }
                                    />
                                  </TableCell>
                                  <TableCell>
                                    <TextField
                                      id="standard-basic"
                                      variant="standard"
                                      value={otherFin.amountYear}
                                      onChange={(e) =>
                                        updateOterFin(
                                          "amountYear",
                                          e.target.value
                                        )
                                      }
                                    />
                                  </TableCell>
                                  <TableCell>
                                    <TextField
                                      id="standard-basic"
                                      variant="standard"
                                      value={otherFin.duration}
                                      onChange={(e) =>
                                        updateOterFin(
                                          "duration",
                                          e.target.value
                                        )
                                      }
                                    />
                                  </TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </>
                      )}
                      <Row>
                        <Row>
                          <p>Other supportive Documents</p>
                        </Row>
                        <Row>
                          <Col>
                            <FormLabel id="demo-row-radio-buttons-group-label">
                              {" "}
                              Is your degree study currently being considered elsewhere for funding{" "}
                            </FormLabel>
                            <RadioGroup
                              row
                              aria-labelledby="demo-row-radio-buttons-group-label"
                              name="row-radio-buttons-group"
                              value={elsFunding}
                              onChange={(e) => setElsFunding(e.target.value)}
                            >
                              <FormControlLabel
                                value="Yes"
                                control={<Radio />}
                                label="Yes"
                              />
                              <FormControlLabel
                                value="No"
                                control={<Radio />}
                                label="No"
                              />
                            </RadioGroup>
                          </Col>
                        </Row>
                        {elsFunding == "Yes" && (
                          <>
                            <TableContainer component={Paper}>
                              <Table
                                sx={{ minWidth: 650 }}
                                aria-label="simple table"
                              >
                                <TableBody>
                                  <TableRow>
                                    <TableCell>
                                      Self-Declaration Letter *
                                    </TableCell>
                                    <TableCell>
                                      <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                        value={otherSupDocs.selfLetter}
                                        onChange={(e) =>
                                          updateOtherSupDocs(
                                            "selfLetter",
                                            e.target.value
                                          )
                                        }
                                      >
                                        <FormControlLabel
                                          value="Yes"
                                          control={<Radio />}
                                          label="Yes"
                                        />
                                        <FormControlLabel
                                          value="No"
                                          control={<Radio />}
                                          label="No"
                                        />
                                      </RadioGroup>
                                    </TableCell>
                                    <TableCell>Work Plan</TableCell>
                                    <TableCell>
                                      <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                        value={otherSupDocs.workPlan}
                                        onChange={(e) =>
                                          updateOtherSupDocs(
                                            "workPlan",
                                            e.target.value
                                          )
                                        }
                                      >
                                        <FormControlLabel
                                          value="Yes"
                                          control={<Radio />}
                                          label="Yes"
                                        />
                                        <FormControlLabel
                                          value="No"
                                          control={<Radio />}
                                          label="No"
                                        />
                                      </RadioGroup>
                                    </TableCell>
                                  </TableRow>

                                  <TableRow>
                                    <TableCell>
                                      Personal Health Report
                                    </TableCell>
                                    <TableCell>
                                      <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                        value={otherSupDocs.personalHealt}
                                        onChange={(e) =>
                                          updateOtherSupDocs(
                                            "personalHealt",
                                            e.target.value
                                          )
                                        }
                                      >
                                        <FormControlLabel
                                          value="Yes"
                                          control={<Radio />}
                                          label="Yes"
                                        />
                                        <FormControlLabel
                                          value="No"
                                          control={<Radio />}
                                          label="No"
                                        />
                                      </RadioGroup>
                                    </TableCell>
                                    <TableCell>
                                      IELTS/TOEFL/PTE (Attach a Certified Copy)
                                    </TableCell>
                                    <TableCell>
                                      <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                        value={otherSupDocs.ielts}
                                        onChange={(e) =>
                                          updateOtherSupDocs(
                                            "ielts",
                                            e.target.value
                                          )
                                        }
                                      >
                                        <FormControlLabel
                                          value="Yes"
                                          control={<Radio />}
                                          label="Yes"
                                        />
                                        <FormControlLabel
                                          value="No"
                                          control={<Radio />}
                                          label="No"
                                        />
                                      </RadioGroup>
                                    </TableCell>
                                  </TableRow>

                                  <TableRow>
                                    <TableCell>Study Leave Letter</TableCell>
                                    <TableCell>
                                      <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                        value={otherSupDocs.studyLetter}
                                        onChange={(e) =>
                                          updateOtherSupDocs(
                                            "studyLetter",
                                            e.target.value
                                          )
                                        }
                                      >
                                        <FormControlLabel
                                          value="Yes"
                                          control={<Radio />}
                                          label="Yes"
                                        />
                                        <FormControlLabel
                                          value="No"
                                          control={<Radio />}
                                          label="No"
                                        />
                                      </RadioGroup>
                                    </TableCell>
                                  </TableRow>
                                </TableBody>
                              </Table>
                            </TableContainer>
                          </>
                        )}
                      </Row>
                    </Form>
                  </Row>
                </div>
              )}

              {activeStep === 3 && (
                <div className={formStyle.formDiv}>
                  {isLoading ? (
                    <>
                      <Box sx={{ width: "100%" }}>
                        <LinearProgress />
                      </Box>
                    </>
                  ) : (
                    <>
                      <Row>pending approval</Row>
                    </>
                  )}
                </div>
              )}

              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Box sx={{ flex: "1 1 auto" }} />
                {isStepOptional(activeStep) && (
                  <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                    Skip
                  </Button>
                )}

                {activeStep === steps.length - 1 ? (
                  <>
                    <Button
                      onClick={handleFinish}
                      style={{
                        padding: "4px",
                        border: "1px #17376e solid",
                        marginRight: " 3%",
                        backgroundColor: "#17376e",
                        color: "white",
                        fontWeight: "bold",
                      }}
                    >
                      {activeStep === steps.length - 1 ? "Finish" : "Next"}
                    </Button>
                  </>
                ) : (
                  <>
                    {!(age.years > 50) && (
                      <>
                        <Button
                          onClick={handleNext}
                          style={{
                            padding: "4px",
                            border: "1px #17376e solid",
                            marginRight: " 3%",
                            backgroundColor: "#17376e",
                            color: "white",
                            fontWeight: "bold",
                          }}
                        >
                          {activeStep === steps.length - 1 ? "Finish" : "Next"}
                        </Button>
                      </>
                    )}
                  </>
                )}
              </Box>
            </React.Fragment>
          )}
        </Box>
      </Container>
    </div>
  );
};

export default FormScreen;