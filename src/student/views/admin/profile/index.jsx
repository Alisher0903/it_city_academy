/*!

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// Chakra imports
import { Box, Grid } from "@chakra-ui/react";

// Custom components
import Banner from "../../../views/admin/profile/components/Banner";
import General from "../../../views/admin/profile/components/General";

// Assets
import banner from "../../../assets/img/auth/banner.png";
import avatar from "../../../assets/img/avatars/avatar4.png";
import React from "react";
import axios from "axios";
import { api } from "api/api";
import { config } from "api/api";
import { useEffect } from "react";
import { useState } from "react";

export default function Overview() {
  const [info, setInfo] = useState({});

  useEffect(() => {
    getProfile();
  }, []);

  function getProfile() {
    axios.get(api + "user/getMe", config)
      .then(res => {
        setInfo(res.data)
        // console.log(res.data);
      })
      // .catch(err => consol e.log(err))
  }
  // console.log(info);

  

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}> 
      {/* Main Fields */}
      <Grid
        templateColumns={{
          base: "1fr",
          lg: "repeat(2, 1fr)",
          "2xl": "repeat(2, 1fr)",
        }}

        gap={{ base: "20px", xl: "20px" }}>
      
          <Banner
            gridArea='1 / 1 / 2 / 2'
            banner={banner}
            avatar={avatar}
            name={info.firstName}
            lastName={info.lastName}
            // job={}
            posts={info.current_rate}
            followers={info.used_rate}
          />
        <General
          gridArea={{ base: "2 / 1 / 3 / 2", lg: "1 / 2 / 2 / 3" }}
          minH='365px'
          pe='20px'
        />
      </Grid>
    </Box>
  );
}
