// Chakra imports
import {Avatar, AvatarGroup, Box, Flex, Icon, Image, Link, Text, useColorModeValue,} from "@chakra-ui/react";
import {api, categoryDelete, categoryEdit, config} from "api/api";
import axios from "axios";
import Card from "components/card/Card.js";
import React, {useEffect, useState} from "react";
import {MdDelete, MdEdit} from "react-icons/md";
// toast
import 'react-toastify/dist/ReactToastify.css';
import {toast, ToastContainer} from "react-toastify";
import {Button, Input, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {getCategory} from "../../api/routers";

export default function NFT(props) {
    const {image, name, author, bidders, categoryIdIn, setCategory} = props;
    const textColor = useColorModeValue("navy.700", "white");
    const textColorBid = useColorModeValue("brand.500", "white");

    // modals
    const [editModal, setEditModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [categoryId, setCategoryId] = useState("");

    const openEditModal = () => setEditModal(!editModal);
    const openDeleteModal = () => setDeleteModal(!deleteModal);

    useEffect(() => {
        getCategory(setCategory)
    }, []);

    // edit category
    const editCategory = () => {
        if (document.getElementById("categoryImg").files[0] != null) {
            const image = new FormData();
            image.append("file", document.getElementById("categoryImg").files[0]);
            axios.post(api + "attachment/upload", image, config)
                .then(res => {
                    axios.put(api + categoryEdit + categoryId.id, {
                        name: document.getElementById("categoryTitle").value,
                        attachmentId: res.data.body,
                        categoryId: 0
                    }, config)
                        .then(() => {
                            openEditModal();
                            getCategory(setCategory);
                            toast.success("Category edited successfully✔");
                        })
                        .catch(() => {
                            toast.error("Something went wrong❓")
                        })
                })
        } else axios.put(api + categoryEdit + categoryId.id, {
            name: document.getElementById("categoryTitle").value,
            attachmentId: 0,
            categoryId: 0
        }, config).then(() => {
            openEditModal();
            getCategory(setCategory);
            toast.success("Category edited successfully✔");
        })
        .catch(() => {
            toast.error("Something went wrong❓")
        })
    }

    // delete category
    const deleteCategory = () => {
        axios.delete(api + categoryDelete + categoryId.id, config)
            .then(() => {
                openDeleteModal();
                toast.success("Category delete successfully✔")
                getCategory(setCategory);
            })
            .catch(() => {
                toast.error("Something went wrong❓")
            })
    }

    return (
        <Card p='20px'>
            <ToastContainer/>
            <Flex direction={{base: "column"}} justify='center'>
                <Box mb={{base: "20px", "2xl": "20px"}} position='relative'>
                    <Image
                        src={image}
                        w={{base: "100%", "3xl": "100%"}}
                        h={{base: "180px", "3xl": "200px"}}
                        borderRadius='20px'
                        objectFit="cover"
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
                                fontWeight='bold'
                                me='14px'>
                                {name}
                            </Text>
                            <Text
                                color='secondaryGray.600'
                                fontSize={{
                                    base: "sm",
                                }}
                                fontWeight='400'
                                me='14px'>
                                {author}
                            </Text>
                        </Flex>
                        <AvatarGroup
                            max={3}
                            color={textColorBid}
                            size='sm'
                            mt={{
                                base: "0px",
                                md: "10px",
                                lg: "0px",
                                xl: "10px",
                                "2xl": "0px",
                            }}
                            fontSize='12px'>
                            {bidders.map((avt, key) => (
                                <Avatar key={key} src={avt}/>
                            ))}
                        </AvatarGroup>
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
                        mt='5px'>

                        {/* edit delete category link */}
                        <Box ms="auto">
                            <Link
                                onClick={() => {
                                    openEditModal();
                                    setCategoryId(categoryIdIn);
                                }}
                                variant='no-hover'
                                ms='0px'
                                me="25px"
                                p='0px !important'>
                                <Icon as={MdEdit} color='secondaryGray.500' h='18px' w='18px'/>
                            </Link>
                            <Link
                                onClick={() => {
                                    openDeleteModal();
                                    setCategoryId(categoryIdIn);
                                }}
                                variant='no-hover'
                                // me='25px'
                                ms='0px'
                                p='0px !important'>
                                <Icon as={MdDelete} color='secondaryGray.500' h='18px' w='18px'/>
                            </Link>
                        </Box>

                        {/* modals */}
                        <Modal isOpen={editModal} centered size="lg" className="group__modals">
                            <ModalHeader toggle={openEditModal} className="group__modal-head">Edit
                                Category</ModalHeader>
                            <ModalBody className="group__modal-body">
                                <Input type="file" id="categoryImg"/>
                                <Input type="text" id="categoryTitle" placeholder="name"/>
                            </ModalBody>
                            <ModalFooter>
                                <Button onClick={openEditModal} color="dark" outline>Back</Button>
                                <Button color="success" outline onClick={editCategory}>Save</Button>
                            </ModalFooter>
                        </Modal>

                        {/* delete modal */}
                        <Modal isOpen={deleteModal} centered className="group__modals">
                            <ModalHeader toggle={openDeleteModal} className="group__modal-head">Delete
                                Category</ModalHeader>
                            <ModalBody className="group__modal-body">
                                <p>Do you want to delete this category?</p>
                            </ModalBody>
                            <ModalFooter>
                                <Button onClick={openDeleteModal} color="dark" outline>Back</Button>
                                <Button color="danger" outline onClick={deleteCategory}>Yes</Button>
                            </ModalFooter>
                        </Modal>
                        {/* <Text fontWeight='700' fontSize='sm' color={textColorBid}>
              Current Bid: {currentbid}
            </Text> */}
                        {/* <Link
              href={download}
              mt={{
                base: "0px",
                md: "10px",
                lg: "0px",
                xl: "10px",
                "2xl": "0px",
              }}>
              <Button
                variant='darkBrand'
                color='white'
                fontSize='sm'
                fontWeight='500'
                borderRadius='70px'
                px='24px'
                py='5px'>
                O'tish
                <Icon icon="mingcute:right-line" />
              </Button>
            </Link> */}
                    </Flex>
                </Flex>
            </Flex>
        </Card>
    );
}
