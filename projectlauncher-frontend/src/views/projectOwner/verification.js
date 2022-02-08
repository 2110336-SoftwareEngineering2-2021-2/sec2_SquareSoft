import React from "react";
import {Row, Col, Card, Button, Container, Modal} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigator from "../../components/navigator";

import './verification.css'

class Verification extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            show : false,
            fullscreen : true
        }
    }

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
                                        <Button variant = "link" onClick = {()=>this.setState({show: true})}>
                                            Detail
                                        </Button>
                                    </Col>
                                </Row>
                            </Container>
                        </Card>
                    ))}
                </Row>
            </Card>
            <Modal show={this.state.show} fullscreen={this.state.fullscreen} onHide={()=>this.setState({show: false})}>
                <Modal.Header closeButton>
                <Modal.Title>Modal</Modal.Title>
                </Modal.Header>
                <Modal.Body>Modal body content</Modal.Body>
            </Modal>
        </div>;
    }
}

export default Verification