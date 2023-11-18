import { Box, Text, useColorModeValue } from "@chakra-ui/react";
import { imgUrl, api } from "api/api";
import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import question from "../question.png";
import "../modal.scss";

function Detielis() {
    const textColor = useColorModeValue("navy.700", "white");
    const bg = useColorModeValue("white", "navy.700");
    const [detailsInfo, setDetailsInfo] = useState([]);

    useEffect(() => {
        const detailsItem = sessionStorage.getItem("details");
        axios.get(api + "test").then(res => setDetailsInfo(res.data.object.find(d => d.id == detailsItem)))
    }, []);

    return (
        <Box
            boxShadow="rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px"
            bg={bg}
            color={textColor}
            mt={{ base: "130px", md: "80px", xl: "80px" }}
            w="100%"
            p="40px"
            borderRadius="40px">
            <Row className="w-100">
                <Col className="col-12 col-md-6">
                    <div className="details__img">
                        <img src={detailsInfo.attachmentId !== 0 ? imgUrl + detailsInfo.attachmentId : question}
                            alt="questionImg" style={{objectFit: "cover"}} />
                    </div>
                </Col>
                <Col className="col-12 col-md-6 mt-5 mt-md-0 text-center details__info">
                    <Text
                        boxShadow="rgba(0, 0, 0, 0.15) 0px 5px 15px 0px"
                        borderRadius="20px"
                        mb="15px"
                        p="20px">
                        Savol: {detailsInfo.question}
                    </Text>
                    <Text
                        boxShadow="rgba(0, 0, 0, 0.15) 0px 5px 15px 0px"
                        borderRadius="20px"
                        mb="15px"
                        p="20px">
                        Description: {detailsInfo.description}
                    </Text>
                    <Text
                        boxShadow="rgba(0, 0, 0, 0.15) 0px 5px 15px 0px"
                        borderRadius="20px"
                        mb="15px"
                        p="20px">
                        Max. Ball: {detailsInfo.grade}
                    </Text>
                    <Text
                        boxShadow="rgba(0, 0, 0, 0.15) 0px 5px 15px 0px"
                        borderRadius="20px"
                        mb="15px"
                        p="20px">
                        InType: {detailsInfo.inType}
                    </Text>
                    <Text
                        boxShadow="rgba(0, 0, 0, 0.15) 0px 5px 15px 0px"
                        borderRadius="20px"
                        mb="15px"
                        p="20px">
                        OutType: {detailsInfo.outType}
                    </Text>
                    <Text
                        boxShadow="rgba(0, 0, 0, 0.15) 0px 5px 15px 0px"
                        borderRadius="20px"
                        mb="15px"
                        p="20px">
                        TestRaqam: {detailsInfo.countNumber}
                    </Text>
                    <Text
                        boxShadow="rgba(0, 0, 0, 0.15) 0px 5px 15px 0px"
                        borderRadius="20px"
                        p="20px">
                        CategoryID: {detailsInfo.categoryId}
                    </Text>
                </Col>
            </Row>
        </Box>
    );
}

export default Detielis;