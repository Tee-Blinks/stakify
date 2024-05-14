import { useContext } from "react"
import Web3Context from "../../context/Web3Context"
import { Card, Heading, Text } from "@chakra-ui/react";

const ConnectedAccount = () => {
 const {selectedAccount} = useContext(Web3Context);
 console.log(selectedAccount)
 return(
      <Card padding={5}>
          <Heading>
               Connected Account
          </Heading>
          <Text padding={2}>
          {selectedAccount}
          </Text>
      </Card>
 )
}

export default ConnectedAccount