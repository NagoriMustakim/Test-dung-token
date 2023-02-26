import logo from './logo.svg';

import './App.css';
import { ethers } from 'ethers';
import { Chess } from './Games/Chess';
import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { Web3Button } from "@web3modal/react";
import { configureChains, createClient, WagmiConfig } from "wagmi";

import { polygon, polygonMumbai } from "wagmi/chains";
import { useState, useEffect } from 'react';
function App() {
  const [balance, setBalance] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const chains = [polygon, polygonMumbai];

  // Wagmi client
  const { provider } = configureChains(chains, [
    walletConnectProvider({ projectId: "4527f727647cf1d44ed39fab8ee2de68" }),
  ]);
  const wagmiClient = createClient({
    autoConnect: true,
    connectors: modalConnectors({
      projectId: "4527f727647cf1d44ed39fab8ee2de68",
      version: "1", // or "2"
      appName: "web3Modal",
      chains,
    }),
    provider,
  });

  // Web3Modal Ethereum Client
  const ethereumClient = new EthereumClient(wagmiClient, chains);

  async function chess() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await provider.send('eth_requestAccounts', []);
    let bln = await provider.getBalance(accounts[0]);
    console.log(accounts[0]);
    bln = ethers.utils.formatEther(bln)
    setBalance(bln)
    console.log(balance);
    if (balance < 0.001) {
      let ans = prompt("You don't have enough balance, if you want to buy MATIC press yes")
      if (ans.toLocaleLowerCase() == "yes") {
        window.location.href = 'https://quickswap.exchange/#/swap?inputCurrency=0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee&outputCurrency=0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0';
      }

    }
    else {
      let val = prompt("Enter the MATIC")
      if (val >= 0.1) {
        window.location.href = "https://dungtoken.vercel.app/chess.html"
      }
    }
  }
  function page2() {
    window.location.href = "https://dungtoken.vercel.app/page2.html"

  }
  return (

    <>
      <WagmiConfig client={wagmiClient}>
        {/* <HomePage /> */}
        {setIsConnected == true}
      </WagmiConfig>

      <Web3Modal
        projectId="4527f727647cf1d44ed39fab8ee2de68"
        ethereumClient={ethereumClient}
      />
      <h1>Welcom to Dung Token</h1>

      <div className="btn">

        <Web3Button />
      </div>
      {/* <h1>Balance: {balance} MATIC</h1> */}

      <a href='#' onClick={chess}>Chess</a>
      <a href='#' onClick={page2}>page2</a>
    </>
  );
}

export default App;
