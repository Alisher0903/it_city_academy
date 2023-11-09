import { Text, useColorModeValue } from "@chakra-ui/react";
import Card from "../../../../components/card/Card.js";
import React, { useEffect, useState } from "react";
import Project from "./Project.js";
import axios from "axios";
import { api, teacherUrl, config } from "api/api.js";

export default function Projects(props) {

  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );

  const [groupTeacher, setGroupTeacher] = useState([]);

  useEffect(() => {
    getGroupTeacher();
  }, [])

  // get group teacher
  const getGroupTeacher = () => {
    axios.get(api + teacherUrl, config)
      .then(res => setGroupTeacher(res.data.body));
  }

  return (
    <Card mb={{ base: "0px", "2xl": "20px" }}>
      <Text
        color={textColorPrimary}
        fontWeight='bold'
        fontSize='2xl'
        mt='10px'
        mb='8px'>
        Teacher Groups
      </Text>
      {groupTeacher.map((item, i) =>
        <Project
          key={i}
          groupIdIn={item}
          boxShadow={cardShadow}
          mb='20px'
          link='/#/Teacher/student'
          title={item.name}
        />
      )}
    </Card>
  );
}
