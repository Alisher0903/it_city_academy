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
import { byIdIn } from "api/api";
import Card from "components/card/Card";
import React, { useEffect, useState } from "react";

export default function WeeklyRevenue(props) {
    const { ...rest } = props;

    const goInfo = () => byIdIn("groupInfo").click();

    return (
        <Card {...rest}>
            <Link href="/#/admin/info/g" id="groupInfo"></Link>
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
                        fontSize="1rem">Top Groups</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>T/r</Th>
                            <Th colSpan="2">Name</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Td>1</Td>
                            <Td>GroupName</Td>
                            <Td textAlign="end">
                                <Button
                                    onClick={goInfo}
                                    variant="outline"
                                    boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px;">
                                    View Group
                                </Button>
                            </Td>
                        </Tr>
                    </Tbody>
                </Table>
            </TableContainer>
        </Card>
    );
}
