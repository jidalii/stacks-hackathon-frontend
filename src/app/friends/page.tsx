"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from "../page.module.css";
import Link from 'next/link';
import { Connect } from "@stacks/connect-react";

import ConnectWallet, { userSession } from "../../components/ConnectWallet";
import ContractCallVote from "../../components/ContractCallVote";
import { Coins, AlertCircle } from 'lucide-react';
import { TokenDistribution } from '../../types/Distribution';

// Define types for Friend and Wallet Token
type WalletToken = string;  // Represents a single Bitcoin wallet token as a string

type Friend = {
  id: number;
  name: string;
  walletTokens: WalletToken[];
};

const FriendsPage: React.FC = () => {

  // Initialize the friends list in state
  const [friends, setFriends] = useState<Friend[]>([
    { id: 1, name: 'Alice', walletTokens: ['ST153CEHB9B8RGTT8NWGZX15H37KTH0S48WK0DC0H'] },
    { id: 2, name: 'Bob', walletTokens: ['ST3EZR0XEXKHD0JWT9QQ9VK4HBY463N9HJXQMRAX0'] },
  ]);

  // Function to add a new friend
  const addFriend = (name: string) => {
    const newFriend: Friend = {
      id: friends.length + 1,
      name,
      walletTokens: []
    };
    setFriends([...friends, newFriend]);
  };

  // Function to add a wallet token to a specific friend
  const addWalletToken = (friendId: number, token: WalletToken) => {
    setFriends(prevFriends =>
      prevFriends.map(friend =>
        friend.id === friendId
          ? { ...friend, walletTokens: [...friend.walletTokens, token] }
          : friend
      )
    );
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
                  <h1 className="text-2xl font-bold text-gray-900">See Friends</h1>
                </div>
                <div>
                  <ConnectWallet />
                </div>
              </div>

              <div className="friends-list-container"> {/* Added class for container */}
                <div className="flex justify-between items-center mb-4"> {/* Flexbox for layout */}
                  <h2 className="text-xl font-bold">Friends List</h2> {/* Title for clarity */}
                  <input
                    type="text"
                    className="ml-2 p-2 border border-gray-300 rounded" // Inline styles for input
                    placeholder="Add a Friend"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && e.currentTarget.value) {
                        addFriend(e.currentTarget.value);
                        e.currentTarget.value = ''; // Clear the input
                      }
                    }}
                  />
                </div>
                <ul className="list-none p-0"> {/* Inline styles for the list */}
                  {friends.map(friend => (
                    <li key={friend.id} className="bg-gray-100 border border-gray-300 rounded-lg p-4 mb-2"> {/* Inline styles for each friend card */}
                      <h3 className="text-lg font-semibold">{friend.name}</h3> {/* Class for friend's name */}
                      <ul className="list-none p-0"> {/* Inline styles for wallet list */}
                        {friend.walletTokens.length > 0 ? (
                          friend.walletTokens.map((token, index) => (
                            <li key={index} className="text-gray-700">{token}</li> 
                          ))
                        ) : (
                          <li className="text-gray-500">No Wallet Tokens</li> // Class for no tokens message
                        )}
                      </ul>

                      <input
                        type="text"
                        className="mt-2 p-2 border border-gray-300 rounded" // Inline styles for wallet input
                        placeholder="Add Wallet"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && e.currentTarget.value) {
                            addWalletToken(friend.id, e.currentTarget.value);
                            e.currentTarget.value = ''; // Clear the input
                          }
                        }}
                      />
                    </li>
                  ))}
                </ul>
              </div>
  
      
            </div>
          </div>
        </div>


    </main>

    </Connect>
  );
};

export default FriendsPage;
