import React from "react";

// Chakra imports
import { Button, Flex, Link, Text, Textarea, useColorModeValue } from "@chakra-ui/react";

// Assets
import banner from "../../../../assets/img/nfts/NftBanner1.png";

export default function Banner() {

  let lern = sessionStorage.getItem("learnId")
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  // Chakra Color Mode
  return (
    <>

      <Flex
        direction='column'
        bgImage={banner}
        bgSize='cover'
        mt="80px"
        py={{ base: "30px", md: "56px" }}
        px={{ base: "30px", md: "64px" }}
        borderRadius='30px'>
        <Text
          fontSize={{ base: "24px", md: "34px" }}
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
          lineHeight={{ base: "32px", md: "42px" }}>
          Discover, collect, and sell extraordinary 
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
          Enter in this creative world. Discover now the latest NFTs or start
          creating your own!
        </Text>
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
          <Link>
            {/* <Text color='white' fontSize='sm' fontWeight='500'>
            Watch video
          </Text> */}
          </Link>
        </Flex>
      </Flex>
      <Flex
        direction='column'
        bgColor={boxBg}
        bgSize='cover'
        mt="20px"
        py={{ base: "20px", md: "26px" }}
        px={{ base: "20px", md: "26px" }}
        borderRadius='30px'>
        <Textarea className="textarea" placeholder="Write your code..."
         
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

      </Flex>

    </>
  );
}
