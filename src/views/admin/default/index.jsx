import {Box, Grid, Icon, SimpleGrid, useColorModeValue,} from "@chakra-ui/react";
import {api, config, setConfig} from "api/api";
import axios from "axios";
// import MiniCalendar from "components/calendar/MiniCalendar";
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import React, {useEffect, useState} from "react";
import {MdOutlinePeopleAlt, MdOutlinePerson4, MdSupervisedUserCircle} from "react-icons/md";
// import TotalSpent from "views/admin/default/components/TotalSpent";
import PieCard from "../../../views/admin/default/components/PieCard";
// import Card from "components/card/Card";
import DailyTraffic from "student/views/admin/default/components/DailyTraffic";
// import CheckTable from "./components/CheckTable";
// import tableDataCheck from "../../../views/admin/default/variables/tableDataCheck.json";
// import WeeklyRevenue from "student/views/admin/default/components/WeeklyRevenue";
import TopStudent from "./components/TopStudent";
import TopTeachers from "./components/TopTeachers";
import TopGroups from "./components/TopGroups";

export default function UserReports() {
    const brandColor = useColorModeValue("brand.500", "white");
    const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
    const [group, setGroup] = useState();
    const [user, setUser] = useState();
    const [coinCount, setCoinCount] = useState([]);
    const [teacher, setTeacher] = useState();
    const [genders, setGender] = useState('');
    const [traffic, setTraffic] = useState([{
        name: "Daily Traffic",
        data: [1, 1, 1]
    }])

    useEffect(() => {
        setConfig();
        getCoutnGroup();
        getCoutnUser();
        getCoutnTeacher();
        getGender();
        getTraffic();
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
            }).catch(() => {
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

    function getGender() {
        axios.get(api + 'user/gender', config)
            .then(res => setGender(res.data.body))
            .catch(() => {
            });
    }

    function getTraffic() {
        axios.get(api + "user/rates/and/exchange/count", config)
            .then(res => {
                let data = res.data.body;
                if (data.usedRate !== 0 && data.currentRate !== 0 && data.exchangeCount !== 0) setTraffic([{
                    name: "Daily Traffic",
                    data: [data.usedRate, data.currentRate, data.exchangeCount]
                }]);
            })
            .catch(() => {
            });
    }

    return (
        <Box pt={{base: "130px", md: "80px", xl: "80px"}}>
            <Grid
                w="100%"
                gap='20px'
                mb='20px'>
                <SimpleGrid
                    columns={{base: 1, md: 2, lg: 3, "2xl": 3}}
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
                                    <Icon w='32px' h='32px' as={MdSupervisedUserCircle} color={brandColor}/>
                                }
                            />
                        }
                        name='Number of teachers'
                        value={teacher}
                    />
                    <MiniStatistics
                        startContent={
                            <IconBox
                                w='56px'
                                h='56px'
                                bg='linear-gradient(90deg, #4481EB 0%, #04BEFE 100%)'
                                icon={<Icon w='28px' h='28px' as={MdOutlinePerson4} color='white'/>}
                            />
                        }
                        name='Number of students'
                        value={user}
                    />

                    <MiniStatistics
                        startContent={
                            <IconBox
                                w='56px'
                                h='56px'
                                bg={boxBg}
                                icon={
                                    <Icon w='32px' h='32px' as={MdOutlinePeopleAlt} color={brandColor}/>
                                }
                            />
                        }
                        name='Number of groups'
                        value={group}
                    />
                </SimpleGrid>
            </Grid>
            <Grid
                w="100%"
                gap='20px'
                mb='20px'>
                <SimpleGrid columns={{base: 1, md: 2, xl: 2}} gap='20px'>
                    <DailyTraffic exchangeCount={traffic}/>
                    <PieCard genders={genders}/>

                </SimpleGrid>
            </Grid>
            <SimpleGrid columns={{base: 1, md: 1, xl: 1}} gap='20px'>
                <SimpleGrid columns={{base: 1, md: 1, xl: 2}} gap="20px">
                    <TopGroups/>
                    <TopTeachers/>
                </SimpleGrid>
                <TopStudent/>
            </SimpleGrid>

        </Box>
    )
}
