import React, {useEffect, useState} from "react";
import {Box, Flex, Icon, Image, Link, SimpleGrid, Text, useColorModeValue} from "@chakra-ui/react";
import Card from "../../../components/card/Card";
import {MdDelete, MdEdit} from "react-icons/md";
import axios from "axios";
import {api, byIdIn, config, imgUrl} from "../../../../api/api";
import 'react-toastify/dist/ReactToastify.css';
import {toast, ToastContainer} from "react-toastify";
import questionImages from "../test/question.png";
import {Button, Input, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";

export default function Marketplace() {
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const textColorBrand = useColorModeValue("brand.500", "white");
    const textColor1 = useColorModeValue("navy.700", "white");

    const [teacherCategory, setTeacherCategory] = useState([]);
    const [teacherCategorySelect, setTeacherCategorySelect] = useState([]);
    const [addModal, setAddModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [teacherCategoryId, setTeacherCategoryId] = useState("");

    const openAddModal = () => setAddModal(!addModal);
    const openEditModal = () => setEditModal(!editModal);
    const openDeleteModal = () => setDeleteModal(!deleteModal);

    useEffect(() => {
        getTeacherCategory();
        getTeacherCategoryId();
    }, [])

    // getTeacherCategory
    const getTeacherCategory = () => {
        axios.get(api + "category/teacher/by/sub/category", config)
            .then(res => setTeacherCategory(res.data))
            .catch(() => toast.error("Hozirda teacher category mavjud emas!!!"));
    }

    // getTeacherCategoryId
    const getTeacherCategoryId = () => {
        axios.get(api + "category/teacher/by/category", config)
            .then(res => setTeacherCategorySelect(res.data.body))
            .catch(() => {
            })
    }

    // add
    const addTeacherCategory = async () => {
        const img = new FormData();
        img.append('file', byIdIn('attachmentId').files[0]);
        const addData = {
            attachmentId: 0,
            name: byIdIn("name").value,
            categoryId: byIdIn("categoryId").value,
            programmingLanguage: byIdIn("programmingLanguage").value
        }

        if (img.get('file') !== 'undefined')
            await axios.post(api + "attachment/upload", img, config)
                .then(res => {
                    addData.attachmentId = res.data.body
                })
                .catch(() => {
                })
        await axios.post(api + "category/save", addData, config)
            .then(() => {
                openAddModal();
                getTeacherCategory();
                toast.success("Category muvaffaqiyatli qo'shildi")
            }).catch(err => {
                if (err.response.status === 409) toast.warning(err.response.data.message)
            })
    }

    // edit
    const editTeacherCategory = async () => {
        const img = new FormData();
        img.append('file', byIdIn('attachmentId').files[0]);
        const editData = {
            attachmentId: 0,
            name: byIdIn("name").value,
            categoryId: byIdIn("categoryId").value,
            programmingLanguage: byIdIn("programmingLanguage").value
        }

        if (img.get('file') !== 'undefined')
            await axios.post(api + "attachment/upload", img, config)
                .then(res => {
                    editData.attachmentId = res.data.body
                })
                .catch(() => {
                })

        await axios.put(api + "category/update/" + teacherCategoryId.id, editData, config)
            .then(() => {
                openEditModal();
                getTeacherCategory();
                toast.success("Category muvaffaqiyatli qo'shildi")
            })
            .catch(() => {
            });
    }

    // delete
    const deleteTeacherCategory = () => {
        axios.delete(api + "category/active/" + teacherCategoryId.id, config)
            .then(() => {
                openDeleteModal();
                getTeacherCategory();
                toast.success("Category o'chirib tashlandi!!!");
            })
            .catch(() => {
                toast.error("Something is error!")
            })
    }

    const checkPL = (pl) => teacherCategoryId && pl === teacherCategoryId.programmingLanguage;

    return (
        <Box pt={{base: "180px", md: "80px", xl: "80px"}}>
            <ToastContainer/>
            <Flex
                mt="10px"
                mb='20px'
                justifyContent='space-between'
                direction={{base: "column", md: "row"}}
                align={{base: "start", md: "center"}}>
                {/*<Text color={textColor} fontSize='2xl' ms='10px' fontWeight='700'>*/}
                {/*    Category*/}
                {/*</Text>*/}
                {/*<Button className="rounded-5 addBtn" color="primary" onClick={openAddModal}>Add Category</Button>*/}
                <Text color={textColor} fontSize='2xl' ms='10px' fontWeight='700'>Category</Text>
                <Button className="rounded-5 addBtn" color="primary" onClick={openAddModal}>Add Category</Button>

            </Flex>
            <SimpleGrid columns={{base: 1, md: 3, xl: 4}} gap='20px'>
                {teacherCategory.length && teacherCategory.map((item, i) =>
                    <Card
                        key={i}
                        boxShadow="rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;"
                        p='20px'>
                        <Flex direction={{base: "column"}} justify='center'>
                            <Box mb={{base: "20px", "2xl": "20px"}} position='relative'>
                                <Image
                                    objectFit="cover"
                                    src={item.attachment !== null && item.attachment !== 0
                                        ? imgUrl + item.attachment.id
                                        : questionImages}
                                    alt="img"
                                    w="100%"
                                    h="180px"
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
                                            color={textColor1}
                                            fontSize={{
                                                base: "xl",
                                                md: "lg",
                                                lg: "lg",
                                                xl: "lg",
                                                "2xl": "md",
                                                "3xl": "lg",
                                            }}
                                            mb='5px'
                                            fontWeight='bold'
                                            me='14px'>
                                            {item.name}
                                        </Text>
                                    </Flex>
                                </Flex>
                                <Flex
                                    align='start'
                                    justify='space-between'
                                    direction={{
                                        base: "row",
                                        md: "column",
                                        lg: "row",
                                        xl: "column",
                                        "2xl": "row",
                                    }}
                                    mt='25px'>
                                    <Box ms="auto">
                                        <Link
                                            onClick={() => {
                                                openEditModal();
                                                setTeacherCategoryId(item);
                                            }}
                                            variant='no-hover'
                                            ms='0px'
                                            me="20px"
                                            p='0px !important'>
                                            <Icon as={MdEdit} color='secondaryGray.500' h='18px' w='18px'/>
                                        </Link>
                                        <Link
                                            onClick={() => {
                                                openDeleteModal();
                                                setTeacherCategoryId(item);
                                            }}
                                            variant='no-hover'
                                            ms='0px'
                                            p='0px !important'>
                                            <Icon as={MdDelete} color='secondaryGray.500' h='18px' w='18px'/>
                                        </Link>
                                    </Box>
                                </Flex>
                            </Flex>
                        </Flex>
                    </Card>
                )}

                {/*addModal*/}
                <Modal isOpen={addModal} centered size="lg">
                    <ModalHeader className="techer__modal-head" toggle={openAddModal}>Add Teacher Category</ModalHeader>
                    <ModalBody className="techer__modal-body">
                        <Input id="attachmentId" type="file"/>
                        <Input id="name" placeholder="Name"/>
                        <select id="programmingLanguage" className="form-select">
                            <option value="0" selected disabled>Programming Language</option>
                            <option value="JAVA">Java</option>
                            <option value="JAVA_SCRIPT">JavaScript</option>
                            <option value="CPP">C++</option>
                            <option value="PYTHON">Python</option>
                        </select>
                        <select id="categoryId" className="form-select">
                            <option selected disabled>Category Select</option>
                            {teacherCategorySelect && teacherCategorySelect.map((item, i) =>
                                <option key={i} value={item.id}>{item.name}</option>
                            )}
                        </select>
                    </ModalBody>
                    <ModalFooter className="techer__modal-footer">
                        <Button color="dark" onClick={openAddModal}>Close</Button>
                        <Button color="success" onClick={addTeacherCategory}>Save</Button>
                    </ModalFooter>
                </Modal>

                {/*editModal*/}
                <Modal isOpen={editModal} centered size="lg">
                    <ModalHeader className="techer__modal-head" toggle={openEditModal}>Edit category</ModalHeader>
                    <ModalBody className="techer__modal-body">
                        <Input id="attachmentId" type="file"/>
                        <Input id="name" defaultValue={teacherCategoryId && teacherCategoryId.name}/>
                        <select id="programmingLanguage" className="form-select">
                            <option value="0" disabled>Programming Language</option>
                            <option value="JAVA" selected={checkPL('JAVA')}>Java</option>
                            <option value="JAVA_SCRIPT" selected={checkPL('JAVA_SCRIPT')}>JavaScript</option>
                            <option value="CPP" selected={checkPL('CPP')}>C++</option>
                            <option value="PYTHON" selected={checkPL('PYTHON')}>Python</option>
                        </select>
                        <select id="categoryId" className="form-select">
                            <option disabled>Category Select</option>
                            {teacherCategorySelect && teacherCategorySelect.map((item, i) =>
                                <option key={i} value={item.id}
                                        selected={teacherCategoryId && item.name === teacherCategoryId.name}>{item.name}</option>
                            )}
                        </select>
                    </ModalBody>
                    <ModalFooter className="techer__modal-footer">
                        <Button color="dark" onClick={openEditModal}>Close</Button>
                        <Button color="warning" onClick={editTeacherCategory}>Save</Button>
                    </ModalFooter>
                </Modal>

                {/*deleteModal*/}
                <Modal isOpen={deleteModal} centered>
                    <ModalHeader className="techer__modal-head" toggle={openDeleteModal}>Delete category
                        data</ModalHeader>
                    <ModalBody
                        className="text-dark fs-5 fw-medium"
                        style={{letterSpacing: ".5px", lineHeight: "22px", fontFamily: "'Fira Sans', sans-serif"}}>
                        Siz bu ({teacherCategoryId.name}) categoryni o'chirib tashlamoqchimisiz?
                    </ModalBody>
                    <ModalFooter className="techer__modal-footer">
                        <Button color="dark" onClick={openDeleteModal}>Close</Button>
                        <Button color="danger" onClick={deleteTeacherCategory}>Yes</Button>
                    </ModalFooter>
                </Modal>
            </SimpleGrid>
        </Box>
    );
}
