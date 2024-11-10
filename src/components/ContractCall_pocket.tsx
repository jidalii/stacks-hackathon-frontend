"use client";

import React, { useEffect, useState } from "react";
import { useConnect } from "@stacks/connect-react";
import { StacksTestnet } from "@stacks/network";
import {
  AnchorMode,
  PostConditionMode,
  stringUtf8CV,
  uintCV,
  principalCV,
  // addressCV,
  tupleCV,
  listCV,
} from "@stacks/transactions";

import { userSession } from "./ConnectWallet";

const ContractCallPocket = () => {
  const { doContractCall } = useConnect();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // (amount uint) (mode uint) (addresses (list 3 principal)) (revealBlock uint) (claimDuration uint)
  // function distribute(amount: number, mode: number, addresses: string[], revealBlock: number, claimDuration: number) {
  function distribute() {
    const amount = 1;
    const mode = 0;
    const addresses = [
      'ST3EZR0XEXKHD0JWT9QQ9VK4HBY463N9HJXQMRAX0',
      'ST153CEHB9B8RGTT8NWGZX15H37KTH0S48WK0DC0H',
      'ST3EZR0XEXKHD0JWT9QQ9VK4HBY463N9HJXQMRAX0'
    ];

    const revealBlock = 3;
    const claimDuration = 1000
    const addressesCV = listCV(addresses.map(address => principalCV(address)));

    doContractCall({
      network: new StacksTestnet(),
      anchorMode: AnchorMode.Any,
      contractAddress: "ST153CEHB9B8RGTT8NWGZX15H37KTH0S48WK0DC0H",
      contractName: "redPocket",
      functionName: "createRedPocket",
      functionArgs: [
        uintCV(amount), // amount uint
        uintCV(mode), // mode uint
        addressesCV, // addresses (list of ClarityValues)
        uintCV(revealBlock), // revealBlock uint
        uintCV(claimDuration), // claimDuration uint
      ],
      postConditionMode: PostConditionMode.Deny,
      postConditions: [],

      onFinish: (data) => {
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
      <button onClick={() => distribute()}>
        create Pocket
      </button>

    </div>
  );
};

export default ContractCallPocket;
