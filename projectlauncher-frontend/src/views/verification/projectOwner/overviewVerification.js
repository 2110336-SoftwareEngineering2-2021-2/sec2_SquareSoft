import React, {useEffect, useState} from "react";
import {Row, Col, Card, Button, Container} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import Navigator from "../../../components/navigator";
import { getOverviewProjectOwner } from "../../../api/verification/projectOwner/projectOwner-verification-api";

import 'bootstrap/dist/css/bootstrap.min.css';
import './verification.css'

function OverviewVerification(){

    const navigate = useNavigate();
    const [data, setData] = useState([0, [{"username" : "", "_id" : ""}]]);
    const specifiedRoute = "/admin/project-owner/specified/";

    useEffect(() => {
        getOverviewProjectOwner()
            .then(res => {setData(res.data)})
            .catch(() => {navigate("/")})
    }, []);
    console.log(data);

    return (
        <div>
            <Navigator/>
            <Card>
                <Card.Title >
                    <div className = "overview-title">Project Owner Verification</div>
                </Card.Title>
                <Row xs={1} md={1}>
                    {Array.from({ length: data[0] }).map((_, idx) => (
                        <Card className = "project-owner-overview-card" key = {data[1][idx]._id}>
                            <Container>
                                <Row>
                                    <Col>{data[1][idx].firstname} {data[1][idx].lastname}</Col>
                                    <Col className="d-flex justify-content-end">
                                        <Button variant = "link" onClick = {()=>navigate(specifiedRoute.concat(data[1][idx]._id))}>
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