import React from "react";
import {Box, Flex, Grid, Text, useColorModeValue,} from "@chakra-ui/react";

// Custom components

// Assets
import Gift from "../../../components/card/Gift";

export default function Gifts() {
    // Chakra Color Mode
    const textColor = useColorModeValue("secondaryGray.900", "white");

    return (
        <Box pt={{base: "180px", md: "80px", xl: "80px"}}>
            {/* Main Fields */}
            <Grid
                mb='20px'
                gridTemplateColumns={{xl: "repeat(3, 1fr)", "2xl": "1fr 0.46fr"}}
                gap={{base: "20px", xl: "20px"}}
                display={{base: "block", xl: "grid"}}>
                <Flex
                    flexDirection='column'
                    gridArea={{xl: "1 / 1 / 2 / 4", "2xl": "1 / 1 / 2 / 3"}}>
                    {/* <Banner /> */}
                    <Flex direction='column'>
                        <Flex
                            mt='45px'
                            mb='20px'
                            justifyContent='space-between'
                            direction={{base: "column", md: "row"}}
                            align={{base: "start", md: "center"}}>
                            <Text color={textColor} fontSize='2xl' ms='24px' fontWeight='700'>
                                All gifts
                            </Text>
                        </Flex>
                        <Box gap='20px'>
                            <Gift/>
                        </Box>
                    </Flex>
                </Flex>
            </Grid>

        </Box>
    );
}
