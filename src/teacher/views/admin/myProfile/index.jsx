import { Box, Grid } from "@chakra-ui/react";
import Banner from "../../../views/admin/myProfile/components/Banner";
import Notifications from "../../../views/admin/myProfile/components/Notifications";
import Upload from "../../../views/admin/myProfile/components/Upload";
import banner from "../../../assets/img/auth/banner.png";
import React from "react";

export default function Overview() {
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "100px" }}>
      <Grid
        gap={{ base: "15px", xl: "15px" }}>
        <Banner
          gridArea='1 / 1 / 2 / 2'
          banner={banner}
          name='Adela Parkson'
          job='Product Designer'
          posts='17'
          followers='9.7k'
          following='274'
        />
        <Upload
          gridArea={{ base: "2 / 1 / 3 / 2", lg: "1 / 2 / 2 / 3" }}
          minH={{ base: "auto", lg: "420px", "2xl": "365px" }}
          pe='20px'
          pb={{ base: "100px", lg: "20px" }}
        />
      </Grid>
      {/* <Grid
        mb='20px'
        templateColumns={{
          base: "1fr",
          lg: "repeat(2, 1fr)",
          "2xl": "1.34fr 1.62fr 1fr",
        }}
        templateRows={{
          base: "1fr",
          lg: "repeat(2, 1fr)",
          "2xl": "1fr",
        }}
        gap={{ base: "20px", xl: "20px" }}>
        <Projects
          gridArea='1 / 2 / 2 / 2'
          banner={banner}
          avatar={avatar}
          name='Adela Parkson'
          job='Product Designer'
          posts='17'
          followers='9.7k'
          following='274'
        />
        <General
          gridArea={{ base: "2 / 1 / 3 / 2", lg: "1 / 2 / 2 / 3" }}
          minH='365px'
          pe='20px'
        />
        <Notifications
          used={25.6}
          total={50}
          gridArea={{
            base: "3 / 1 / 4 / 2",
            lg: "2 / 1 / 3 / 3",
            "2xl": "1 / 3 / 2 / 4",
          }}
        />
      </Grid> */}
    </Box>
  );
}
