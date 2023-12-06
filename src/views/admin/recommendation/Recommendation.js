import {Button, Icon, Text} from "@chakra-ui/react";
import Card from "components/card/Card";
import {Col, Input, Modal, ModalBody, ModalFooter, ModalHeader, Row} from "reactstrap";
import {MdEdit} from "react-icons/md";
import {useEffect, useState} from "react";
import axios from "axios";
import {api, byIdIn, config} from "../../../api/api";
import {toast, ToastContainer} from "react-toastify";
import {getCategory} from "../../../api/routers";

function Recommendation() {
    const [categorySelect, setCategorySelect] = useState([]);
    const [addModal, setAddModal] = useState(false);

    useEffect(() => {
        getCategory(setCategorySelect)
    }, []);

    const openAddModal = () => setAddModal(!addModal);

    // addCoin
    const addCoin = () => {
        let courseId = byIdIn("courseId").value;
        let coin = byIdIn("coin").value;
        if (courseId !== "undefined" && coin !== "undefined") {
            let coinAdd = new FormData();
            coinAdd.set("courseId", courseId);
            coinAdd.set("coin", coin);
            axios.post(api + "offerCourse", coinAdd, config)
                .then(() => toast.success('coin muaffaqiyatli qushildi'))
                .catch(() => toast.error('malumotlar tugri tuldirilmagan'));
            openAddModal();
        } else toast.warning('barcha malumotlar tuldirilmagan!');
    }

    return (<>
        <ToastContainer/>
        {/*addModal*/}
        <Modal isOpen={addModal} centered size="lg">
            <ModalHeader toggle={openAddModal} className="techer__modal-head">Add Recommendation</ModalHeader>
            <ModalBody className="techer__modal-body">
                <Input type="number" placeholder="coin"/>
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
                    // onClick={addCoin}
                    colorScheme="green"
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
                    boxShadow="rgba(0, 0, 0, 0.15) 0px 5px 15px 0px">Add</Button>
            </Text>
            <Row className="pt-3">
                <Col className="col-12 col-md-6">
                    <Text
                        display="flex"
                        justifyContent="space-between"
                        boxShadow="rgba(0, 0, 0, 0.15) 0px 5px 15px 0px"
                        borderRadius="20px"
                        mb="15px"
                        p="20px">
                        Java
                        <Icon as={MdEdit} w="20px" h="20px" cursor="pointer"/>
                    </Text>
                </Col>
            </Row>
        </Card>
    </>);
}

export default Recommendation;