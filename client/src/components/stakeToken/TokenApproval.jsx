import { useRef, useContext } from "react";
import { ethers } from "ethers";
import Web3Context from "../../context/Web3Context";
import WebButton from "../button/Button";
import { Card, Input, FormControl, FormLabel } from "@chakra-ui/react";
import toast from "react-hot-toast"

const TokenApproval = () => {
  const { stakeTokenContract, stakingContract } = useContext(Web3Context);
  const approveTokenRef = useRef();
//   const [transactionStatus, setTransactionStatus] = useState("");
  const approveToken = async (e) => {
    e.preventDefault();
    const amount = approveTokenRef.current.value.trim();
    if (isNaN(amount) || amount <= 0) {
        toast.error("Please enter a valid positive number")
      return;
    }

    const amountToSend = ethers.parseUnits(amount, 18).toString();
    // console.log(amountToSend)
    try {
      const transaction = await stakeTokenContract.approve(
        stakingContract.target,
        amountToSend
      );
      await toast.promise(transaction.wait(), {
        loading: "Transaction is pending...",
        success: "Approved",
        error: "Transaction failed",
    })
      // console.log(transaction)
    //   setTransactionStatus("Transaction is in pending...");
    approveTokenRef.current.value

    //   const receipt = await transaction.wait();
    //   if (receipt.status === 1) {
    //     setTransactionStatus("Transaction is succesful");
    //     setTimeout(() => {
    //       setTransactionStatus("");
    //     }, 5000);
    //     approveTokenRef.current.value = "";
    //   } else {
    //     setTransactionStatus("Transaction failed");
    //   }
    } catch (error) {
      console.error("Token Approval failed", error.message);
    }
  };
  return (
    <Card padding={5}>
     
      <FormControl
        onSubmit={approveToken}
        display={"flex"}
        flexDirection={"column"}
      >
        <FormLabel>Amount to withdraw</FormLabel>
        <Input mb={4} type="text" ref={approveTokenRef}></Input>
        <WebButton
          onClick={approveToken}
          type="submit"
          label="Token Approval"
        />
      </FormControl>
    </Card>
  );
};

export default TokenApproval;
