// Chakra imports
import { Portal, Box, useDisclosure } from '@chakra-ui/react';
import Footer from 'components/footer/FooterAdmin.js';
// Layout components
import Navbar from '../navbar/NavbarAdmin';
import Sidebar from '../sidebar/Sidebar';
import routes from '../routes.js';
import { SidebarContext } from '../contexts/SidebarContext';
import React, { useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import DestopNavbar from 'home/navbar/destopNavbar/DestopNavbar';
import "./homeStyle.scss";
import banner from "../../assets/img/homeImage/banner.png"
import { Button, Col, Container, Row } from 'reactstrap';
import { Icon } from '@iconify/react';

// Custom Chakra theme
export default function DashboardHome(props) {
	const { ...rest } = props;
	// states and functions
	const [fixed] = useState(false);
	const [toggleSidebar, setToggleSidebar] = useState(false);
	// functions for changing the states from components
	const getRoute = () => {
		return window.location.pathname !== '/Home/full-screen-maps';
	};
	const getActiveRoute = (routes) => {
		let activeRoute = 'Default Brand Text';
		for (let i = 0; i < routes.length; i++) {
			if (routes[i].collapse) {
				let collapseActiveRoute = getActiveRoute(routes[i].items);
				if (collapseActiveRoute !== activeRoute) {
					return collapseActiveRoute;
				}
			} else if (routes[i].category) {
				let categoryActiveRoute = getActiveRoute(routes[i].items);
				if (categoryActiveRoute !== activeRoute) {
					return categoryActiveRoute;
				}
			} else {
				if (window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1) {
					return routes[i].name;
				}
			}
		}
		return activeRoute;
	};
	const getActiveNavbar = (routes) => {
		let activeNavbar = false;
		for (let i = 0; i < routes.length; i++) {
			if (routes[i].collapse) {
				let collapseActiveNavbar = getActiveNavbar(routes[i].items);
				if (collapseActiveNavbar !== activeNavbar) {
					return collapseActiveNavbar;
				}
			} else if (routes[i].category) {
				let categoryActiveNavbar = getActiveNavbar(routes[i].items);
				if (categoryActiveNavbar !== activeNavbar) {
					return categoryActiveNavbar;
				}
			} else {
				if (window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1) {
					return routes[i].secondary;
				}
			}
		}
		return activeNavbar;
	};
	const getActiveNavbarText = (routes) => {
		let activeNavbar = false;
		for (let i = 0; i < routes.length; i++) {
			if (routes[i].collapse) {
				let collapseActiveNavbar = getActiveNavbarText(routes[i].items);
				if (collapseActiveNavbar !== activeNavbar) {
					return collapseActiveNavbar;
				}
			} else if (routes[i].category) {
				let categoryActiveNavbar = getActiveNavbarText(routes[i].items);
				if (categoryActiveNavbar !== activeNavbar) {
					return categoryActiveNavbar;
				}
			} else {
				if (window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1) {
					return routes[i].messageNavbar;
				}
			}
		}
		return activeNavbar;
	};
	const getRoutes = (routes) => {
		return routes.map((prop, key) => {
			if (prop.layout === '/Home') {
				return <Route path={prop.layout + prop.path} component={prop.component} key={key} />;
			}
			if (prop.collapse) {
				return getRoutes(prop.items);
			}
			if (prop.category) {
				return getRoutes(prop.items);
			} else {
				return null;
			}
		});
	};
	document.documentElement.dir = 'ltr';
	const { onOpen } = useDisclosure();
	document.documentElement.dir = 'ltr';
	return (
		<Box>
			<Box>
				<SidebarContext.Provider
					value={{
						toggleSidebar,
						setToggleSidebar
					}}>
					{/* <Sidebar routes={routes} display='none' {...rest} /> */}
					<Box
						float='right'
						minHeight='100vh'
						height='100%'
						overflow='auto'
						position='relative'
						maxHeight='100%'
						w={{ base: '100%' }}
						maxWidth={{ base: '100%' }}
						transition='all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)'
						transitionDuration='.2s, .2s, .35s'
						transitionProperty='top, bottom, width'
						transitionTimingFunction='linear, linear, ease'>
						<Portal>
							<Box>
								<DestopNavbar />
								{/* <Navbar
									onOpen={onOpen}
									// logoText={'Horizon UI Dashboard PRO'}
									brandText={getActiveRoute(routes)}
									secondary={getActiveNavbar(routes)}
									message={getActiveNavbarText(routes)}
									fixed={fixed}
									{...rest}
								/> */}
							</Box>
						</Portal>

						{getRoute() ? (
							<Box>
								<Switch>
									{/* {getRoutes(routes)} */}
									<div className='homePage__main'>
										<Container>
											<Row className='w-100'>
												<Col className='col-12 col-lg-5 home__box-content'>
													<h3>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta,
														qui.</h3>
													<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde id
														sunt adipisci aperiam aspernatur vel cum, reprehenderit similique
														suscipit qui!</p>
													<Button
														color='warning'
														outline
														className='rounded-0 px-5 py-2 fs-5 fw-bolder'>
														Kirish
														<Icon className='d-inline ms-2' icon="lucide:move-right" />
													</Button>
												</Col>
												<Col className='col-12 col-lg-7 mt-5 mt-lg-0 home__box-banner'>
													<img src={banner} className='w-75' alt="bannerImg" />
												</Col>
											</Row>
										</Container>
									</div>


									<Redirect from='/' to='/Home/default' />
								</Switch>
							</Box>
						) : null}
						<Box>
							<Footer />
						</Box>
					</Box>
				</SidebarContext.Provider>
			</Box>
		</Box>
	);
}
