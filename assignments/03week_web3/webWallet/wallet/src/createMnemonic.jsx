import { generateMnemonic} from "bip39";

let mnemonic = generateMnemonic();

export function Mnemonic() {

  return (
    mnemonic
  )
}

export function NewMnemonic(){
  mnemonic = generateMnemonic()
  return(
    mnemonic
  )
}

export default Mnemonic