import { Text, useColorModeValue } from "@chakra-ui/react";
import Project1 from "assets/img/profile/Project1.png";
import Card from "components/card/Card.js";
import React, { useEffect, useState } from "react";
import Project from "./Project";
import { Button, Input, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import axios from "axios";
import { api } from "api/api";

export default function Projects(props) {

  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );

  const [addModal, setAddModal] = useState(false);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    getCategory();
  }, []);

  const openAddModal = () => setAddModal(!addModal);

  // get category
  const getCategory = () => {
    axios.get(api + "category").then(res => setCategory(res.data.body))
  }

  return (
    <Card mb={{ base: "0px", "2xl": "20px" }}>
      <Text
        display="flex"
        justifyContent="space-between"
        color={textColorPrimary}
        fontWeight='bold'
        fontSize='2xl'
        mt='10px'
        mb='10px'>
        <span>Group</span>
        <Button onClick={openAddModal} className="rounded-5 px-5 py-2 fw-medium fs-6" color="primary">Add Group</Button>
      </Text>

      {/* add modal */}
      <Modal isOpen={addModal} centered size="lg" className="group__modals">
        <ModalHeader toggle={openAddModal} className="group__modal-head">Add Group</ModalHeader>
        <ModalBody className="group__modal-body">
          {/* <Input id="groupFile" type="file" /> */}
          <Input id="groupName" type="number" placeholder="Group name" />
          <Input id="groupFIO" type="text" placeholder="Teacher: FIO" />
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
          <Button color="dark" onClick={openAddModal} outline>Close</Button>
          <Button color="success" outline>Save</Button>
        </ModalFooter>
      </Modal>

      <Project
        boxShadow={cardShadow}
        mb='20px'
        image={Project1}
      // ranking='10'
      // title='Front End'
      />

    </Card>
  );
}
