/* eslint-disable */
import {
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Card from "../../../../components/card/Card";
import { AndroidLogo, AppleLogo, WindowsLogo } from "../../../../components/icons/Icons";
import Menu from "../../../../components/menu/MainMenu";
import React, { useMemo } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";

export default function DevelopmentTable(props) {
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
  initialState.pageSize = 11;

  const textColor = useColorModeValue("secondaryGray.900", "white");
  return (
    <
      
      // overflowX={{ sm: "scroll", lg: "hidden" }}
      >
      {/* <Table {...getTableProps()} variant='simple' color='gray.500' mb='24px'>
        <Tbody {...getTableBodyProps()}> */}
          {page.map((row, index) => {
            prepareRow(row);
            return (
              <div {...row.getRowProps()} key={index}>
                {row.cells.map((cell, index) => {
                  let data = "";
                  if (cell.column.Header === "NAME") {
                    data = (
                      <Card color={textColor} fontSize='sm' fontWeight='700' width="100%">
                        {cell.value}
                      </Card>
                    );
                  } 
                  return (
                    <div 
                      {...cell.getCellProps()}
                      key={index}
                      fontSize={{ sm: "14px" }}
                      minW={{ sm: "150px", md: "200px", lg: "auto" }}
                      borderColor='transparent'>
                      {data}
                    </div>
                  );
                })}
              </div>
            );
          })}
        {/* </Tbody>
      </Table> */}
    </>
  );
}
