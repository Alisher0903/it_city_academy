import React, { useState } from "react";
import {
    Box,
    Checkbox,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Icon,
    Input,
    InputGroup,
    InputRightElement,
    Link,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";

import DefaultAuth from "layouts/auth/Default";
import itcity from "assets/img/auth/itcity.png";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import axios from 'axios';
import { api, config } from "api/api";
import "../../../loginBtn/style.scss";
import { ToastContainer, toast } from "react-toastify";
import { NavLink } from "reactstrap";

function Forgot() {
    // Chakra color mode
    const textColor = useColorModeValue("navy.700", "white");
    const textColorSecondary = "gray.400";
    const brandStars = useColorModeValue("brand.500", "brand.400");

    const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
    const textColorBrand = useColorModeValue("brand.500", "white");
    const googleBg = useColorModeValue("secondaryGray.300", "whiteAlpha.200");
    const googleText = useColorModeValue("navy.700", "white");

    const [role, setRole] = useState('')
    const [emailValue, setEmailValue] = useState("")
    const [show, setShow] = React.useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const [isValidated, setIsValidated] = useState(false);
    const handleClick = () => setShow(!show);

    const handleClickBtn = () => {
        setIsClicked(true);
        setTimeout(() => {
            setIsClicked(false);
            setIsValidated(true);
            setTimeout(() => {
                setIsValidated(false);
            }, 100000);
        }, 200);
    };

    const googleHover = useColorModeValue(
        { bg: "gray.200" },
        { bg: "whiteAlpha.300" }
    );

    const googleActive = useColorModeValue(
        { bg: "secondaryGray.300" },
        { bg: "whiteAlpha.200" }
    );

    function logIn() {
        let phoneNumber = document.getElementById('emailValue').value;
        axios.post(api + "user/forgetPassword", {
            email: phoneNumber,
            code: 0,
            password: "string",
            prePassword: "string"
        }).then(res => {
            setRole(res.data)
            document.getElementById('link').click()
            toast.success(res.data.message)
        })
            .catch((err) => {
                toast.error("Error")
            })
    }

    function checkKeyPress(event) {
        if (event.key === "Enter") {
            event.preventDefault(); // Enter tuşunun varsayılan davranışını engeller

            var submitButton = document.getElementById("button");
            submitButton.click(); // "Submit" düğmesini tıklar
        }
    }

    function forgetGoPage() {
        sessionStorage.setItem("emailValue", document.getElementById("emailValue").value)
    }

    return (
        <DefaultAuth illustrationBackground={itcity} image={itcity}>
            <ToastContainer />
            <Link id="link" to="#/auth/forgot-password-2" href="#/auth/forgot-password-2"></Link>

            <Flex
                maxW={{ base: "100%", md: "max-content" }}
                w='100%'
                mx={{ base: "auto", lg: "0px" }}
                me='auto'
                h='100%'
                alignItems='start'
                justifyContent='center'
                mb={{ base: "30px", md: "60px" }}
                px={{ base: "25px", md: "0px" }}
                mt={{ base: "40px", md: "14vh" }}
                flexDirection='column'>
                <Box me='auto'>
                    <Heading color={textColor} fontSize='36px' mb='10px'>
                        Reset password
                    </Heading>
                    <Text
                        mb='36px'
                        ms='4px'
                        color={textColorSecondary}
                        fontWeight='400'
                        fontSize='md'>
                        Enter your email to reset your password!
                    </Text>
                </Box>
                <Flex
                    zIndex='2'
                    direction='column'
                    w={{ base: "100%", md: "420px" }}
                    maxW='100%'
                    background='transparent'
                    borderRadius='15px'
                    mx={{ base: "auto", lg: "unset" }}
                    me='auto'
                    mb={{ base: "20px", md: "auto" }}>
                    <FormControl>
                        <FormLabel
                            display='flex'
                            ms='4px'
                            fontSize='sm'
                            fontWeight='500'
                            color={textColor}
                            mb='8px'>
                            Email<Text color={brandStars}>*</Text>
                        </FormLabel>
                        <Input
                            isRequired={true}
                            variant='auth'
                            fontSize='sm'
                            ms={{ base: "0px", md: "0px" }}
                            type='email'
                            placeholder='example@gmail.com'
                            mb='24px'
                            fontWeight='500'
                            size='lg'
                            id="emailValue"
                            // onClick={setEmailValue}
                        />
                        {/* login btn */}
                        <button
                            id="button"
                            onClick={() => {
                                logIn();
                                forgetGoPage();
                            }}
                            className={`${isClicked ? 'onclic' : ''} ${isValidated ? 'validate' : ''}`}>
                            {isValidated ? 'Loading...' : 'Next👉'}
                        </button>
                    </FormControl>
                </Flex>
            </Flex>
        </DefaultAuth>
    );
}

export default Forgot;
