import { useConnection, useWallet } from "@solana/wallet-adapter-react"

export function Airdrop(){
    const wallet = useWallet();
    const { connection } = useConnection();

    async function sendAirdropToUser(){
        const amount = parseFloat(document.getElementById("PublicKey").value);
        await connection.requestAirdrop(wallet.publicKey, amount*1000000000);
        alert("airdropped sol");
    }
    return(
        <div>
            <input  id="PublicKey" type="number" placeholder="Amount"></input>
            <button onClick={sendAirdropToUser}>Send Airdrop</button>
        </div>
    )
}