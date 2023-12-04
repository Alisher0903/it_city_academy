import React, {useState} from "react";
import {
    Box,
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
import {MdOutlineRemoveRedEye} from "react-icons/md";
import {RiEyeCloseLine} from "react-icons/ri";
import axios from 'axios';
import {api, config} from "api/api";
import "../../loginBtn/style.scss";
import { ToastContainer, toast } from "react-toastify";

function SignIn() {
    // Chakra color mode
    const textColor = useColorModeValue("navy.700", "white");
    const textColorSecondary = "gray.400";
    const brandStars = useColorModeValue("brand.500", "brand.400");

    const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
    const textColorBrand = useColorModeValue("brand.500", "white");
    const googleBg = useColorModeValue("secondaryGray.300", "whiteAlpha.200");
    const googleText = useColorModeValue("navy.700", "white");

    const [role, setRole] = useState('/#/auth')
    const [show, setShow] = React.useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const [isValidated, setIsValidated] = useState(false);
    const handleClick = () => setShow(!show);

    // const handleClickBtn = () => {
    //     setIsClicked(true);
    //     setTimeout(() => {
    //         setIsClicked(false);
    //         setIsValidated(true);
    //         setTimeout(() => {
    //             setIsValidated(false);
    //         }, 100000);
    //     }, 200);
    // };

    const googleHover = useColorModeValue(
        {bg: "gray.200"},
        {bg: "whiteAlpha.300"}
    );

    const googleActive = useColorModeValue(
        {bg: "secondaryGray.300"},
        {bg: "whiteAlpha.200"}
    );

    async function logIn() {
        let phoneNumber = document.getElementById('number').value;
        let password = document.getElementById('password').value;
        await axios.post(api + "auth/login", {phoneNumber, password}).then(async res => {
            await sessionStorage.setItem('jwtTokin', "Bearer " + res.data.body);
            if (res.data.message === "ROLE_USER") await setRole('/#/Student/default');
            else if (res.data.message === "ROLE_SUPER_ADMIN") await setRole('/#/admin/default');
            else if (res.data.message === "ROLE_TEACHER") await setRole('/#/Teacher/default');

            await document.getElementById('link').click()
        })
        .catch((err) => {
            toast.error("Raqam yoki parol xato!")
        })
    }

    function checkKeyPress(event) {
        if (event.key === "Enter") {
          event.preventDefault(); // Enter tuşunun varsayılan davranışını engeller
      
          var submitButton = document.getElementById("button");
          submitButton.click(); // "Submit" düğmesini tıklar
        }
      }

    return (
        <DefaultAuth illustrationBackground={itcity} image={itcity}>
            <ToastContainer/>
            <Link id="link" to={role} href={role}></Link>

            <Flex
                maxW={{base: "100%", md: "max-content"}}
                w='100%'
                mx={{base: "auto", lg: "0px"}}
                me='auto'
                h='100%'
                alignItems='start'
                justifyContent='center'
                mb={{base: "30px", md: "60px"}}
                px={{base: "25px", md: "0px"}}
                mt={{base: "40px", md: "14vh"}}
                flexDirection='column'>
                <Box me='auto'>
                    <Heading color={textColor} fontSize='36px' mb='10px'>
                        Log In
                    </Heading>
                    <Text
                        mb='36px'
                        ms='4px'
                        color={textColorSecondary}
                        fontWeight='400'
                        fontSize='md'>
                        Enter your phone number and password to Log In in!
                    </Text>
                </Box>
                <Flex
                    zIndex='2'
                    direction='column'
                    w={{base: "100%", md: "420px"}}
                    maxW='100%'
                    background='transparent'
                    borderRadius='15px'
                    mx={{base: "auto", lg: "unset"}}
                    me='auto'
                    mb={{base: "20px", md: "auto"}}>
                    {/* <Button
            fontSize='sm'
            me='0px'
            mb='26px'
            py='15px'
            h='50px'
            borderRadius='16px'
            bg={googleBg}
            color={googleText}
            fontWeight='500'
            _hover={googleHover}
            _active={googleActive}
            _focus={googleActive}>
            <Icon as={FcGoogle} w='20px' h='20px' me='10px' />
            Sign in with Google
          </Button> */}
                    {/* <Flex align='center' mb='25px'>
            <HSeparator />
            <Text color='gray.400' mx='14px'>
              or
            </Text>
            <HSeparator />
          </Flex> */}
                    <FormControl>
                        <FormLabel
                            display='flex'
                            ms='4px'
                            fontSize='sm'
                            fontWeight='500'
                            color={textColor}
                            mb='8px'>
                            Phone number<Text color={brandStars}>*</Text>
                        </FormLabel>
                        <Input
                            isRequired={true}
                            variant='auth'
                            fontSize='sm'
                            ms={{base: "0px", md: "0px"}}
                            type='number'
                            placeholder='993393300'
                            mb='24px'
                            fontWeight='500'
                            size='lg'
                            id="number"
                        />
                        <FormLabel
                            ms='4px'
                            fontSize='sm'
                            fontWeight='500'
                            color={textColor}
                            display='flex'>
                            Password<Text color={brandStars}>*</Text>
                        </FormLabel>
                        <InputGroup size='md'>
                            <Input
                                isRequired={true}
                                fontSize='sm'
                                placeholder='Enter password'
                                mb='24px'
                                size='lg'
                                type={show ? "text" : "password"}
                                variant='auth'
                                id="password"
                                onKeyDown={checkKeyPress}
                            />
                            <InputRightElement display='flex' alignItems='center' mt='4px'>
                                <Icon
                                    color={textColorSecondary}
                                    _hover={{cursor: "pointer"}}
                                    as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                                    onClick={handleClick}
                                />
                            </InputRightElement>
                        </InputGroup>
                        

                        {/* login btn */}
                        <button
                            id="button"
                            onClick={async () => {
                                // handleClickBtn();
                               await logIn();
                            }}
                            className={`${isClicked ? 'onclic' : ''} ${isValidated ? 'validate' : ''}`}>
                            {isValidated ? 'Loading...' : 'Log In'}
                        </button>
                    </FormControl>
                </Flex>
            </Flex>
        </DefaultAuth>
    );
}

export default SignIn;
