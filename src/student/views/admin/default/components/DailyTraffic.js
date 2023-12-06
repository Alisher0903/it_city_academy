import React, {useEffect, useState} from "react";

// Chakra imports
import {Box, Flex, Icon, Text, useColorModeValue} from "@chakra-ui/react";
import BarChart from "../../../../components/charts/BarChart";

// Custom components
import Card from "../../../../components/card/Card.js";
import {barChartOptionsDailyTraffic,} from "../../../../variables/charts";

// Assets
import {RiArrowUpSFill} from "react-icons/ri";
import axios from "axios";
import {api, config} from "api/api";

export default function DailyTraffic(props) {
    const {...rest} = props;

    const [traffic, setTraffic] = useState('')
    const [chartData, setChartData] = useState([{
        name: "Daily Traffic",
        data: [20, 30, 40]
    }])

    // Chakra Color Mode
    const textColor = useColorModeValue("secondaryGray.900", "white");

    function getTraffic() {
        axios.get(api + "user/rates/and/exchange/count", config)
            .then((res) => {
                let data = res.data.body;
                if (data.usedRate !== 0 && data.currentRate !== 0 && data.exchangeCount !== 0) setChartData([{
                    name: "Daily Traffic",
                    data: [data.usedRate, data.currentRate, data.exchangeCount]
                }]);
                setTraffic(data)
            })
            .catch(() => {
            });
    }

    useEffect(() => {
        getTraffic();
    }, [])

    console.log(traffic);
    return (
        <Card align='center' direction='column' w='100%' {...rest}>
            <Flex justify='space-between' align='start' px='10px' pt='5px'>
                <Flex flexDirection='column' align='start' me='20px'>
                    <Flex w='100%'>
                        <Text
                            me='auto'
                            color='secondaryGray.600'
                            fontSize='sm'
                            fontWeight='500'>
                            Traffic
                        </Text>
                    </Flex>
                    <Flex align='end'>
                        <Text
                            color={textColor}
                            fontSize='34px'
                            fontWeight='700'
                            lineHeight='100%'>

                        </Text>
                        <Text
                            ms='6px'
                            color='secondaryGray.600'
                            fontSize='sm'
                            fontWeight='500'>

                        </Text>
                    </Flex>
                </Flex>
                <Flex align='center'>
                    <Icon as={RiArrowUpSFill} color='green.500'/>
                    <Text color='green.500' fontSize='sm' fontWeight='700'>
                        +2.45%
                    </Text>
                </Flex>
            </Flex>
            <Box h='240px' mt='auto'>
                <BarChart
                    chartData={chartData}
                    chartOptions={barChartOptionsDailyTraffic}
                />
            </Box>
        </Card>
    );
}
