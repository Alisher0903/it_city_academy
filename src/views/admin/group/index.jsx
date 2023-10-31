/*
   _________________  __________________________        __________________  _________________  __________________________ ____          ____     
  |_____     ______| |__________      _________|       |   ______________| |_____      _____| |__________      _________| \   \        |   |
        |   |                  |     |               |    |                      |    |                 |     |            \   \      |   |
        |   |                  |     |              |    |                       |    |                 |     |             \   \    |   |
        |   |                  |     |             |    |                        |    |                 |     |              \   \  |   |
        |   |                  |     |             |    |                        |    |                 |     |               \   \|   |
        |   |                  |     |             \    \                        |    |                 |     |                \      |
        |   |                  |     |              \    \                       |    |                 |     |                 \     |
   _____|   |________          |     |               \    \_______________  _____|    |_______          |     |                 \     |
  |_________________|          |_____|                 \_________________| |_________________|          |_____|                 \_____|
          ________
        |   ___   \
       |   |   \   \
      |   |     \   \
     |   |_______\   \
    |   ___________   \
   |   |           \   \
  |   |            \   \
  |   |            \   \
  |___|            \___\
*/

// Chakra imports
import { Box, Grid } from "@chakra-ui/react";

// Custom components
import Banner from "views/admin/profile/components/Banner";
import General from "views/admin/profile/components/General";
import Notifications from "views/admin/profile/components/Notifications";
import Storage from "views/admin/profile/components/Storage";
import Upload from "views/admin/profile/components/Upload";
import Projects from "./components/Projects";

// Assets
import React from "react";

export default function Group() {
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }} maxH={{base: "100px"}}>
      <Grid>
        <Projects />
       
      </Grid>
    </Box>
  );
}
