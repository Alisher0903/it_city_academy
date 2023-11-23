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
import {useEffect, useState} from "react";
import axios from "axios";
import {api, config} from "../../../../api/api";
import {toast, ToastContainer} from "react-toastify";

function Exchange() {
    const textColor1 = useColorModeValue("navy.700", "white");

    const [exchanges, setExchanges] = useState([]);

    useEffect(() => {
        getExchange();
    }, []);

    // getExchange
    const getExchange = () => {
        axios.get(api + "exchange/teacher?page=0&size=100", config)
            .then(res => setExchanges(res.data.body))
            .catch(err => {
                toast.error("Exchange not found");
                console.log(err)
            })
    }
    console.log(exchanges)

    return (
        <>
            <ToastContainer/>
            <Text
                pt="100px"
                ms="2px"
                fontSize="1.5rem"
                color={textColor1}
                fontWeight='bold'>
                Exchange
            </Text>
            <SimpleGrid columns={{base: 1, md: 3, xl: 4}} gap='20px' mt="15px">
                <Card
                    boxShadow="rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;"
                    p='20px'>
                    <Flex direction={{base: "column"}} justify='center'>
                        <Box position='relative'>
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
                            fontSize="1.5rem"
                            fontWeight='bold'
                            ms='4px'
                            mt="10px">
                            Exchange name
                        </Text>
                        <Text
                            color={textColor1}
                            fontSize="1rem"
                            mb='5px'
                            fontWeight="normal"
                            ms='4px'>
                            Exchange ball
                        </Text>
                        <Text
                            color={textColor1}
                            fontSize="1rem"
                            mb='5px'
                            fontWeight="bolder"
                            ms='4px'
                            mt="8px">
                            Full Name
                        </Text>
                    </Flex>
                </Card>
            </SimpleGrid>
        </>
    );
}

export default Exchange;