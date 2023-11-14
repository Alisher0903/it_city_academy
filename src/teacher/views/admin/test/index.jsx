import React, { useEffect, useState } from "react";
import Card from "../../../components/card/Card";
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
import { MdDelete, MdEdit } from "react-icons/md";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import axios from "axios";
import { api } from "api/api";
import { imgUrl } from "api/api";

export default function Overview() {
  const textColor = useColorModeValue("navy.700", "white");

  const [testPlus, setTestPlus] = useState([]);
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const openAddModal = () => setAddModal(!addModal);
  const openEditModal = () => setEditModal(!editModal);
  const openDeleteModal = () => setDeleteModal(!deleteModal);

  useEffect(() => {
    getTestTeacher();
  }, []);

  // getTest
  const getTestTeacher = () => axios.get(api + "test").then(res => setTestPlus(res.data.object));

  // console.log(testPlus);

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
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
          className="rounded-5 px-4 me-2 mb-3 fs-5 fw-bolder"
          style={{ letterSpacing: "1px" }}>
          Add Test
        </Button>
      </Box>

      {/* addModal */}
      <Modal centered size="lg" isOpen={addModal}>
        <ModalHeader toggle={openAddModal}>Add Test</ModalHeader>
        <ModalBody>
          add test input
        </ModalBody>
        <ModalFooter>
          <Button onClick={openAddModal}>Close</Button>
          <Button color="success">Save</Button>
        </ModalFooter>
      </Modal>
      <SimpleGrid columns={{ base: 1, md: 3, xl: 4 }} gap='20px'>
        {testPlus && testPlus.map((item, i) =>
          <Card p='20px' key={i}>
            <Flex direction={{ base: "column" }} justify='center'>
              <Box mb={{ base: "20px", "2xl": "20px" }} position='relative'>
                <Image
                  src={imgUrl + item.attachmentId}
                  w={{ base: "100%", "3xl": "100%" }}
                  h={{ base: "220px", "3xl": "100%" }}
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
                    className="rounded-5 fw-medium">More</Button>
                  <Box>
                    <Link
                      onClick={openEditModal}
                      variant='no-hover'
                      me="15px">
                      <Icon as={MdEdit} color='secondaryGray.500' h='18px' w='18px' />
                    </Link>
                    <Link
                      onClick={openDeleteModal}
                      me="1px"
                      variant='no-hover'>
                      <Icon as={MdDelete} color='secondaryGray.500' h='18px' w='18px' />
                    </Link>
                  </Box>
                </Flex>
              </Flex>
            </Flex>
          </Card>
        )}
      </SimpleGrid>

      {/* editModal */}
      <Modal centered size="lg" isOpen={editModal}>
        <ModalHeader toggle={openEditModal}>Edit Test</ModalHeader>
        <ModalBody>
          edit test input
        </ModalBody>
        <ModalFooter>
          <Button onClick={openEditModal}>Close</Button>
          <Button color="warning">Edit</Button>
        </ModalFooter>
      </Modal>

      {/* deleteModal */}
      <Modal centered isOpen={deleteModal}>
        <ModalHeader toggle={openDeleteModal}>Delete Test</ModalHeader>
        <ModalBody>
          Siz bu testni o'chirishga ishonchingiz komilmi?
        </ModalBody>
        <ModalFooter>
          <Button onClick={openDeleteModal}>Close</Button>
          <Button color="danger">Delete</Button>
        </ModalFooter>
      </Modal>
    </Box>
  );
}
