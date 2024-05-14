import {  useRef, useContext } from "react";
import { ethers } from "ethers";
import Web3Context from "../../context/Web3Context";
import WebButton from "../button/Button";
import StakingContext from "../../context/StakingContext";
import { Card, Input, FormControl, FormLabel } from "@chakra-ui/react";
import toast from "react-hot-toast"

const Withdraw = () => {
  const { stakingContract } = useContext(Web3Context);
  const withdrawStakeRef = useRef();
  const { isReload, setIsReload } = useContext(StakingContext);
//   const [transactionStatus, setTransactionStatus] = useState("");
  const withdrawStakeToken = async (e) => {
    e.preventDefault();
    const amount = withdrawStakeRef.current.value.trim();
    if (isNaN(amount) || amount <= 0) {
        toast.error("Please enter a valid positive number")
      return;
    }

    const amountToWithdraw = ethers.parseUnits(amount, 18).toString();
    // console.log(amountToSend)
    try {
      const transaction = await stakingContract.withdraw(amountToWithdraw);
      await toast.promise(transaction.wait(), {
        loading: "Transaction is pending...",
        success: "Transaction Successful",
        error: "Transaction failed",
    })
      // console.log(transaction)
      withdrawStakeRef.current.value = ''
      setIsReload(!isReload);

    //   const receipt = await transaction.wait();
    //   if (receipt.status === 1) {
    //     setTransactionStatus("Transaction is succesful");
    //     setTimeout(() => {
    //       setTransactionStatus("");
    //     }, 5000);
    //     withdrawStakeRef.current.value = "";
    //   } else {
    //     setTransactionStatus("Transaction failed");
    //   }
    } catch (error) {
      console.error("stake withdrawal  failed", error.message);
    }
  };
  return (
    <Card padding={5}>

      <FormControl
        onSubmit={withdrawStakeToken}
        display={"flex"}
        flexDirection={"column"}
      >
        <FormLabel>Amount to withdraw</FormLabel>
        <Input mb={4} type="text" ref={withdrawStakeRef}></Input>
        <WebButton
          onClick={withdrawStakeToken}
          type="submit"
          label="Withdraw your stake"
        />
      </FormControl>
    </Card>
  );
};

export default Withdraw;
