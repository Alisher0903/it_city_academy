import { Box, useColorModeValue } from "@chakra-ui/react";

function Detielis() {
    const textColor = useColorModeValue("navy.700", "white");

    return (
        <Box
            color={textColor}
            pt={{ base: "130px", md: "80px", xl: "100px" }}>
            Detielis.js
        </Box>
    );
}

export default Detielis;