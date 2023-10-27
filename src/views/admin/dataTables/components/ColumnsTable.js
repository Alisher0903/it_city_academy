import {
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useMemo } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";

// Custom components
import Card from "components/card/Card";
import { IoSendOutline } from "react-icons/io5";
// import Menu from "components/menu/MainMenu";
export default function ColumnsTable(props) {
  const { columnsData, tableData } = props;

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
  initialState.pageSize = 5;

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  const inputText = useColorModeValue("gray.700", "gray.100");
  return (
    <Card
      direction='column'
      w='100%'
      px='30px'
      overflowX={{ sm: "scroll", lg: "hidden" }}>
      <InputGroup size='md' >
        <Input
        color={inputText}
          pr='4.5rem'
          placeholder='Write message'
        />
        <InputRightElement width='2.5rem'>
          <IconButton
            variant='outline'
            colorScheme='teal'
            aria-label='Send email'
            icon={<IoSendOutline />}
          />
        </InputRightElement>
      </InputGroup>
    </Card>
  );
}
