import React, {useEffect, useState} from "react";
import {Box, Flex, Grid, Link, Text, useColorModeValue,} from "@chakra-ui/react";

// Custom components
// Assets
import {AccordionBody, AccordionHeader, AccordionItem, UncontrolledAccordion} from "reactstrap";
import {getUserCategory} from "../../../../api/routers";
import TestList from "./components/TestList";

export default function Marketplace() {

    const [category, setCategory] = useState([]);

    useEffect(() => {
        getUserCategory(setCategory);
    }, []);

    // Chakra Color Mode
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const textColorBrand = useColorModeValue("brand.500", "white");
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
                                Category
                            </Text>
                            {/* <Flex
                                align='center'
                                me='20px'
                                ms={{base: "24px", md: "0px"}}
                                mt={{base: "20px", md: "0px"}}>
                                <Link
                                    color={textColorBrand}
                                    fontWeight='500'
                                    me={{base: "34px", md: "44px"}}
                                    to='#art'>
                                    All
                                </Link>
                                <Link
                                    color={textColorBrand}
                                    fontWeight='500'
                                    me={{base: "34px", md: "44px"}}
                                    to='#music'>
                                    Front End
                                </Link>
                                <Link
                                    color={textColorBrand}
                                    fontWeight='500'
                                    me={{base: "34px", md: "44px"}}
                                    to='#collectibles'>
                                    Back End
                                </Link>
                                <Link color={textColorBrand} fontWeight='500' to='#sports'>
                                let lern = sessionStorage.getItem("learnId")
                                
                                    3D Max
                                </Link>
                            </Flex> */}
                        </Flex>

                        {/*    Accardion */}
                        <section className="d-flex w-100 justify-content-center mt-3">
                            <UncontrolledAccordion className="w-75 border-0">
                                {category.length && category.map((item, i) =>
                                    <AccordionItem key={i} className='border-top'>
                                        <AccordionHeader targetId={i + 1}>
                                            {item.name}
                                        </AccordionHeader>
                                        <TestList categoryId={item.id} index={i + 1}/>
                                    </AccordionItem>
                                )}
                            </UncontrolledAccordion>
                        </section>
                    </Flex>
                </Flex>
            </Grid>
            {/* Delete Product */}
        </Box>
    );
}
