import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import Footer from '../components/Footer/footer';
import Guideline from '../components/GuideLine/Guideline';
import HomeScreenStyle from '../styles/HomeScreenStyle.module.css';

const divStyle = {
    backgroundColor: 'black',
    marginTop: '75px',
    width: '100%',
    height: '500px',
    opacity: '50%',
    position: 'fixed',
}

const divImgStyle = {
    marginTop: '75px',
    width: '100%',
    height: '500px',
    position: 'fixed',
}

const imgStyle = {
    width: '75%',
    height: '100%',
    float: 'right',
};

const wellcomeTextStyle = {
    fontFamily: 'cursive',
    fontSize: 'xx-large',
    color: 'white',
}

const HomeScreen = () => {

    const userInfoString = localStorage.getItem('UserInfo');
    const storedUserInfo = JSON.parse(userInfoString);

    useEffect(() => {
        document.title = 'HOME | NCAS';
        return () => {
            document.title = 'NCAS';
        };
    }, []);

    return (
        <>
            <div style={divImgStyle}>
                <img src="./scholarships.jpg" alt="Your Image" style={imgStyle} />
            </div>
            <div style={divStyle}>

            </div>

            <Row className={HomeScreenStyle.servText}>
                <Col>
                    <Row style={{}}>
                        <p>Services</p>
                        <h2>How It Works</h2>
                    </Row>
                    <Row style={{ margin: '0px 8%' }}>
                        <Col className={HomeScreenStyle.sevicesDiv}>
                            <div className={HomeScreenStyle.imgDiv}>
                                <img src='apply-now.webp' width={'60%'} height={'100%'} />
                            </div>
                            <h5><b>Apply To Grant</b></h5>
                        </Col >
                        <Col className={HomeScreenStyle.sevicesDiv}>
                            <div className={HomeScreenStyle.imgDiv}>
                                <img src='proceedImg.jpg' width={'60%'} height={'100%'} />
                            </div>
                            <h5><b>Start To Proceed</b></h5>
                        </Col>
                        <Col className={HomeScreenStyle.sevicesDiv}>
                            <div className={HomeScreenStyle.imgDiv}>
                                <img src='scholarimg.jpg' width={'60%'} height={'100%'} />
                            </div>
                            <h5><b>Enjoy Scholarship</b></h5>
                        </Col>
                    </Row>
                </Col>
            </Row>

            <Row style={{ margin: '22% 0px' }}>

                <Col>
                    <center>
                        {storedUserInfo ? (
                            <>
                                {storedUserInfo.UserType == 'Admin' ? (
                                    <p style={{ position: ' absolute' }}>You are a admin</p>
                                ) : (
                                    <p style={{ position: ' absolute' }}>You already applyed</p>
                                )}
                            </>) : (<> <Guideline /></>)
                        }

                    </center>
                </Col>

            </Row>
            <div className={HomeScreenStyle.footerDiv}>
                <Footer />
            </div>

        </>
    )
}

export default HomeScreen

