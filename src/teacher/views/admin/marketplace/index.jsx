import React, {useEffect, useState} from "react";
import {
    Box,
    Flex,
    Icon,
    Image,
    Link,
    Text,
    SimpleGrid,
    Grid,
    useColorModeValue
} from "@chakra-ui/react";
import Card from "../../../components/card/Card";
import {MdDelete, MdEdit} from "react-icons/md";
import {Button} from "reactstrap";
import categoryImg from "./categoryImg.png";
import axios from "axios";
import {api, config} from "../../../../api/api";

export default function Marketplace() {
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const textColorBrand = useColorModeValue("brand.500", "white");
    const textColor1 = useColorModeValue("navy.700", "white");

    const [teacherCategory, setTeacherCategory] = useState([]);

    useEffect(() => {
        getTeacherCategory();
    }, [])

    // getTeacherCategory
    const getTeacherCategory = () => {
      axios.get(api + "category/teacher/by/sub/category", config)
          .then(res => setTeacherCategory(res.data.body));
    }

    console.log(teacherCategory)

    return (
        <Box pt={{base: "180px", md: "80px", xl: "80px"}}>
            <Flex
                mt="10px"
                mb='20px'
                justifyContent='space-between'
                direction={{base: "column", md: "row"}}
                align={{base: "start", md: "center"}}>
                <Text color={textColor} fontSize='2xl' ms='10px' fontWeight='700'>
                    Category
                </Text>
                <Button className="rounded-5" color="primary">Add Category</Button>
            </Flex>
            <SimpleGrid columns={{base: 1, md: 3, xl: 4}} gap='20px'>
                <Card
                    boxShadow="rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;"
                    p='20px'>
                    <Flex direction={{base: "column"}} justify='center'>
                        <Box mb={{base: "20px", "2xl": "20px"}} position='relative'>
                            <Image
                                src={categoryImg}
                                alt="img"
                                w="100%"
                                h="180px"
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
                                        color={textColor1}
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
                                        name
                                    </Text>
                                </Flex>
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
                                mt='25px'>
                                <Box ms="auto">
                                    <Link
                                        onClick={() => {
                                            // openEditModal();
                                            // setCategoryId(categoryIdIn);
                                        }}
                                        variant='no-hover'
                                        ms='0px'
                                        me="20px"
                                        p='0px !important'>
                                        <Icon as={MdEdit} color='secondaryGray.500' h='18px' w='18px'/>
                                    </Link>
                                    <Link
                                        onClick={() => {
                                            // openDeleteModal();
                                            // setCategoryId(categoryIdIn);
                                        }}
                                        variant='no-hover'
                                        ms='0px'
                                        p='0px !important'>
                                        <Icon as={MdDelete} color='secondaryGray.500' h='18px' w='18px'/>
                                    </Link>
                                </Box>
                            </Flex>
                        </Flex>
                    </Flex>
                </Card>
            </SimpleGrid>
        </Box>
    );
}
