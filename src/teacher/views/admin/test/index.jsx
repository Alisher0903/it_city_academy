import React, {useEffect, useState} from "react";
import Card from "../../../components/card/Card";
import question from "./question.png";
import {
    Box,
    Flex,
    Icon,
    Image,
    Link,
    SimpleGrid,
    Text,
    useColorModeValue
} from "@chakra-ui/react";
import {MdDelete, MdEdit} from "react-icons/md";
import {Button, Input, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import axios from "axios";
import {api, imgUrl, config, byIdIn} from "api/api";
import "./modal.scss";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer, toast} from "react-toastify";

export default function Overview() {
    const textColor = useColorModeValue("navy.700", "white");

    const [testPlus, setTestPlus] = useState([]);
    const [testPlusId, setTestPlusId] = useState("");
    const [addModal, setAddModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);

    const openAddModal = () => setAddModal(!addModal);
    const openEditModal = () => setEditModal(!editModal);
    const openDeleteModal = () => setDeleteModal(!deleteModal);

    useEffect(() => {
        getTestTeacher();
    }, []);

    // getTest  url: ?page=0&size=100
    const getTestTeacher = () => axios.get(api + "test?page=0&size=100", config).then(res => setTestPlus(res.data.object));

    // addTest
    const addTeacherTest = async () => {
        const img = new FormData();
        img.append('file', byIdIn('attachmentId').files[0]);
        const addData = {
            question: byIdIn("question").value,
            attachmentId: img.get('file') === 'undefined' ? 0 : img.get('file'),
            categoryId: byIdIn("categoryId").value === Number ? byIdIn("categoryId").value : 28,
            answer: "",
            grade: byIdIn("grade").value,
            description: byIdIn("description").value,
            inType: byIdIn("inType").value,
            outType: byIdIn("outType").value,
            countNumber: byIdIn("countNumber").value
        }

        if (img.get('file') !== 'undefined')
            await axios.post(api + "attachment/upload", img, config).then(res => addData.attachmentId = res.data.body)
        await axios.post(api + "test", addData, config)
            .then(() => {
                openAddModal();
                getTestTeacher();
                toast.success("Test muvaffaqiyatli qo'shildi")
            });
    }

    // editTest
    const editTeacherTest = async () => {
        const imgEdit = new FormData();
        imgEdit.append('file', byIdIn('attachmentId').files[0]);
        const editData = {
            question: byIdIn("question").value,
            attachmentId: imgEdit.get('file') === 'undefined' ? 0 : imgEdit.get('file'),
            categoryId: byIdIn("categoryId").value === Number ? byIdIn("categoryId").value : 28,
            answer: "",
            grade: byIdIn("grade").value,
            description: byIdIn("description").value,
            inType: byIdIn("inType").value,
            outType: byIdIn("outType").value,
            countNumber: byIdIn("countNumber").value
        }

        if (imgEdit.get('file') !== 'undefined')
            await axios.post(api + "attachment/upload", imgEdit, config).then(res => editData.attachmentId = res.data.body)
        await axios.put(api + "test/" + testPlusId.id, editData, config)
            .then(() => {
                openEditModal();
                getTestTeacher();
                toast.success("Test muvaffaqiyatli taxrirlandi")
            });
    }

    // deleteTest
    const deleteTeacherTest = () => {
        axios.delete(api + "test/" + testPlusId.id, config)
            .then(() => {
                toast.success("Test o'chirildi");
                openDeleteModal();
                getTestTeacher();
            }).catch(() => {
            toast.error("Xatolik yuz berdi!!!");
        })
    }

    const goPageDetails = () => document.getElementById("detielis").click();

    return (
        <Box pt={{base: "130px", md: "80px", xl: "80px"}}>
            <Link href="/#/Teacher/detielis" id="detielis"></Link>
            <ToastContainer/>
            <Box
                display="flex"
                justifyContent="space-between">
                <Text
                    fontSize='3xl'
                    fontWeight='bold'
                    color={textColor}>
                    Test
                </Text>
                <Button
                    onClick={openAddModal}
                    color="success"
                    className="rounded-5 px-4 me-2 mb-3 addBtn"
                    style={{letterSpacing: "1px"}}>
                    Add Test
                </Button>
            </Box>

            {/* addModal */}
            <Modal centered size="lg" isOpen={addModal}>
                <ModalHeader toggle={openAddModal} className="techer__modal-head">Add Test</ModalHeader>
                <ModalBody className="techer__modal-body">
                    <Input id="attachmentId" type="file"/>
                    <Input id="question" placeholder="question"/>
                    <Input id="description" placeholder="description"/>
                    <Input id="grade" type="number" placeholder="ball"/>
                    <Input id="inType" placeholder="inType"/>
                    <Input id="outType" placeholder="outType"/>
                    <Input id="countNumber" type="number" placeholder="countNumber"/>
                    <select id="categoryId" className="form-select">
                        <option selected disabled>Teacher category</option>
                        {/* {teacherCategory && teacherCategory.map((item, i) =>
              <option key={i} value={item.id}></option>
            )} */}
                    </select>
                </ModalBody>
                <ModalFooter className="techer__modal-footer">
                    <Button onClick={openAddModal}>Close</Button>
                    <Button color="success" onClick={addTeacherTest}>Save</Button>
                </ModalFooter>
            </Modal>
            <SimpleGrid columns={{base: 1, md: 3, xl: 4}} gap='20px'>
                {testPlus && testPlus.map((item, i) =>
                    <Card p='20px' key={i}>
                        <Flex direction={{base: "column"}} justify='center'>
                            <Box mb={{base: "20px", "2xl": "20px"}} position='relative'>
                                <Image
                                    src={item.attachmentId !== 0 ? imgUrl + item.attachmentId : question}
                                    w={{base: "100%", "3xl": "100%"}}
                                    h={{base: "220px", "3xl": "100%"}}
                                    borderRadius='20px'
                                />
                            </Box>
                            <Flex flexDirection='column' justify='space-between' h='100%'>
                                <Flex
                                    justify='space-between'
                                    direction={{
                                        base: "row",
                                        md: "column",
                                        lg: "row",
                                        xl: "column",
                                        "2xl": "row",
                                    }}
                                    mb='auto'>
                                    <Flex direction='column'>
                                        <Text
                                            color={textColor}
                                            fontSize={{
                                                base: "xl",
                                                md: "lg",
                                                lg: "lg",
                                                xl: "lg",
                                                "2xl": "md",
                                                "3xl": "lg",
                                            }}
                                            mb='5px'
                                            fontWeight='bold'>
                                            {item.question}
                                        </Text>
                                        <Box
                                            display="flex"
                                            justifyContent="space-between">
                                            <Text
                                                color={textColor}
                                                fontSize={{
                                                    base: "xl",
                                                    md: "lg",
                                                    lg: "lg",
                                                    xl: "lg",
                                                    "2xl": "md",
                                                    "3xl": "lg",
                                                }}>
                                                Max Ball:
                                            </Text>
                                            <Text
                                                color={textColor}
                                                fontSize={{
                                                    base: "xl",
                                                    md: "lg",
                                                    lg: "lg",
                                                    xl: "lg",
                                                    "2xl": "md",
                                                    "3xl": "lg",
                                                }}
                                                me="5px"
                                                fontWeight='bold'>
                                                {item.grade}
                                            </Text>
                                        </Box>
                                    </Flex>
                                </Flex>
                                <Flex
                                    display="flex"
                                    justify='space-between'
                                    mt='15px'>
                                    <Button
                                        color="success"
                                        outline
                                        className="rounded-5 fw-medium"
                                        onClick={() => {
                                            goPageDetails();
                                            sessionStorage.setItem("details", item.id);
                                        }}>More</Button>
                                    <Box>
                                        <Link
                                            onClick={() => {
                                                openEditModal();
                                                setTestPlusId(item);
                                            }}
                                            variant='no-hover'
                                            me="15px">
                                            <Icon as={MdEdit} color='secondaryGray.500' h='18px' w='18px'/>
                                        </Link>
                                        <Link
                                            onClick={() => {
                                                openDeleteModal();
                                                setTestPlusId(item);
                                            }}
                                            me="1px"
                                            variant='no-hover'>
                                            <Icon as={MdDelete} color='secondaryGray.500' h='18px' w='18px'/>
                                        </Link>
                                    </Box>
                                </Flex>
                            </Flex>
                        </Flex>
                    </Card>
                )}
            </SimpleGrid>

            {/* editModal */}
            <Modal centered size="lg" isOpen={editModal} className="techer__modal-head">
                <ModalHeader toggle={openEditModal}>Edit Test</ModalHeader>
                <ModalBody className="techer__modal-body">
                    <Input id="attachmentId" type="file"/>
                    <Input id="question" defaultValue={testPlusId && testPlusId.question}/>
                    <Input id="description" defaultValue={testPlusId && testPlusId.description}/>
                    <Input id="grade" type="number" defaultValue={testPlusId && testPlusId.grade}/>
                    <Input id="inType" defaultValue={testPlusId && testPlusId.inType}/>
                    <Input id="outType" defaultValue={testPlusId && testPlusId.outType}/>
                    <Input id="countNumber" type="number" defaultValue={testPlusId && testPlusId.countNumber}/>
                    <select id="categoryId" className="form-select">
                        <option selected disabled>Teacher category</option>
                        {/* {teacherCategory && teacherCategory.map((item, i) =>
              <option key={i} value={item.id}></option>
            )} */}
                    </select>
                </ModalBody>
                <ModalFooter className="techer__modal-footer">
                    <Button onClick={openEditModal}>Close</Button>
                    <Button color="warning" onClick={editTeacherTest}>Edit</Button>
                </ModalFooter>
            </Modal>

            {/* deleteModal */}
            <Modal centered size="lg" isOpen={deleteModal}>
                <ModalHeader toggle={openDeleteModal} className="techer__modal-head">Delete Test</ModalHeader>
                <ModalBody className="techer__modal-delete">
                    Siz bu testni o'chirishga ishonchingiz komilmi?
                </ModalBody>
                <ModalFooter className="techer__modal-footer">
                    <Button onClick={openDeleteModal}>Close</Button>
                    <Button color="danger" onClick={deleteTeacherTest}>Delete</Button>
                </ModalFooter>
            </Modal>
        </Box>
    );
}
