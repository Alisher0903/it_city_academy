// Chakra imports
import { Flex } from "@chakra-ui/react";
import Card from "../../../../components/card/Card.js";
import React from "react";
import Information from "./Information.js";
import { SimpleGrid, Text, useColorModeValue, phoneNumer, email } from "@chakra-ui/react";

export default function Upload(props) {

  const { used, total, email, phoneNumber, ...rest } = props;
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );

  return (
    <Card {...rest} mb='20px' align='center' p='20px'>
      <Flex h='100%' direction={{ base: "column", "2xl": "row" }}>
        <Text
          color={textColorPrimary}
          fontWeight='bold'
          fontSize='2xl'
          mb='15px'>
          Teacher Information
        </Text>
        <SimpleGrid columns='1' gap='20px'>
          <Information
            boxShadow={cardShadow}
            title='Phone Number'
            value={phoneNumber}
          />
          <Information
            boxShadow={cardShadow}
            title='Email'
            value={email}
          />
          <Information
            boxShadow={cardShadow}
            title='Direction'
            value='Front End'
          />
        </SimpleGrid>
      </Flex>
    </Card>
  );
}
