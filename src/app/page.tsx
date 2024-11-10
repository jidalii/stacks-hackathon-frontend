"use client";

//import React from "react";
import styles from "./page.module.css";

import { Connect } from "@stacks/connect-react";

import ConnectWallet, { userSession } from "../components/ConnectWallet";
import ContractCallVote from "../components/ContractCallVote";

import Link from 'next/link';

// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { toast } from "@/hooks/use-toast"
// import { Plus, Minus, Coins, Trash2, AlertCircle } from 'lucide-react'

// type DistributionMode = 'even' | 'random';
// class TokenDistributor {
//   private amount: number;
//   private mode: DistributionMode;
//   private addresses: string[];
//   private revealBlock: number;
//   private claimDuration: number;
//   constructor(
//     amount: number,
//     mode: DistributionMode,
//     addresses: string[],
//     revealBlock: number,
//     claimDuration: number
//   ) {
//     this.amount = amount;
//     this.mode = mode;
//     this.addresses = addresses;
//     this.revealBlock = revealBlock;
//     this.claimDuration = claimDuration;
//   }

//   getAmount(): number { return this.amount; }
//   setAmount(newAmount: number): void { this.amount = newAmount; }
//   getMode(): DistributionMode { return this.mode; }
//   setMode(newMode: DistributionMode): void { this.mode = newMode; }
//   getAddresses(): string[] { return this.addresses; }
//   setAddresses(newAddresses: string[]): void { this.addresses = newAddresses }
//   getRevealBlock(): number { return this.revealBlock; }
//   setRevealBlock(newRevealBlock: number): void { this.revealBlock = newRevealBlock; }
//   getClaimDuration(): number { return this.claimDuration; }
//   setClaimDuration(newClaimDuration: number): void { this.claimDuration = newClaimDuration; }

//   logValues(): void {
//     console.log(`Amount: ${this.amount}`);
//     console.log(`Mode: ${this.mode}`);
//     console.log(`Addresses: ${this.addresses.join(', ')}`);
//     console.log(`Reveal Block: ${this.revealBlock}`);
//     console.log(`Claim Duration: ${this.claimDuration}`);
//   }

// }
import React, { useState, useCallback } from 'react';
import { Coins, AlertCircle } from 'lucide-react';
import { TokenDistribution } from '../types/Distribution';
import { TimeInputs } from '../components/TimeInputs';
import { AddressList } from '../components/AddressList';

export default function Home() {

  const [distribution, setDistribution] = useState(new TokenDistribution());


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Directly log each parameter value
    console.log('Total Amount:', distribution.amount);
    console.log('Distribution Mode:', distribution.mode);
    console.log('Reveal Block:', distribution.revealBlock);
    console.log('Claim Duration:', distribution.claimDuration);
    console.log('Addresses:', distribution.addresses.filter(addr => addr.trim() !== ''));
  };

  const addAddress = useCallback(() => {
    setDistribution(prev => ({
      ...prev,
      addresses: [...prev.addresses, '']
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
      addresses: prev.addresses.map((addr, i) => i === index ? value : addr)
    }));
  }, []);



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
                  <h1 className="text-2xl font-bold text-gray-900">Token Distributor</h1>
                </div>
                <div>
              {/* ConnectWallet file: `./src/components/ConnectWallet.js` */}
              <ConnectWallet />
              {/* ContractCallVote file: `./src/components/ContractCallVote.js` */}
              {/* <ContractCallVote /> */}
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
                      onChange={(e) => setDistribution(prev => ({ ...prev, amount: e.target.value }))}
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
                        checked={distribution.mode === 'equal'}
                        onChange={() => setDistribution(prev => ({ ...prev, mode: 'equal' }))}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                      />
                      <span className="ml-2 text-gray-700">Equal Distribution</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="random"
                        checked={distribution.mode === 'random'}
                        onChange={() => setDistribution(prev => ({ ...prev, mode: 'random' }))}
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
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                >
                  Distribute Tokens
                </button>


              </form>

            </div>
          </div>
        </div>



      </main>
    </Connect>
  );
}
