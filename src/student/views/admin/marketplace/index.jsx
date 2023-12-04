import React, {useEffect, useState} from "react";
import {Box, Flex, Grid, Link, Text, useColorModeValue,} from "@chakra-ui/react";

// Custom components
// Assets
import {AccordionHeader, AccordionItem, UncontrolledAccordion} from "reactstrap";
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
                        </Flex>

                        {/*    Accardion */}
                        <section className="d-flex w-100 justify-content-center mt-3">
                            <UncontrolledAccordion className="w-75 border-0">
                                {category.length && category.map((item, i) =>
                                    <AccordionItem key={i} className='border-top'>
                                        <AccordionHeader targetId={i + 1}>
                                            {item.active ?
                                                <div className="bg-primary p-2 rounded-3 me-3">
                                                    <svg viewBox="0 0 16 16" fill="white"
                                                         xmlns="http://www.w3.org/2000/svg"
                                                         role="img" width="16" height="16"
                                                         sl-test-data="cmpModule-started-icon-10343"
                                                         className="sol-icon le-module__state-icon le-module__state-icon--started">
                                                        <g id="icon-play-small">
                                                            <path id="Vector"
                                                                  d="M4 3.84976C4 3.46852 4.40956 3.22753 4.74282 3.41268L12.2133 7.56292C12.5562 7.75342 12.5562 8.24658 12.2133 8.43708L4.74282 12.5873C4.40956 12.7725 4 12.5315 4 12.1502V3.84976Z"
                                                                  fill="white"></path>
                                                        </g>
                                                    </svg>
                                                </div>
                                                : <div className='p-2 rounded-3 me-3' style={{backgroundColor: '#bac5d5'}}>
                                                    <svg viewBox="0 0 24 24" fill="none"
                                                         xmlns="http://www.w3.org/2000/svg" role="img" width="16"
                                                         height="16" sl-test-data="cmpModule-locked-icon-10346"
                                                         className="sol-icon le-module__state-icon le-module__state-icon--locked">
                                                        <g id="icon-lock">
                                                            <path id="Vector" fillRule="evenodd" clipRule="evenodd"
                                                                  d="M15 10V7C15 5.34315 13.6569 4 12 4C10.3431 4 9 5.34315 9 7V10H15ZM7 7V10H4.5C4.22386 10 4 10.2239 4 10.5V20.5C4 20.7761 4.22386 21 4.5 21H19.5C19.7761 21 20 20.7761 20 20.5V10.5C20 10.2239 19.7761 10 19.5 10H17V7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7ZM11.5 14C11.2239 14 11 14.2239 11 14.5V16.5C11 16.7761 11.2239 17 11.5 17H12.5C12.7761 17 13 16.7761 13 16.5V14.5C13 14.2239 12.7761 14 12.5 14H11.5Z"
                                                                  fill="currentColor"></path>
                                                        </g>
                                                    </svg>
                                                </div>
                                            }
                                            {item.name}
                                        </AccordionHeader>
                                        <TestList categoryId={item.id} pl={item.programmingLanguage} index={i + 1}/>
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
