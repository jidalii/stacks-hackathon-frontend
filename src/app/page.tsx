"use client";
import React from "react";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./page.module.css";

import { Connect } from "@stacks/connect-react";

import ConnectWallet, { userSession } from "../components/ConnectWallet";
import ContractCallVote from "../components/ContractCallVote";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { toast } from "@/hooks/use-toast"
import { Plus, Minus } from 'lucide-react'

import FriendsPage from "./friends/page";
import Link from 'next/link';

export default function Home() {
  const [amount, setAmount] = useState('')
  const [totalAmount, setTotalAmount] = useState('')

  const [distributionMethod, setDistributionMethod] = useState('even')
  const [addresses, setAddresses] = useState([''])



  const [isClient, setIsClient] = useState(false);

  const handleAddAddress = () => {
    setAddresses([...addresses, ''])
  }

  const handleRemoveAddress = (index: number) => {
    const newAddresses = addresses.filter((_, i) => i !== index)
    setAddresses(newAddresses)
  }

  const handleAddressChange = (index: number, value: string) => {
    const newAddresses = [...addresses]
    newAddresses[index] = value
    setAddresses(newAddresses)
  }

  const handleDistribute = () => {
    toast({
      title: "Distribution Initiated",
      description: `Distributing ${totalAmount} STX to ${addresses.length} addresses`,
    })
  }


  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

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
      {/* <main className={styles.main}> */}

        <div>
          {/* ConnectWallet file: `./src/components/ConnectWallet.js` */}
          <ConnectWallet />
          {/* ContractCallVote file: `./src/components/ContractCallVote.js` */}
          <ContractCallVote />
        </div>


        <h1 className="text-2xl font-bold">Web3 Token Distributor</h1>
        <div className="flex-grow">
          <Label htmlFor="amount">Amount</Label>
          <Input
            id="amount"
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="distribution-method">Distribution Method</Label>
          <Select value={distributionMethod} onValueChange={setDistributionMethod}>
            <SelectTrigger id="distribution-method">
              <SelectValue placeholder="Select distribution method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="even">Even Distribution</SelectItem>
              <SelectItem value="random">Random Distribution</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-sm font-medium text-gray-700">Recipient Addresses</Label>
          <ScrollArea className="h-48 mt-1 rounded border">
            <div className="p-4 space-y-2">
              {addresses.map((address, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Input
                    placeholder={`Address ${index + 1}`}
                    value={address}
                    onChange={(e) => handleAddressChange(index, e.target.value)}
                    className="flex-grow"
                  />
                  {index === addresses.length - 1 ? (
                    <Button
                      onClick={handleAddAddress}
                      size="icon"
                      variant="outline"
                      className="shrink-0"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handleRemoveAddress(index)}
                      size="icon"
                      variant="outline"
                      className="shrink-0"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>


        <FriendsPage />
        <Link href="/friends">
          <Button variant="link">Go to Friends Page</Button>
        </Link>

      </main>
    </Connect>
  );
}
