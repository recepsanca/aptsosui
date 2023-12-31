'use client';
import { WagmiConfig, createClient, configureChains } from 'wagmi';
import { mainnet, arbitrum, arbitrumGoerli, goerli } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { ReactNode } from 'react';

const { provider, webSocketProvider } = configureChains(
  [mainnet, goerli, arbitrum, arbitrumGoerli],
  [
    publicProvider(),
    jsonRpcProvider({
      rpc: (chain) => ({ http: chain.rpcUrls.default }),
    }),
  ],
);

const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
});

export const WagmiProvider = ({ children }: { children: ReactNode }) => {
  return <WagmiConfig client={client}>{children}</WagmiConfig>;
};
