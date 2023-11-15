import { Box, Icon, SimpleGrid, Text, useColorModeValue } from "@chakra-ui/react";
import Card from "../../../components/card/Card";
import React, { useState } from "react";
import { Button, Input, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import "../test/modal.scss";
import { MdDelete, MdEdit } from "react-icons/md";
import axios from "axios";
import { config, byIdIn, api } from "api/api";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Overview() {

  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );
  const bg = useColorModeValue("white", "navy.700");

  const [testAnswerId, setTestAnswerId] = useState("");
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const openAddModal = () => setAddModal(!addModal);
  const openEditModal = () => setEditModal(!editModal);
  const openDeleteModal = () => setDeleteModal(!deleteModal);

  // add
  const addTestAnswer = () => {
    const addData = {
      testId: byIdIn("testId").value == Number ? byIdIn("testId").value : 10,
      answer: byIdIn("answer").value,
      result: byIdIn("result").value
    }
    axios.post(api + "test-answer", addData, config)
      .then(() => {
        openAddModal();
        toast.success("successfully saved!")
      })
    // .catch(console.log(addData))
  }

  // edit vs delete larga urldan kn "testAnswerId.id" ni quyish kk

  // edit
  const editTestAnswer = () => {
    const editData = {
      testId: byIdIn("testId").value == Number ? byIdIn("testId").value : 10,
      answer: byIdIn("answer").value,
      result: byIdIn("result").value
    }
    axios.put(api + "test-answer", editData, config)
      .then(() => {
        openAddModal();
        toast.success("successfully saved edit!")
      })
      // .catch(console.log(editData))
  }

  // delete
  const deleteTestAnswer = () => {
    axios.delete(api + "test-answer", config)
      .then(() => {
        openDeleteModal();
        toast.success("delete seved!");
      })
  }

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <ToastContainer />
      <Card>
        <Text
          display="flex"
          justifyContent="space-between"
          color={textColorPrimary}
          fontWeight='bold'
          fontSize='2xl'
          mt='10px'
          mb='4px'>
          Test Answer
          <Button
            onClick={openAddModal}
            className="rounded-5 py-2 px-3 answerAddBtn"
            color="primary">Add TestAnswer</Button>
        </Text>

        {/* addModal */}
        <Modal centered size="lg" isOpen={addModal}>
          <ModalHeader toggle={openAddModal} className="techer__modal-head">Add TestAnswer</ModalHeader>
          <ModalBody className="techer__modal-body">
            <Input id="answer" placeholder="answer" />
            <Input id="result" placeholder="result" />
            <select id="testId" className="form-select">
              <option selected disabled>TestId select</option>
              {/* {teacherCategory && teacherCategory.map((item, i) =>
              <option key={i} value={item.id}></option>
            )} */}
            </select>
          </ModalBody>
          <ModalFooter className="techer__modal-footer">
            <Button onClick={openAddModal}>Close</Button>
            <Button color="success" onClick={addTestAnswer}>Save</Button>
          </ModalFooter>
        </Modal>

        <Text className="testCategoryBtn" color={textColorSecondary} fontSize='md'>
          <Button color="success">TestId categores btn</Button>
        </Text>
        <SimpleGrid columns='2' gap="20px">
          <Box
            display="flex"
            justifyContent="space-between"
            boxShadow={cardShadow}
            bg={bg}
            p="20px"
            borderRadius="20px">
            <Box>
              <Text color={textColorSecondary} fontWeight='500' fontSize='md'>
                name
              </Text>
              <Text color={textColorPrimary} fontWeight='500' fontSize='md'>
                description
              </Text>
            </Box>
            <Box display="flex" flexDirection="column" gap="7px">
              <Icon
                onClick={() => {
                  openEditModal();
                  // setTestAnswerId(item);
                }}
                as={MdEdit}
                color='secondaryGray.500'
                style={{ cursor: "pointer" }}
                h='18px' w='18px' />
              <Icon
                onClick={() => {
                  openDeleteModal();
                  // setTestAnswerId(item);
                }}
                as={MdDelete}
                color='secondaryGray.500'
                style={{ cursor: "pointer" }}
                h='18px' w='18px' />
            </Box>
          </Box>

          {/* editModal */}
          <Modal centered size="lg" isOpen={editModal} className="techer__modal-head">
            <ModalHeader toggle={openEditModal}>Edit TestAnswer</ModalHeader>
            <ModalBody className="techer__modal-body">
              <Input id="answer" placeholder="answer" />
              <Input id="result" placeholder="result" />
              <select id="testId" className="form-select">
                <option selected disabled>TestId select</option>
                {/* {teacherCategory && teacherCategory.map((item, i) =>
              <option key={i} value={item.id}></option>
            )} */}
              </select>
            </ModalBody>
            <ModalFooter className="techer__modal-footer">
              <Button onClick={openEditModal}>Close</Button>
              <Button color="warning" onClick={editTestAnswer}>Edit</Button>
            </ModalFooter>
          </Modal>

          {/* deleteModal */}
          <Modal centered size="lg" isOpen={deleteModal}>
            <ModalHeader toggle={openDeleteModal} className="techer__modal-head">Delete TestAnswer</ModalHeader>
            <ModalBody className="techer__modal-delete">
              Siz bu testAnswerni o'chirishga ishonchingiz komilmi?
            </ModalBody>
            <ModalFooter className="techer__modal-footer">
              <Button onClick={openDeleteModal}>Close</Button>
              <Button color="danger" onClick={deleteTestAnswer}>Delete</Button>
            </ModalFooter>
          </Modal>
        </SimpleGrid>
      </Card>
    </Box>
  );
}
