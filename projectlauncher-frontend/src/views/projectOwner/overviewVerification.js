import React from "react";
import {Row, Col, Card, Button, Container} from "react-bootstrap";
import Navigator from "../../components/navigator";
import { useNavigate } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import './verification.css'

function OverviewVerification(){

    const navigate = useNavigate();

    return (
        <div>
            <Navigator/>
            <Card>
                <Card.Title>
                    <div><h1>Project Owner Verification</h1></div>
                </Card.Title>
                <Row xs={1} md={1}>
                    {Array.from({ length: 30 }).map((_, idx) => (
                        <Card className = "project-owner-overview-card">
                            <Container>
                                <Row>
                                    <Col>Mr.Anon Ongsakul</Col>
                                    <Col className="d-flex justify-content-end">
                                        <Button variant = "link" onClick = {()=>navigate("/project-owner/specified")}>
                                            Detail
                                        </Button>
                                    </Col>
                                </Row>
                            </Container>
                        </Card>
                    ))}
                </Row>
            </Card>
        </div>);
}

export default OverviewVerification