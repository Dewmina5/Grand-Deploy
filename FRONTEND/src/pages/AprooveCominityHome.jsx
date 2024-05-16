import React from 'react';
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import { Row, Col } from "react-bootstrap";
import CardActions from "@mui/joy/CardActions";
import CircularProgress from "@mui/joy/CircularProgress";
import SvgIcon from "@mui/joy/SvgIcon";
import Button from "@mui/joy/Button";
import SchoolIcon from '@mui/icons-material/School';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

export default function AprooveCominityHome() {
  return (
    <div style={{ margin: "10px" }}>
    <Row>
      <Col>
        <Card variant="solid" color="primary" invertedColors>
          <CardContent orientation="horizontal">
            <CircularProgress size="lg" determinate value={20}>
              <SvgIcon>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
                  />
                </svg>
              </SvgIcon>
            </CircularProgress>
            <CardContent>
              <Typography level="body-md">Pending Applicant</Typography>
              <Typography level="h2">432</Typography>
            </CardContent>
          </CardContent>
          <CardActions>
            <Button variant="soft" size="sm">
              View Aplicant
            </Button>
            <Button variant="solid" size="sm">
              See Progress
            </Button>
          </CardActions>
        </Card>
      </Col>
      <Col>
        <Card variant="solid" style={{backgroundColor:"#009688"}} invertedColors>
          <CardContent orientation="horizontal">
            <CircularProgress size="lg" determinate value={70}>
              <SvgIcon>
               <SchoolIcon/>
              </SvgIcon>
            </CircularProgress>
            <CardContent>
              <Typography level="body-md">Total Scholoships</Typography>
              <Typography level="h2">670</Typography>
            </CardContent>
          </CardContent>
          <CardActions>
            <Button variant="soft" size="sm">
              View Reviews
            </Button>
            <Button variant="solid" size="sm">
              See Messages
            </Button>
          </CardActions>
        </Card>
      </Col>
      <Col>
        <Card variant="solid" style={{backgroundColor:"#455a64"}} invertedColors>
          <CardContent orientation="horizontal">
            <CircularProgress size="lg" determinate value={50}>
              <SvgIcon>
               <ManageAccountsIcon/>
              </SvgIcon>
            </CircularProgress>
            <CardContent>
              <Typography level="body-md">All Applicant</Typography>
              <Typography level="h2">42</Typography>
            </CardContent>
          </CardContent>
          <CardActions>
            <Button variant="soft" size="sm">
              Interview Shedule
            </Button>
            <Button variant="solid" size="sm">
              See breakdown
            </Button>
          </CardActions>
        </Card>
      </Col>
    </Row>
  </div>
  )
}
