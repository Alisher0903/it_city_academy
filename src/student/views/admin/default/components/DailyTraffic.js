import React, { useEffect, useState } from "react";

// Chakra imports
import { Box, Flex, Icon, SimpleGrid, Text, useColorModeValue } from "@chakra-ui/react";
import BarChart from "../../../../components/charts/BarChart";

// Custom components
import Card from "../../../../components/card/Card.js";
import { barChartOptionsDailyTraffic, } from "../../../../variables/charts";

// Assets
import { RiArrowUpSFill } from "react-icons/ri";
import axios from "axios";
import { api, config } from "api/api";

export default function DailyTraffic(props) {
    const { ...rest } = props;

    const [traffic, setTraffic] = useState('')

    // Chakra Color Mode
    const textColor = useColorModeValue("secondaryGray.900", "white");

    function getTraffic() {
        return <BarChart
            chartData={rest.exchangeCount}
            chartOptions={barChartOptionsDailyTraffic}
        />
    }

    console.log(traffic);
    return (
        <Card align='center' direction='column' w='100%' {...rest}>
            <Flex justify='space-between' align='start' px='10px' pt='5px'>
                <Flex flexDirection='column' align='start' me='20px'>
                    <Flex w='100%'>
                        <Text
                            me='auto'
                            align="center"
                            color='secondaryGray.600'
                            fontSize='sm'
                            fontWeight='500'>
                            Traffic
                        </Text>
                    </Flex>
                    <SimpleGrid
                        w="100%"
                        display="flex"
                        textAlign="center"
                        columns={{ base: 3, md: 3, lg: 3 }}
                        gap='30%'
                        mb='20px'>
                        <Text
                            color={textColor}
                            fontSize='19px'
                            fontWeight='700'
                            lineHeight='100%'>
                            All coin
                        </Text>
                        <Text
                            color={textColor}
                            fontSize='19px'
                            fontWeight='700'
                            lineHeight='100%'>
                            Used coin
                        </Text>
                        <Text
                            color={textColor}
                            fontSize='19px'
                            fontWeight='700'
                            lineHeight='100%'>
                            Used <br/>exchange
                        </Text>
                    </SimpleGrid>
                </Flex>
            </Flex>
            <Box h='240px' mt='auto'>
                {/* BarChart */}
                {getTraffic()}
            </Box>
        </Card>
    );
}
