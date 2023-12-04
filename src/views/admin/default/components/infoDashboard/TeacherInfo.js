import { Text } from "@chakra-ui/react";
import Card from "components/card/Card";
import { Col, Row } from "reactstrap";
import erkakImg from "./erkakImg.jpg";
import ayolImg from "./ayolImg.webp";

function TeacherInfo() {
    return (<>
        <Card mt="100px">
            <Text
                textAlign="center"
                fontSize="2xl"
                fontWeight="bold"
                letterSpacing="1px">Teacher Information</Text>
            <Row className="w-100 p-5">
                <Col
                    className="col-12 col-md-6 col-lg-5"
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                    <img
                        src={erkakImg}
                        style={{
                            borderRadius: "50%",
                            objectFit: "cover"
                        }}
                        alt="img" />
                </Col>
                <Col className="col-12 col-md-6 col-lg-7">
                    <Text
                        boxShadow="rgba(0, 0, 0, 0.15) 0px 5px 15px 0px"
                        borderRadius="20px"
                        mb="15px"
                        p="20px">
                        Question:
                    </Text>
                    <Text
                        boxShadow="rgba(0, 0, 0, 0.15) 0px 5px 15px 0px"
                        borderRadius="20px"
                        mb="15px"
                        p="20px">
                        Description:
                    </Text>
                    <Text
                        boxShadow="rgba(0, 0, 0, 0.15) 0px 5px 15px 0px"
                        borderRadius="20px"
                        mb="15px"
                        p="20px">
                        Ball:
                    </Text>
                    <Text
                        boxShadow="rgba(0, 0, 0, 0.15) 0px 5px 15px 0px"
                        borderRadius="20px"
                        mb="15px"
                        p="20px">
                        InType:
                    </Text>
                    <Text
                        boxShadow="rgba(0, 0, 0, 0.15) 0px 5px 15px 0px"
                        borderRadius="20px"
                        mb="15px"
                        p="20px">
                        OutType:
                    </Text>
                </Col>
            </Row>
        </Card>
    </>);
}

export default TeacherInfo;