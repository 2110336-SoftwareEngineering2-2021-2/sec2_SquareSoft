import React, {useEffect, useState} from "react";
import {Row, Col, Card, Button, Container} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import Navigator from "../../components/navigator";
import { getOverviewProjectOwner } from "../../api/verification/projectOwner/projectOwner-verification-api";

import 'bootstrap/dist/css/bootstrap.min.css';
import './verification.css'

function OverviewVerification(){

    const navigate = useNavigate();
    const [data, setData] = useState([0, [{"username" : "", "_id" : ""}]]);

    useEffect(() => {
        getOverviewProjectOwner()
            .then(res => 
                {
                    setData(res.data)
                });
    }, []);

    return (
        <div>
            <Navigator/>
            <Card>
                <Card.Title>
                    <div><h1>Project Owner Verification</h1></div>
                </Card.Title>
                <Row xs={1} md={1}>
                    {Array.from({ length: data[0] }).map((_, idx) => (
                        <Card className = "project-owner-overview-card">
                            <Container>
                                <Row>
                                    <Col>{data[1][idx].username}</Col>
                                    <Col className="d-flex justify-content-end">
                                        <Button variant = "link" onClick = {()=>navigate("/project-owner/specified/".concat(data[1][idx]._id))}>
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