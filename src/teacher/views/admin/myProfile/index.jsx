import { Box, Grid } from "@chakra-ui/react";
import Banner from "./components/Banner";
import Upload from "./components/Upload";
import banner from "../../../assets/img/auth/banner.png";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { api, config, teacherUrl } from "api/api";

export default function Overview() {

  const [getMeTeacher, setGetMeTeacher] = useState([]);
  const [itemGroup, setItemGroup] = useState([]);

  useEffect(() => {
    getMe();
    axios.get(api + teacherUrl, config).then(res => setItemGroup(res.data.body));
  }, []);

  const itemLength = itemGroup.length;

  // get me
  const getMe = () => {
    axios.get(api + "user/getMe", config)
      .then(res => setGetMeTeacher(res.data));
  }

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "100px" }}>
      <Grid
        gap={{ base: "15px", xl: "15px" }}>
        <Banner
          gridArea='1 / 1 / 2 / 2'
          banner={banner}
          itemLength={itemLength}
          name={getMeTeacher.firstName}
          lastName={getMeTeacher.lastName}
        />
        <Upload
          phoneNumber={getMeTeacher.phoneNumber}
          email={getMeTeacher.email}
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
