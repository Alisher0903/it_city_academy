import { Box, Grid } from "@chakra-ui/react";
import General from "../../../views/admin/profile/components/General";
import React from "react";

export default function Overview() {
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Grid>
        <General
          gridArea={{ base: "2 / 1 / 3 / 2", lg: "1 / 2 / 2 / 3" }}
          minH='365px'
          pe='20px'
        />
      </Grid>
    </Box>
  );
}
