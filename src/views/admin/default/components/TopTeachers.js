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
import { api } from "api/api";
import { config } from "api/api";
import { setConfig } from "api/api";
import { byIdIn } from "api/api";
import axios from "axios";
import Card from "components/card/Card";
import React, { useEffect, useState } from "react";

export default function WeeklyRevenue(props) {
    const { ...rest } = props;
    const [topTeacher, setTopTeacher] = useState([]);

    useEffect(async() => {
        await setConfig();
        getTopTeacher();
    }, []);

    // getTopTeacher
    const getTopTeacher = () => {
        axios.get(api + "user/teacher/level", config)
            .then(res => setTopTeacher(res.data.body))
            .catch(() => { })
    }
    console.log(topTeacher);

    const goInfo = () => byIdIn("teacherInfo").click();

    return (
        <Card {...rest}>
            <Link href="/#/admin/info/t" id="teacherInfo"></Link>
            <Text>
                <span className="ms-1 mt-1 fs-5 fw-semibold">Top Teachers</span>
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
                        fontSize="1rem">Top Teachers</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>T/r</Th>
                            <Th colSpan="2">Full Name</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Td>1</Td>
                            <Td>Full Name</Td>
                            <Td textAlign="end">
                                <Button
                                    onClick={goInfo}
                                    boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px;"
                                    variant="outline">
                                    View Info
                                </Button>
                            </Td>
                        </Tr>
                    </Tbody>
                </Table>
            </TableContainer>
        </Card>
    );
}
