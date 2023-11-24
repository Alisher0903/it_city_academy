// Chakra imports
import { SimpleGrid, Text, useColorModeValue } from "@chakra-ui/react";
// Custom components
import Card from "../../../../components/card/Card.js";
import React from "react";
import Information from "../../../../views/admin/profile/components/Information";
import { useState } from "react";
import { useEffect } from "react";
import { api } from "api/api.js";
import { config } from "api/api.js";
import axios from "axios";

// Assets
export default function GeneralInformation(props) {
  const { ...rest } = props;
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );
  const [info, setInfo] = useState({});

  useEffect(() => {
    getProfile();
  }, []);

  function getProfile() {
    axios.get(api + "user/getMe", config)
      .then(res => {
        setInfo(res.data)
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  }

  return (
    <Card mb={{ base: "0px", "2xl": "20px" }} {...rest}>
      <Text
        color={textColorPrimary}
        fontWeight='bold'
        fontSize='2xl'
        mt='10px'
        mb='15px'>
        General Information
      </Text>
      <SimpleGrid columns='1' gap='20px'>
        <Information
          boxShadow={cardShadow}
          title='Your phone number'
          value={info.phoneNumber}
        />
        <Information
          boxShadow={cardShadow}
          title='Your email'
          value={info.email}
        />
        <Information
          boxShadow={cardShadow}
          title='Your group'
          value={info.group ? info.group.name : ""}
        />

      </SimpleGrid>
    </Card>
  );
}
