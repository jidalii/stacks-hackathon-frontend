"use client";

//import React from "react";
import styles from "./page.module.css";

import { Connect } from "@stacks/connect-react";
import ConnectWallet, { userSession } from "../components/ConnectWallet";
import ContractCallPocketButton from "../components/CreateRedPocket";
import ClaimRedPocketButton from "../components/ClaimRedPocket";
import React, { useState, useCallback } from 'react';
import { Coins, AlertCircle } from 'lucide-react';
import { DistributeParams } from "../types/DistributeParams";

import { TimeInputs } from '../components/TimeInputs';
import { AddressList } from '../components/AddressList';
import { StacksTestnet } from "@stacks/network";
import { AnchorMode, PostConditionMode, uintCV, principalCV, listCV } from "@stacks/transactions";
import { FinishedTxData } from "@stacks/connect-react"; 
import Link from 'next/link';


export default function Home() {
  // const { doContractCall } = useConnect(); // useConnect inside component

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

  const claim = (index: number) => {

    const postConditions = [
      makeStandardSTXPostCondition(
        "ST153CEHB9B8RGTT8NWGZX15H37KTH0S48WK0DC0H", // Replace with the recipient address
        FungibleConditionCode.Equal,
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
    distribute(distribution); // Pass doContractCall to distribute
  };

  const addAddress = useCallback(() => {
    setDistribution(prev => ({
      ...prev,
      addresses: [...prev.addresses, ""]
    }));
  }, []);

  const removeAddress = useCallback((index: number) => {
    setDistribution(prev => ({
      ...prev,
      addresses: prev.addresses.filter((_, i) => i !== index)
    }));
  }, []);

  const updateAddress = useCallback((index: number, value: string) => {
    setDistribution(prev => ({
      ...prev,
      addresses: prev.addresses.map((addr, i) => (i === index ? value : addr))
    }));
  }, []);

  const authOptions = {
    appDetails: {
      name: "Stacks Next.js Template",
      icon: "/logo.png",
    },
    userSession,
    redirectTo: "/",
    onFinish: () => {
      window.location.reload();
    },
  };


  return (
    <Connect
      authOptions={authOptions}
    >
      <main className={styles.main}>
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">


                 {/* Navigation Bar */}
                 <nav className="mb-6">
                <ul className="flex space-x-4">
                    
                    <li className="relative border-r border-gray-300 pr-4">
                          <Link href="/" className="text-indigo-600 hover:underline">
                        Distribute Pocket
                    </Link>
                    </li>

                    <li className="relative border-r border-gray-300 pr-4"> {/* Added border and padding */}
                    <Link href="/claim" className="text-indigo-600 hover:underline">
                        Claim Pocket
                    </Link>
                    </li>

                    <li className="relative">
                    <Link href="/friends" className="text-indigo-600 hover:underline">
                        Find Friends
                    </Link>
                    </li>
                </ul>
                </nav>


            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-3">
                  <Coins className="w-8 h-8 text-indigo-600" />
                  <h1 className="text-2xl font-bold text-gray-900">Token Distributor</h1>
                </div>
                <div>
                  <ConnectWallet />
                </div>
              </div>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Total Amount Input */}
                <div>
                  <label htmlFor="totalAmount" className="block text-sm font-medium text-gray-700">
                    Total Token Amount
                  </label>
                  <div className="mt-1">
                    <input
                      type="number"
                      id="totalAmount"
                      value={distribution.amount}
                      onChange={(e) => setDistribution(prev => ({ ...prev, amount: Number(e.target.value) }))}
                      className="block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Enter total amount"
                      required
                    />
                  </div>
                </div>

                {/* Distribution Type Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Distribution Type
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="equal"
                        onChange={() => setDistribution(prev => ({ ...prev, mode: 0 }))}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                      />
                      <span className="ml-2 text-gray-700">Equal Distribution</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="random"
                        checked={distribution.mode === 1}
                        onChange={() => setDistribution(prev => ({ ...prev, mode: 1 }))}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                      />
                      <span className="ml-2 text-gray-700">Random Distribution</span>
                    </label>
                  </div>
                </div>

                {/* Time Inputs */}
                <TimeInputs
                  revealBlock={distribution.revealBlock}
                  claimDuration={distribution.claimDuration}
                  onRevealBlockChange={(value) => setDistribution(prev => ({ ...prev, revealBlock: value }))}
                  onClaimDurationChange={(value) => setDistribution(prev => ({ ...prev, claimDuration: value }))}
                />

                {/* Wallet Addresses Section */}
                <AddressList
                  addresses={distribution.addresses}
                  onAddAddress={addAddress}
                  onRemoveAddress={removeAddress}
                  onUpdateAddress={updateAddress}
                />

                {/* Warning Message */}
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <AlertCircle className="h-5 w-5 text-yellow-400" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-yellow-700">
                        Please verify all addresses and time parameters carefully before distribution. This action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <ContractCallPocketButton params={distribution} onDistribute={distribute} />
                <ClaimRedPocketButton index={0} onClaim={claim}/>
                {/* <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                >
                  Distribute Tokens
                </button> */}
              </form>

            </div>
          </div>
        </div>
      </main>
    </Connect>
  );
}
