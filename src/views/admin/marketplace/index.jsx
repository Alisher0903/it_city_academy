import React, { useEffect } from "react";
import {
  Box,
  Flex,
  Grid,
  Text,
  useColorModeValue,
  SimpleGrid,
} from "@chakra-ui/react";

// Custom components
import Banner from "views/admin/marketplace/components/Banner";
import TableTopCreators from "views/admin/marketplace/components/TableTopCreators";
import HistoryItem from "views/admin/marketplace/components/HistoryItem";
import Card from "components/card/Card.js";

import NFT from "components/card/NFT";

// Assets
import Nft1 from "assets/img/nfts/Nft1.png";
import Nft2 from "assets/img/nfts/Nft2.png";
import Nft3 from "assets/img/nfts/Nft3.png";
import Nft4 from "assets/img/nfts/Nft4.png";
import Nft5 from "assets/img/nfts/Nft5.png";
import Nft6 from "assets/img/nfts/Nft6.png";
import Avatar1 from "assets/img/avatars/avatar1.png";
import Avatar2 from "assets/img/avatars/avatar2.png";
import Avatar3 from "assets/img/avatars/avatar3.png";
import Avatar4 from "assets/img/avatars/avatar4.png";
import tableDataTopCreators from "views/admin/marketplace/variables/tableDataTopCreators.json";
import { tableColumnsTopCreators } from "views/admin/marketplace/variables/tableColumnsTopCreators";

import axios from "axios";
import { api } from "api/api";
import { useState } from "react";
import { imgUrl } from "api/api";
import { Button, Input, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { categoryAdd } from "api/api";
import { config } from "api/api";

export default function Marketplace() {
  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorBrand = useColorModeValue("brand.500", "white");
  const [category, setCategory] = useState([]);
  const [addModal, setAddModal] = useState(false);

  const openAddModal = () => setAddModal(!addModal);

  useEffect(() => {
    getCategory();
  }, []);

  function getCategory() {
    axios.get(api + "category")
      .then(res => {
        setCategory(res.data.body)
      })
    // .catch(err => consol e.log(err))
  }

  const addCategory = () => {

    axios.post(api + categoryAdd,
      {
        name: document.getElementById("title").value,
        attachmentId: 0,
        categoryId: 0
      },
      config)
      .then(() => {
        openAddModal();
        getCategory();
      })
  }

  return (
    <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
      {/* Main Fields */}
      <Grid
        mb='20px'
        gridTemplateColumns={{ xl: "repeat(3, 1fr)", "2xl": "1fr 0.46fr" }}
        gap={{ base: "20px", xl: "20px" }}
        display={{ base: "block", xl: "grid" }}>
        <Flex
          flexDirection='column'
          gridArea={{ xl: "1 / 1 / 2 / 4", "2xl": "1 / 1 / 2 / 3" }}>
          {/* <Banner /> */}
          <Flex direction='column'>
            <Flex
              mt='45px'
              mb='20px'
              justifyContent='space-between'
              direction={{ base: "column", md: "row" }}
              align={{ base: "start", md: "center" }}>
              <Text color={textColor} fontSize='2xl' ms='24px' fontWeight='700'>
                Category
              </Text>
              <Flex
                align='center'
                me='20px'
                ms={{ base: "24px", md: "0px" }}
                mt={{ base: "20px", md: "0px" }}>
                <Button
                  onClick={() => {
                    openAddModal();
                  }}
                  color="primary"
                  className="px-4 py-2 fw-medium rounded-5">
                  Add Category
                </Button>
                <Modal isOpen={addModal} className="group__modals" centered size="lg">
                  <ModalHeader toggle={openAddModal} className="group__modal-head">Add Category</ModalHeader>
                  <ModalBody className="group__modal-body">
                    <Input type="file" />
                    <Input placeholder="title" id="title" />
                    {/* <Input type="number" placeholder="category id" /> */}
                  </ModalBody>
                  <ModalFooter>
                    <Button color="dark" outline onClick={openAddModal}>Orqaga</Button>
                    <Button color="success" outline onClick={addCategory}>Saqlash</Button>
                  </ModalFooter>
                </Modal>
                {/* <Link
                  color={textColorBrand}
                  fontWeight='500'
                  me={{ base: "34px", md: "44px" }}
                  to='#art'>
                  All
                </Link>
                <Link
                  color={textColorBrand}
                  fontWeight='500'
                  me={{ base: "34px", md: "44px" }}
                  to='#music'>
                  Front End
                </Link>
                <Link
                  color={textColorBrand}
                  fontWeight='500'
                  me={{ base: "34px", md: "44px" }}
                  to='#collectibles'>
                  Back End
                </Link>
                <Link color={textColorBrand} fontWeight='500' to='#sports'>
                  3D Max
                </Link> */}
              </Flex>
            </Flex>
            <SimpleGrid columns={{ base: 1, md: 3, xl: 4 }} gap='20px'>

              {category.length && category.map((item, i) =>
                <NFT
                  categoryIdIn={item}
                  getCategory={getCategory}
                  key={i}
                  name={item.name}
                  bidders={[]}
                  image={imgUrl + item.attachmentId}
                // download='frontend'
                />
              )}

            </SimpleGrid>
          </Flex>
        </Flex>
      </Grid>
    </Box>
  );
}
