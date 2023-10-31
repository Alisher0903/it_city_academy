// Chakra imports
import { Text, useColorModeValue } from "@chakra-ui/react";
// Assets
import Project1 from "assets/img/profile/Project1.png";
// Custom components
import Card from "components/card/Card.js";
import React from "react";
import Project from "./Project";

export default function Projects(props) {
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );
  return (
    <Card mb={{ base: "0px", "2xl": "20px" }}>
      <Text
        color={textColorPrimary}
        fontWeight='bold'
        fontSize='2xl'
        mt='10px'
        mb='10px'>
        Group
      </Text>
     
      <Project
        boxShadow={cardShadow}
        mb='20px'
        image={Project1}
        ranking='10'
        title='Front End'
      />
      
    </Card>
  );
}
