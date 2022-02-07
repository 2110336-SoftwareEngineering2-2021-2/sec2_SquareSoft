import React from "react";
import {Row, Col, Card, Button, Container} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigator from "../../components/navigator";

import './verification.css'

class Verification extends React.Component{
    render(){
        return <div> 
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
                                        <Button variant = "link">
                                            Detail
                                        </Button>
                                    </Col>
                                </Row>
                            </Container>
                        </Card>
                    ))}
                </Row>
            </Card>
        </div>;
    }
}

export default Verification