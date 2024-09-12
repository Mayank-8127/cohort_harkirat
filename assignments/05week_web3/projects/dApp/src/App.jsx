import React, { FC, useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets';
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton,
    WalletConnectButton
} from '@solana/wallet-adapter-react-ui';
import { Airdrop } from './Airdrop.jsx';
import { ShowSolBalance } from './Balance.jsx';
import { SignMessage } from './SignMsg.jsx';
import { SendTokens } from './SendSol.jsx';
import { clusterApiUrl } from '@solana/web3.js';
import '@solana/wallet-adapter-react-ui/styles.css';

function App() {

  return (
      <ConnectionProvider endpoint={"https://devnet.helius-rpc.com/?api-key=4e771eed-91a5-4e77-81d3-714832e59774"}>
          <WalletProvider wallets={[]} autoConnect>
              <WalletModalProvider>
                <WalletMultiButton/>
                <WalletDisconnectButton/>
                <Airdrop/>
                <ShowSolBalance/>
                <SignMessage/>
                <SendTokens/>
              </WalletModalProvider>
          </WalletProvider>
      </ConnectionProvider>
  )
}

export default App
