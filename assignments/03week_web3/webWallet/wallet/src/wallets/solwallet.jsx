import List from "../list";
import Mnemonic from "../createMnemonic";
import { mnemonicToSeedSync } from "bip39";
import nacl from "tweetnacl";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import bs58 from 'bs58'
import React, {useState} from 'react';

function SolWallet() {

  const [sol, setSol] = useState([]);

  const generateSolWallet = async () => {
      const seed = mnemonicToSeedSync(Mnemonic());
    const pathsol = `m/44'/501'/${sol.length + 1}'/0'`;
    const derivedSeed = derivePath(pathsol, seed.toString("hex")).key;
    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    const pubKey = Keypair.fromSecretKey(secret).publicKey.toBase58();
    async function rpc(pubKey) {
      const response = await fetch("https://mainnet.helius-rpc.com/?api-key=4e771eed-91a5-4e77-81d3-714832e59774",{
        headers: {
          "Content-Type": "application/json"
        },
        method: 'post',
        body: JSON.stringify({
            "jsonrpc": "2.0",
            "id": 1,
            "method": "getBalance",
            "params": [pubKey]
          })
      })
      const data = await response.json();
      return data.result.value;
    }
    let balance = await rpc(pubKey);
    const solWallet = [
      ...sol,
      {
      "id": sol.length + 1,
      "PublicKey": pubKey,
      "PrivateKey": bs58.encode(secret),
      "Balance": balance
    }];
    setSol(solWallet);
  }
  return (
    <div>
      <button onClick={generateSolWallet} id="solbutton">Generate Solana Wallet</button>
      <List list={sol}></List>
    </div>
  )
}

export default SolWallet
