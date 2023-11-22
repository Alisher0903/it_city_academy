import {
    Box,
    Button,
    Flex,
    Icon, Table, TableCaption, TableContainer, Tbody, Td,
    Text, Th, Thead, Tr,
    useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Card from "../../../../components/card/Card.js";
import LineChart from "../../../../components/charts/LineChart";
import React from "react";
import {IoCheckmarkCircle} from "react-icons/io5";
import {MdBarChart, MdOutlineCalendarToday} from "react-icons/md";
// Assets
import {RiArrowUpSFill} from "react-icons/ri";
import {
    lineChartDataTotalSpent,
    lineChartOptionsTotalSpent,
} from "../../../../variables/charts";

export default function TotalSpent(props) {
    const {...rest} = props;

    const textColor = useColorModeValue("secondaryGray.900", "white");
    const textColorSecondary = useColorModeValue("secondaryGray.600", "white");
    const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
    const iconColor = useColorModeValue("brand.500", "white");
    const bgButton = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
    const bgHover = useColorModeValue(
        {bg: "secondaryGray.400"},
        {bg: "whiteAlpha.50"}
    );
    const bgFocus = useColorModeValue(
        {bg: "secondaryGray.300"},
        {bg: "whiteAlpha.100"}
    );

    return (
        <Card w='100%' {...rest}>
            <Text textAlign="center" mt=".3rem" mb=".45rem">
                <span className="fs-5 fw-semibold">Hamma guruh bo'yicha top 5</span>
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
                        <Tr>
                            <Td>1</Td>
                            <Td>sodiqov a</Td>
                            <Td>123456</Td>
                            <Td>front</Td>
                        </Tr>
                    </Tbody>
                </Table>
            </TableContainer>
        </Card>
    );
}
