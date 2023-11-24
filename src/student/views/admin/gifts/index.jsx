import React, {useEffect, useState} from "react";
import {Box, Flex, Grid, SimpleGrid, Text, useColorModeValue,} from "@chakra-ui/react";

// Custom components
import NFT from "components/card/NFT";

// Assets
import axios from "axios";
import {addImage, api, config, giftAdd, imgUrl} from "api/api";
import {Button, Input, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import Gift from "../../../components/card/Gift";

export default function Gifts() {
    // Chakra Color Mode
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const textColorBrand = useColorModeValue("brand.500", "white");
    const [gift, setGift] = useState([]);
    const [addModal, setAddModal] = useState(false);
    const [imageId, setImageId] = useState(0);

    const openAddModal = () => setAddModal(!addModal);

    useEffect(() => {
        getGifts();
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

    async function addGift() {
        const img = new FormData();
        img.append('file', document.getElementById('img').files[0]);

        axios.post(api + "attachment/upload", img, config)
            .then(res => {
               
                axios.post(api + giftAdd, {
                    name: document.getElementById("title").value,
                    attachmentId: res.data.body,
                    categoryId: 0,
                    description: document.getElementById('description').value,
                    rate: document.getElementById('rate').value
                }, config)
                    .then(() => {
                        openAddModal();
                        getGifts();
                    });
            });
    }

    return (
        <Box pt={{base: "180px", md: "80px", xl: "80px"}}>
            {/* Main Fields */}
            <Grid
                mb='20px'
                gridTemplateColumns={{xl: "repeat(3, 1fr)", "2xl": "1fr 0.46fr"}}
                gap={{base: "20px", xl: "20px"}}
                display={{base: "block", xl: "grid"}}>
                <Flex
                    flexDirection='column'
                    gridArea={{xl: "1 / 1 / 2 / 4", "2xl": "1 / 1 / 2 / 3"}}>
                    {/* <Banner /> */}
                    <Flex direction='column'>
                        <Flex
                            mt='45px'
                            mb='20px'
                            justifyContent='space-between'
                            direction={{base: "column", md: "row"}}
                            align={{base: "start", md: "center"}}>
                            <Text color={textColor} fontSize='2xl' ms='24px' fontWeight='700'>
                                All gifts
                            </Text>
                        </Flex>
                        <SimpleGrid columns={{base: 1, md: 3, xl: 4}} gap='20px'>

                            {gift.length && gift.map((item, i) =>
                                <Gift
                                    giftIdIn={item.id}
                                    getGifts={getGifts}
                                    key={i}
                                    name={item.name}
                                    description={item.description}
                                    rate={item.rate}
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
