import { Box, Flex, Icon, Image, Link, Text, useColorModeValue } from "@chakra-ui/react";
import Card from "components/card/Card.js";
import React, { useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { Button, Input, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import "./scss/group.scss";
import axios from "axios";
import { api } from "api/api";
import { useEffect } from "react";
import { config } from "api/api";
import { groupEdit } from "api/api";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify";

export default function Project(props) {

  const { title, ranking, link, image, ...rest } = props;
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const brandColor = useColorModeValue("brand.500", "white");
  const bg = useColorModeValue("white", "navy.700");

  // modals
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [group, setGroup] = useState([]);
  const [category, setCategory] = useState([]);
  const [groupId, setGroupId] = useState("");

  const openEditModal = () => setEditModal(!editModal);
  const openDeleteModal = () => setDeleteModal(!deleteModal);


  useEffect(() => {
    getGroup();
    getCategory();
  }, []);

  // get category
  const getCategory = () => {
    axios.get(api + "category").then(res => setCategory(res.data.body));
  }

  // get group
  function getGroup() {
    axios.get(api + "group?page=0&size=10", config)
      .then(res => {
        setGroup(res.data.body.object)
      })
  }

  // edit group
  const editGroup = () => {
    let categoryId = document.getElementById("groupCategory").value;
    axios.put(api + groupEdit + groupId.id,
      {
        name: document.getElementById("groupName").value,
        categoryId: categoryId,
        teacherId: 0
      }, config)
      .then(() => {
        openEditModal();
        getGroup();
        toast.success("Group muvaffaqiyatli taxrirlandi✔");
      }).catch(() => toast.error("Xatolik yuz berdi. Buning uchun sizdan uzur suraymiz, beni tez orada bartaraf etamiz!!!"))
  }

  return (
    <>
      <ToastContainer />
      {group.length && group.map((item, i) =>
        <Card bg={bg} p='14px' mb="10px">
          <Flex align='center' key={i} direction={{ base: "column", md: "row" }}>
            {/* <Image h='80px' w='80px' src="" borderRadius='8px' me='20px' /> */}
            <Box mt={{ base: "10px", md: "0" }}>
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
                <p className="fw-medium" color={brandColor}>O'qituvchi: Teshayev Ketmon</p>
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
                <Icon as={MdEdit} color='secondaryGray.500' h='18px' w='18px' />
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
                <Icon as={MdDelete} color='secondaryGray.500' h='18px' w='18px' />
              </Link>
            </Box>
          </Flex>
        </Card>
      )}

      {/* edit modal */}
      <Modal isOpen={editModal} centered size="lg" className="group__modals">
        <ModalHeader className="group__modal-head" toggle={openEditModal}>Edit Group</ModalHeader>
        <ModalBody className="group__modal-body">
          {/* <Input id="groupFile" type="file" /> */}
          <Input id="groupName" type="text" defaultValue={groupId && groupId.name} />
          <Input id="groupFIO" defaultValue={groupId && groupId.teacherId} />
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
          <Button color="danger">Ok</Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
