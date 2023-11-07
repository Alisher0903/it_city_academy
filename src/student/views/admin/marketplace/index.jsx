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

    console.log(category)

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
                            <Flex
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
                                    3D Max
                                </Link>
                            </Flex>
                        </Flex>

                        {/*    Accardion */}
                        <section className="d-flex w-100 justify-content-center mt-3">
                            <UncontrolledAccordion className="w-75">
                                {category.length && category.map((item, i) =>
                                    <AccordionItem key={i}>
                                        <AccordionHeader targetId={i + 1}>
                                            {item.name}
                                        </AccordionHeader>
                                        <TestList categoryId={item.id} index={i + 1}/>
                                    </AccordionItem>
                                )}
                                <AccordionItem>
                                    <AccordionHeader targetId="1">
                                        Accordion Item 1
                                    </AccordionHeader>
                                    <AccordionBody accordionId="1">
                                        <strong>
                                            This is the first item's accordion body.
                                        </strong>
                                    </AccordionBody>
                                </AccordionItem>
                                <AccordionItem>
                                    <AccordionHeader targetId="2">
                                        Accordion Item 2
                                    </AccordionHeader>
                                    <AccordionBody accordionId="2">
                                        <strong>
                                            This is the second item's accordion body.
                                        </strong>
                                    </AccordionBody>
                                </AccordionItem>
                                <AccordionItem>
                                    <AccordionHeader targetId="3">
                                        Accordion Item 3
                                    </AccordionHeader>
                                    <AccordionBody accordionId="3">
                                        <strong>
                                            This is the third item's accordion body.
                                        </strong>
                                    </AccordionBody>
                                </AccordionItem>
                            </UncontrolledAccordion>
                        </section>

                        {/* <Text
              mt='45px'
              mb='36px'
              color={textColor}
              fontSize='2xl'
              ms='24px'
              fontWeight='700'>
              
            </Text> */}
                    </Flex>
                </Flex>
                {/* <Flex
          flexDirection='column'
          gridArea={{ xl: "1 / 3 / 2 / 4", "2xl": "1 / 2 / 2 / 3" }}>
          <Card px='0px' mb='20px'>
            <TableTopCreators
              tableData={tableDataTopCreators}
              columnsData={tableColumnsTopCreators}
            />
          </Card>
          <Card p='0px'>
            <Flex
              align={{ sm: "flex-start", lg: "center" }}
              justify='space-between'
              w='100%'
              px='22px'
              py='18px'>
              <Text color={textColor} fontSize='xl' fontWeight='600'>
                History
              </Text>
              <Button variant='action'>See all</Button>
            </Flex>

            <HistoryItem
              name='Colorful Heaven'
              author='By Mark Benjamin'
              date='30s ago'
              image={Nft5}
              price='0.91 ETH'
            />
            <HistoryItem
              name='Abstract Colors'
              author='By Esthera Jackson'
              date='58s ago'
              image={Nft1}
              price='0.91 ETH'
            />
            <HistoryItem
              name='ETH AI Brain'
              author='By Nick Wilson'
              date='1m ago'
              image={Nft2}
              price='0.91 ETH'
            />
            <HistoryItem
              name='Swipe Circles'
              author='By Peter Will'
              date='1m ago'
              image={Nft4}
              price='0.91 ETH'
            />
            <HistoryItem
              name='Mesh Gradients '
              author='By Will Smith'
              date='2m ago'
              image={Nft3}
              price='0.91 ETH'
            />
            <HistoryItem
              name='3D Cubes Art'
              author='By Manny Gates'
              date='3m ago'
              image={Nft6}
              price='0.91 ETH'
            />
          </Card>
        </Flex> */}
            </Grid>
            {/* Delete Product */}
        </Box>
    );
}
