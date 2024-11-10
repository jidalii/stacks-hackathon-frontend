"use client";

//import React from "react";
import styles from "../page.module.css";

import React, { useEffect, useState } from "react";
import { Connect } from "@stacks/connect-react";

import ConnectWallet, { userSession } from "../../components/ConnectWallet";
import ContractCallVote from "../../components/ContractCallVote";
import { StacksTestnet } from "@stacks/network";
import { AnchorMode, PostConditionMode, uintCV, makeStandardSTXPostCondition, FungibleConditionCode } from "@stacks/transactions";
import { DistributeParams } from "../types/DistributeParams";
import { FinishedTxData } from "@stacks/connect-react"; // Import the FinishedTxData type
import { useConnect } from "@stacks/connect-react";

import Link from 'next/link';

import { Coins, AlertCircle } from 'lucide-react';
import { TokenDistribution } from '../../types/Distribution';
import { TimeInputs } from '../../components/TimeInputs';
import { AddressList } from '../../components/AddressList';
import ClaimRedPocketButton from "@/components/ClaimRedPocket";

export default function Home() {

  const [distribution, setDistribution] = useState(new TokenDistribution());

  const [selectedPackets, setSelectedPackets] = useState<boolean[]>([false, false, false]); // State to track selected packets

  const handlePacketSelect = (index: number) => {
    setSelectedPackets(prev => {
      const newSelection = [...prev];
      newSelection[index] = !newSelection[index]; // Toggle selection
      return newSelection;
    });
  };

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Directly log each parameter value
    console.log('Total Amount:', distribution.amount);
    console.log('Distribution Mode:', distribution.mode);
    console.log('Reveal Block:', distribution.revealBlock);
    console.log('Claim Duration:', distribution.claimDuration);
    console.log('Addresses:', distribution.addresses.filter(addr => addr.trim() !== ''));
  };

  return (
    <Connect
      authOptions={{
        appDetails: {
          name: "Stacks Next.js Template",
          icon: window.location.origin + "/logo.png",
        },
        redirectTo: "/",
        onFinish: () => {
          window.location.reload();
        },
        userSession,
      }}
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
                  <h1 className="text-2xl font-bold text-gray-900">Packet Claim</h1>
                </div>
                <div>

              {/* ConnectWallet file: `./src/components/ConnectWallet.js` */}
              <ConnectWallet />
              {/* userSession.loadUserData().profile.stxAddress.testnet */}

            <ContractCallVote />
              {/* ContractCallVote file: `./src/components/ContractCallVote.js` */}
              {/* <ContractCallVote /> */}
            </div>
              </div>


              <form onSubmit={handleSubmit} className="space-y-6">

                <h4>Select Packets To Claim</h4>

               
               {/* From database, get list of distribution requests that are associated with the wallet ID */}


                {/* Red Packets Section */}

                {/* Red Packets Section */}
                <div className="flex flex-col items-start">
                  {['Red Packet 1', 'Red Packet 2', 'Red Packet 3'].map((packet, index) => (
                    <div key={index} className="flex items-center mb-4">
                      <input
                        type="checkbox"
                        checked={selectedPackets[index]}
                        onChange={() => handlePacketSelect(index)}
                        className="mr-2"
                      />
                      <div className={`bg-red-500 text-white rounded-lg p-4 w-64 text-center ${selectedPackets[index] ? 'opacity-100' : 'opacity-50'}`}>
                        {packet}
                      </div>
                      <ClaimRedPocketButton index={index} onClaim={claim}></ClaimRedPocketButton>
                    </div>
                  ))}
                </div>


                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                >
                  Get Tokens
                </button>

              </form>

            </div>
          </div>
        </div>



      </main>
    </Connect>
  );
}
