/*!
=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import { Box, SimpleGrid } from "@chakra-ui/react";
// import DevelopmentTable from "../../../views/admin/dataTables/components/DevelopmentTable";
// import {
//   columnsDataDevelopment  
// } from "../../../views/admin/dataTables/variables/columnsData";
// import tableDataDevelopment from "../../../views/admin/dataTables/variables/tableDataDevelopment.json"; 
import React from "react";
import CheckTable from "./components/CheckTable";

export default function Settings() {
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        mb='20px'
        columns={{ sm: 1 }}
        spacing={{ base: "20px", xl: "20px" }}>
        <CheckTable />
      </SimpleGrid>
    </Box>
  );  
}
