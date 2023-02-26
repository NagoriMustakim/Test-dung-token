import logo from './logo.svg';
import './App.css';
// import { ethers } from 'ethers';
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
  const [balance, setBalance] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
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

  // useEffect(() => {
  //   async function getBalance() {
  //     if (provider && provider.selectedAddress) {
  //       const providerWithNetwork = new ethers.providers.Web3Provider(provider);
  //       const balance = await providerWithNetwork.getBalance(provider.selectedAddress);
  //       setBalance(ethers.utils.formatEther(balance));s
  //     }
  //   }
  //   getBalance();
  // }, [provider]);
  function chess() {
    alert("Coming soon")
  }
  function page2() {
    alert("Coming soon")

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
