import {
    Table,
    TableCaption,
    TableContainer,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr
} from "@chakra-ui/react";
import Card from "components/card/Card";

function GroupInfo() {

    let topGroupInfo = sessionStorage.getItem("topGroup");

    return (<>
        <Card mt="100px">
            <Text textAlign="center" mt=".3rem" mb=".45rem">
                <span className="fs-5 fw-semibold">GroupName Students</span>
            </Text>
            <TableContainer
                mt="1rem"
                pt=".7rem"
                pb=".7rem"
                borderRadius="15px"
                boxShadow="rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px">
                <Table>
                    <TableCaption
                        fontSize="1rem">GroupName Students</TableCaption>
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
                        <Tr>
                            <Td>1</Td>
                            <Td>full name</Td>
                            <Td>phoneNumber</Td>
                            <Td>email</Td>
                            <Td>currentRate</Td>
                        </Tr>
                    </Tbody>
                </Table>
            </TableContainer>
        </Card>
    </>);
}

export default GroupInfo;