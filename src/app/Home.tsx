// Home.tsx

"use client";


import React, { useState, useCallback } from 'react';
import { useConnect } from "@stacks/connect-react"; // Import useConnect hook
import { Coins, AlertCircle } from 'lucide-react';

import { TimeInputs } from '../components/TimeInputs';
import { AddressList } from '../components/AddressList';
import { StacksTestnet } from "@stacks/network";
import { AnchorMode, PostConditionMode, uintCV, principalCV, listCV } from "@stacks/transactions";
import { DistributeParams } from "../types/DistributeParams";
import { FinishedTxData } from "@stacks/connect-react"; 

export default function Home() {
  const { doContractCall } = useConnect(); // Now safe to use useConnect

  const distribute = (params: DistributeParams) => {
    const addressesCV = listCV(params.addresses.map(address => principalCV(address)));

    doContractCall({
      network: new StacksTestnet(),
      anchorMode: AnchorMode.Any,
      contractAddress: "ST153CEHB9B8RGTT8NWGZX15H37KTH0S48WK0DC0H",
      contractName: "redPocket",
      functionName: "createRedPocket",
      functionArgs: [
        uintCV(params.amount),
        uintCV(params.mode),
        addressesCV,
        uintCV(params.revealBlock),
        uintCV(params.claimDuration),
      ],
      postConditionMode: PostConditionMode.Deny,
      postConditions: [],
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
  };

  const [distribution, setDistribution] = useState<DistributeParams>({
    amount: 0,
    mode: 0,
    addresses: [],
    revealBlock: 0,
    claimDuration: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting distribution:", distribution);
    distribute(distribution);
  };

  // Rest of your form and component logic goes here...
}
