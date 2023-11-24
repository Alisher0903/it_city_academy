// Chakra imports
import { Grid, Text, useColorModeValue } from "@chakra-ui/react";
// Assets
import Project1 from "../../../../assets/img/profile/Project1.png";
import Project2 from "../../../../assets/img/profile/Project2.png";
import Project3 from "../../../../assets/img/profile/Project3.png";
// Custom components
import Card from "../../../../components/card/Card.js";
import React, { useEffect, useState } from "react";
import Project from "../../../../views/admin/profile/components/Project";
import axios from "axios";
import { api } from "api/api";
import { config } from "api/api";
import { imgUrl } from "api/api";

export default function Projects(props) {
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );
  const [exchange, setExchange] = useState([]);
  const [error, setError] = useState(null); // Xatolik haqida xabar

  useEffect(() => {
    getExchange();
  }, [])

  function getExchange() {
    axios.get(api + "exchange/user", config)
      .then(res => {
        setExchange(res.data.message)
        console.log(res.data.message);

      })
      .catch(err => {
        console.log(err);
        setError(error);
      })
  }

  return (
    <Card mb={{ base: "0px", "2xl": "20px" }}>
      <Text
        color={textColorPrimary}
        fontWeight='bold'
        fontSize='2xl'
        mt='10px'
        mb='40px'>
        Your gifts
      </Text>
      <Grid
        mb='20px'
        templateColumns={{
          base: "1fr",
          lg: "repeat(2, 1fr)",
          "2xl": "1fr 1fr",
        }}
        templateRows={{
          base: "1fr",
        }}
        gap={{ base: "15px", xl: "15px" }}>
        {
          error ? (
            <Project
              boxShadow={cardShadow}
              mb='10px'
              image={Project2}
              ranking='1'
              link='#'
              title='Technology behind the Blockchain'
            />
          ) : (
            exchange.message ? (
              <p>{exchange.message}</p>
            ) : (
              exchange.map((item, index) => (
                <Project
                  key={index}
                  boxShadow={cardShadow}
                  mb='10px'
                  image={(item.attachmentId != 0) ? imgUrl + item.attachmentId : Project2}
                  ranking={item.rate}
                  title={item.name}
                />
              ))
            )
          )
        }
      </Grid>

    </Card>
  );
}
