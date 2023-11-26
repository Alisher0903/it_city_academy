import {
    Box,
    Select,
    SimpleGrid,
    Table,
    TableCaption,
    TableContainer,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    useColorModeValue,
} from "@chakra-ui/react";
import Card from "../../../../components/card/Card.js";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {api, config, getUserUrl, teacherUrl} from "api/api.js";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";

// Assets
export default function GeneralInformation() {
    const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
    const [teacher, setTeacher] = useState([]);
    const [users, setUsers] = useState([]);
    const [groupName, setGroupName] = useState(sessionStorage.getItem("groupTeacherName"))

    useEffect(() => {
        getGroup();
        getStudent(sessionStorage.getItem("groupTeacherId"));
    }, []);

    // get group
    const getGroup = () => {
        axios.get(api + teacherUrl, config).then(res => setTeacher(res.data.body));
    }

    // get student
    const getStudent = (groupId) => {
        axios.get(api + getUserUrl + groupId, config)
            .then(res => setUsers(res.data.body))
            .catch(err => {
                if (err.response.status) setUsers([]);
            })
    }

    const setGroup = (e) => {
        teacher.forEach(g => {
            if (g.id === +e.target.value) setGroupName(g.name);
        });
        getStudent(e.target.value);
    }

    return (
        <Card>
            <ToastContainer/>
            <Text
                display="flex"
                justifyContent="space-between"
                color={textColorPrimary}
                fontWeight='bold'
                fontSize='2xl'
                mt='10px'
                mb='15px'>
                {groupName}
                <Box display="flex" flexDirection="row">
                    <Select onChange={setGroup}>
                        <option value='0' disabled>Select Group</option>
                        {teacher.map((item, i) =>
                            <option key={i} value={item.id} selected={groupName === item.name}>{item.name}</option>
                        )}
                    </Select>
                </Box>
            </Text>
            <SimpleGrid>
                <TableContainer
                    mt="1rem"
                    pb=".7rem"
                    borderRadius="15px"
                    boxShadow="rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px">
                    <Table>
                        <TableCaption
                            fontSize="1rem">{groupName} guruh o'quvchilari</TableCaption>
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
                                            {groupName} guruhida hozirgi vaqtda o'quvchi mavjud emas!!!
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
