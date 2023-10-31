import {
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useEffect, useMemo } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";

// Custom components
import Card from "components/card/Card";
import { IoSendOutline } from "react-icons/io5";
import { Toast } from "reactstrap";
import axios from "axios";
import { api } from "api/api";
import { config } from "api/api";
import { toast } from "react-toastify";
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

  function getRestuarantObj() {
    const messageObj = new FormData();
    messageObj.append('messageid', document.getElementById('messageid').value);
    return messageObj;
  }

  useEffect (() => {
    postMessage();
  }, []);


  const postMessage = () => {
    axios.post(api + "message/save", getRestuarantObj(), config)
    .then(() => {
        toast.success("Xabar muvaffaqiyatli jo'natildi✔");
    }).catch(() => {
        toast.error("Xabar jonatilmadi!!!");
        // console.log(err);
    })
  }
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
          id="messageid"
        />
        <InputRightElement width='2.5rem'>
          <IconButton
            variant='outline'
            colorScheme='teal'
            aria-label='Send email'
            icon={<IoSendOutline />}
            onClick={postMessage}
          />
        </InputRightElement>
      </InputGroup>
    </Card>
  );
}
