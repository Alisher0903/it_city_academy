// Chakra imports
import {
  Box,
  Flex,
  Icon,
  Image,
  Link,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
import React, { useState } from "react";
// Assets
import { MdDelete, MdEdit } from "react-icons/md";
import { Button, Input, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import "./scss/group.scss";
import axios from "axios";
import { api } from "api/api";
import { useEffect } from "react";
import { config } from "api/api";

export default function Project(props) {

  const { title, ranking, link, image, ...rest } = props;
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const brandColor = useColorModeValue("brand.500", "white");
  const bg = useColorModeValue("white", "navy.700");

  // modals
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const openEditModal = () => setEditModal(!editModal);
  const openDeleteModal = () => setDeleteModal(!deleteModal);
  const [group, setGroup] = useState([]);


  useEffect(() => {
    getGroup();
  }, []);

  function getGroup() {
    axios.get(api + "group", config)
      .then(res => {
        setGroup(res.data)
      })
      .catch(err => console.log(err))
  }

  return (
    <>
    {group.length && group.map((item, i) => {
    <Card bg={bg} key={i} p='14px'>
      <Flex align='center' direction={{ base: "column", md: "row" }}>
        <Image h='80px' w='80px' src="" borderRadius='8px' me='20px' />
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
            O'quvchilar soni: 12 {" "}
            <p className="fw-medium" color={brandColor}>O'qituvchi: Teshayev Ketmon</p>
          </Text>
        </Box>
        <Box ms="auto">
          <Link
            onClick={() => {
              openEditModal();
            }}
            href=""
            variant='no-hover'
            ms='0px'
            me="25px"
            p='0px !important'>
            <Icon as={MdEdit} color='secondaryGray.500' h='18px' w='18px' />
          </Link>
          <Link
            onClick={() => {
              openDeleteModal();
            }}
            href=""
            variant='no-hover'
            me='25px'
            ms='0px'
            p='0px !important'>
            <Icon as={MdDelete} color='secondaryGray.500' h='18px' w='18px' />
          </Link>
        </Box>
      </Flex>

      {/* modals */}
      <Modal isOpen={editModal} centered size="lg" className="group__modals">
        <ModalHeader toggle={openEditModal} className="group__modal-head">Group Edit</ModalHeader>
        <ModalBody className="group__modal-body">
          <Input type="file" />
          <Input type="number" placeholder="O'quvchilar soni" />
          <Input type="text" placeholder="O'qituvchi: FIO" />
        </ModalBody>
        <ModalFooter>
          <Button onClick={openEditModal} color="dark">Orqaga</Button>
          <Button color="success">Saqlash</Button>
        </ModalFooter>
      </Modal>

      {/* delete modal */}
      <Modal isOpen={deleteModal} centered className="group__modals">
        <ModalHeader toggle={openDeleteModal} className="group__modal-head">Group Delete</ModalHeader>
        <ModalBody className="group__modal-body">
          <p>Bu guruhni o'chirmoqchimisiz?</p>
        </ModalBody>
        <ModalFooter>
          <Button onClick={openDeleteModal} color="dark">Orqaga</Button>
          <Button color="danger">Ha</Button>
        </ModalFooter>
      </Modal>

    </Card>
    } )}
    </>


  );
}
