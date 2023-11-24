import {
    Avatar,
    Box,
    Flex,
    FormLabel,
    Icon,
    Select,
    SimpleGrid,
    useColorModeValue,
} from "@chakra-ui/react";
import {
    MdAttachMoney,
    MdCurrencyExchange, MdOutlineCardGiftcard,
    MdPeople,
    MdPerson,
} from "react-icons/md";
import MiniStatistics from "../../../../components/card/MiniStatistics";
import IconBox from "../../../components/icons/IconBox";
import React, {useEffect, useState} from "react";
import TotalSpent from "./components/TotalSpent";
import WeeklyRevenue from "./components/WeeklyRevenue";
import axios from "axios";
import {api, config} from "../../../../api/api";
import {ToastContainer, toast} from "react-toastify";

import CheckTable from "./components/CheckTable";
import Usa from "../../../assets/img/dashboards/usa.png";
import MiniCalendar from "../../../../components/calendar/MiniCalendar";
import ComplexTable from "./components/ComplexTable";
import DailyTraffic from "./components/DailyTraffic";
import PieCard from "./components/PieCard";
import Tasks from "./components/Tasks";
import {
    columnsDataCheck,
    columnsDataComplex,
} from "./variables/columnsData";
import tableDataCheck from "./variables/tableDataCheck.json";
import tableDataComplex from "./variables/tableDataComplex.json";

export default function UserReports() {
    const brandColor = useColorModeValue("brand.500", "white");
    const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");

    const [getMeCount, setGetMeCount] = useState([]);
    const [groupCount, setGroupCount] = useState([]);
    const [userCount, setUserCount] = useState([]);
    const [coinCount, setCoinCount] = useState([]);
    const [exchangeCount, setExchangeCount] = useState([]);

    useEffect(async () => {
        if (sessionStorage.getItem('reloadTeacher') !== "true") {
            sessionStorage.setItem('reloadTeacher', 'true')
            window.location.reload();
        }


        await getMe();
        // let intirvalId = setInterval(() => {
        if (getMeCount.id !== "undefined") getGroupCount();
        if (getMeCount.id !== "undefined") getUserCount();
        // console.log('ha')
        // }, ;
        // if (getMeCount.id !== "undefined") clearInterval(intirvalId);
        // await getGroupCount();
        // await getUserCount();
        await getUserCoin();
        await getExchangeCount();
    }, []);

    // getMe
    const getMe = async () => {
        console.log('get me start')
        await axios.get(api + "user/getMe", config)
            .then(async res => await setGetMeCount(res.data))
            .catch(err => console.log(err));
    }

    //getGroupCount
    const getGroupCount = async () => {
        await axios.get(api + "group/byTeacher/" + getMeCount.id, config)
            .then(res => setGroupCount(res.data.body))
            .catch(err => console.log(err))
    }

    // getUserCount
    const getUserCount = () => {
        axios.get(api + "user/byTeacher/" + getMeCount.id, config)
            .then(res => setUserCount(res.data.body))
            .catch(err => console.log(err))
    }

    // getCoinCount
    const getUserCoin = () => {
        axios.get(api + "user/coinAllUser", config)
            .then(res => setCoinCount(res.data.body))
            .catch(err => console.log(err))
    }

    // getExchangeCount
    const getExchangeCount = () => {
        axios.get(api + "exchange/teacher/count", config)
            .then(res => setExchangeCount(res.data.body))
            .catch(err => console.log(err))
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

                {/*<MiniStatistics*/}
                {/*    endContent={*/}
                {/*        <Flex me='-16px' mt='10px'>*/}
                {/*            <FormLabel htmlFor='balance'>*/}
                {/*                <Avatar src={Usa}/>*/}
                {/*            </FormLabel>*/}
                {/*            <Select*/}
                {/*                id='balance'*/}
                {/*                variant='mini'*/}
                {/*                mt='5px'*/}
                {/*                me='0px'*/}
                {/*                defaultValue='usd'>*/}
                {/*                <option value='usd'>USD</option>*/}
                {/*                <option value='eur'>EUR</option>*/}
                {/*                <option value='gba'>GBA</option>*/}
                {/*            </Select>*/}
                {/*        </Flex>*/}
                {/*    }*/}
                {/*    name='Your balance'*/}
                {/*    value='$1,000'*/}
                {/*/>*/}
                {/*<MiniStatistics*/}
                {/*    startContent={*/}
                {/*        <IconBox*/}
                {/*            w='56px'*/}
                {/*            h='56px'*/}
                {/*            bg='linear-gradient(90deg, #4481EB 0%, #04BEFE 100%)'*/}
                {/*            icon={<Icon w='28px' h='28px' as={MdAddTask} color='white'/>}*/}
                {/*        />*/}
                {/*    }*/}
                {/*    name='New Tasks'*/}
                {/*    value='154'*/}
                {/*/>*/}
            </SimpleGrid>

            <SimpleGrid columns={{base: 1, md: 1, xl: 2}} gap='20px'>
                <TotalSpent/>
                <WeeklyRevenue/>
            </SimpleGrid>

            {/*comments dashboard*/}
            {/*<SimpleGrid columns={{base: 1, md: 1, xl: 2}} gap='20px' mb='20px'>*/}
            {/*    <CheckTable columnsData={columnsDataCheck} tableData={tableDataCheck}/>*/}
            {/*    <SimpleGrid columns={{base: 1, md: 2, xl: 2}} gap='20px'>*/}
            {/*        <DailyTraffic/>*/}
            {/*        <PieCard/>*/}
            {/*    </SimpleGrid>*/}
            {/*</SimpleGrid>*/}
            {/*<SimpleGrid columns={{base: 1, md: 1, xl: 2}} gap='20px' mb='20px'>*/}
            {/*    <ComplexTable*/}
            {/*        columnsData={columnsDataComplex}*/}
            {/*        tableData={tableDataComplex}*/}
            {/*    />*/}
            {/*    <SimpleGrid gap='20px'>*/}
            {/*        <Tasks/>*/}
            {/*        <MiniCalendar h='100%' w='100%' selectRange={false}/>*/}
            {/*    </SimpleGrid>*/}
            {/*</SimpleGrid>*/}
        </Box>
    );
}
