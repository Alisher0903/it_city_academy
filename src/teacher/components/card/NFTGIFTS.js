import { Box, Flex, Image, Text, useColorModeValue } from "@chakra-ui/react";
import Card from "./Card.js";
import React from "react";

export default function NFT(props) {

  const { image, name, rate, description } = props;
  const textColor = useColorModeValue("navy.700", "white");

  return (
    <Card p='20px'>
      <Flex direction={{ base: "column" }} justify='center'>
        <Box mb={{ base: "20px", "2xl": "20px" }} position='relative'>
          <Image
            src={image}
            w={{ "3xl": "100%", base: "100%" }}
            h={{ base: "220px", "3xl": "100%" }}
            borderRadius='20px'
          />
        </Box>
        <Flex flexDirection='column' justify='space-between' h='100%'>
          <Flex
            justify='space-between'
            direction={{
              base: "row",
              md: "column",
              lg: "row",
              xl: "column",
              "2xl": "row",
            }}
            mb='auto'>
            <Flex direction='column'>
              <Text
                color={textColor}
                fontSize={{
                  base: "xl",
                  md: "lg",
                  lg: "lg",
                  xl: "lg",
                  "2xl": "md",
                  "3xl": "lg",
                }}
                fontWeight='bold'
                letterSpacing=".5px">
                {name}
              </Text>
            </Flex>
          </Flex>
          <Flex
            align='start'
            justify='space-between'
            direction={{
              base: "row",
              md: "column",
              lg: "row",
              xl: "column",
              "2xl": "row",
            }}>
            <Text
              color={textColor}
              fontSize={{
                base: "xl",
                md: "lg",
                lg: "lg",
                xl: "lg",
                "2xl": "md",
                "3xl": "lg",
              }} mt="3px" me="5px" letterSpacing=".1px">
              <p className="fw-normal">{description}</p>
            </Text>
          </Flex>
          <Flex
            align='start'
            justify='space-between'
            direction={{
              base: "row",
              md: "column",
              lg: "row",
              xl: "column",
              "2xl": "row",
            }}>
            <Text
              color={textColor}
              display="flex"
              justifyContent="space-between"
              width="100%"
              fontSize={{
                base: "xl",
                md: "lg",
                lg: "lg",
                xl: "lg",
                "2xl": "md",
                "3xl": "lg",
              }} mt="7px" letterSpacing="1px">
              <p className="fw-bolder">coin:</p>
              <p className="me-2 fw-bolder">
                {rate}
              </p>
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
}
