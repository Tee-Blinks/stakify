import ConnectedAccount from "./ConnectedAccount";
import ConnectedNetwork from "./ConnectedNetwork";
import {  Container, Flex } from "@chakra-ui/react";

const Navigation = () => {
  return (
    <nav>
      <Container minW={"960px"} py={4}>
        <Flex direction={"row"} justifyContent={"space-between"} gap={16}>
          <ConnectedAccount />
          <ConnectedNetwork />
        </Flex>
      </Container>
    </nav>
  );
};

export default Navigation;
