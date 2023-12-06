import {
    SimpleGrid,
    useColorModeValue,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Box,
    Text,
    Button,
} from "@chakra-ui/react";
import {config, api} from "api/api";
import axios from "axios";
import {useEffect, useState} from "react";
import {Input, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer, toast} from "react-toastify";
import {byIdIn} from "api/api";

function AdminAdd() {
    const textColorPrimary = useColorModeValue("secondaryGray.900", "white");

    // state hooks
    const [users, setUsers] = useState([]);
    const [groupSelect, setGroupSelect] = useState([]);
    const [addModal, setAddModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [userGetId, setUserGetId] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        getUsers();
    }, []);

    // modals function
    const openAddModal = () => setAddModal(!addModal);
    const openEditModal = () => setEditModal(!editModal);
    const openDeleteModal = () => setDeleteModal(!deleteModal);

    // getUsers
    const getUsers = () => {
        axios.get(api + "user/super-admin", config)
            .then(res => setUsers(res.data.body))
            .catch(err => console.log(err));
    }

    // addUser
    const addUsers = () => {
        let addData = {
            firstName: byIdIn("firstName").value,
            lastName: byIdIn("lastName").value,
            email: byIdIn("email").value,
            password: byIdIn("password").value,
            phoneNumber: byIdIn("phoneNumber").value,
            groupId: 0,
            gender: byIdIn("gender").value
        }
        axios.post(api + "auth/register?ROLE=ROLE_SUPER_ADMIN", addData, config)
            .then(() => {
                openAddModal();
                getUsers();
                toast.success("Admin successfully added✔");
            })
            .catch(() => {
                toast.error("Something went wrong❓")
            })
    }

    // editUser
    const editUsers = () => {
        let editData = {
            firstName: byIdIn("firstName").value,
            lastName: byIdIn("lastName").value,
            email: byIdIn("email").value,
            password: byIdIn("password").value,
            phoneNumber: byIdIn("phoneNumber").value,
            groupId: 0,
            gender: byIdIn("gender").value
        }
        axios.put(api + "user/update/" + userGetId.id, editData, config)
            .then(() => {
                openEditModal();
                getUsers();
                toast.success("Admin successfully edited✔");
            })
            .catch(() => {
                toast.error("Something went wrong❓")
            })
    }

    // deleteUser
    const deleteUsers = () => {
        axios.delete(api + "user/" + userGetId.id, config)
            .then(() => {
                openDeleteModal();
                getUsers();
                toast.success("Admin successfully deleted");
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
                    <Text fontSize="1.5rem" fontWeight="bold" letterSpacing=".5px">Admin</Text>
                    <Button
                        onClick={openAddModal}
                        colorScheme="green" variant="outline"
                        boxShadow="rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px">
                        Add Admin</Button>

                    {/* addUserModal */}
                    <Modal isOpen={addModal} centered size="lg">
                        <ModalHeader
                            toggle={openAddModal}
                            className="text-dark fs-4 fw-bolder">Add Admin</ModalHeader>
                        <ModalBody className="techer__modal-body">
                            <Input id="firstName" placeholder="firstName"/>
                            <Input id="lastName" placeholder="lastName"/>
                            <Input type="email" id="email" placeholder="email"/>
                            <Input type="password" id="password" placeholder="password"/>
                            <Input type="number" id="phoneNumber" placeholder="phoneNumber"/>
                            <select className="form-select" id="gender">
                                <option selected disabled>gender select</option>
                                <option value="MALE">Erkak</option>
                                <option value="FEMALE">Ayol</option>
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
                                onClick={addUsers}>Save</Button>
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
                            fontSize="1rem">Users</TableCaption>
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
                            {users ?
                                users.map((item, i) =>
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
                                                    setUserGetId(item);
                                                }}
                                                colorScheme="yellow"
                                                variant="outline">Edit</Button>
                                        </Td>
                                        <Td>
                                            <Button
                                                onClick={() => {
                                                    openDeleteModal();
                                                    setUserGetId(item);
                                                }}
                                                colorScheme="red"
                                                variant="outline">Delete</Button>
                                        </Td>
                                    </Tr>
                                ) :
                                <Tr><Td colSpan="6" className="text-center">No super admins</Td></Tr>
                            }
                        </Tbody>
                    </Table>
                </TableContainer>
            </SimpleGrid>

            {/* editUserModal */}
            <Modal isOpen={editModal} centered size="lg">
                <ModalHeader
                    toggle={openEditModal}
                    className="text-dark fs-4 fw-bolder">
                    Editing data of ({userGetId.firstName} {userGetId.lastName})</ModalHeader>
                <ModalBody className="techer__modal-body">
                    <Input
                        id="firstName" placeholder="firstName" defaultValue={userGetId && userGetId.firstName}/>
                    <Input
                        id="lastName" placeholder="lastName" defaultValue={userGetId && userGetId.lastName}/>
                    <Input
                        type="email" id="email" placeholder="email" defaultValue={userGetId && userGetId.email}/>
                    <Input
                        type="password" id="password" placeholder="password1"/>
                    <Input
                        type="number" id="phoneNumber" placeholder="phoneNumber" defaultValue={userGetId && userGetId.phoneNumber}/>
                    <select className="form-select" id="gender">
                        <option selected disabled>gender select</option>
                        <option value="MALE" selected={userGetId.gender === 'MALE'}>Erkak</option>
                        <option value="FEMALE" selected={userGetId.gender === 'FEMALE'}>Ayol</option>
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
                        onClick={editUsers}>Save</Button>
                </ModalFooter>
            </Modal>

            {/* deleteUserModal */}
            <Modal isOpen={deleteModal} centered size="lg">
                <ModalHeader
                    toggle={openDeleteModal}
                    className="text-dark fs-4 fw-bolder">
                    Delete data of ({userGetId.firstName} {userGetId.lastName})</ModalHeader>
                <ModalBody className="techer__modal-delete">
                    You want to delete {userGetId.firstName} {userGetId.lastName}.
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

export default AdminAdd;