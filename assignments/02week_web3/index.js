import nacl from "tweetnacl";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import bs58 from 'bs58'
import { HDNodeWallet, Wallet } from "ethers";


const mnemonic = generateMnemonic();
console.log("Mnemonic: ",mnemonic);
const seed = mnemonicToSeedSync(mnemonic);
for (let i = 0; i < 4; i++) {
  const pathsol = `m/44'/501'/${i + 1}'/0'`;
  const patheth = `m/44'/60'/${i + 1}'/0'`;
  //eth
  const privateKey = HDNodeWallet.fromSeed(seed).derivePath(patheth).privateKey;
  const wallet = new Wallet(privateKey);
  console.log(`Public key  of wallet ${i + 1} Ethereum : `, wallet.address);
  console.log(`Private Key of wallet ${i + 1} Etherium : `, privateKey)
  //sol
  const derivedSeed = derivePath(pathsol, seed.toString("hex")).key;
  const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
  console.log(`Public Key  of wallet ${i + 1} Solana   : `, Keypair.fromSecretKey(secret).publicKey.toBase58());
  console.log(`Private Key of wallet ${i + 1} Solana   : `, bs58.encode(secret));
}