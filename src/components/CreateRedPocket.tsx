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
  params: DistributeParams;
  onDistribute: (params: DistributeParams) => void;
}

const ContractCallPocketButton: React.FC<ContractCallPocketButtonProps> = ({ params, onDistribute }) => {
  const { doContractCall } = useConnect();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const distribute = (params: DistributeParams) => {
    const addressesCV = listCV(params.addresses.map(address => principalCV(address)));

    const postConditions = [
      makeStandardSTXPostCondition(
        "ST153CEHB9B8RGTT8NWGZX15H37KTH0S48WK0DC0H", // Replace with the recipient address
        FungibleConditionCode.Equal,
        params.amount // Replace with the actual transfer amount in micro-STX (1 STX = 1,000,000 micro-STX)
      )
    ];

    doContractCall({
      network: new StacksTestnet(),
      anchorMode: AnchorMode.Any,
      contractAddress: "ST153CEHB9B8RGTT8NWGZX15H37KTH0S48WK0DC0H",
      contractName: "red9",
      functionName: "createRedPocket",
      functionArgs: [
        uintCV(params.amount),
        uintCV(params.mode),
        addressesCV,
        uintCV(params.revealBlock),
        uintCV(params.claimDuration),
      ],
      postConditionMode: PostConditionMode.Deny,
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
      <button                   className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
onClick={() => distribute(params)}>
        create Pocket
      </button>

    </div>
  );
}
export default ContractCallPocketButton;