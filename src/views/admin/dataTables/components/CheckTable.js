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
import {  Input, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import React, { useEffect, useMemo, useState } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";

// Custom components
import Card from "components/card/Card";
import Menu from "components/menu/MainMenu";
import axios from "axios";
import { api } from "api/api";
import { config } from "api/api";
import { MdArrowDropDown } from "react-icons/md";
export default function CheckTable(props) {
  const { columnsData, tableData } = props;

  const [value, setValue] = useState('1')

  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);
  const openEditModal = () => setEditModal(!editModal);

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    initialState,
  } = tableInstance;
  initialState.pageSize = 11;

  const [editModal, setEditModal] = useState(false);
  const [checkedItems, setCheckedItems] = React.useState([false, false])

  const allChecked = checkedItems.every(Boolean)
  const bg = useColorModeValue("white", "navy.700");
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked


  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  const [group, setGroup] = useState([]);


  useEffect(() => {
    getGroup();
  }, []);

  function getGroup() {
    axios.get(api + "group?page=0&size=10", config)
      .then(res => {
        setGroup(res.data.body.object)
      })
      .catch(err => console.log(err))
  }

  console.log(group);

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
          Sent messages
        </Text>
        <Button
          onClick={() => {
            openEditModal();
          }}
          color={textColor}
          fontSize='15px'
          fontWeight='700'
          align="center"
          lineHeight='100%'>
          Send message
        </Button>
      </Flex>
      {group.length && group.map((item, i) => {

        return (

          <Card
            key={i}
            fontSize={{ sm: "14px" }}
            minW={{ sm: "150px", md: "200px", lg: "auto" }}
            bg={bg}
            mb="20px"
            borderColor='transparent'>
            <Text color={textColor} fontSize='17px' fontWeight='700'>
              {item.name}
            </Text>
          </Card>
        );
      })}

      <Modal isOpen={editModal} centered size="lg" className="group__modals">
        <ModalHeader toggle={openEditModal} className="group__modal-head">Group Edit</ModalHeader>
        <ModalBody className="group__modal-body">
          <Textarea  placeholder="Write message" style={{border: "1px solid black"}}/>
          <Select icon={<MdArrowDropDown />} w="50%" style={{border: "1px solid black"}} display="inline-block" >
            <option selected disabled>select group</option>
          {group.length && group.map((item, i) => 
            <option value={i} key={i}>{item.name}</option>
          )} 
          </Select>
          <Flex w="50%" display="flex" >
            <Checkbox color="black"></Checkbox>
            <Text>Send to all members of the group</Text>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button onClick={openEditModal} color="dark">Back</Button>
          <Button color="success">Send</Button>
        </ModalFooter>
      </Modal>
    </Box>
  );
}
