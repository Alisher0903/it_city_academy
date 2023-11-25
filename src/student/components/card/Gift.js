// Chakra imports
import {
  AvatarGroup,
  Avatar,
  Box,
  Flex,
  Image,
  Text,
  useColorModeValue,
  Link,
  Icon,
  Button,
  SimpleGrid,
} from "@chakra-ui/react";
import { MdSupervisedUserCircle } from "react-icons/md";
import { imgUrl } from "api/api";
import 'react-toastify/dist/ReactToastify.css';
import { config, api } from "api/api";
import axios from "axios";
import Card from "components/card/Card.js";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Input, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

export default function Gift(props) {
  const textColor = useColorModeValue("navy.700", "white");
  const textColorBid = useColorModeValue("brand.500", "white");

  // modals
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [category, setCategory] = useState([]);
  const [gift, setGift] = useState([]);
  const [groupId, setGroupId] = useState("");

  const openEditModal = () => setEditModal(!editModal);
  const openDeleteModal = () => setDeleteModal(!deleteModal);

  useEffect(() => {
    getGifts()
  }, []);
  function getGifts() {
    axios.get(api + "gift", config)
      .then(res => {
        setGift(res.data.body.object)
      })
      .catch(err => {
        console.log(err);
      })
  }
  function exchange() {
    axios.post(api + "exchange/save/" + groupId, config)
      .then(() => {
        openDeleteModal();
        toast.success("Exchange succesfully get✔");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Exchange failed❌");
      })
  }


  return (
    <SimpleGrid columns={{ base: 1, md: 3, xl: 4 }} gap='20px'>
      {gift.length && gift.map((item, i) =>
        <Card p='20px'>
          <ToastContainer />

          <Flex key={i} id={item.id} direction={{ base: "column" }} justify='center'>
            <Box mb={{ base: "20px", "2xl": "20px" }} h="13rem" position='relative'>
              <Image
                src={imgUrl + item.attachmentId}
                w={{ base: "100%", "3xl": "100%" }}
                h={{ base: "180px", "3xl": "180px" }}
                objectFit="cover"
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
                    fontWeight='bold'
                    me='14px'>
                    {item.name}
                  </Text>
                  <Text
                    color='secondaryGray.600'
                    fontSize={{
                      base: "sm",
                    }}
                    fontWeight='400'
                    me='14px'>
                    {item.description}
                  </Text>
                </Flex>


              </Flex>
              <Flex
                align='start'
                justify='space-between'
                display="flex"
                wrap="wrap"
                direction={{
                  base: "row",
                  md: "column",
                  lg: "row",
                  xl: "column",
                  "2xl": "row",
                }}>

                {/* edit delete category link */}
                <Box display="flex"
                  w="100%"
                  justifyContent="space-between">
                  <Text
                    color='secondaryGray.600'
                    align="start"
                    w="100%"
                    fontSize={{
                      base: "22px",
                    }}
                    fontWeight='700'
                    me='10px'>
                    {item.rate}
                    <span> coin</span>
                  </Text>
                  <Button
                    onClick={() => {
                      openDeleteModal()
                      setGroupId(item.id);
                    }}>
                    Olish
                    <Icon w='25px' as={MdSupervisedUserCircle} />
                  </Button>
                </Box>
              </Flex>
            </Flex>
          </Flex>


          <Modal isOpen={deleteModal} centered className="group__modals">
            <ModalHeader toggle={openDeleteModal} className="group__modal-head">Delete Group</ModalHeader>
            <ModalBody className="group__modal-body">
              <p>Bu sovg'ani olmoqchimisiz?</p>
            </ModalBody>
            <ModalFooter>
              <Button onClick={openDeleteModal} color="dark">Close</Button>
              <Button outline color="danger" onClick={() => {
                exchange()
                openDeleteModal();
              }}>Ok</Button>
            </ModalFooter>
          </Modal>
        </Card>
      )}
    </SimpleGrid>
  );
}
