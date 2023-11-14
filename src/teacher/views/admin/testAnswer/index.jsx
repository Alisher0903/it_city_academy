import { Box, SimpleGrid, Text, useColorModeValue } from "@chakra-ui/react";
import Card from "../../../components/card/Card";
import React from "react";

export default function Overview() {

  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );
  const bg = useColorModeValue("white", "navy.700");

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Card>
        <Text
          color={textColorPrimary}
          fontWeight='bold'
          fontSize='2xl'
          mt='10px'
          mb='4px'>
          Test Answer
        </Text>
        <Text color={textColorSecondary} fontSize='md' me='26px' mb='40px'>
          As we live, our hearts turn colder. Cause pain is what we go through as
          we become older. We get insulted by others, lose trust for those others.
          We get back stabbed by friends. It becomes harder for us to give others
          a hand. We get our heart broken by people we love, even that we give
          them all...
        </Text>
        <SimpleGrid columns='2' gap="25px">
          <Box
            boxShadow={cardShadow}
            bg={bg}
            p="20px"
            borderRadius="20px">
            <Text fontWeight='500' color={textColorSecondary} fontSize='sm'>
              name
            </Text>
            <Text color={textColorPrimary} fontWeight='500' fontSize='md'>
              description
            </Text>
          </Box>
          <Box
            boxShadow={cardShadow}
            bg={bg}
            p="20px"
            borderRadius="20px">
            <Text fontWeight='500' color={textColorSecondary} fontSize='sm'>
              name
            </Text>
            <Text color={textColorPrimary} fontWeight='500' fontSize='md'>
              description
            </Text>
          </Box>
        </SimpleGrid>
      </Card>
    </Box>
  );
}
