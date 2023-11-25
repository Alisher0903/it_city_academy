import {Box, Flex, Icon, Link, Text, useColorModeValue} from "@chakra-ui/react";
import Card from "components/card/Card.js";
import React, {useEffect, useState} from "react";
import {MdDelete, MdEdit} from "react-icons/md";
import {Button, Input, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import "./scss/group.scss";
import axios from "axios";
import {api, config, groupDelete, groupEdit} from "api/api";
import 'react-toastify/dist/ReactToastify.css';
import {toast, ToastContainer} from "react-toastify";
import {getCategory, getGroup, getTeacher} from "../../../../api/routers";

export default function Project(props) {

    const {title, ranking, link, image, group, setGroup, ...rest} = props;
    const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
    const textColorSecondary = "gray.400";
    const brandColor = useColorModeValue("brand.500", "white");
    const bg = useColorModeValue("white", "navy.700");

    // modals
    const [editModal, setEditModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [category, setCategory] = useState([]);
    const [teacherId, setTeacherId] = useState([]);
    const [groupId, setGroupId] = useState("");

    const openEditModal = () => setEditModal(!editModal);
    const openDeleteModal = () => setDeleteModal(!deleteModal);


    useEffect(() => {
        getGroup(setGroup);
        getCategory(setCategory);
        getTeacher(setTeacherId);
    }, []);

    // edit group
    const editGroup = () => {
        axios.put(api + groupEdit + groupId.id,
            {
                name: document.getElementById("groupName").value,
                teacherId: document.getElementById("groupTeacher").value,
                categoryId: document.getElementById("groupCategory").value
            }, config)
            .then(() => {
                openEditModal();
                getGroup(setGroup);
                toast.success("Group muvaffaqiyatli taxrirlandi✔");
            }).catch(() => toast.error("Xatolik yuz berdi. Buning uchun sizdan uzur suraymiz, beni tez orada bartaraf etamiz!!!"))
    }

    // delete group
    const deleteGroup = () => {
        axios.delete(api + groupDelete + groupId.id, config)
            .then(() => {
                openDeleteModal();
                getGroup(setGroup);
                toast.success("Group muvaffaqiyatli o'chirildi❌");
            })
    }


    return (
        <>
            <ToastContainer/>
            {group.length && group.map((item, i) =>
                <Card bg={bg} p='14px' mb="10px">
                    <Flex align='center' key={i} direction={{base: "column", md: "row"}}>
                        {/* <Image h='80px' w='80px' src="" borderRadius='8px' me='20px' /> */}
                        <Box mt={{base: "10px", md: "0"}}>
                            <Text
                                color={textColorPrimary}
                                fontWeight='500'
                                fontSize='md'
                                mb='4px'>
                                {item.name}
                            </Text>
                            <Text
                                fontWeight='500'
                                color={textColorSecondary}
                                fontSize='sm'
                                me='4px'>
                                <p className="fw-medium" color={brandColor}>O'qituvchi: {item.teacher}</p>
                            </Text>
                        </Box>
                        <Box ms="auto">
                            <Link
                                onClick={() => {
                                    openEditModal();
                                    setGroupId(item);
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
                                    setGroupId(item);
                                }}
                                variant='no-hover'
                                me='25px'
                                ms='0px'
                                p='0px !important'>
                                <Icon as={MdDelete} color='secondaryGray.500' h='18px' w='18px'/>
                            </Link>
                        </Box>
                    </Flex>
                </Card>
            )}

            {/* edit modal */}
            <Modal isOpen={editModal} centered size="lg" className="group__modals">
                <ModalHeader className="group__modal-head" toggle={openEditModal}>Edit Group</ModalHeader>
                <ModalBody className="group__modal-body">
                    <Input id="groupName" type="text" defaultValue={groupId && groupId.name}/>
                    <select className="form-select mb-3" id="groupTeacher">
                        <option selected disabled>Teacher name</option>
                        {x
                            teacherId.map((item, i) =>
                                <option key={i} value={item.id}>{item.lastName} {item.firstName}</option>
                            )
                        }
                    </select>
                    <select className="form-select" id="groupCategory">
                        <option selected disabled>Category</option>
                        {
                            category.map((item, i) =>
                                <option key={i} value={item.id}>{item.name}</option>
                            )
                        }
                    </select>
                </ModalBody>
                <ModalFooter>
                    <Button color="dark" onClick={openEditModal} outline>Close</Button>
                    <Button color="success" outline onClick={editGroup}>Save</Button>
                </ModalFooter>
            </Modal>

            {/* delete modal */}
            <Modal isOpen={deleteModal} centered className="group__modals">
                <ModalHeader toggle={openDeleteModal} className="group__modal-head">Delete Group</ModalHeader>
                <ModalBody className="group__modal-body">
                    <p>Bu guruhni o'chirmoqchimisiz?</p>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={openDeleteModal} color="dark">Close</Button>
                    <Button color="danger" onClick={deleteGroup}>Ok</Button>
                </ModalFooter>
            </Modal>
        </>
    );
}
