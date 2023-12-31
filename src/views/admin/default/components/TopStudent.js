import {
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
import Card from "components/card/Card";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {api, config, setConfig} from "api/api";

export default function TotalSpent(props) {
    const {...rest} = props;
    const [allGroupTop, setAllGroupTop] = useState([]);

    useEffect(async () => {
        await setConfig();
        getAllGroup();
    }, []);

    // getAllGroup
    const getAllGroup = () => {
        axios.get(api + "user/top-users", config)
            .then(res => setAllGroupTop(res.data.body))
            .catch(err => {
            });
    }

    return (
        <Card w='100%' {...rest}>
            <Text textAlign="center" mt=".3rem" mb=".45rem">
                <span className="fs-5 fw-semibold">Top Students</span>
            </Text>
            <TableContainer
                mt="1rem"
                pt=".7rem"
                pb=".7rem"
                borderRadius="15px"
                boxShadow="rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px">
                <Table>
                    <TableCaption
                        fontSize="1rem">All Group</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>T/r</Th>
                            <Th>Full name</Th>
                            <Th>Phone number</Th>
                            <Th>Email</Th>
                            <Th>Curren coin</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {allGroupTop !== null ?
                            allGroupTop.map((item, i) =>
                                <Tr key={i}>
                                    <Td>{i + 1}</Td>
                                    <Td>{item.firstName} {item.lastName}</Td>
                                    <Td>{item.phoneNumber}</Td>
                                    <Td>{item.email}</Td>
                                    <Td>{item.currentRate}</Td>
                                </Tr>
                            ) :
                            <Tr>
                                <Td colSpan="4">Top 5 lik student xali mavjud emas!!!</Td>
                            </Tr>
                        }
                    </Tbody>
                </Table>
            </TableContainer>
        </Card>
    );
}
