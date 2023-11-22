import {
    Select,
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
import React from "react";

export default function WeeklyRevenue(props) {
    const {...rest} = props;

    return (
        <Card {...rest}>
            <Text
                display="flex"
                justifyContent="space-between">
                <span className="ms-1 mt-1 fs-5 fw-semibold">Name guruh bo'yicha top 5</span>
                <Select placeholder="select" w="25%">
                    <option value='option1'>group 1</option>
                </Select>
            </Text>
            <TableContainer
                mt="1rem"
                pt=".7rem"
                pb=".7rem"
                borderRadius="15px"
                boxShadow="rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px"
            >
                <Table>
                    <TableCaption
                        fontSize="1rem">name Group</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>T/r</Th>
                            <Th>full name</Th>
                            <Th>phone number</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Td>1</Td>
                            <Td>sodiqov a</Td>
                            <Td>123456</Td>
                        </Tr>
                    </Tbody>
                </Table>
            </TableContainer>
        </Card>
    );
}
