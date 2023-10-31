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
} from "@chakra-ui/react";
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
export default function CheckTable(props) {
  const { columnsData, tableData } = props;

  const [value, setValue] = useState('1')

  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);

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

  const [checkedItems, setCheckedItems] = React.useState([false, false])

  const allChecked = checkedItems.every(Boolean)
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked


  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  const [group, setGroup] = useState([]);


  useEffect(() => {
    getGroup();
  }, []);

  function getGroup() {
    axios.get(api + "group")
      .then(res => {
        setGroup(res.data.body)
      })
      .catch(err => console.log(err))
  }

  console.log(group);

  return (
    <Card
      direction='column'
      w='100%'
      px='0px'
      overflowX={{ sm: "scroll", lg: "hidden" }}>
      <Flex px='25px' justify='space-between' mb='20px' align='center'>
        <Text
          color={textColor}
          fontSize='22px'
          fontWeight='700'
          lineHeight='100%'>
          Message
        </Text>
        <Checkbox
          isChecked={allChecked}
          isIndeterminate={isIndeterminate}
          onChange={(e) => setCheckedItems([e.target.checked, e.target.checked])}
        >
          All
        </Checkbox>
      </Flex>
      <Table variant='simple' color='gray.500' mb='24px'>
        <Thead>
          <Tr>
            <Th
              pe='10px'
              borderColor={borderColor}>
              <Flex
                justify='space-between'
                align='center'
                fontSize={{ sm: "10px", lg: "12px" }}
                color='gray.400'>
                Group name
              </Flex>
            </Th>
            <Th
              pe='10px'
              borderColor={borderColor}>
              <Flex
                justify='space-between'
                align='center'
                fontSize={{ sm: "10px", lg: "12px" }}
                color='gray.400'>
                Teacher name
              </Flex>
            </Th>
          </Tr>
        </Thead>
        <Tbody >
          <Tr>
            {group.length && group.map((item, i) => {
              // <Flex align='center'>
              //   <Checkbox
              //     value={i + 1}
              //     colorScheme='brandScheme'
              //     me='10px'
              //   />
              //   <Text color={textColor} fontSize='sm' fontWeight='700'>
              //     {item.value[0]}
              //   </Text>
              // </Flex>
              // return (
                <Td
                  key={i}
                  fontSize={{ sm: "14px" }}
                  minW={{ sm: "150px", md: "200px", lg: "auto" }}
                  borderColor='transparent'>
                  <Text color={textColor} fontSize='sm' fontWeight='700'>
                    {item.name}
                  </Text>
                </Td>
              // );
            })}
          </Tr>
        </Tbody>
      </Table>
    </Card>
  );
}
