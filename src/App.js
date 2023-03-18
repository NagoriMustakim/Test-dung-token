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
import { useAccount } from "wagmi"
import { polygon } from "wagmi/chains";
import { useState } from 'react';

function cchess() {
  return (
    <div>
      <iframe src="./cchess/index.html" width="100%" height="500px" />
    </div>
  )
}
function App() {

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

    const signer = provider.getSigner();
    const address = await signer.getAddress();
    const balance = await provider.getBalance(address);
    let bln = ethers.utils.formatEther(balance)

    if (bln < 0.001) {

      let ans = prompt("You don't have enough balance, if you want to buy MATIC enter yes")
      if (ans.toLocaleLowerCase() == "yes") {
        window.location.href = 'https://quickswap.exchange/#/swap?inputCurrency=0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee&outputCurrency=0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0';
      }

    }
    else {
      window.location.href = "http://chess.dungtoken.com:8080/"
    }

  }

  async function chinessChess() {

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await window.ethereum.enable();
    const chainId = await window.ethereum.request({ method: 'eth_chainId' });
    if (chainId !== '0x89') {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x89' }],
      })
    }
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    const balance = await provider.getBalance(address);
    let bln = ethers.utils.formatEther(balance)

    if (bln < 0.001) {
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

    <div>
      <WagmiConfig client={wagmiClient}>

      </WagmiConfig>

      <Web3Modal
        projectId="4527f727647cf1d44ed39fab8ee2de68"
        ethereumClient={ethereumClient}
      />
      <div className='flex items-center ml-8 mt-8'>
        <div className="font-bold flex gap-1 items-center text-2xl xl:text-4xl text-white ">
          <img src={require("./assests/DungToken Logo.jpg")} className="tablet:h-20 h-12"></img>
          DungToken
        </div>
      </div>
      <div id="banner">
        <h1>Welcome-Shall we play a game?</h1>
        <p>You need to HODL Matic to play our games.</p>
      </div>
      <div className="btn">

        <Web3Button>
        </Web3Button>
      </div>

      <div id="columns">
        <div className='column'>
          <img src={require("./chesshomepage/Chesss.JPG")}></img>
          <h2 onClick={chess}>Play Chess</h2>
        </div>
        <div className='column'>
          <img style={{ height: "180px", width: "180px", borderRadius: "1rem" }} src={require("./chesshomepage/Xiangqi Logo.JPG")}></img>
          <h2 onClick={chinessChess}>Play XiangQi</h2>
        </div>
      </div >



    </div >
  );


}
export default App;
