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
} from "@chakra-ui/react";
import { giftEdit } from "api/api";
import { giftDelete } from "api/api";
import { categoryDelete, categoryEdit, config, api } from "api/api";
import axios from "axios";
import Card from "components/card/Card.js";
import React, { useEffect, useState } from "react";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { MdDelete, MdEdit } from "react-icons/md";
import { toast } from "react-toastify";
import { Button, Input, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

export default function Gift(props) {
  const { image, name, description, bidders, giftIdIn, getGifts, rate } = props;
  const [like, setLike] = useState(false);
  const textColor = useColorModeValue("navy.700", "white");
  const textColorBid = useColorModeValue("brand.500", "white");

  // modals
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [category, setCategory] = useState([]);
  const [categoryId, setCategoryId] = useState("");

  const openEditModal = () => setEditModal(!editModal);
  const openDeleteModal = () => setDeleteModal(!deleteModal);

  useEffect(() => {
    axios.get(api + "gift")
      .then(res => {
        setCategory(res.data.body)
      })
  }, []);

  // categoryObj
  // const addcategoryObj = () => {
  //   const categoryObj = new FormData();
  //   categoryObj.append("image", document.getElementById("categoryImg").files[0]);
  //   categoryObj.append("name", document.getElementById("categoryTitle").value);
  //   // categoryObj.append("attachmentId", document.getElementById("attachmentId").value);
  //   // categoryObj.append("categoryId", document.getElementById("categoryId").value);
  //   return categoryObj;
  // }

  // edit category
  const editCategory = () => {
    axios.put(api + giftEdit + categoryId.id,
      {
        name: document.getElementById("categoryTitle").value,
        attachmentId: 0,
        categoryId: 0
      },
      config)
      .then(() => {
        openEditModal();
        getGifts();
        toast.success("successfully saved category!")
      })
  }

  // delete category
  const deleteGift = () => {
    console.log(giftIdIn.id);
    axios.delete(api + giftDelete + categoryId.id, config)
      .then(() => {
        openDeleteModal();
        toast.success("successfully saved category!")
        getGifts();
      })
  }

  return (
    <Card p='20px'>
      <Flex direction={{ base: "column" }} justify='center'>
        <Box mb={{ base: "20px", "2xl": "20px" }} h="13rem" position='relative'>
          <Image
            src={image}
            w={{ base: "100%", "3xl": "100%" }}
            h={{ base: "100%", "3xl": "100%" }}
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
                {name}
              </Text>
              <Text
                color='secondaryGray.600'
                mb="20px"
                fontSize={{
                  base: "sm",
                }}
                fontWeight='400'
                me='14px'>
                {description}
              </Text>
            </Flex>

            <AvatarGroup
              max={3}
              color={textColorBid}
              size='sm'
              mt={{
                base: "0px",
                md: "10px",
                lg: "0px",
                xl: "10px",
                "2xl": "0px",
              }}
              fontSize='12px'>
              {bidders.map((avt, key) => (
                <Avatar key={key} src={avt} />
              ))}
            </AvatarGroup>
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
            }}
            mt='5px'>
            {/* edit delete category link */}
            <Box display="flex"
            >
              <Flex
                align='start'
                direction='column'
              >
                <Text
                  color='secondaryGray.600'
                  w="100%"
                  fontSize={{
                    
                    base: "md",
                  }}
                  fontWeight='700'
                  me='18px'>
                  {rate}
                  <span> coin</span>
                </Text>
              </Flex>
              <Link
                onClick={() => {
                  openEditModal();
                  setCategoryId(giftIdIn);
                }}
                variant='no-hover'
                ms="75px"
                me="25px"
                p='0px !important'>
                <Icon as={MdEdit} color='secondaryGray.500' h='18px' w='18px' />
              </Link>
              <Link
                onClick={() => {
                  openDeleteModal();
                  setCategoryId(giftIdIn);
                }}
                variant='no-hover'
                me='25px'
                ms='0px'
                p='0px !important'>
                <Icon as={MdDelete} color='secondaryGray.500' h='18px' w='18px' />
              </Link>
            </Box>

            {/* modals */}
            <Modal isOpen={editModal} centered size="lg" className="group__modals">
              <ModalHeader toggle={openEditModal} className="group__modal-head">Edit Category</ModalHeader>
              <ModalBody className="group__modal-body">
                <Input type="file" id="categoryImg" />
                <Input type="text" id="categoryTitle" placeholder="name" />
                {/* <Input type="number" id="attachmentId" placeholder="image_id" />
                <Input type="number" id="categoryId" placeholder="category_id" /> */}
              </ModalBody>
              <ModalFooter>
                <Button onClick={openEditModal} color="dark" outline>Orqaga</Button>
                <Button color="success" outline onClick={editCategory}>Saqlash</Button>
              </ModalFooter>
            </Modal>

            {/* delete modal */}
            <Modal isOpen={deleteModal} centered className="group__modals">
              <ModalHeader toggle={openDeleteModal} className="group__modal-head">Delete Category</ModalHeader>
              <ModalBody className="group__modal-body">
                <p>Bu categoryni o'chirmoqchimisiz?</p>
              </ModalBody>
              <ModalFooter>
                <Button onClick={openDeleteModal} color="dark" outline>Orqaga</Button>
                <Button color="danger" outline onClick={deleteGift
                }>Ha</Button>
              </ModalFooter>
            </Modal>
            {/* <Text fontWeight='700' fontSize='sm' color={textColorBid}>
              Current Bid: {currentbid}
            </Text> */}
            {/* <Link
              href={download}
              mt={{
                base: "0px",
                md: "10px",
                lg: "0px",
                xl: "10px",
                "2xl": "0px",
              }}>
              <Button
                variant='darkBrand'
                color='white'
                fontSize='sm'
                fontWeight='500'
                borderRadius='70px'
                px='24px'
                py='5px'>
                O'tish
                <Icon icon="mingcute:right-line" />
              </Button>
            </Link> */}
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
}
