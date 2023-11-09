import { SimpleGrid, Text, useColorModeValue } from "@chakra-ui/react";
import Card from "../../../../components/card/Card.js";
import React from "react";
import Information from "./Information.js";

export default function GeneralInformation(props) {

  const { ...rest } = props;
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );

  return (
    <Card mb={{ base: "0px", "2xl": "20px" }} {...rest}>
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
          value='Stanford University'
        />
        <Information
          boxShadow={cardShadow}
          title='Email'
          value='English, Spanish, Italian'
        />
        <Information
          boxShadow={cardShadow}
          title='Department'
          value='Product Design'
        />
      </SimpleGrid>
    </Card>
  );
}
