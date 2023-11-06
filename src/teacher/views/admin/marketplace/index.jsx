import React from "react";
import { Box, Flex, Grid, Link, Text, useColorModeValue, SimpleGrid, } from "@chakra-ui/react";
import NFT from "../../../components/card/NFT";
import Nft1 from "../../../assets/img/nfts/Nft1.png";
import { Button } from "reactstrap";

export default function Marketplace() {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorBrand = useColorModeValue("brand.500", "white");
  return (
    <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
      <Grid
        mb='20px'
        gridTemplateColumns={{ xl: "repeat(3, 1fr)", "2xl": "1fr 0.46fr" }}
        gap={{ base: "20px", xl: "20px" }}
        display={{ base: "block", xl: "grid" }}>
        <Flex
          flexDirection='column'
          gridArea={{ xl: "1 / 1 / 2 / 4", "2xl": "1 / 1 / 2 / 3" }}>
          <Flex direction='column'>
            <Flex
              mt='45px'
              mb='20px'
              justifyContent='space-between'
              direction={{ base: "column", md: "row" }}
              align={{ base: "start", md: "center" }}>
              <Text color={textColor} fontSize='2xl' ms='24px' fontWeight='700'>
                Category
              </Text>
              <Flex
                align='center'
                me='20px'
                ms={{ base: "24px", md: "0px" }}
                mt={{ base: "20px", md: "0px" }}>
                {/* <Link
                  color={textColorBrand}
                  fontWeight='500'
                  me={{ base: "34px", md: "44px" }}
                  to='#art'>
                  All
                </Link>
                <Link
                  color={textColorBrand}
                  fontWeight='500'
                  me={{ base: "34px", md: "44px" }}
                  to='#music'>
                  Front End
                </Link>
                <Link
                  color={textColorBrand}
                  fontWeight='500'
                  me={{ base: "34px", md: "44px" }}
                  to='#collectibles'>
                  Back End
                </Link>
                <Link color={textColorBrand} fontWeight='500' to='#sports'>
                  3D Max
                </Link> */}
                {/* <Button>add category</Button> */}
              </Flex>
            </Flex>
            <SimpleGrid columns={{ base: 1, md: 3, xl: 4 }} gap='20px'>
              <NFT
                name='Abstract Colors'
                bidders={[]}
                image={Nft1}
              />
            </SimpleGrid>
          </Flex>
        </Flex>
      </Grid>
    </Box>
  );
}
