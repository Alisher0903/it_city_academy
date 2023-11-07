/*!
=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// Chakra imports
import { Box, SimpleGrid } from "@chakra-ui/react";
import CheckTable from "../../../views/admin/dataTables/components/CheckTable";
import ColumnsTable from "views/admin/dataTables/components/ColumnsTable";
import {
  columnsDataCheck,
  columnsDataColumns
} from "views/admin/dataTables/variables/columnsData";
import tableDataCheck from "views/admin/dataTables/variables/tableDataCheck.json";
import tableDataColumns from "views/admin/dataTables/variables/tableDataColumns.json";
import React from "react";

export default function Settings() {
  // Chakra Color Mode
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        mb='20px'
        columns={{ sm: 1, md: 1 }}
        spacing={{ base: "20px", xl: "20px" }}>
         <CheckTable columnsData={columnsDataCheck} />
      </SimpleGrid>
    </Box>
  );
}
