import {Row, Col, Card, Button, Container} from "react-bootstrap";
import { useNavigate, useParams} from "react-router-dom";
import { useState, useEffect } from "react";
import { getProjectOwner } from "../../api/verification/projectOwner-verification-api";


function ProjectOwnerVerification(){
    
    const { id } = useParams();
    const navigate = useNavigate();
    const backPage = function BackPage(){
        navigate("/project-owner")
    }

    const [data, setData] = useState(null);
    useEffect(() => {
        getProjectOwner(id)
            .then(res => 
                {
                    setData(res.data); 
                    console.log(res);
                });
    }, []);

    if(!data){
        return (<p>loading...</p>);
    }

    return(
        <div>
            <Card>
                <Card.Header>
                    <Row>
                        <Col>
                            <Card.Title>{data.firstname} {data.lastname}</Card.Title>
                        </Col>
                        <Col>
                            <div align = "right">
                                <Button variant = "link" onClick = {backPage}>
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
                        <Container className="detail-container">
                                <Row>
                                    <Col xs={2}>คำนำหน้า :</Col>
                                    <Col xs={2}>นาย</Col>
                                </Row>
                                <Row>
                                    <Col xs={2}>ชื่อ :</Col>
                                    <Col xs={2}>{data.firstname}</Col>
                                    <Col xs={2}>นามสกุล :</Col>
                                    <Col xs={2}>{data.lastname}</Col>
                                </Row>
                                <Row>
                                    <Col xs={2}>Name:</Col>
                                    <Col xs={2}>{data.firstname}</Col>
                                    <Col xs={2}>Surname :</Col>
                                    <Col xs={2}>{data.lastname}</Col>
                                </Row>
                                <Row>
                                    <Col xs={2}>เลขบัตรประชาชน :</Col>
                                    <Col xs={2}>{data.idCardNumber}</Col>
                                    <Col xs={2}>วันเดือนปีเกิด :</Col>
                                    <Col xs={2}>{data.birthdate.slice(0, 10)}</Col>
                                </Row>
                        </Container>
                        <Card.Title>
                            รายละเอียดที่อยู่ 
                        </Card.Title>
                        <Container className="detail-container">
                            <Row>
                                <Col xs={2}>ที่อยู่ :</Col>
                            </Row>
                            <Row>
                                <Col xs={2}>จังหวัด :</Col>
                                <Col xs={2}>{data.province}</Col>
                                <Col xs={2}>อำเภอ/เขต :</Col>
                                <Col xs={2}>{data.district}</Col>
                            </Row>
                            <Row>
                                <Col xs={2}>ตำบล/แขวง :</Col>
                                <Col xs={2}>{data.subdistrict}</Col>
                                <Col xs={2}>รหัสไปรษณีย์ :</Col>
                                <Col xs={2}>{data.postcode}</Col>
                            </Row>
                        </Container>
                        <Card.Title>
                            ข้อมูลบัญชีธนาคาร 
                        </Card.Title>
                        <Container className="detail-container">
                            <Row>
                                <Col xs={2}>ชื่อบัญชีธนาคาร :</Col>
                                <Col xs={2}>{data.bankAccountName}</Col>
                            </Row>
                            <Row>
                                <Col xs={2}>เลขที่ปัญชี :</Col>
                                <Col xs={2}>{data.bankAccountNumber}</Col>
                                <Col xs={2}>ธนาคาร :</Col>
                                <Col xs={2}>{data.bankAccountBank}</Col>
                            </Row>
                        </Container>
                        <Card.Title>
                            ภาพถ่าย 
                        </Card.Title>
                        <Container className="detail-container">
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
                            <Button variant="light" size = "sm" className = "button" onClick = {backPage}>Back</Button>
                            <Button variant="success" size = "sm" className = "button">Aprove</Button>
                            <Button variant="danger" size = "sm" className = "button">Decline</Button>
                        </div>
                    </Card>
                </Card.Body>
            </Card>
        </div>
    );
}

export default ProjectOwnerVerification;