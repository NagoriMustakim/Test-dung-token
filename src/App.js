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
    if (balance == null) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      if (chainId !== '0x89') {
        //alert('Incorrect network! Switch your metamask network to Rinkeby');
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
    }
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
  async function page2() {
    if (balance == null) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await window.ethereum.enable();
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      const balance = await provider.getBalance(address);
      let bln = ethers.utils.formatEther(balance)
      setBalance(bln)
      console.log(bln);
    }
    if (balance < 0.001) {
      let ans = prompt("You don't have enough balance, if you want to buy MATIC press yes")
      if (ans.toLocaleLowerCase() == "yes") {
        window.location.href = 'https://quickswap.exchange/#/swap?inputCurrency=0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee&outputCurrency=0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0';
      }

    }
    else {
      let val = prompt("Enter the MATIC")
      if (val >= 0.1) {
        window.location.href = "https://dungtoken.vercel.app/ChineseChess.html"
      }
    }

  }
  const connect = () => {
    setIsConnected(true)
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
      <h1 style={{ margin: "1.5rem" }}>Welcom to Dung Token</h1>

      <div className="btn">

        <Web3Button></Web3Button>
      </div>
      {/* <h1>Balance: {balance} MATIC</h1> */}

      <a href='#' onClick={chess}>Play Chess</a>
      <a href='#' onClick={page2}>Chinese Chess</a>
    </>
  );
}

export default App;
