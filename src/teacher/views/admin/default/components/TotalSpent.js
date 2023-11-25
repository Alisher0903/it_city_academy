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
import Card from "../../../../components/card/Card.js";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {api, config} from "../../../../../api/api";

export default function TotalSpent(props) {
    const {...rest} = props;

    return (
        <Card w='100%' {...rest}>
            <Text textAlign="center" mt=".3rem" mb=".45rem">
                <span className="fs-5 fw-semibold">All group top 5</span>
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
                            <Th>full name</Th>
                            <Th>phone number</Th>
                            <Th>group</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {rest.allGroupTop !== null ?
                            rest.allGroupTop.map((item, i) =>
                                <Tr key={i}>
                                    <Td>{i + 1}</Td>
                                    <Td>{item.firstName} {item.lastName}</Td>
                                    <Td>{item.phoneNumber}</Td>
                                    <Td>{item.groupId}</Td>
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
