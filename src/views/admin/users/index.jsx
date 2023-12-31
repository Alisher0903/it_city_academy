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
import { api, byIdIn, config, setConfig } from "../../../api/api";
import axios from "axios";
import { useEffect, useState } from "react";
import { Input, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from "react-toastify";

function Users() {
    const textColorPrimary = useColorModeValue("secondaryGray.900", "white");

    // state hooks
    const [users, setUsers] = useState([]);
    const [groupSelect, setGroupSelect] = useState([]);
    const [students, setStudent] = useState([]);
    const [addModal, setAddModal] = useState(false);
    const [coinModal, setCoinModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [userGetId, setUserGetId] = useState("");

    useEffect(() => {
        setConfig();
        getUsers();
        getGroupSelect();
    }, []);

    // modals function
    const openAddModal = () => setAddModal(!addModal);
    const openEditModal = () => setEditModal(!editModal);
    const openDeleteModal = () => setDeleteModal(!deleteModal);
    const openCoinModal = () => setCoinModal(!coinModal);

    // getUsers
    const getUsers = () => {
        axios.get(api + "user", config)
            .then(res => setUsers(res.data.body.object))
            .catch(err => console.log(err));
    }

    // getGroupSelect
    const getGroupSelect = () => {
        axios.get(api + "group", config)
            .then(res => setGroupSelect(res.data.body.object))
            .catch(() => {
            });
    }

    // addUser
    const addUsers = () => {
        let addData = {
            firstName: byIdIn("firstName").value,
            lastName: byIdIn("lastName").value,
            email: byIdIn("email").value,
            password: byIdIn("password").value,
            phoneNumber: byIdIn("phoneNumber").value,
            groupId: byIdIn("groupId").value,
            gender: byIdIn("gender").value
        }
        axios.post(api + "auth/register?ROLE=ROLE_USER", addData, config)
            .then(() => {
                openAddModal();
                getUsers();
                toast.success("User successfully added✔");
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
            groupId: byIdIn("groupId").value,
            gender: byIdIn("gender").value
        }
        axios.put(api + "user/update/" + userGetId.id, editData, config)
            .then(() => {
                openEditModal();
                getUsers();
                toast.success("User information has been changed✔");
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
                toast.success("User successfully deleted!!!");
            })
            .catch(() => {
                toast.error("Something went wrong❓")
            })
    }

    function getStudentsInGroup(e) {
        axios.get(api + 'group/students/' + e.target.value, config)
            .then(res => setStudent(res.data.body))
            .catch(err => console.log(err))
        setStudent([]);
    }

    function addCoinInUser() {
        let userId = byIdIn('userId').value;
        let coin = byIdIn('coin').value;
        let description = byIdIn('description').value;
        if (userId !== 'undefined' && coin !== 'undefined' && description !== 'undefined') {
            let giveCoin = new FormData();
            giveCoin.set('id', userId);
            giveCoin.set('coin', coin);
            giveCoin.set('description', description);
            axios.post(api + 'user/give-coin', giveCoin, config)
                .then(() => toast.success('Coin successfully minted✔'))
                .catch(() => {
                    toast.error("Something went wrong❓")
                })
            openCoinModal();
        } else toast.warning('Not all information is filled❗❗');
    }

    return (
        <>
            <ToastContainer />
            <SimpleGrid color={textColorPrimary} pt="100px">
                <Box
                    display="flex"
                    justifyContent="space-between">
                    <Text fontSize="1.5rem" fontWeight="bold" letterSpacing=".5px">Users</Text>
                    <div>
                        <Button
                            onClick={openCoinModal}
                            colorScheme="green" variant="outline" marginRight='20px'
                            boxShadow="rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px">
                            addCoin
                        </Button>
                        <Button
                            onClick={openAddModal}
                            colorScheme="green" variant="outline"
                            boxShadow="rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px">
                            Add Users</Button>
                    </div>
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
                                {/* <Th>Email</Th> */}
                                <Th>Phone Number</Th>
                                <Th textAlign="center" colSpan="2">Action</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {users.length && users.map((item, i) =>
                                <Tr key={i}>
                                    <Td>{i + 1}</Td>
                                    <Td>{item.lastName}</Td>
                                    <Td>{item.firstName}</Td>
                                    {/* <Td>{item.email}</Td> */}
                                    <Td>{item.phoneNumber}</Td>
                                    <Td>
                                        <Button
                                            onClick={() => {
                                                openEditModal();
                                                setUserGetId(item);
                                            }}
                                            colorScheme="yellow"
                                            variant="outline"
                                            boxShadow="rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px">Edit</Button>
                                    </Td>
                                    <Td>
                                        <Button
                                            onClick={() => {
                                                openDeleteModal();
                                                setUserGetId(item);
                                            }}
                                            colorScheme="red"
                                            variant="outline"
                                            boxShadow="rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px">Delete</Button>
                                    </Td>
                                </Tr>
                            )}
                        </Tbody>
                    </Table>
                </TableContainer>
            </SimpleGrid>

            {/* Add coin Modal */}
            <Modal isOpen={coinModal} centered size="lg">
                <ModalHeader toggle={openCoinModal} className="techer__modal-head">Add Coin</ModalHeader>
                <ModalBody className="techer__modal-body">
                    <select id="groupId" className="form-select" onChange={getStudentsInGroup}>
                        <option selected disabled>Select group</option>
                        {groupSelect.length && groupSelect.map((item, i) =>
                            <option key={i} value={item.id}>{item.name}</option>
                        )}
                    </select>
                    <select id="userId" className="form-select">
                        <option selected disabled>Select User</option>
                        {students.length && students.map((item, i) =>
                            <option key={i} value={item.id}>{item.firstName}</option>
                        )}
                    </select>
                    <Input type="number" id="coin" placeholder="number of coins" />
                    <Input id="description" placeholder="description" />
                </ModalBody>
                <ModalFooter>
                    <Button
                        boxShadow="rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px"
                        colorScheme="facebook"
                        onClick={openCoinModal}>Close</Button>
                    <Button
                        colorScheme="green"
                        boxShadow="rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px"
                        onClick={addCoinInUser}>Save</Button>
                </ModalFooter>
            </Modal>

            {/* addUserModal */}
            <Modal isOpen={addModal} centered size="lg">
                <ModalHeader
                    toggle={openAddModal}
                    className="text-dark fs-4 fw-bolder">Add Users</ModalHeader>
                <ModalBody className="techer__modal-body">
                    <Input id="firstName" placeholder="firstName" />
                    <Input id="lastName" placeholder="lastName" />
                    <Input type="email" id="email" placeholder="email" />
                    <Input type="password" id="password" placeholder="password" />
                    <Input type="number" id="phoneNumber" placeholder="phoneNumber" />
                    <select id="groupId" className="form-select">
                        <option selected disabled>groupName</option>
                        {groupSelect.length && groupSelect.map((item, i) =>
                            <option key={i} value={item.id}>{item.name}</option>
                        )}
                    </select>
                    <select className="form-select" id="gender">
                        <option selected disabled>gender select</option>
                        <option value="MALE">Erkak</option>
                        <option value="FMALE">Ayol</option>
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

            {/* editUserModal */}
            <Modal isOpen={editModal} centered size="lg">
                <ModalHeader
                    toggle={openEditModal}
                    className="text-dark fs-4 fw-bolder">
                    Editing data of ({userGetId.firstName} {userGetId.lastName})</ModalHeader>
                <ModalBody className="techer__modal-body">
                    <Input id="firstName" placeholder="firstName"
                        defaultValue={userGetId && userGetId.firstName} />
                    <Input id="lastName" placeholder="lastName"
                        defaultValue={userGetId && userGetId.lastName} />
                    <Input type="email" id="email" placeholder="email"
                        defaultValue={userGetId && userGetId.email} />
                    <Input type="password" id="password" placeholder="password" />
                    <Input type="number" id="phoneNumber" placeholder="phoneNumber"
                        defaultValue={userGetId && userGetId.phoneNumber} />
                    <select id="groupId" className="form-select">
                        <option selected disabled>Group select</option>
                        {groupSelect.length && groupSelect.map((item, i) =>
                            <option key={i} value={item.id} selected={userGetId.groupName === item.name}>{item.name}</option>
                        )}
                    </select>
                    <select className="form-select" id="gender">
                        <option selected disabled>Gender select</option>
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

export default Users;