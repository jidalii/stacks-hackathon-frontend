"use client";

import React, { useEffect, useState } from "react";
import { StacksTestnet } from "@stacks/network";
import { AnchorMode, PostConditionMode, uintCV, principalCV, listCV } from "@stacks/transactions";
import { DistributeParams } from "../types/DistributeParams";
import { FinishedTxData } from "@stacks/connect-react"; // Import the FinishedTxData type
import { useConnect } from "@stacks/connect-react";
import ConnectWallet, { userSession } from "../components/ConnectWallet";
import { makeStandardSTXPostCondition, FungibleConditionCode } from "@stacks/transactions";

interface ContractCallPocketButtonProps {
  index: number;
  onClaim: (index: number) => void;
}

const ClaimRedPocketButton: React.FC<ContractCallPocketButtonProps> = ({ index, onClaim }) => {
  const { doContractCall } = useConnect();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const claim = (index: number) => {

    const postConditions = [
      makeStandardSTXPostCondition(
        "ST153CEHB9B8RGTT8NWGZX15H37KTH0S48WK0DC0H", // Replace with the recipient address
        FungibleConditionCode.GreaterEqual,
        0 // Replace with the actual transfer amount in micro-STX (1 STX = 1,000,000 micro-STX)
      )
    ];

    doContractCall({
      network: new StacksTestnet(),
      anchorMode: AnchorMode.Any,
      contractAddress: "ST153CEHB9B8RGTT8NWGZX15H37KTH0S48WK0DC0H",
      contractName: "red9",
      functionName: "claimRedPocket",
      functionArgs: [
        uintCV(index),
      ],
      postConditionMode: PostConditionMode.Allow,
      postConditions: postConditions,
      onFinish: (data: FinishedTxData) => {
        console.log("onFinish:", data);
        window
          .open(
            `https://explorer.hiro.so/txid/${data.txId}?chain=testnet`,
            "_blank"
          )
          ?.focus();
      },
      onCancel: () => {
        console.log("onCancel:", "Transaction was canceled");
      },
    });
  }
  if (!mounted || !userSession.isUserSignedIn()) {
    return null;
  }

  return (
    <div className="Container">
      {/* <h3>Vote via Smart Contract</h3> */}
      <button onClick={() => claim(index)}>
        claim
      </button>

    </div>
  );
}
export default ClaimRedPocketButton;