/*eslint-disable*/
import React from "react";
import {
  Flex,
  Link,
  List,
  ListItem,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { Icon } from "@iconify/react";

export default function Footer() {
  let textColor = useColorModeValue("gray.400", "white");
  let linkColor = useColorModeValue({ base: "gray.400", lg: "white" }, "white");
  return (
    <Flex
      zIndex='3'
      flexDirection={{
        base: "column",
        lg: "row",
      }}
      alignItems={{
        base: "center",
        xl: "start",
      }}
      justifyContent='space-between'
      px={{ base: "30px", md: "0px" }}
      pb='30px'>
      <Text
        color={textColor}
        textAlign={{
          base: "center",
          xl: "start",
        }}
        mb={{ base: "20px", lg: "0px" }}>
        {" "}
        &copy; {1900 + new Date().getYear()}
        <Text as='span' fontWeight='500' ms='4px'>
          It City Academy. O'qishga marhamat
          {/* Horizon UI. All Rights Reserved. Made with love by
>>>>>>> a7d3d23ca972fcf66adc3da8f4832b84408f2399
          <Link
            mx='3px'
            color={textColor}
            href=''
            target='_blank'
            fontWeight='700'>
            Simmmple!
          </Link> */}
        </Text>
      </Text>
      <List display='flex'>
        {/* <ListItem
          me={{
            base: "20px",
            md: "44px",
          }}>
          <Link
            fontWeight='500'
            color={linkColor}
            href='mailto:hello@simmmple.com?ref=horizon-chakra-free'>
            Support
          </Link>
        </ListItem> */}
        <ListItem
          me={{
            base: "20px",
            md: "44px",
          }}>
          Ijtimoiy tarmoqlar:
          {/* <Link
            fontWeight='500'
            color={linkColor}
            href='https://www.simmmple.com/licenses?ref=horizon-chakra-free'>
            License
          </Link> */}
        </ListItem>
        <ListItem
          me={{
            base: "20px",
            md: "44px",
          }}>
          <Link
            fontWeight='500'
            color={linkColor}
            href='https://t.me/itcity_academy'>
            <Icon icon="logos:telegram" width="20" className="d-inline-block me-1" />
            Telegram
          </Link>
        </ListItem>
        <ListItem>
          <Link
            fontWeight='500'
            color={linkColor}
            href='https://www.instagram.com/itcity_academy/'>
            <Icon icon="skill-icons:instagram" width="20" className="d-inline-block me-1" />
            Instagram
          </Link>
        </ListItem>
      </List>
    </Flex>
  );
}
