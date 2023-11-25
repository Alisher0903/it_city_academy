import {Text, useColorModeValue} from "@chakra-ui/react";
import Project1 from "assets/img/profile/Project1.png";
import Card from "components/card/Card.js";
import React, {useEffect, useState} from "react";
import Project from "./Project";
import {Button, Input, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import axios from "axios";
import {api, config, groupAdd} from "api/api";

// toast
import 'react-toastify/dist/ReactToastify.css';
import {toast, ToastContainer} from "react-toastify";
import {getCategory, getGroup, getTeacher} from "../../../../api/routers";

export default function Projects() {

    const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
    const textColorSecondary = "gray.400";
    const cardShadow = useColorModeValue(
        "0px 18px 40px rgba(112, 144, 176, 0.12)",
        "unset"
    );

    const [addModal, setAddModal] = useState(false);
    const [category, setCategory] = useState([]);
    const [teacherId, setTeacherId] = useState([]);
    const [group, setGroup] = useState([]);

    useEffect(() => {
        getCategory(setCategory);
        getTeacher(setTeacherId);
    }, []);

    const openAddModal = () => setAddModal(!addModal);

    // get category
    const getCategory = () => {
        axios.get(api + "category").then(res => setCategory(res.data.body))
        .catch(error => {
            // setError(error); // Xatolikni saqlash
            console.log(error);
          });
    }

    // add group
    const addGroup = () => {
        const data = {
            name: document.getElementById("groupName").value,
            teacherId: document.getElementById("groupTeacher").value,
            categoryId: document.getElementById("groupCategory").value
        }
        axios.post(api + groupAdd, data, config)
            .then(() => {
                getGroup(setGroup);
                openAddModal();
                toast.success("Group muvaffaqiyatli saqlandi✔");
            })
    }

    return (
        <Card mb={{base: "0px", "2xl": "20px"}}>
            <ToastContainer/>
            <Text
                display="flex"
                justifyContent="space-between"
                color={textColorPrimary}
                fontWeight='bold'
                fontSize='2xl'
                mt='10px'
                mb='10px'>
                <span>Group</span>
                <Button onClick={openAddModal} className="rounded-5 px-5 py-2 fw-medium fs-6" color="primary">Add
                    Group</Button>
            </Text>

            {/* add modal */}
            <Modal isOpen={addModal} centered size="lg" className="group__modals">
                <ModalHeader toggle={openAddModal} className="group__modal-head">Add Group</ModalHeader>
                <ModalBody className="group__modal-body">
                    <Input id="groupName" type="text" placeholder="Group name"/>
                    <select className="form-select mb-3" id="groupTeacher">
                        <option selected disabled>Teacher name</option>
                        {teacherId.map((item, i) =>
                            <option key={i} value={item.id}>{item.lastName} {item.firstName}</option>
                        )}
                    </select>
                    <select className="form-select" id="groupCategory">
                        <option selected disabled>Category name</option>
                        {category.map((item, i) =>
                            <option key={i} value={item.id}>{item.name}</option>
                        )}
                    </select>
                </ModalBody>
                <ModalFooter>
                    <Button color="dark" onClick={openAddModal} outline>Close</Button>
                    <Button color="success" outline onClick={addGroup}>Save</Button>
                </ModalFooter>
            </Modal>

            <Project
                boxShadow={cardShadow}
                mb='20px'
                image={Project1}
                group={group}
                setGroup={setGroup}
            />
        </Card>
    );
}
