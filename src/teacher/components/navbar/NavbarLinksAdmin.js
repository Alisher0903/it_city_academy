import {
	Avatar,
	Flex,
	Link,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Text,
	useColorModeValue
} from '@chakra-ui/react';
import { SearchBar } from '../../components/navbar/searchBar/SearchBar';
import { SidebarResponsive } from '../../components/sidebar/Sidebar';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import routes from '../../routes';
import { ThemeEditor } from './ThemeEditor';
import axios from 'axios';
import { api, config } from 'api/api';

export default function HeaderLinks(props) {

	const { secondary } = props;
	const navbarIcon = useColorModeValue('gray.400', 'white');
	let menuBg = useColorModeValue('white', 'navy.800');
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const borderColor = useColorModeValue('#E6ECFA', 'rgba(135, 140, 189, 0.3)');
	const shadow = useColorModeValue(
		'14px 17px 40px 4px rgba(112, 144, 176, 0.18)',
		'14px 17px 40px 4px rgba(112, 144, 176, 0.06)'
	);

	const [getMeTeacher, setGetMeTeacher] = useState([]);

	useEffect(() => {
		getMe();
	}, []);

	const getMe = () => {
		axios.get(api + "user/getMe", config)
			.then(res => setGetMeTeacher(res.data));
	}

	return (
		<Flex
			w={{ sm: '100%', md: 'auto' }}
			alignItems="center"
			flexDirection="row"
			bg={menuBg}
			flexWrap={secondary ? { base: 'wrap', md: 'nowrap' } : 'unset'}
			p="10px"
			borderRadius="30px"
			boxShadow={shadow}>
			<SearchBar mb={secondary ? { base: '10px', md: 'unset' } : 'unset'} me="10px" borderRadius="30px" />
			<SidebarResponsive routes={routes} />
			<ThemeEditor navbarIcon={navbarIcon} />
			<Menu>
				<MenuButton p="0px">
					<Avatar
						_hover={{ cursor: 'pointer' }}
						color="white"
						name={getMeTeacher.firstName + " " + getMeTeacher.lastName}
						bg="#11047A"
						size="sm"
						w="40px"
						h="40px"
					/>
				</MenuButton>
				<MenuList boxShadow={shadow} p="0px" mt="10px" borderRadius="20px" bg={menuBg} border="none">
					<Flex w="100%" mb="0px">
						<Text
							ps="20px"
							pt="16px"
							pb="10px"
							w="100%"
							borderBottom="1px solid"
							borderColor={borderColor}
							fontSize="sm"
							fontWeight="700"
							color={textColor}>
							👋 Hey, {getMeTeacher.firstName}
						</Text>
					</Flex>
					<Flex flexDirection="column" p="10px">
						<MenuItem _hover={{ bg: 'none' }} _focus={{ bg: 'none' }} borderRadius="8px" px="14px">
							<Link href='/#/Teacher/profile'>
								<Text fontSize="sm">My Profile</Text>
							</Link>
						</MenuItem>
						<MenuItem
							_hover={{ bg: 'none' }}
							_focus={{ bg: 'none' }}
							color="red.400"
							borderRadius="8px"
							px="14px">
							<Link href='/'>
								<Text fontSize="sm">Log out</Text>
							</Link>
						</MenuItem>
					</Flex>
				</MenuList>
			</Menu>
		</Flex>
	);
}

HeaderLinks.propTypes = {
	variant: PropTypes.string,
	fixed: PropTypes.bool,
	secondary: PropTypes.bool,
	onOpen: PropTypes.func
};
