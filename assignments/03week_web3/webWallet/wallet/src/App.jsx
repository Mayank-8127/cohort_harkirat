import GetMnemonic from "./Mnemonic";
import SolWallet from "./wallets/solwallet";
import EthWallet from "./wallets/ethwallet";

function App() {
  return (
    <div>
      <GetMnemonic/>
      <SolWallet/>
      <EthWallet/>
    </div>
  )
}

export default App
