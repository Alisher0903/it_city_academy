import React, {useEffect, useState} from "react";

// Chakra imports
import {Box, Button, Flex, Grid, Image, Text, Textarea, useColorModeValue} from "@chakra-ui/react";

// Assets
import axios from "axios";
import {api, config, imgUrl} from "api/api";
import {toast, ToastContainer} from "react-toastify";

export default function Banner() {

    const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
    const [test, setTest] = useState([]);

    useEffect(() => {
        getTest();
    }, []);


    let learnIdIn = sessionStorage.getItem("learnId");

    function testCode() {
        // console.log(learnIdIn);
        axios.post(api + "test/test-code", {
            programmingLanguage: "JAVA",
            testId: learnIdIn,
            userCode: document.getElementById('code').value
        }, config)
            .then((res) => {
                toast.success(res.data.message);
            })
            .catch((err) => {
                toast.error(err.data.message);
            })
    }

    function getTest() {
        axios.get(api + "test/" + learnIdIn, config).then(res => {
            setTest(res.data)
        })
    }


    // console.log(test);

    return (
        <>
            <ToastContainer/>
            <Flex
                direction='column'
                // bgImage={banner}
                bgColor="#4314EC"
                bgSize='cover'
                mt="80px"
                py={{base: "30px", md: "56px"}}
                px={{base: "30px", md: "64px"}}
                borderRadius='30px'>
                <Grid
                    templateColumns={{
                        base: "1fr",
                        lg: "repeat(2, 1fr)",
                        "2xl": "repeat(2, 1fr)",
                    }}

                    gap={{base: "20px", xl: "20px"}}>
                    <Box>

                        <Text
                            fontSize={{base: "24px", md: "34px"}}
                            color='white'
                            mb='14px'
                            maxW={{
                                base: "100%",
                                md: "64%",
                                lg: "46%",
                                xl: "70%",
                                "2xl": "50%",
                                "3xl": "42%",
                            }}
                            fontWeight='700'
                            lineHeight={{base: "32px", md: "42px"}}>
                            {test.question}
                        </Text>
                        <Text
                            fontSize='md'
                            color='#E3DAFF'
                            maxW={{
                                base: "100%",
                                md: "64%",
                                lg: "40%",
                                xl: "56%",
                                "2xl": "46%",
                                "3xl": "34%",
                            }}
                            fontWeight='500'
                            mb='40px'
                            lineHeight='28px'>
                            {test.description}
                        </Text>
                        <Text
                            fontSize={{base: "20px", md: "30px"}}
                            color='white'
                            mb='14px'
                            maxW={{
                                base: "100%",
                                md: "64%",
                                lg: "46%",
                                xl: "70%",
                                "2xl": "50%",
                                "3xl": "42%",
                            }}
                            fontWeight='700'
                            lineHeight={{base: "32px", md: "42px"}}>
                            Grade: {test.grade}
                        </Text>
                    </Box>
                    <Box>
                        <Image
                            src={(test.attachmentId != 0) ? imgUrl + test.attachmentId : "https://spendmatters-site.s3.amazonaws.com/uploads/2019/05/foire-questions-automobiles.jpg"}
                            w={{base: "90%", base: "70%", "3xl": "60%"}}
                            h={{base: "90%",}}
                            borderRadius='20px'
                        />
                    </Box>
                </Grid>
                <Flex align='center'>
                    {/* <Button
          bg='white'
          color='black'
          _hover={{ bg: "whiteAlpha.900" }}
          _active={{ bg: "white" }}
          _focus={{ bg: "white" }}
          fontWeight='500'
          fontSize='14px'
          py='20px'
          px='27'
          me='38px'>
          Discover now
        </Button> */}

                </Flex>
            </Flex>
            <Flex
                direction='column'
                bgColor={boxBg}
                bgSize='cover'
                mt="20px"
                py={{base: "20px", md: "26px"}}
                px={{base: "20px", md: "26px"}}
                borderRadius='30px'>
                <Textarea className="textarea" placeholder="Write your code..."
                          id="code"
                          color="#666666"
                          padding="1em"
                          borderRadius="10px"
                          border="2px solid transparent"
                          outline="none"
                          fontFamily="'Heebo', sans-serif"
                          fontWeight="500"
                          fontSize="16px"
                          lineHeight="1.4"
                          transition="all 0.2s"
                          height="200px"
                          _hover={{
                              cursor: "pointer"
                          }}
                />
                <Button

                    width="15%"
                    bg='white'
                    color='black'
                    _hover={{bg: "whiteAlpha.900"}}
                    _active={{bg: "white"}}
                    _focus={{bg: "white"}}
                    fontWeight='500'
                    fontSize='14px'
                    py='20px'
                    px='27'
                    mt="20px"
                    ms="80%"
                    onClick={testCode}>
                    Send
                </Button>
            </Flex>

        </>
    );
}
