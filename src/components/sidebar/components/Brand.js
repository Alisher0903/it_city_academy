import React from "react";
import "./brand.scss";

// Chakra imports
import { Flex, Link, useColorModeValue } from "@chakra-ui/react";

// Custom components
import { HorizonLogo } from "components/icons/Icons";
import { HSeparator } from "components/separator/Separator";

// logo
import logo from "./logo.png";

export function SidebarBrand() {
  //   Chakra color mode
  let logoColor = useColorModeValue("navy.700", "white");

  return (
    <Flex align='center' direction='column'>
      <Link href="/#/admin/default">
        {/* <img src={logo} alt="img" className="mb-3" /> */}
        <p className="text-center mb-3 it__logo">
          IT CITY <br /> ACADEMY
        </p>
      </Link>
      {/* <HorizonLogo h='26px' w='175px' my='32px' color={logo} /> */}
      <HSeparator mb='20px' />
    </Flex>
  );
}

export default SidebarBrand;
