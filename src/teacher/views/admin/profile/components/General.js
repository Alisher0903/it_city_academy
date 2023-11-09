import { Box, Link, SimpleGrid, Text, useColorModeValue } from "@chakra-ui/react";
import Card from "../../../../components/card/Card.js";
import React, { useEffect, useState } from "react";
import { Table } from "reactstrap";
import axios from "axios";
import { api, teacherUrl, config, getUserUrl } from "api/api.js";
import { Icon } from "@iconify/react";

// Assets
export default function GeneralInformation(props) {

  const { title } = props
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
          <Link
            href="/#/Teacher/group"
            className="btn btn-outline-warning d-none d-md-inline rounded-5 me-3 px-4 py-1">
              <Icon icon="openmoji:left-arrow" width="30" />
          </Link>
          <select className="form-select bg-dark text-light rounded-5" id="selectStudent">
            <option selected disabled>{generalName}</option>
            {
              teacher.map((item, i) =>
                <option className="text-light" key={i} value={item.id}>{item.name}</option>
              )
            }
          </select>
        </Box>
      </Text>
      <SimpleGrid>
        <Table dark hover className="rounded-5">
          <thead>
            <tr>
              <th>#</th>
              <th>Last Name</th>
              <th>First Name</th>
              <th>Email</th>
              <th>PhoneNumber</th>
            </tr>
          </thead>
          <tbody>
            {users.length
              ? users.map((item, i) =>
                <tr key={i}>
                  <th>{i + 1}</th>
                  <td>{item.lastName}</td>
                  <td>{item.firstName}</td>
                  <td>{item.email}</td>
                  <td>{item.phoneNumber}</td>
                </tr>
              ) :
              <tr className="text-center">
                <td colSpan="5">
                  <h1 className="fs-4">Bu guruhda o'quvchi mavjud emas!</h1>
                </td>
              </tr>
            }
          </tbody>
        </Table>
      </SimpleGrid>
    </Card>
  );
}
