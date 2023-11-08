// Chakra imports
import { Portal, Box, useDisclosure } from '@chakra-ui/react';
import Footer from 'components/footer/FooterAdmin.js';
import { motion } from 'framer-motion'
// Layout components
import Navbar from '../navbar/NavbarAdmin';
import Sidebar from '../sidebar/Sidebar';
import routes from '../routes.js';
import { SidebarContext } from '../contexts/SidebarContext';
import React, { useEffect, useState } from 'react';
import 'aos/dist/aos.css';
import { Redirect, Route, Switch } from 'react-router-dom';
import DestopNavbar from 'home/navbar/destopNavbar/DestopNavbar';
import "./homeStyle.scss";
import banner from "../../assets/img/homeImage/banner.png"
import { Button, Col, Container, Row } from 'reactstrap';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import Aos from 'aos';


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
	const login = () => document.getElementById("login").click();

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

	// aos npm 
	useEffect(() => {
		Aos.init();
	}, [])

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

									{/* Ochish */}


									<div className='homePage__main'>
										<div className='head-section'>
											<Container className='text-light'>
												<Row className='w-100'>
													<Col className='col-12 col-lg-5 home__box-content'>
														<h3 data-aos="fade-right"
															data-aos-duration="1500">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta,
															qui.</h3>
														<p data-aos="fade-right"
															data-aos-duration="3500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde id
															sunt adipisci aperiam aspernatur vel cum, reprehenderit similique
															suscipit qui!</p>
														<Link to="/auth" id='login'></Link>
														<button data-aos="fade-right"
															color='warning'
															outline
															onClick={login}
															className=' px-5 py-2 fs-5 btn btn-outline-primary'>
															Kirish
															<Icon className='d-inline ms-2' icon="lucide:move-right" />
														</button>

													</Col>
													<Col className='col-12 col-lg-7 mt-5 mt-lg-0 home__box-banner'>
														<img data-aos="fade-left"
															data-aos-offset="300"
															data-aos-easing="ease-in-sine" src={banner} className='w-75' alt="bannerImg" />
													</Col>
												</Row>
											</Container>

										</div>
										<section className='w-100 pb-5 section-third' initial="hidden" whileFocus="visible">
											<div className='w-100 pb-5 nimadr'>
												<h1 className='fs-1 text-center pt-5'> <b>Lorem, ipsum dolor.</b></h1>
												<p className='fs-2 text-center'>Lorem, ipsum. Lorem, ipsum. Lorem, ipsum dolor.</p>
											</div>
											<div data-aos="fade-left" className='flex-card'>
												<div data-aos="fade-right"
													data-aos-duration="3000" class="cardd">
													<div className="card-headd">
														<div className='card-style center-center'>
															<i class="fa-solid fa-bomb fs-1 mx-2"></i>
														</div>
													</div>
													<div class="card-bodyy">
														<h5 class="card-title">Special title treatment</h5>
														<p class="card-text"> lead-in to additional content.</p>
													</div>
												</div>
												<div data-aos="fade-right"
													data-aos-duration="3000" class="cardd">
													<div className="card-headd">
														<div className='card-style center-center'>
															<i class="fa-solid fa-bomb fs-1 mx-2"></i>
														</div>
													</div>
													<div class="card-bodyy">
														<h5 class="card-title">Special title treatment</h5>
														<p class="card-text"> lead-in to additional content.</p>
													</div>
												</div>
												<div data-aos="fade-right"
													data-aos-duration="3000" class="cardd">
													<div className="card-headd">
														<div className='card-style center-center'>
															<i class="fa-solid fa-bomb fs-1 mx-2"></i>
														</div>
													</div>
													<div class="card-bodyy">
														<h5 class="card-title">Special title treatment</h5>
														<p class="card-text"> lead-in to additional content.</p>
													</div>
												</div>
												<div data-aos="fade-right"
													data-aos-duration="3000" class="cardd">
													<div className="card-headd">
														<div className='card-style center-center'>
															<i class="fa-solid fa-bomb fs-1 mx-2"></i>
														</div>
													</div>
													<div class="card-bodyy">
														<h5 class="card-title">Special title treatment</h5>
														<p class="card-text"> lead-in to additional content.</p>
													</div>
												</div>
											</div>

										</section>
										<section className='forth-section center-center'>
											<div data-aos="zoom-out" data-aos-duration="1000" className='forth-in'>
												<h1 className='fs-1 mb-3'>Lorem ipsum dolor sit amet.</h1>
												<p className='w-75 fs-5 mb-5'>Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequuntur nobis neque repellat earum, adipisci voluptates.</p>
												<b>Axmad Yassaviy</b>
											</div>
										</section>
										<section className='five-section'>

											<div className='last-top'>
												<Container className='five-top px-4 center-center flex-column py-5'>
													<div className='fs-1'>Lorem ipsum dolor sit, amet consectetur </div>
													<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta nemo harum velit?</p>
												</Container>
												<div className='five-bot py-5'>
													<div className='second-card' data-aos="fade-up"
														data-aos-duration="1500">
														<div className='py-3'>
															<i class="fa-solid fa-code fs-1"></i>
														</div>
														<b>Lorem, ipsum dolor.</b>
														<p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorum natus exercitationem ea blanditiis amet fuga!z</p>
													</div>
													<div className='second-card' data-aos="fade-up"
														data-aos-duration="1500">
														<div className='py-3'>
															<i class="fa-solid fa-code fs-1"></i>
														</div>
														<b>Lorem, ipsum dolor.</b>
														<p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorum natus exercitationem ea blanditiis amet fuga!z</p>
													</div>
													<div className='second-card' data-aos="fade-up"
														data-aos-duration="1500">
														<div className='py-3'>
															<i class="fa-solid fa-code fs-1"></i>
														</div>
														<b>Lorem, ipsum dolor.</b>
														<p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorum natus exercitationem ea blanditiis amet fuga!z</p>
													</div>
													<div className='second-card' data-aos="fade-up"
														data-aos-duration="1500">
														<div className='py-3'>
															<i class="fa-solid fa-code fs-1"></i>
														</div>
														<b>Lorem, ipsum dolor.</b>
														<p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorum natus exercitationem ea blanditiis amet fuga!z</p>

													</div>
												</div>
											</div>
										</section>

									</div>
									{/* Yopish */}


									<Redirect from='/' to='/Home/default' />
								</Switch>
							</Box>
						) : null}
						<Box>
							<Footer />
						</Box>
					</Box>
				</SidebarContext.Provider>
			</Box >
		</Box >
	);
}