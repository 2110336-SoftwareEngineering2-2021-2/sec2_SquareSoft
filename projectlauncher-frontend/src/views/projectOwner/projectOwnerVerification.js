import {Row, Col, Card, Button, Container} from "react-bootstrap";
import { useNavigate } from "react-router-dom";


function ProjectOwnerVerification(){

    const navigate = useNavigate();
    
    return(
        <div>
            <Card>
                <Card.Header>
                    <Row>
                        <Col>
                            <Card.Title>Mr.Anon Ongsakul</Card.Title>
                        </Col>
                        <Col>
                            <div align = "right">
                                <Button variant = "link" onClick = {()=>navigate("/project-owner")}>
                                    Exit
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Card.Header>
                <Card.Body>
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
                            <Button variant="success" size = "sm">Aprove</Button>
                            <Button variant="danger" size = "sm">Decline</Button>
                        </div>
                    </Card>
                </Card.Body>
            </Card>
        </div>
    );
}

export default ProjectOwnerVerification;