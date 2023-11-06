import React, {useEffect} from "react";
import {
    Box,
    Flex,
    Grid,
    Text,
    useColorModeValue,
    SimpleGrid,
} from "@chakra-ui/react";
import NFT from "components/card/NFT";
import axios from "axios";
import {api} from "api/api";
import {useState} from "react";
import {imgUrl} from "api/api";
import {Button, Input, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {categoryAdd} from "api/api";
import {config} from "api/api";
import {addImage} from "api/api";

// toast
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer, toast} from "react-toastify";

export default function Marketplace() {
    // Chakra Color Mode
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const textColorBrand = useColorModeValue("brand.500", "white");
    const [category, setCategory] = useState([]);
    const [imageId, setImageId] = useState(0);
    const [addModal, setAddModal] = useState(false);

    const openAddModal = () => setAddModal(!addModal);

    useEffect(() => {
        getCategory();
    }, []);

    // get category
    function getCategory() {
        axios.get(api + "category", config)
            .then(res => {
                setCategory(res.data.body)
            })
    }

    // add category
    const addCategory = async () => {
        const img = new FormData();
        img.append('file', document.getElementById('img').files[0]);

        axios.post(api + "attachment/upload", img, config)
            .then(res => {
                axios.post(api + categoryAdd, {
                    name: document.getElementById("title").value,
                    attachmentId: res.data.body,
                    categoryId: 0
                }, config)
                    .then(() => {
                        openAddModal();
                        getCategory();
                        toast.success("Categorya muvaffaqiyatli qo'shildi✔");
                    }).catch(() => toast.error("Xatolik yuz berdi. Buning uchun sizdan uzur suraymiz, beni tez orada bartaraf etamiz!!!"))
            })
    }

    return (
        <Box pt={{base: "180px", md: "80px", xl: "80px"}}>
            <ToastContainer/>
            <Grid
                mb='20px'
                gridTemplateColumns={{xl: "repeat(3, 1fr)", "2xl": "1fr 0.46fr"}}
                gap={{base: "20px", xl: "20px"}}
                display={{base: "block", xl: "grid"}}>
                <Flex
                    flexDirection='column'
                    gridArea={{xl: "1 / 1 / 2 / 4", "2xl": "1 / 1 / 2 / 3"}}>
                    <Flex direction='column'>
                        <Flex
                            mt='45px'
                            mb='20px'
                            justifyContent='space-between'
                            direction={{base: "column", md: "row"}}
                            align={{base: "start", md: "center"}}>
                            <Text color={textColor} fontSize='2xl' ms='24px' fontWeight='700'>
                                Category
                            </Text>
                            <Flex
                                align='center'
                                me='20px'
                                ms={{base: "24px", md: "0px"}}
                                mt={{base: "20px", md: "0px"}}>
                                <Button
                                    onClick={() => {
                                        openAddModal();
                                    }}
                                    color="primary"
                                    className="px-4 py-2 fw-medium rounded-5">
                                    Add Category
                                </Button>
                                <Modal isOpen={addModal} className="group__modals" centered size="lg">
                                    <ModalHeader toggle={openAddModal} className="group__modal-head">Add
                                        Category</ModalHeader>
                                    <ModalBody className="group__modal-body">
                                        <Input type="file" id="img"/>
                                        <Input placeholder="title" id="title"/>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="dark" outline onClick={openAddModal}>Close</Button>
                                        <Button color="success" outline onClick={addCategory}>Save</Button>
                                    </ModalFooter>
                                </Modal>
                            </Flex>
                        </Flex>
                        <SimpleGrid columns={{base: 1, md: 3, xl: 4}} gap='20px'>
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
