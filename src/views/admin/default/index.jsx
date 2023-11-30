import { Box, Grid, Icon, SimpleGrid, Table, TableCaption, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue, } from "@chakra-ui/react";
import { api, config, setConfig } from "api/api";
import axios from "axios";
import MiniCalendar from "components/calendar/MiniCalendar";
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import React, { useEffect, useState } from "react";
import { MdCurrencyExchange, MdOutlinePeopleAlt, MdOutlinePerson4, MdSupervisedUserCircle } from "react-icons/md";
import TotalSpent from "views/admin/default/components/TotalSpent";
import Card from "components/card/Card";

export default function UserReports() {
    const brandColor = useColorModeValue("brand.500", "white");
    const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
    const [group, setGroup] = useState();
    const [user, setUser] = useState();
    const [coinCount, setCoinCount] = useState([]);
    const [teacher, setTeacher] = useState();
    const [allGroupTop, setAllGroupTop] = useState([]);

    useEffect(async () => {
        await setConfig();
        getUserCoin();
        getAllGroup()
        getCoutnGroup()
        getCoutnUser()
        getCoutnTeacher()
    }, []);

    function getCoutnGroup() {
        axios.get(api + "group/countAllGroup", config)
            .then(res => {
                setGroup(res.data.body)
            })
            .catch(() => {
            })
    }

    function getCoutnUser() {
        axios.get(api + "user/allUserCount", config)
            .then(res => {
                setUser(res.data.body)
            })
            .catch(() => {
            })
    }

    function getCoutnTeacher() {
        axios.get(api + "user/allTeacherCount", config)
            .then(res => {
                setTeacher(res.data.body)
            })
            .catch(() => {
            })
    }

    const getUserCoin = () => {
        axios.get(api + "user/coinAllUser", config)
            .then(res => setCoinCount(res.data.body))
            .catch(err => {
            })
    }

    const getAllGroup = () => {
        axios.get(api + "user/top-users", config)
            .then(res => setAllGroupTop(res.data.body))
            .catch(() => { })

    }

    return (
        <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
            <Grid
                gridTemplateColumns={{ xl: "2fr 1fr", }}
                w="100%"
                gap='20px'
                mb='20px'>
                <SimpleGrid
                    columns={{ base: 1, md: 2, lg: 2, "2xl": 6 }}
                    w="100%"
                    gap='20px'
                    mb='20px'>
                    <MiniStatistics
                        startContent={
                            <IconBox
                                w='56px'
                                h='56px'
                                bg={boxBg}
                                icon={
                                    <Icon w='32px' h='32px' as={MdSupervisedUserCircle} color={brandColor} />
                                }
                            />
                        }
                        name='Teachers count'
                        value={teacher}
                    />
                    <MiniStatistics
                        startContent={
                            <IconBox
                                w='56px'
                                h='56px'
                                bg='linear-gradient(90deg, #4481EB 0%, #04BEFE 100%)'
                                icon={<Icon w='28px' h='28px' as={MdOutlinePerson4} color='white' />}
                            />
                        }
                        name='Students Count'
                        value={user}
                    />

                    <MiniStatistics
                        startContent={
                            <IconBox
                                w='56px'
                                h='56px'
                                bg={boxBg}
                                icon={
                                    <Icon w='32px' h='32px' as={MdOutlinePeopleAlt} color={brandColor} />
                                }
                            />
                        }
                        name='Groups count'
                        value={group}
                    />
                    <MiniStatistics
                        startContent={
                            <IconBox
                                w='56px'
                                h='56px'
                                bg={boxBg}
                                icon={
                                    <Icon w='32px' h='32px' as={MdCurrencyExchange} color={brandColor} />
                                } />
                        }
                        name="Total number of students coins"
                        value={coinCount !== 0 ? coinCount : 0} />
                </SimpleGrid>
                <SimpleGrid gap='20px' mb='20px'>
                    <MiniCalendar h='100%' w='100%' selectRange={false} />
                </SimpleGrid>
            </Grid>
            <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap='20px'>
                {/* <TotalSpent/> */}
                <Card>
                    <Text textAlign="center" mt=".3rem" mb=".45rem">
                        <span className="fs-5 fw-semibold">Top students</span>
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
            </SimpleGrid>

        </Box>
    )
}
