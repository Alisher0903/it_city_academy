// Chakra imports
import { SimpleGrid, Text, useColorModeValue } from "@chakra-ui/react";
// Custom components
import Card from "../../../../components/card/Card.js";
import React from "react";
import Information from "../../../../views/admin/profile/components/Information";
import { Table } from "reactstrap";

// Assets
export default function GeneralInformation(props) {
  const { ...rest } = props;
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );
  return (
    <Card>
      <Text
        display="flex"
        justifyContent="space-between"
        color={textColorPrimary}
        fontWeight='bold'
        fontSize='2xl'
        mt='10px'
        mb='15px'>
        Group Information
        <select className="form-select w-50 rounded-0" id="selectStudent">
          <option selected disabled>Select Group</option>
        </select>
      </Text>
      <SimpleGrid>
        <Table dark hover>
          <thead>
            <tr>
              <th>#</th>
              <th>FIO</th>
              <th>PhoneNumber</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Sodiqov Alisher</td>
              <td>123456789</td>
            </tr>
          </tbody>
        </Table>
        {/* <Information
          boxShadow={cardShadow}
          title='Education'
          value='Stanford University'
        />
        <Information
          boxShadow={cardShadow}
          title='Languages'
          value='English, Spanish, Italian'
        />
        <Information
          boxShadow={cardShadow}
          title='Department'
          value='Product Design'
        />
        <Information
          boxShadow={cardShadow}
          title='Work History'
          value='Google, Facebook'
        />
        <Information
          boxShadow={cardShadow}
          title='Organization'
          value='Simmmple Web LLC'
        />
        <Information
          boxShadow={cardShadow}
          title='Birthday'
          value='20 July 1986'
        /> */}
      </SimpleGrid>
    </Card>
  );
}
