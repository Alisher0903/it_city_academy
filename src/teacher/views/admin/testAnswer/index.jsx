import { Box, SimpleGrid, Text, useColorModeValue } from "@chakra-ui/react";
import Card from "../../../components/card/Card";
import React from "react";
import { Button } from "reactstrap";

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
          display="flex"
          justifyContent="space-between"
          color={textColorPrimary}
          fontWeight='bold'
          fontSize='2xl'
          mt='10px'
          mb='4px'>
          Test Answer
          <Button
            className="rounded-5"
            color="primary">Add TestAnswer</Button>
        </Text>
        <Text color={textColorSecondary} fontSize='md' mt="15px" mb='30px'>
          <Button color="success">nimadur</Button>
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
