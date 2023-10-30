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
import Card from "components/card/Card.js";
import React, { useState } from "react";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { MdDelete, MdEdit } from "react-icons/md";
import { Button, Input, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

export default function NFT(props) {
  const { image, name, author, bidders, download, currentbid } = props;
  const [like, setLike] = useState(false);
  const textColor = useColorModeValue("navy.700", "white");
  const textColorBid = useColorModeValue("brand.500", "white");

  // modals
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const openEditModal = () => setEditModal(!editModal);
  const openDeleteModal = () => setDeleteModal(!deleteModal);

  return (
    <Card p='20px'>
      <Flex direction={{ base: "column" }} justify='center'>
        <Box mb={{ base: "20px", "2xl": "20px" }} position='relative'>
          <Image
            src={image}
            w={{ base: "100%", "3xl": "100%" }}
            h={{ base: "100%", "3xl": "100%" }}
            borderRadius='20px'
          />

          {/* category like btn */}
          {/* <Button
            position='absolute'
            bg='white'
            _hover={{ bg: "whiteAlpha.900" }}
            _active={{ bg: "white" }}
            _focus={{ bg: "white" }}
            p='0px !important'
            top='14px'
            right='14px'
            borderRadius='50%'
            minW='36px'
            h='36px'
            onClick={() => {
              setLike(!like);
            }}>
            <Icon
              transition='0.2s linear'
              w='20px'
              h='20px'
              as={like ? IoHeart : IoHeartOutline}
              color='brand.500'
            />
          </Button> */}
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
                fontSize={{
                  base: "sm",
                }}
                fontWeight='400'
                me='14px'>
                {author}
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
            direction={{
              base: "row",
              md: "column",
              lg: "row",
              xl: "column",
              "2xl": "row",
            }}
            mt='5px'>
            <Box ms="auto">
              <Link
                onClick={() => {
                  openEditModal();
                }}
                variant='no-hover'
                ms='0px'
                me="25px"
                p='0px !important'>
                <Icon as={MdEdit} color='secondaryGray.500' h='18px' w='18px' />
              </Link>
              <Link
                onClick={() => {
                  openDeleteModal();
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
                <Input type="file" />
                <Input type="text" placeholder="title" />
                <Input type="number" placeholder="category id" />
              </ModalBody>
              <ModalFooter>
                <Button onClick={openEditModal} color="dark" outline>Orqaga</Button>
                <Button color="success" outline>Saqlash</Button>
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
                <Button color="danger" outline>Ha</Button>
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
