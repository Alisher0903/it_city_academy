import {
  Flex,
  Table,
  Checkbox,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  Radio,
  RadioGroup,
  Stack,
  Button,
  Box,
  EditableTextarea,
  Textarea,
  Select

} from "@chakra-ui/react";
import { Input, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import React, { useEffect, useMemo, useState } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";

// Custom components
import Card from "components/card/Card";
// import Menu from "components/menu/MainMenu";
import axios from "axios";
import { api } from "api/api";
import { config } from "api/api";
import { MdArrowDropDown } from "react-icons/md";
import { messageAdd } from "api/api";
export default function CheckTable(props) {
  const openEditModal = () => setEditModal(!editModal);

  // const tableInstance = useTable(
  //   useGlobalFilter,
  //   useSortBy,
  //   usePagination
  // );

  // const {
  //   getTableProps,
  //   getTableBodyProps,
  //   headerGroups,
  //   page,
  //   prepareRow,
  //   initialState,
  // } = tableInstance;
  // initialState.pageSize = 11;

  const [editModal, setEditModal] = useState(false);
  const [checkedItems, setCheckedItems] = React.useState([false, false])

  // // const allChecked = checkedItems.every(Boolean)
  const bg = useColorModeValue("white", "navy.700");
  // // const isIndeterminate = checkedItems.some(Boolean) && !allChecked


  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  const [group, setGroup] = useState([]);
  const [message, setMessage] = useState([]);


  useEffect(() => {
    getMessage()
  }, []);

  function getMessage() {
    axios.get(api + "message", config)
      .then(res => {
        setMessage(res.data.body.object)
      })
  }



  return (
    <Box
      direction='column'
      w='100%'
      px='0px'
      overflowX={{ sm: "scroll", lg: "hidden" }}>
      <Flex px='25px' justify='space-between' mb='20px' align='center'>
        <Text
          color={textColor}
          fontSize='25px'
          fontWeight='700'
          lineHeight='100%'
          align="center">
          
        </Text>
        
      </Flex>
      {message.length && message.map((item, i) =>
        <Card
          key={i}
          fontSize={{ sm: "14px" }}
          minW={{ sm: "150px", md: "200px", lg: "auto" }}
          bg={bg}
          mb="20px"
          borderColor='transparent'>
          <Text color={textColor} fontSize='17px' fontWeight='700'>
            {item.description}
          </Text>
        </Card>
      )}

      
    </Box>
  );
}
