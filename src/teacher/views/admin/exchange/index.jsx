import {
    Box,
    Flex,
    Image,
    Text,
    SimpleGrid,
    useColorModeValue
} from "@chakra-ui/react";
import Card from "../../../components/card/Card";
import categoryImg from "../marketplace/categoryImg.png";
import { useEffect, useState } from "react";
import axios from "axios";
import { api } from "api/api";
import { config } from "api/api";

function Exchange() {
    const textColor1 = useColorModeValue("navy.700", "white");

    const [exchanges, setExchanges] = useState([]);

    useEffect(() => {
        getExchange();
    }, []);

    // getExchange
    const getExchange = () => axios.get(api + "exchange/teacher", config)
        .then(res => setExchanges(res.data));


    console.log(exchanges);

    return (
        <>
            <Text
                pt="100px"
                ms="2px"
                fontSize="1.5rem"
                color={textColor1}
                fontWeight='bold'>
                Exchange
            </Text>
            <SimpleGrid columns={{ base: 1, md: 3, xl: 4 }} gap='20px' mt="15px">
                <Card
                    boxShadow="rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;"
                    p='20px'>
                    <Flex direction={{ base: "column" }} justify='center'>
                        <Box mb={{ base: "20px", "2xl": "20px" }} position='relative'>
                            <Image
                                objectFit="cover"
                                src={categoryImg}
                                alt="img"
                                w="100%"
                                h="180px"
                                borderRadius='20px'
                            />
                        </Box>
                        <Text
                            color={textColor1}
                            fontSize={{
                                base: "xl",
                                md: "lg",
                                lg: "lg",
                                xl: "lg",
                                "2xl": "md",
                                "3xl": "lg",
                            }}
                            mb='5px'
                            fontWeight='bold'
                            ms='4px'>
                            name
                        </Text>
                    </Flex>
                </Card>
            </SimpleGrid>
        </>
    );
}

export default Exchange;