import { generateMnemonic} from "bip39";

function Mnemonic() {
  let mnemonic = generateMnemonic();
  return (
    mnemonic
  )
}

export default Mnemonic
