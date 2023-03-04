import logo from './logo.svg';

import './App.css';
import { ethers } from 'ethers';

import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { Web3Button } from "@web3modal/react";
import { configureChains, createClient, WagmiConfig } from "wagmi";

import { polygon } from "wagmi/chains";
import { useState, useEffect } from 'react';
function App() {

  const [balance, setBalance] = useState(null);
  const [isConnected, setIsConnected] = useState(true);
  const chains = [polygon];

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
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const chainId = await window.ethereum.request({ method: 'eth_chainId' });
    if (chainId !== '0x89') {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x89' }],
      })
    }
    console.log(chainId);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    const balance = await provider.getBalance(address);
    let bln = ethers.utils.formatEther(balance)
    setBalance(bln)
    console.log(bln);

    if (balance < 0.001) {

      let ans = prompt("You don't have enough balance, if you want to buy MATIC press yes")
      if (ans.toLocaleLowerCase() == "yes") {
        window.location.href = 'https://quickswap.exchange/#/swap?inputCurrency=0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee&outputCurrency=0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0';
      }

    }
    else {
      window.location.href = "https://dungtoken.vercel.app/chess.html"
    }
  }
  async function page2() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await window.ethereum.enable();
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    const balance = await provider.getBalance(address);
    let bln = ethers.utils.formatEther(balance)
    setBalance(bln)
    console.log(bln);

    if (balance < 0.001) {
      let ans = prompt("You don't have enough balance, if you want to buy MATIC press yes")
      if (ans.toLocaleLowerCase() == "yes") {
        window.location.href = 'https://quickswap.exchange/#/swap?inputCurrency=0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee&outputCurrency=0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0';
      }

    }
    else {
      window.location.href = "https://dungtoken.vercel.app/ChineseChess.html"
    }

  }

  return (

    <>
      <WagmiConfig client={wagmiClient}>
        {/* <HomePage /> */}

      </WagmiConfig>

      <Web3Modal
        projectId="4527f727647cf1d44ed39fab8ee2de68"
        ethereumClient={ethereumClient}
      />
      <h1>Welcome to DungToken Games</h1>
      <h2>You need to HODL Matic Token in your wallet to play</h2>
      <div className="btn">

        <Web3Button></Web3Button>
      </div>
      <div class="container">
        <div class="ov">
          <a className="a1" href='#' onClick={chess}>Play Chess</a>
          <a className="a2" href='#' onClick={page2}>Play Chinese Chess</a>

        </div>
      </div>
    </>
  );
}

export default App;
