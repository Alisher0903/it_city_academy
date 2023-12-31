import {Select, Table, TableCaption, TableContainer, Tbody, Td, Text, Th, Thead, Tr} from "@chakra-ui/react";
import Card from "components/card/Card";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {api, config} from "api/api.js";

export default function WeeklyRevenue(props) {
    const {...rest} = props;
    const [oneGroup, setOneGroup] = useState([]);
    const [titleGroup, setTitleGroup] = useState(0);
    const [groupStudent, setGroupStudent] = useState([]);

    useEffect(() => {
        getOneGroup();
    }, []);

    useEffect(() => {
        if (oneGroup[0]) {
            getGroupStudent(oneGroup[0].id)
        }
    }, [oneGroup]);

    // getOneGroup // TODO bu yirda xatolik bor tugirlashim kk men Javiohir!!!
    const getOneGroup = () => {
        axios.get(api + "group/teacher", config)
            .then(res => setOneGroup(res.data.body))
            .catch(() => {
            });
    }

    // getGroupTitle
    const getTitle = () => {
        axios.get(api + "group/teacher", config)
            .then(res => {
                setTitleGroup(res.data.body.find(t =>
                    t.id === +document.getElementById("groupSelect").value))
                getGroupStudent(res.data.body.find(t =>
                    t.id === +document.getElementById("groupSelect").value).id);
            })
            .catch(() => {
            })
    }

    // getGroupStudent
    const getGroupStudent = (id) => {
        console.log(id)
        axios.get(api + "group/teacher/one/group/" + id, config)
            .then(res => setGroupStudent(res.data.body))
            .catch(() => {
            });
    }

    return (
        <Card {...rest}>
            <Text
                display="flex"
                justifyContent="space-between">
                <span className="ms-1 mt-1 fs-5 fw-semibold">{titleGroup && titleGroup.name} top 5</span>
                <Select id="groupSelect" w="25%" onChange={getTitle}>
                    <option selected disabled>Select Group</option>
                    {oneGroup.length && oneGroup.map((item, i) =>
                        <option key={i} value={item.id} selected={oneGroup[0]}>{item.name}</option>
                    )}
                </Select>
            </Text>
            <TableContainer
                mt="1rem"
                pt=".7rem"
                pb=".7rem"
                borderRadius="15px"
                boxShadow="rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px"
            >
                <Table>
                    <TableCaption
                        fontSize="1rem">{titleGroup && titleGroup.name} group</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>T/r</Th>
                            <Th>full name</Th>
                            <Th>phone number</Th>
                            <Th>GroupId</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {groupStudent ?
                            groupStudent.map((item, i) =>
                                <Tr key={i}>
                                    <Td>{i + 1}</Td>
                                    <Td>{item.firstName} {item.lastName}</Td>
                                    <Td>{item.phoneNumber}</Td>
                                    <Td>{item.groupId}</Td>
                                </Tr>
                            ) :
                            <Tr>
                                <Td colSpan="3">Bu guruhda o'quvchi yo'q</Td>
                            </Tr>
                        }
                    </Tbody>
                </Table>
            </TableContainer>
        </Card>
    );
}
