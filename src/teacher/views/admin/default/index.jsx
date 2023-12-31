import {Box, Icon, SimpleGrid, useColorModeValue,} from "@chakra-ui/react";
import {MdCurrencyExchange, MdOutlineCardGiftcard, MdPeople, MdPerson,} from "react-icons/md";
import MiniStatistics from "../../../../components/card/MiniStatistics";
import IconBox from "../../../components/icons/IconBox";
import React, {useEffect, useState} from "react";
import TotalSpent from "./components/TotalSpent";
import WeeklyRevenue from "./components/WeeklyRevenue";
import axios from "axios";
import {api, config, setConfig} from "../../../../api/api";
import {ToastContainer} from "react-toastify";

export default function UserReports() {
    const brandColor = useColorModeValue("brand.500", "white");
    const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");

    const [groupCount, setGroupCount] = useState([]);
    const [userCount, setUserCount] = useState([]);
    const [coinCount, setCoinCount] = useState([]);
    const [exchangeCount, setExchangeCount] = useState([]);
    const [allGroupTop, setAllGroupTop] = useState([]);

    useEffect(async () => {
        setConfig();
        await getMe();
        getUserCoin();
        getExchangeCount();
        getAllGroup();
    }, []);

    // getMe
    const getMe = async () => {
        await axios.get(api + "user/getMe", config)
            .then(async res => {
                getGroupCount(res.data.id);
                getUserCount(res.data.id);
            }).catch(err => console.log(err));
    }

    //getGroupCount
    const getGroupCount = (id) => {
        axios.get(api + "group/byTeacher/" + id, config)
            .then(res => setGroupCount(res.data.body))
            .catch(() => console.log("group count kelmadi"))
    }

    // getUserCount
    const getUserCount = (id) => {
        axios.get(api + "user/byTeacher/" + id, config)
            .then(res => setUserCount(res.data.body))
            .catch(() => console.log("user count kelmadi"))
    }

    // getCoinCount
    const getUserCoin = () => {
        axios.get(api + "user/coinAllUser", config)
            .then(res => setCoinCount(res.data.body))
            .catch(() => console.log("coin count kelmadi"))
    }

    // getExchangeCount
    const getExchangeCount = () => {
        axios.get(api + "exchange/teacher/count", config)
            .then(res => setExchangeCount(res.data.body))
            .catch(() => console.log("exchange count kelmadi"))
    }

    // getAllGroup
    const getAllGroup = () => {
        axios.get(api + "group/teacher/all/group/users", config)
            .then(res => setAllGroupTop(res.data.body))
            .catch(res => console.log(res.data))
    }

    return (
        <Box pt={{base: "130px", md: "80px", xl: "80px"}}>
            <ToastContainer/>
            <SimpleGrid
                columns={{base: 1, md: 2, lg: 2, "2xl": 4}}
                gap='20px'
                mb='20px'>
                <MiniStatistics
                    startContent={
                        <IconBox
                            w='56px'
                            h='56px'
                            bg={boxBg}
                            icon={
                                <Icon w='32px' h='32px' as={MdPeople} color={brandColor}/>
                            }/>
                    }
                    name="Groups count"
                    value={groupCount !== 0 ? groupCount : 0}/>
                <MiniStatistics
                    startContent={
                        <IconBox
                            w='56px'
                            h='56px'
                            bg={boxBg}
                            icon={
                                <Icon w='32px' h='32px' as={MdPerson} color={brandColor}/>
                            }/>
                    }
                    name="All Students"
                    value={userCount !== 0 ? userCount : 0}/>
                <MiniStatistics
                    startContent={
                        <IconBox
                            w='56px'
                            h='56px'
                            bg={boxBg}
                            icon={
                                <Icon w='32px' h='32px' as={MdCurrencyExchange} color={brandColor}/>
                            }/>
                    }
                    name="Total number of students coins"
                    value={coinCount !== 0 ? coinCount : 0}/>
                <MiniStatistics
                    startContent={
                        <IconBox
                            w='56px'
                            h='56px'
                            bg={boxBg}
                            icon={
                                <Icon w='32px' h='32px' as={MdOutlineCardGiftcard} color={brandColor}/>
                            }/>
                    }
                    name="Those who accepted the gift"
                    value={exchangeCount !== 0 ? exchangeCount : 0}/>

            </SimpleGrid>

            <SimpleGrid columns={{base: 1, md: 1, xl: 1}} gap='20px'>
                <TotalSpent allGroupTop={allGroupTop}/>
                <WeeklyRevenue/>
            </SimpleGrid>

        </Box>
    );
}