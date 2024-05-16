import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Check from "@mui/icons-material/Check";
import VerifiedIcon from "@mui/icons-material/Verified";
import AddTaskIcon from "@mui/icons-material/AddTask";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { Row, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import Button from "@mui/joy/Button";
import CancelIcon from "@mui/icons-material/Cancel";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { useParams } from "react-router-dom";

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)",
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#784af4",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#784af4",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

const QontoStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  color: theme.palette.mode === "dark" ? theme.palette.grey[700] : "#eaeaf0",
  display: "flex",
  height: 22,
  alignItems: "center",
  ...(ownerState.active && {
    color: "#784af4",
  }),
  "& .QontoStepIcon-completedIcon": {
    color: "#784af4",
    zIndex: 1,
    fontSize: 18,
  },
  "& .QontoStepIcon-circle": {
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: "currentColor",
  },
}));

function QontoStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

QontoStepIcon.propTypes = {
  active: PropTypes.bool,
  className: PropTypes.string,
  completed: PropTypes.bool,
};

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  backgroundColor:
    theme.palette.mode === "light" ? theme.palette.grey[700] : "#ccc",
  zIndex: 1,
  color: "#fff",
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  }),
  ...(ownerState.completed && {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <PublishedWithChangesIcon />,
    2: <AddTaskIcon />,
    3: <VerifiedIcon />,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

ColorlibStepIcon.propTypes = {
  active: PropTypes.bool,
  className: PropTypes.string,
  completed: PropTypes.bool,
  icon: PropTypes.node,
};

const steps = [
  "Department Head Approval",
  "Faculty Head Approval",
  "Vice Chancellor Approval",
];

export default function ApproveProgres() {
  const [activeStep, setActiveStep] = useState(0);
  const id = useParams();


  const handleCardClick = (index) => {
    setActiveStep(index);
  };

  return (
    <Stack sx={{ width: "100%" }} spacing={2} marginBottom={2}>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        connector={<QontoConnector />}
      >
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        connector={<ColorlibConnector />}
      >
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Row>
        <Col>
          {" "}
          <Card>
            <Card.Img variant="top" src="../../fh.png" />
            <Card.Body>
              <Card.Title>Department Head Response</Card.Title>
              <Card.Text>
                <strong>Department Details:</strong> Some details about the
                department.
              </Card.Text>
              <Card.Text>
                <strong>Department Head Name:</strong>Load Sirisoma
              </Card.Text>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
              <div>
                <strong>Approval Status:</strong>{" "}
                <span style={{ color: "red" }}>Not Approved</span>
              </div>
              <br />
              <Row>
                <Col>
                  <Button endDecorator={<CancelIcon />} color="danger">
                    Rejected
                  </Button>
                </Col>
                <Col>
                  <Button
                    endDecorator={<KeyboardArrowRight />}
                    onClick={() => handleCardClick(0)}
                    color="success"
                  >
                    Approved
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card style={{}}>
            <Card.Img variant="top" src="../../dh.png" />
            <Card.Body>
              <Card.Title>Department Head Response</Card.Title>
              <Card.Text>
                <strong>Department Details:</strong> Some details about the
                department.
              </Card.Text>
              <Card.Text>
                <strong>Department Head Name:</strong>Load Sirisoma
              </Card.Text>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
              <div>
                <strong>Approval Status:</strong>{" "}
                <span style={{ color: "red" }}>Not Approved</span>
              </div>
              <br />
              <center>
                <Row>
                  <Col>
                    <Button
                      endDecorator={<CancelIcon />}
                      color="danger"
                      onClick={() => handleCardClick(0)}
                    >
                      Rejected
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      endDecorator={<KeyboardArrowRight />}
                      onClick={() => handleCardClick(1)}
                      color="success"
                    >
                      Approved
                    </Button>
                  </Col>
                </Row>
              </center>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card style={{}}>
            <Card.Img variant="top" src="../../vc.png" />
            <Card.Body>
              <Card.Title>Department Head Response</Card.Title>
              <Card.Text>
                <strong>Department Details:</strong> Some details about the
                department.
              </Card.Text>
              <Card.Text>
                <strong>Department Head Name:</strong>Load Sirisoma
              </Card.Text>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
              <div>
                <strong>Approval Status:</strong>{" "}
                <span style={{ color: "red" }}>Not Approved</span>
              </div>
              <br />
              <center>
                <Row>
                  <Col>
                    <Button
                      endDecorator={<CancelIcon />}
                      color="danger"
                      onClick={() => handleCardClick(1)}
                    >
                      Rejected
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      endDecorator={<KeyboardArrowRight />}
                      onClick={() => handleCardClick(2)}
                      color="success"
                    >
                      Approved
                    </Button>
                  </Col>
                </Row>
              </center>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Stack>
  );
}
