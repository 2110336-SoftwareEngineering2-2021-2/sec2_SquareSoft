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
                    <h1>
                        Project Owner Verification
                    </h1>
                </Card.Title>
                <Row xs={1} md={1}>
                    {Array.from({ length: 4 }).map((_, idx) => (
                        <Card>
                            <Container>
                                <Row>
                                    <Col>
                                        Mr.Anon Ongsakul
                                    </Col>
                                    <Col className="d-flex justify-content-end">
                                        <Button variant = "link" onClick = {()=>navigate("/project-owner-verification")}>
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