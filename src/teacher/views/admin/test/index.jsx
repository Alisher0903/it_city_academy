import React from "react";
import Card from "../../../components/card/Card";
import {
  Box,
  Flex,
  Icon,
  Image,
  Link,
  SimpleGrid,
  Text,
  useColorModeValue
} from "@chakra-ui/react";
import { MdDelete, MdEdit } from "react-icons/md";

export default function Overview() {
  const textColor = useColorModeValue("navy.700", "white");

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Text
        fontSize={{
          base: "xl",
          md: "lg",
          lg: "lg",
          xl: "lg",
          "2xl": "md",
          "3xl": "lg",
        }}
        color={textColor}>Test</Text>
      <SimpleGrid columns={{ base: 1, md: 3, xl: 4 }} gap='20px'>
        <Card p='20px'>
          <Flex direction={{ base: "column" }} justify='center'>
            <Box mb={{ base: "20px", "2xl": "20px" }} position='relative'>
              <Image
                src=""
                w={{ base: "100%", "3xl": "100%" }}
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
                    mb='5px'
                    fontWeight='bold'
                    me='14px'>
                    name
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
                }}
                mt='25px'>
                <Box ms="auto">
                  <Link
                    variant='no-hover'
                    ms='0px'
                    me="20px"
                    p='0px !important'>
                    <Icon as={MdEdit} color='secondaryGray.500' h='18px' w='18px' />
                  </Link>
                  <Link
                    variant='no-hover'
                    ms='0px'
                    p='0px !important'>
                    <Icon as={MdDelete} color='secondaryGray.500' h='18px' w='18px' />
                  </Link>
                </Box>
              </Flex>
            </Flex>
          </Flex>
        </Card>
      </SimpleGrid>
    </Box>
  );
}
