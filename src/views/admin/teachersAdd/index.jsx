import {useEffect, useState} from "react";
import {
    Box,
    Button,
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
import {api, byIdIn, config} from "api/api";
import axios from "axios";
import {Input, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import 'react-toastify/dist/ReactToastify.css';
import {toast, ToastContainer} from "react-toastify";

function AddTeachers() {
    const textColorPrimary = useColorModeValue("secondaryGray.900", "white");

    // state hooks
    const [teachers, setTeachers] = useState([]);
    const [groupSelect, setGroupSelect] = useState([]);
    const [addModal, setAddModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [teacherGetId, setTeacherGetId] = useState("");

    useEffect(() => {
        getTeachers();
        getGroupSelect();
    }, []);

    // modals function
    const openAddModal = () => setAddModal(!addModal);
    const openEditModal = () => setEditModal(!editModal);
    const openDeleteModal = () => setDeleteModal(!deleteModal);

    // getTeachers
    const getTeachers = () => axios.get(api + "user/teacher", config)
        .then(res => setTeachers(res.data.body))
        .catch((err) => console.log(err))

    // getGroupSelect
    const getGroupSelect = () => {
        axios.get(api + "group?page=0&size=100", config)
            .then(res => setGroupSelect(res.data.body.object))
            .catch((err) => console.log(err))
    }

    // addTeacher
    const addTeachers = () => {
        let addData = {
            firstName: byIdIn("firstName").value,
            lastName: byIdIn("lastName").value,
            email: byIdIn("email").value,
            password: byIdIn("password").value,
            phoneNumber: byIdIn("phoneNumber").value,
            groupId: 0,
            gender: byIdIn('gender').value
        }
        axios.post(api + "auth/register?ROLE=ROLE_TEACHER", addData, config)
            .then(() => {
                openAddModal();
                getTeachers();
                toast.success("Teacher successfully added✔");
            })
            .catch(() => {
                toast.error("Something went wrong❓")
            })
    }

    // editTeacher
    const editTeachers = () => {
        let editData = {
            firstName: byIdIn("firstName").value,
            lastName: byIdIn("lastName").value,
            email: byIdIn("email").value,
            password: byIdIn("password").value,
            phoneNumber: byIdIn("phoneNumber").value,
            groupId: 0,
            gender: byIdIn('gender').value
        }
        axios.put(api + "user/update/" + teacherGetId.id, editData, config)
            .then(() => {
                openEditModal();
                getTeachers();
                toast.success("Teacher successfully edited✔");
            })
            .catch(() => {
                toast.error("Something went wrong❓")
            })
    }

    // deleteTeacher
    const deleteUsers = () => {
        axios.delete(api + "user/" + teacherGetId.id, config)
            .then(() => {
                openDeleteModal();
                getTeachers();
                toast.success("Teacher successfully deleted");
            })
            .catch(() => {
                toast.error("Something went wrong❓")
            })
    }

    return (
        <>
            <ToastContainer/>
            <SimpleGrid color={textColorPrimary} pt="100px">
                <Box
                    display="flex"
                    justifyContent="space-between">
                    <Text fontSize="1.5rem" fontWeight="bold" letterSpacing=".5px">Teachers</Text>
                    <Button
                        onClick={openAddModal}
                        colorScheme="green" variant="outline"
                        boxShadow="rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px">
                        Add Teachers</Button>

                    {/* addUserModal */}
                    <Modal isOpen={addModal} centered size="lg">
                        <ModalHeader
                            toggle={openAddModal}
                            className="text-dark fs-4 fw-bolder">Add Teacher</ModalHeader>
                        <ModalBody className="techer__modal-body">
                            <Input id="firstName" placeholder="firstName"/>
                            <Input id="lastName" placeholder="lastName"/>
                            <Input type="email" id="email" placeholder="email"/>
                            <Input type="password" id="password" placeholder="password"/>
                            <Input type="number" id="phoneNumber" placeholder="phoneNumber"/>
                            <select id="gender" className="form-select">
                                <option selected disabled>Select Gender</option>
                                <option value='MALE'>MALE</option>
                                <option value='FMALE'>FEMALE</option>
                            </select>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                boxShadow="rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px"
                                colorScheme="facebook"
                                onClick={openAddModal}>Close</Button>
                            <Button
                                colorScheme="green"
                                boxShadow="rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px"
                                onClick={addTeachers}>Save</Button>
                        </ModalFooter>
                    </Modal>

                </Box>
                <TableContainer
                    mt="1rem"
                    pb=".7rem"
                    borderRadius="15px"
                    boxShadow="rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px">
                    <Table>
                        <TableCaption
                            fontSize="1rem">Teachers</TableCaption>
                        <Thead>
                            <Tr>
                                <Th>T/r</Th>
                                <Th>Last Name</Th>
                                <Th>First Name</Th>
                                <Th>Email</Th>
                                <Th>Phone Number</Th>
                                <Th textAlign="center" colSpan="2">Action</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {teachers.length && teachers.map((item, i) =>
                                <Tr key={i}>
                                    <Td>{i + 1}</Td>
                                    <Td>{item.lastName}</Td>
                                    <Td>{item.firstName}</Td>
                                    <Td>{item.email}</Td>
                                    <Td>{item.phoneNumber}</Td>
                                    <Td>
                                        <Button
                                            onClick={() => {
                                                openEditModal();
                                                setTeacherGetId(item);
                                            }}
                                            colorScheme="yellow"
                                            variant="outline">Edit</Button>
                                    </Td>
                                    <Td>
                                        <Button
                                            onClick={() => {
                                                openDeleteModal();
                                                setTeacherGetId(item);
                                            }}
                                            colorScheme="red"
                                            variant="outline">Delete</Button>
                                    </Td>
                                </Tr>
                            )}
                        </Tbody>
                    </Table>
                </TableContainer>
            </SimpleGrid>

            {/* editUserModal */}
            <Modal isOpen={editModal} centered size="lg">
                <ModalHeader
                    toggle={openEditModal}
                    className="text-dark fs-4 fw-bolder">
                    Editing data of ({teacherGetId.firstName} {teacherGetId.lastName})</ModalHeader>
                <ModalBody className="techer__modal-body">
                    <Input id="firstName" placeholder="firstName"
                           defaultValue={teacherGetId && teacherGetId.firstName}/>
                    <Input id="lastName" placeholder="lastName"
                           defaultValue={teacherGetId && teacherGetId.lastName}/>
                    <Input type="email" id="email" placeholder="email"
                           defaultValue={teacherGetId && teacherGetId.email}/>
                    <Input type="password" id="password" placeholder="password"/>
                    <Input type="number" id="phoneNumber" placeholder="phoneNumber"
                           defaultValue={teacherGetId && teacherGetId.phoneNumber}/>
                    <select className="form-select" id="gender">
                        <option selected disabled>{teacherGetId.gender}</option>
                        <option value="MALE">MALE</option>
                        <option value="FMALE">FEMALE</option>
                    </select>
                </ModalBody>
                <ModalFooter>
                    <Button
                        boxShadow="rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px"
                        colorScheme="facebook"
                        onClick={openEditModal}>Close</Button>
                    <Button
                        colorScheme="green"
                        boxShadow="rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px"
                        onClick={editTeachers}>Save</Button>
                </ModalFooter>
            </Modal>

            {/* deleteUserModal */}
            <Modal isOpen={deleteModal} centered size="lg">
                <ModalHeader
                    toggle={openDeleteModal}
                    className="text-dark fs-4 fw-bolder">
                    Delete data of ({teacherGetId.firstName} {teacherGetId.lastName})</ModalHeader>
                <ModalBody className="text-dark fs-5 fw-medium" style={{letterSpacing: ".5px", lineHeight: "22px"}}>
                You want to delete {teacherGetId.firstName} {teacherGetId.lastName}.
                     Are you sure about that?
                </ModalBody>
                <ModalFooter>
                    <Button
                        boxShadow="rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px"
                        colorScheme="facebook"
                        onClick={openDeleteModal}>Close</Button>
                    <Button
                        colorScheme="red"
                        boxShadow="rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px"
                        onClick={deleteUsers}>Yes</Button>
                </ModalFooter>
            </Modal>
        </>
    );
}

export default AddTeachers;