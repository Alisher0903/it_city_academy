import {
    Button,
    Link,
    Table,
    TableCaption,
    TableContainer,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
} from "@chakra-ui/react";
import { api, byIdIn, config, setConfig } from "api/api";
import Card from "components/card/Card";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

export default function WeeklyRevenue(props) {
    const { ...rest } = props;
    const [topGroup, setTopGroup] = useState([]);
    const [viewallModal, setViewAllModal] = useState(false);

    useEffect(async () => {
        await setConfig();
        getTopGroup();
    }, []);

    const openViewAllModal = () => setViewAllModal(!viewallModal)

    // getTopGroup
    const getTopGroup = () => {
        axios.get(api + "user/popularCourse", config)
            .then(res => setTopGroup(res.data.body))
            .catch(() => {
            });
    }

    const goInfo = () => byIdIn("groupInfo").click();

    return (
        <Card {...rest}>
            <Link href="/#/admin/info/g" id="groupInfo"></Link>

            <Modal isOpen={viewallModal} scrollable centered size="lg">
                <ModalHeader toggle={openViewAllModal} className="techer__modal-head">All Top Groups</ModalHeader>
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
                                All group
                            </TableCaption>
                            <Thead>
                                <Tr>
                                    <Th>T/r</Th>
                                    <Th>GroupName</Th>
                                    <Th colSpan="2">CoinCount</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {topGroup.length
                                    ? topGroup.slice(0, 5).map((item, i) =>
                                        <Tr key={i}>
                                            <Td>{i + 1}</Td>
                                            <Td>{item.groupName}</Td>
                                            <Td>{item.coinCount}</Td>
                                            <Td textAlign="end">
                                                <Button
                                                    onClick={() => {
                                                        goInfo();
                                                        sessionStorage.setItem("topGroup", item.groupName)
                                                    }}
                                                    colorScheme="green"
                                                    boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px;">
                                                    View Group
                                                </Button>
                                            </Td>
                                        </Tr>
                                    )
                                    : <Tr><Td colSpan="3" textAlign="center">Top group yuq!!!</Td></Tr>
                                }

                            </Tbody>
                        </Table>
                    </TableContainer>
                </ModalBody>
                <ModalFooter>
                    <Button
                        colorScheme="facebook"
                        onClick={openViewAllModal}
                        boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px;">Close</Button>
                </ModalFooter>
            </Modal>
            
            <Text>
                <span className="ms-1 mt-1 fs-5 fw-semibold">Top Groups</span>
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
                            onClick={openViewAllModal}
                            colorScheme="green"
                            variant="outline"
                            boxShadow="rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px">
                            View All
                        </Button>
                    </TableCaption>
                    <Thead>
                        <Tr>
                            <Th>T/r</Th>
                            <Th>GroupName</Th>
                            <Th>CoinCount</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {topGroup.length
                            ? topGroup.slice(0, 5).map((item, i) =>
                                <Tr key={i}>
                                    <Td>{i + 1}</Td>
                                    <Td>{item.groupName}</Td>
                                    <Td>{item.coinCount}</Td>
                                </Tr>
                            )
                            : <Tr><Td colSpan="3" textAlign="center">Top group yuq!!!</Td></Tr>
                        }

                    </Tbody>
                </Table>
            </TableContainer>
        </Card>
    );
}
