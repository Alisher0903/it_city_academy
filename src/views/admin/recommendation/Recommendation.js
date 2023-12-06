import {Box, Button, Icon, Text} from "@chakra-ui/react";
import Card from "components/card/Card";
import {Col, Input, Modal, ModalBody, ModalFooter, ModalHeader, Row} from "reactstrap";
import {MdDelete, MdEdit} from "react-icons/md";
import {useEffect, useState} from "react";
import axios from "axios";
import {api, byIdIn, config} from "../../../api/api";
import {toast, ToastContainer} from "react-toastify";
import {getCategory} from "../../../api/routers";

function Recommendation() {
    const [categorySelect, setCategorySelect] = useState([]);
    const [courseGet, setCourseGet] = useState([]);
    const [courseIdIn, setCourseIdIn] = useState([]);
    const [addModal, setAddModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);

    useEffect(() => {
        getCategory(setCategorySelect);
        getCourse();
    }, []);

    const openAddModal = () => setAddModal(!addModal);
    const openEditModal = () => setEditModal(!editModal);
    const openDeleteModal = () => setDeleteModal(!deleteModal);

    // getCourse
    const getCourse = () => {
        axios.get(api + "offerCourse", config)
            .then(res => setCourseGet(res.data.body))
            .catch(() => {
                toast.error("The recommendation score is not included!!!")
            })
    }

    // addCourse
    const addCourse = () => {
        let courseId = byIdIn("courseId").value;
        let coin = byIdIn("coin").value;
        if (courseId !== "undefined" && coin !== "undefined") {
            let coinAddPlus = new FormData();
            coinAddPlus.append("courseId", courseId);
            coinAddPlus.append("coin", coin);
            axios.post(api + "offerCourse", coinAddPlus, config)
                .then(() => {
                    toast.success('coin muaffaqiyatli qushildi');
                    getCourse();
                })
                .catch(() => toast.error('malumotlar tugri tuldirilmagan'));
            openAddModal();
        } else toast.warning('barcha malumotlar tuldirilmagan!');
    }

    // editCourse
    const editCourse = () => {
        let id = courseIdIn.ID;
        let coin = byIdIn("coin").value;
        if (id !== "undefined" && coin !== "undefined") {
            let coinEdit = new FormData();
            coinEdit.append("id", id);
            coinEdit.append("coin", coin);
            axios.put(api + "offerCourse/" + courseIdIn.ID, coinEdit, config)
                .then(() => {
                    toast.success('coin muaffaqiyatli taxrirlandi');
                    getCourse();
                })
                .catch(() => {
                    toast.error('malumotlar tugri tuldirilmagan');
                });
            openEditModal();
        } else toast.warning('barcha malumotlar tuldirilmagan!');
    }

    // deleteCourse
    const deleteCourse = () => {
        axios.delete(api + "offerCourse/" + courseIdIn.ID, config)
            .then(() => {
                toast.success("deleted");
                openDeleteModal();
                getCourse();
            })
            .catch(() => {
                toast.error("deleted error!!!")
            })
    }

    return (<>
        <ToastContainer/>
        {/*addModal*/}
        <Modal isOpen={addModal} centered size="lg">
            <ModalHeader toggle={openAddModal} className="techer__modal-head">Add Recommendation</ModalHeader>
            <ModalBody className="techer__modal-body">
                <Input type="number" id="coin" placeholder="coin"/>
                <select id="courseId" className="form-select">
                    <option selected disabled>courseId select</option>
                    {categorySelect && categorySelect.map((item, i) =>
                        <option key={i} value={item.id}>{item.name}</option>
                    )}
                </select>
            </ModalBody>
            <ModalFooter className="techer__modal-footer">
                <Button
                    onClick={openAddModal}
                    colorScheme="facebook"
                    boxShadow="rgba(0, 0, 0, 0.15) 0px 5px 15px 0px">Close</Button>
                <Button
                    onClick={addCourse}
                    colorScheme="green"
                    boxShadow="rgba(0, 0, 0, 0.15) 0px 5px 15px 0px">Save</Button>
            </ModalFooter>
        </Modal>
        {/*editCourseModal*/}
        <Modal isOpen={editModal} centered size="lg">
            <ModalHeader toggle={openEditModal} className="techer__modal-head">Edit Recommendation</ModalHeader>
            <ModalBody className="techer__modal-body">
                <Input type="number" id="coin" placeholder="coin" defaultValue={courseIdIn["COIN "]}/>
                <select id="courseId" className="form-select">
                    <option selected disabled>{courseIdIn["CATEGORY "]}</option>
                    {/*{categorySelect && categorySelect.map((item, i) =>*/}
                    {/*    <option key={i} value={item.id}>{item.name}</option>*/}
                    {/*)}*/}
                </select>
            </ModalBody>
            <ModalFooter className="techer__modal-footer">
                <Button
                    onClick={openEditModal}
                    colorScheme="facebook"
                    boxShadow="rgba(0, 0, 0, 0.15) 0px 5px 15px 0px">Close</Button>
                <Button
                    onClick={editCourse}
                    colorScheme="green"
                    boxShadow="rgba(0, 0, 0, 0.15) 0px 5px 15px 0px">Save</Button>
            </ModalFooter>
        </Modal>
        {/*deleteCourseModal*/}
        <Modal isOpen={deleteModal} centered size="lg">
            <ModalHeader
                toggle={openDeleteModal}
                className="techer__modal-head">Delete {courseIdIn['CATEGORY ']}</ModalHeader>
            <ModalBody className="techer__modal-delete">
                Are you sure you want to delete this data?
            </ModalBody>
            <ModalFooter>
                <Button
                    onClick={openDeleteModal}
                    colorScheme="facebook"
                    boxShadow="rgba(0, 0, 0, 0.15) 0px 5px 15px 0px">Close</Button>
                <Button
                    onClick={deleteCourse}
                    colorScheme="red"
                    boxShadow="rgba(0, 0, 0, 0.15) 0px 5px 15px 0px">Save</Button>
            </ModalFooter>
        </Modal>
        <Card mt="100px">
            <Text
                display="flex"
                justifyContent="space-between"
                fontSize="2xl"
                fontWeight="bold"
                letterSpacing="1px"
                ms="2px">
                Recommendation
                <Button
                    onClick={openAddModal}
                    colorScheme="green"
                    variant="outline"
                    boxShadow="rgba(0, 0, 0, 0.15) 0px 5px 15px 0px">Add Offer</Button>
            </Text>
            <Row className="pt-3">
                {courseGet && courseGet.map((item, i) =>
                    <Col key={i} className="col-12 col-md-6">
                        <Text
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            boxShadow="rgba(0, 0, 0, 0.15) 0px 5px 15px 0px"
                            borderRadius="20px"
                            mb="15px"
                            p="20px">
                            <Box>
                                <p>Offer group: {item['CATEGORY ']}</p>
                                <p>Coin: {item['COIN ']}</p>
                            </Box>
                            <Box>
                                <Icon
                                    onClick={() => {
                                        setCourseIdIn(item);
                                        openEditModal();
                                    }}
                                    as={MdEdit}
                                    w="20px"
                                    h="20px"
                                    cursor="pointer"/>
                                <Icon
                                    onClick={() => {
                                        setCourseIdIn(item);
                                        openDeleteModal();
                                    }}
                                    as={MdDelete}
                                    ms="5px"
                                    w="20px"
                                    h="20px"
                                    cursor="pointer"/>
                            </Box>
                        </Text>
                    </Col>
                )}
            </Row>
        </Card>
    </>);
}

export default Recommendation;