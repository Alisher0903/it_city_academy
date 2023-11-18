import React, {useEffect, useState} from "react";
import {
    Box,
    Flex,
    Icon,
    Image,
    Link,
    Text,
    SimpleGrid,
    Grid,
    useColorModeValue
} from "@chakra-ui/react";
import Card from "../../../components/card/Card";
import {MdDelete, MdEdit} from "react-icons/md";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import categoryImg from "./categoryImg.png";
import axios from "axios";
import {api, config, imgUrl} from "../../../../api/api";
import question from "../test/question.png";

export default function Marketplace() {
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const textColorBrand = useColorModeValue("brand.500", "white");
    const textColor1 = useColorModeValue("navy.700", "white");

    const [teacherCategory, setTeacherCategory] = useState([]);
    const [addModal, setAddModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);

    const openAddModal = () => setAddModal(!addModal);
    const openEditModal = () => setEditModal(!editModal);
    const openDeleteModal = () => setDeleteModal(!deleteModal);

    useEffect(() => {
        getTeacherCategory();
    }, [])

    // getTeacherCategory
    const getTeacherCategory = () => {
        axios.get(api + "category/teacher/by/sub/category", config)
            .then(res => setTeacherCategory(res.data))
    }

    return (
        <Box pt={{base: "180px", md: "80px", xl: "80px"}}>
            <Flex
                mt="10px"
                mb='20px'
                justifyContent='space-between'
                direction={{base: "column", md: "row"}}
                align={{base: "start", md: "center"}}>
                <Text color={textColor} fontSize='2xl' ms='10px' fontWeight='700'>
                    Category
                </Text>
                <Button className="rounded-5 addBtn" color="primary" onClick={openAddModal}>Add Category</Button>
                {/*addModal*/}
                <Modal isOpen={addModal} centered size="lg">
                    <ModalHeader className="techer__modal-head" toggle={openAddModal}>Add Teacher Category</ModalHeader>
                    <ModalBody className="techer__modal-body">
                        addModal
                    </ModalBody>
                    <ModalFooter className="techer__modal-footer">
                        <Button color="dark" onClick={openAddModal}>Close</Button>
                        <Button color="success">Save</Button>
                    </ModalFooter>
                </Modal>
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
                                    src={item.attachment !== null ? imgUrl + item.attachment : categoryImg}
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
                                                // setCategoryId(categoryIdIn);
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
                                                // setCategoryId(categoryIdIn);
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

                {/*editModal*/}
                <Modal isOpen={editModal} centered size="lg">
                    <ModalHeader className="techer__modal-head" toggle={openAddModal}>Edit Teacher Category</ModalHeader>
                    <ModalBody className="techer__modal-body">
                        editModal
                    </ModalBody>
                    <ModalFooter className="techer__modal-footer">
                        <Button color="dark" onClick={openEditModal}>Close</Button>
                        <Button color="success">Save</Button>
                    </ModalFooter>
                </Modal>

                {/*deleteModal*/}
                <Modal isOpen={deleteModal} centered>
                    <ModalHeader className="techer__modal-head" toggle={openDeleteModal}>Delete Teacher Category</ModalHeader>
                    <ModalBody className="techer__modal-delete">
                        deleteModal
                    </ModalBody>
                    <ModalFooter className="techer__modal-footer">
                        <Button color="dark" onClick={openDeleteModal}>Close</Button>
                        <Button color="success">Save</Button>
                    </ModalFooter>
                </Modal>
            </SimpleGrid>
        </Box>
    );
}
