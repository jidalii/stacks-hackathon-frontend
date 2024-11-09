"use client";

// src/ClaimRedPocket.tsx
import React, { useState } from 'react';
import Web3 from 'web3';

const ClaimRedPocket: React.FC = () => {
    const [walletAddress, setWalletAddress] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    // Smart contract address and ABI (replace with your contract's address and ABI)
    const contractAddress = "YOUR_CONTRACT_ADDRESS";
    const contractABI = [ "ST153CEHB9B8RGTT8NWGZX15H37KTH0S48WK0DC0H.redPocket" ];

    const claimRedPocket = async () => {
        if (!walletAddress) {
            setMessage("Please enter a wallet address.");
            return;
        }

        try {
            // Connect to the blockchain
            const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
            const contract = new web3.eth.Contract(contractABI, contractAddress);

            // Call the claim function from your smart contract
            const result = await contract.methods.claimRedPocket().send({ from: walletAddress });
            setMessage(`Claim successful! Transaction: ${result.transactionHash}`);
        } catch (error) {
            console.error(error);
            setMessage(`Error claiming red pocket: ${error.message}`);
        }
    };

    return (
        <div>
            <h1>Claim Your Chinese Red Pocket</h1>
            <input
                type="text"
                placeholder="Enter your wallet address"
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
            />
            <button onClick={claimRedPocket}>Claim Red Pocket</button>
            <div>{message}</div>
        </div>
    );
};

export default ClaimRedPocket;