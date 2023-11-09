import React from "react";
import { Flex, Link, useColorModeValue } from "@chakra-ui/react";
import { HSeparator } from "../../../components/separator/Separator";

export function SidebarBrand() {
  let logoColor = useColorModeValue("navy.700", "white");

  return (
    <Flex align='center' direction='column'>
      <Link href="/#/Teacher/default">
        <p className="text-center mb-3 it__logo">
          IT CITY <br /> ACADEMY
        </p>
      </Link>
      <HSeparator mb='20px' />
    </Flex>
  );
}

export default SidebarBrand;
