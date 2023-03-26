import React from 'react'
import "./homepage.css"
import WalletConnect from './WalletConnect';
import { ethers } from 'ethers';
const Homepage1 = () => {
    const polygons = document.querySelectorAll('.polygon');
    let currentIndex = 0;

    function swapPolygons() {
        polygons[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % polygons.length;
        polygons[currentIndex].classList.add('active');
    }

    setInterval(swapPolygons, 3000);
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
            window.location.href = "http://chess.dungtoken.com/cchess"
        }
    }
    return (
        <div>
            <div className='flex items-center ml-8 mt-8'>
                <div className="font-bold flex gap-1 items-center text-2xl xl:text-4xl text-white ">
                    <a > <img src={require('../test/dungtokenlogo.jpg')} className="tablet:h-20 h-12"></img></a>
                </div>
                <a href='https://dungtoken.com' style={{ marginLeft: "2rem", fontSize: "2rem", color: "white" }}>DungToken</a>
            </div>
            <div id="banner">
                <h1>Welcome-Shall we play a game?</h1>
                <p>You need to HODL Matic to play our games.</p>
            </div>
            <div style={{ position: "fixed", top: "20px", right: "20px", zIndex: 1000 }}>
                <WalletConnect />
            </div>
            < div class="container" >
                <div>
                    <div class="polygon" onClick={chess}>
                        <img src={require("../test/chess.jpg")} alt="Image Description" />
                        <a style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)"
                        }}>Chess</a>
                    </div>
                </ div>
                
                <div class="polygon_2" onClick={chinessChess}>
                    <img src={require("../test/xiangqi.jpg")} alt="Image Description" />
                    <a style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)"
                    }}
                    >XiangQi</a>
                </div>
                <div class="polygon_2">
                    Chat-GPT Coming Soon
                </div>
                <div class="polygon_2">
                    2D Coming Soon
                </div>
                <div class="polygon_2">
                    3D Coming Soon
                </div>
                <div class="polygon_2">
                    Metaverse Coming Soon
                </div>
            </div >
        </div>
    )
}

export default Homepage1