import { Box, Button, Flex, Select, Text, Textarea, useColorModeValue, SimpleGrid } from "@chakra-ui/react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import React, { useEffect, useState } from "react";

// Custom components
import Card from "components/card/Card";
import axios from "axios";
import { api, config, messageAdd } from "api/api";
import { MdArrowDropDown } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";

export default function CheckTable(props) {

    const openEditModal = () => setEditModal(!editModal);

    const [editModal, setEditModal] = useState(false);
    const [checkedItems, setCheckedItems] = React.useState([false, false])

    const allChecked = checkedItems.every(Boolean)
    const bg = useColorModeValue("white", "navy.700");
    const isIndeterminate = checkedItems.some(Boolean) && !allChecked


    const textColor = useColorModeValue("secondaryGray.900", "white");
    const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
    const [group, setGroup] = useState([]);
    const [message, setMessage] = useState([]);


    useEffect(() => {
        getGroup();
        getMessage()
    }, []);

    function getGroup() {
        axios.get(api + "group", config)
            .then(res => {
                setGroup(res.data.body.object)
            })
            .catch(err => {
            })
    }

    function getMessage() {
        axios.get(api + "message", config)
            .then(res => {
                setMessage(res.data.body.object)
            })
            .catch(err => {
            })
    }

    const sendMessage = () => {
        let groupId = document.getElementById('groupId').value;
        axios.post(api + messageAdd,
            {
                description: document.getElementById("messageId").value,
                groupId: groupId
            },
            config)

            .then(() => {
                openEditModal();
                toast.success("Message successfully send")
                getMessage()
            }).catch((err) => {
                toast.error("Send error")
            })
    }

    return (
        <Box
            direction='column'
            w='100%'
            px='0px'
            overflowX={{ sm: "scroll", lg: "hidden" }}>
            <ToastContainer />
            <Flex px='25px' justify='space-between' mb='20px' align='center'>
                <Text
                    color={textColor}
                    fontSize='25px'
                    fontWeight='700'
                    lineHeight='100%'
                    align="center">
                    Send messages
                </Text>
                <Button
                    onClick={() => {
                        openEditModal();
                    }}
                    color="primary"
                    fontSize='15px'
                    fontWeight='700'
                    align="center"
                    lineHeight='100%'
                    className="px-4 py-2 bg-primary fw-medium rounded-5">
                    Send message
                </Button>

            </Flex>
            {message.length && message.map((item, i) => {
                return (
                    <Card
                        key={i}
                        fontSize={{ sm: "14px" }}
                        minW={{ sm: "150px", md: "200px", lg: "auto" }}
                        bg={bg}
                        mb="20px"
                        borderColor='transparent'>
                        <Flex direction='column'>
                            <SimpleGrid
                                columns={{ base: 2, md: 2, lg: 2, "2xl": 2 }}
                                w="100%"
                                gap='20px'
                                mb='20px'>
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
                                    fontWeight='bold'
                                    me='14px'>
                                    {item.groupName}
                                </Text>
                                <Text
                                    color={textColor}
                                    fontSize={{
                                        base: "xs",
                                        md: "md",
                                        lg: "md",
                                        xl: "md",
                                        "2xl": "lg",
                                        "3xl": "lg",
                                    }}
                                    mb='5px'
                                    textAlign="right"
                                    fontWeight='bold'
                                    me='14px'>
                                    {item.date}
                                </Text>

                            </SimpleGrid>

                            <Text
                                color='secondaryGray.600'
                                fontSize={{
                                    base: "sm",
                                }}
                                fontWeight='600'
                                me='14px'>
                                {item.description}
                            </Text>
                        </Flex>
                    </Card>
                );
            })}
            <Modal isOpen={editModal} centered size="lg" className="group__modals">
                <ModalHeader toggle={openEditModal} className="group__modal-head">Send message</ModalHeader>
                <ModalBody className="group__modal-body">
                    <Box display="flex" flexWrap="wrap">
                        <Textarea placeholder="Write message" id="messageId" style={{ border: "1px solid black" }}
                            mb="20px" />
                        <Select id="groupId" icon={<MdArrowDropDown />} w="50%" style={{ border: "1px solid black" }}>
                            <option selected disabled>select group</option>
                            {group.length && group.map((item, i) =>
                                <option value={item.id} key={i}>{item.name}</option>
                            )}
                        </Select>
                    </Box>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={openEditModal} color="dark">Back</Button>
                    <Button color="success" onClick={sendMessage}>Send</Button>
                </ModalFooter>
            </Modal>
        </Box>
    );
}
