import {
  Box,
  SimpleGrid,
  Text,
  useColorModeValue,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Select,
} from "@chakra-ui/react";
import Card from "../../../../components/card/Card.js";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { api, teacherUrl, config, getUserUrl } from "api/api.js";

// Assets
export default function GeneralInformation(props) {
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const [teacher, setTeacher] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getGroup();
    getStudent();
  }, []);

  // get group
  const getGroup = () => {
    axios.get(api + teacherUrl, config).then(res => setTeacher(res.data.body))
  }

  // user id vs name
  let generalId = sessionStorage.getItem("groupTeacherId");
  let generalName = sessionStorage.getItem("groupTeacherName");

  // get student
  const getStudent = () => {
    axios.get(api + getUserUrl + generalId, config).then(res => setUsers(res.data.body));
  }

  return (
    <Card>
      <Text
        display="flex"
        justifyContent="space-between"
        color={textColorPrimary}
        fontWeight='bold'
        fontSize='2xl'
        mt='10px'
        mb='15px'>
        {generalName}
        <Box display="flex" flexDirection="row">
          <Select placeholder={generalName}>
            {teacher.map((item, i) =>
              <option key={i} value={item.id}>{item.name}</option>
            )}
          </Select>
        </Box>
      </Text>
      <SimpleGrid>
        <TableContainer
          mt="1rem"
          pb=".7rem"
          borderRadius="15px"
          boxShadow="rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px"
        >
          <Table>
            <TableCaption
              fontSize="1rem">{generalName} guruh o'quvchilari</TableCaption>
            <Thead>
              <Tr>
                <Th>T/r</Th>
                <Th>Last Name</Th>
                <Th>First Name</Th>
                <Th>Email</Th>
                <Th>Phone Number</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users.length > 0
                ? users.map((item, i) =>
                  <Tr key={i}>
                    <Td>{i + 1}</Td>
                    <Td>{item.lastName}</Td>
                    <Td>{item.firstName}</Td>
                    <Td>{item.email}</Td>
                    <Td>{item.phoneNumber}</Td>
                  </Tr>
                ) :
                <Tr>
                  <Td colSpan="5">
                    <h1 className="fs-5 text-center">
                      {generalName} guruhida hozirgi vaqtda o'quvchi mavjud emas!!!
                    </h1>
                  </Td>
                </Tr>
              }
            </Tbody>
          </Table>
        </TableContainer>
      </SimpleGrid>
    </Card>
  );
}
