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
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

export default function Project(props) {

  const { title, ranking, link, image, ...rest } = props;
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const brandColor = useColorModeValue("brand.500", "white");
  const bg = useColorModeValue("white", "navy.700");

  // modals
  const [editModal, setEditModal] = useState(false);

  const openEditModal = () => setEditModal(!editModal);

  return (
    <Card bg={bg} {...rest} p='14px'>
      <Flex align='center' direction={{ base: "column", md: "row" }}>
        <Image h='80px' w='80px' src={image} borderRadius='8px' me='20px' />
        <Box mt={{ base: "10px", md: "0" }}>
          <Text
            color={textColorPrimary}
            fontWeight='500'
            fontSize='md'
            mb='4px'>
            {title}
          </Text>
          <Text
            fontWeight='500'
            color={textColorSecondary}
            fontSize='sm'
            me='4px'>
            O'quvchilar soni: {ranking} {" "}
            {/* <Link className="ms-2" fontWeight='500' color={brandColor} href={link} fontSize='sm'> */}
            {/* </Link> */}
            <p className="fw-medium" color={brandColor}>O'qituvchi: Teshayev Ketmon</p>
          </Text>
        </Box>
        <Link
          ms="auto">
          <Link
            onClick={() => {
              openEditModal();
            }}
            href={link}
            variant='no-hover'
            ms='0px'
            me="25px"
            p='0px !important'>
            <Icon as={MdEdit} color='secondaryGray.500' h='18px' w='18px' />
          </Link>
          <Link
            href={link}
            variant='no-hover'
            me='25px'
            ms='0px'
            p='0px !important'>
            <Icon as={MdDelete} color='secondaryGray.500' h='18px' w='18px' />
          </Link>
        </Link>
      </Flex>


      {/* modals */}
      <Modal isOpen={editModal}>
        <ModalHeader toggle={openEditModal}>Group Edit</ModalHeader>
        <ModalBody>
          tcygvhbjkn
        </ModalBody>
        <ModalFooter>
          <Button onClick={openEditModal}>Orqaga</Button>
          <Button color="success">Saqlash</Button>
        </ModalFooter>
      </Modal>
    </Card>
  );
}
