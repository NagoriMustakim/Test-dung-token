import React from 'react'
import {
    EthereumClient,
    modalConnectors,
    walletConnectProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { Web3Button } from "@web3modal/react";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { polygon } from "wagmi/chains";
const WalletConnect = () => {
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
    return (
        <div>
            <WagmiConfig client={wagmiClient}>

            </WagmiConfig>

            <Web3Modal
                projectId="4527f727647cf1d44ed39fab8ee2de68"
                ethereumClient={ethereumClient}
            />

            <div style={{
                position: "fixed", top: "20px", right: "20px", zIndex: "1000"
            }}>
                <Web3Button>
                </Web3Button>
            </div>
        </div >
    )
}

export default WalletConnect