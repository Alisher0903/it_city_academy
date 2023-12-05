import {Button, Table, TableCaption, TableContainer, Tbody, Td, Text, Th, Thead, Tr,} from "@chakra-ui/react";
import {api, config, setConfig} from "../../../../api/api";
import axios from "axios";
import Card from "components/card/Card";
import React, {useEffect, useState} from "react";
import {Col, Modal, ModalBody, ModalFooter, ModalHeader, Row} from "reactstrap";

export default function WeeklyRevenue(props) {
    const {...rest} = props;
    const [topTeacher, setTopTeacher] = useState([]);
    const [topTeacherId, setTopTeacherId] = useState({});
    const [viewAllTeacher, setViewAllTeacher] = useState(false);
    const [viewInfoModal, setviewInfoModal] = useState(false);

    useEffect(() => {
        setConfig();
        getTopTeacher();
    }, []);

    const openViewAllTeacher = () => setViewAllTeacher(!viewAllTeacher);
    const openViewInfoModal = () => setviewInfoModal(!viewInfoModal);

    // getTopTeacher
    const getTopTeacher = () => {
        axios.get(api + "user/teacher/level", config)
            .then(res => setTopTeacher(res.data.body))
            .catch(() => {
            });
    }

    return (
        <Card {...rest}>
            <Modal isOpen={viewAllTeacher} scrollable centered size="xl">
                <ModalHeader toggle={openViewAllTeacher} className="techer__modal-head">All Top Teachers</ModalHeader>
                <ModalBody>
                    <TableContainer {...rest}
                                    mt="1rem"
                                    pt=".7rem"
                                    pb=".7rem"
                                    borderRadius="15px"
                                    boxShadow="rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px">
                        <Table className="text-dark">
                            <TableCaption
                                color="black"
                                fontSize="1rem">
                                All Top Teachers
                            </TableCaption>
                            <Thead>
                                <Tr>
                                    <Th>T/r</Th>
                                    <Th>Full Name</Th>
                                    <Th>Email</Th>
                                    <Th colSpan="2">Phone Number</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {topTeacher.length && topTeacher.map((item, i) =>
                                    <Tr key={i}>
                                        <Td>{i + 1}</Td>
                                        <Td>{item.firstName} {item.lastName}</Td>
                                        <Td>{item.email}</Td>
                                        <Td>{item.phoneNumber}</Td>
                                        <Td textAlign="end">
                                            <Button
                                                colorScheme="green"
                                                onClick={() => {
                                                    // goInfo();
                                                    openViewInfoModal();
                                                    setTopTeacherId(item);
                                                }}
                                                boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px;"
                                                variant="outline">
                                                View Info
                                            </Button>
                                        </Td>
                                    </Tr>
                                )}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </ModalBody>
                <ModalFooter>
                    <Button
                        colorScheme="facebook"
                        onClick={openViewAllTeacher}
                        boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px;">Close</Button>
                </ModalFooter>
            </Modal>
            {/* open info modal */}
            <Modal isOpen={viewInfoModal} scrollable centered size="xl">
                <ModalHeader className="techer__modal-head" toggle={openViewInfoModal}>
                    {topTeacherId.firstName} {topTeacherId.lastName} Information
                </ModalHeader>
                <ModalBody>
                    <Card bg="light" boxShadow="rgba(0, 0, 0, 0.15) 0px 5px 15px 0px">
                        <Row className="w-100 text-dark">
                            <Col className="col-12 col-md-6">
                                <Text
                                    boxShadow="rgba(0, 0, 0, 0.15) 0px 5px 15px 0px"
                                    borderRadius="20px"
                                    mb="15px"
                                    p="20px">
                                    Full Name: {topTeacherId.firstName} {topTeacherId.lastName}
                                </Text>
                                <Text
                                    boxShadow="rgba(0, 0, 0, 0.15) 0px 5px 15px 0px"
                                    borderRadius="20px"
                                    mb="15px"
                                    p="20px">
                                    Phone Number: {topTeacherId.phoneNumber}
                                </Text>
                                <Text
                                    boxShadow="rgba(0, 0, 0, 0.15) 0px 5px 15px 0px"
                                    borderRadius="20px"
                                    mb="15px"
                                    p="20px">
                                    Email: {topTeacherId.email}
                                </Text>
                                <Text
                                    boxShadow="rgba(0, 0, 0, 0.15) 0px 5px 15px 0px"
                                    borderRadius="20px"
                                    mb="15px"
                                    p="20px">
                                    Group Name: {topTeacherId.groupName}
                                </Text>
                            </Col>
                            <Col className="col-12 col-md-6">
                                <Text
                                    boxShadow="rgba(0, 0, 0, 0.15) 0px 5px 15px 0px"
                                    borderRadius="20px"
                                    mb="15px"
                                    p="20px">
                                    Gender: {topTeacherId.gender}
                                </Text>
                                <Text
                                    boxShadow="rgba(0, 0, 0, 0.15) 0px 5px 15px 0px"
                                    borderRadius="20px"
                                    mb="15px"
                                    p="20px">
                                    Level: {topTeacherId.level}
                                </Text>
                                <Text
                                    boxShadow="rgba(0, 0, 0, 0.15) 0px 5px 15px 0px"
                                    borderRadius="20px"
                                    mb="15px"
                                    p="20px">
                                    CurrentRate: {topTeacherId.currentRate}
                                </Text>
                                <Text
                                    boxShadow="rgba(0, 0, 0, 0.15) 0px 5px 15px 0px"
                                    borderRadius="20px"
                                    mb="15px"
                                    p="20px">
                                    UsedRate: {topTeacherId.usedRate}
                                </Text>
                            </Col>
                        </Row>
                    </Card>
                </ModalBody>
            </Modal>

            <Text>
                <span className="ms-1 mt-1 fs-5 fw-semibold">Top Teachers</span>
            </Text>
            <TableContainer
                mt="1rem"
                pt=".7rem"
                pb=".7rem"
                borderRadius="15px"
                boxShadow="rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px">
                <Table>
                    <TableCaption
                        fontSize="1rem">
                        <Button
                            onClick={openViewAllTeacher}
                            boxShadow="rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px"
                            colorScheme="green"
                            variant="outline">View All</Button>
                    </TableCaption>
                    <Thead>
                        <Tr>
                            <Th>T/r</Th>
                            <Th>Full Name</Th>
                            <Th>Phone Number</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {topTeacher.length ?
                            topTeacher.slice(0, 5).map((item, i) =>
                                <Tr key={i}>
                                    <Td>{i + 1}</Td>
                                    <Td>{item.firstName} {item.lastName}</Td>
                                    <Td>{item.phoneNumber}</Td>
                                </Tr>
                            )
                            : <Tr><Td colSpan="3" textAlign="center">Top teacher yuq!!!</Td></Tr>
                        }
                    </Tbody>
                </Table>
            </TableContainer>
        </Card>
    );
}
