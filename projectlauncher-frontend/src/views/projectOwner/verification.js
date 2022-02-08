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
                    <Modal.Title>Mr.Anon Ongsakul</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Card>
                        <Card.Title>
                            ข้อมูลส่วนบุคคล
                        </Card.Title>
                        <Container>
                                <Row>
                                    <Col xs={2}>คำนำหน้า :</Col>
                                    <Col xs={2}>นาย</Col>
                                </Row>
                                <Row>
                                    <Col xs={2}>ชื่อ :</Col>
                                    <Col xs={2}>สามัคคี</Col>
                                    <Col xs={2}>นามสกุล :</Col>
                                    <Col xs={2}>น้ำใจงาม</Col>
                                </Row>
                                <Row>
                                    <Col xs={2}>Name:</Col>
                                    <Col xs={2}>Samakhee</Col>
                                    <Col xs={2}>Surname :</Col>
                                    <Col xs={2}>Numjaingam</Col>
                                </Row>
                                <Row>
                                    <Col xs={2}>เลขบัตรประชาชน :</Col>
                                    <Col xs={2}>1234567890123</Col>
                                    <Col xs={2}>วันเดือนปีเกิด :</Col>
                                    <Col xs={2}>00/00/0000</Col>
                                </Row>
                        </Container>
                        <Card.Title>
                            รายละเอียดที่อยู่ 
                        </Card.Title>
                        <Container>
                            <Row>
                                <Col xs={2}>ที่อยู่ :</Col>
                            </Row>
                            <Row>
                                <Col xs={2}>จังหวัด :</Col>
                                <Col xs={2}>กรุงเทพ</Col>
                                <Col xs={2}>อำเภอ/เขต :</Col>
                                <Col xs={2}>ปทุมวัน</Col>
                            </Row>
                            <Row>
                                <Col xs={2}>แขวง :</Col>
                                <Col xs={2}>วังใหม่</Col>
                                <Col xs={2}>รหัสไปรษณีย์ :</Col>
                                <Col xs={2}>10330</Col>
                            </Row>
                        </Container>
                        <Card.Title>
                            ข้อมูลบัญชีธนาคาร 
                        </Card.Title>
                        <Container>
                            <Row>
                                <Col xs={2}>ชื่อบัญชีธนาคาร :</Col>
                            </Row>
                            <Row>
                                <Col xs={2}>เบขที่ปัญชี :</Col>
                                <Col xs={2}></Col>
                                <Col xs={2}>ธนาคาร :</Col>
                                <Col xs={2}>กสิกรไทย</Col>
                            </Row>
                        </Container>
                        <Card.Title>
                            ภาพถ่าย 
                        </Card.Title>
                        <Container>
                            <Row>
                                <Col>
                                    <Card>
                                        รูปถ่ายหน้าสมุดบัญชี :
                                        <div align = "center">
                                            <img src="https://www.kasikornbank.com/th/personal/Digital-banking/PublishingImages/KCID/ESA11.jpg" 
                                            alt="รูปถ่ายหน้าสมุดบัญชี" 
                                            width="400" 
                                            height="600">
                                            </img>
                                        </div>
                                    </Card>
                                </Col>
                                <Col>
                                    <Card>
                                        รูปบัตรประชาชน :
                                        <div align = "center">
                                            <img src="https://tdc-images.tolunastart-tdcprod.com/2018/03/19/e4aff31c-15a1-4717-826d-8e7a9ca83cb1.jpg" 
                                            alt="รูปบัตรประชาชน" 
                                            width="400" 
                                            height="600">

                                            </img>
                                        </div>
                                    </Card>
                                </Col>
                            </Row>
                        </Container>
                        <div align = "right">
                            <Button variant="success" size = "sm">Primary</Button>
                            <Button variant="danger" size = "sm">Primary</Button>
                        </div>
                    </Card>
                </Modal.Body>
            </Modal>
        </div>;
    }
}

export default Verification