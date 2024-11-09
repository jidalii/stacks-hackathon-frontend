"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/router';


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
    { id: 1, name: 'Alice', walletTokens: ['btc_wallet_1', 'btc_wallet_2'] },
    { id: 2, name: 'Bob', walletTokens: ['btc_wallet_3'] },
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
    <div>
      <h1 style={{ textAlign: 'center', fontWeight: 'bold', padding:'10px', fontSize:'30px'}}>Friends List</h1>
      <div style={{ display: 'block', border: '1px solid #ccc', padding: '10px', margin: '0 auto', width: 'fit-content' }}>
        <ul>
          {friends.map(friend => (
            <li key={friend.id} style={{ borderBottom: '1px solid #ccc', padding: '10px' }}>
              <h2 style={{fontSize:'20px'}}>{friend.name}</h2>
              <ul>
                {friend.walletTokens.map((token, index) => (
                  <li key={index}>{token}</li>
                ))}
              </ul>

              <input
                type="text"
                style={{marginRight: '5px',
                  padding: '5px',
                  animation: 'blink-caret 0.8s step-end infinite'}} // Blinking cursor effect
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



      <div style ={{textAlign:'center', padding:'10px'}}>
        <input
          type="text"
          placeholder="Add a Friend"
          style={{
            marginRight: '5px',
            padding: '5px',
            border: '1px solid #ccc', // Added border for better visibility
            borderRadius: '5px', // Rounded corners
            outline: 'none', // Remove default outline
            animation: 'blink-caret 0.8s step-end infinite' // Blinking cursor effect
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && e.currentTarget.value) {
              addFriend(e.currentTarget.value);
              e.currentTarget.value = ''; // Clear the input
            }
          }}
        />
      </div>
      
    </div>
  );
};

export default FriendsPage;
