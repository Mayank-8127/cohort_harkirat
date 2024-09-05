import List from "../list";
import Mnemonic from "../createMnemonic";
import { mnemonicToSeedSync } from "bip39";
import { HDNodeWallet, Wallet } from "ethers";
import React, {useState} from 'react';

function EthWallet() {
  const seed = mnemonicToSeedSync(Mnemonic());
  const [eth, setEth] = useState([]);

  const generateEthWallet = async () => {
    const patheth = `m/44'/60'/${eth.length + 1}'/0'`;
    const privateKey = HDNodeWallet.fromSeed(seed).derivePath(patheth).privateKey;
    const wallet = new Wallet(privateKey);
    const pubKey = wallet.address;
    async function rpc(pubKey) {
      const response = await fetch("https://1rpc.io/eth",{
        headers: {
          "Content-Type": "application/json"
        },
        method: 'post',
        body: JSON.stringify({
          "jsonrpc": "2.0",
          "id": 1,
          "method": "eth_getBalance",
          "params": [pubKey, "latest"]
        })
      })
      const data = await response.json();
      return data.result;
    }
    let balance = await rpc(pubKey);
    balance = parseInt(balance,16)/1000000000;
    const newWallet = [
      ...eth,
      {
      "id": eth.length + 1,
      "PublicKey":  pubKey,
      "PrivateKey":  privateKey,
      "Balance": balance
    }];
    setEth(newWallet);
  }
  return (
    <div>
      <button onClick={generateEthWallet} id="ethbutton">Generate Etherium Wallet</button>
      <List list={eth}></List>
    </div>
  )
}

export default EthWallet
