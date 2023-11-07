import { Box, Flex, Link, Text, useColorModeValue, } from "@chakra-ui/react";
import Card from "../../../../components/card/Card.js";
import React, { useState } from "react";
import { Button } from "reactstrap";

export default function Project(props) {

  const { title, groupIdIn, ranking, link, image, ...rest } = props;
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const bg = useColorModeValue("white", "navy.700");

  const [groupId, setGroupId] = useState("");

  return (
    <Card bg={bg} {...rest} p='14px'>
      <Flex align='center' direction={{ base: "column", md: "row" }}>
        <Box mt={{ base: "10px", md: "0" }}>
          <Text
            color={textColorPrimary}
            fontWeight='500'
            fontSize='md'
            mb='4px'>
            {title}
          </Text>
        </Box>
        <Link
          href={link}
          ms='auto'>
          <Button onClick={() => {
            setGroupId(groupIdIn);
            sessionStorage.setItem("groupTeacherId", groupId.id);
          }} className="px-4 rounded-5 fw-bolder" outline color="success">view groups</Button>
        </Link>
      </Flex>
    </Card>
  );
}
