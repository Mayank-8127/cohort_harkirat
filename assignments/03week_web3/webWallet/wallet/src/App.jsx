import GetMnemonic from "./Mnemonic";
import SolWallet from "./wallets/solwallet";
import EthWallet from "./wallets/ethwallet";

function App() {
  return (
    <div>
      <h2>This website lets you create hierarchical deterministic wallets for solana and etherium</h2>
      <GetMnemonic/>
      <SolWallet/>
      <EthWallet/>
    </div>
  )
}

export default App
