"use client";
import { defineChain } from "viem";
import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import WagmiProviderComp from "./lib/wagmi-provider";
import { config } from "./lib/config";
import { headers } from "next/headers";
import { cookieToInitialState } from "wagmi";

import { PrivyProvider } from "@privy-io/react-auth";
const font = Outfit({ subsets: ["latin"] });

const zkEVMCardonaTestnet = defineChain({
  id: 2442, // Replace this with your chain's ID
  name: "Polygon zkEVM Cardona Testnet",
  network: "Polygon zkEVM Cardona Testnet",
  nativeCurrency: {
    decimals: 18, // Replace this with the number of decimals for your chain's native token
    name: "Polygon zkEVM Cardona Testnet",
    symbol: "ETH",
  },
  rpcUrls: {
    default: {
      http: ["https://polygon-zkevm-cardona.blockpi.network/v1/rpc/public"],
    },
  } as any,
  blockExplorers: {
    default: { name: "Explorer", url: "https://cardona-zkevm.polygonscan.com" },
  },
}) as any;

// export const metadata: Metadata = {
//   title: "Your Connected Workspace",
//   description: "Bird - Simple and powerful notes & docs for teams",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const initialState = cookieToInitialState(config, headers().get("cookie"));

  return (
    <html lang="en">
      <body className={font.className}>
        <PrivyProvider
          appId="clwci9fzm00w7ro85bx6jarr5"
          config={{
            // Customize Privy's appearance in your app
            appearance: {
              theme: "light",
              accentColor: "#676FFF",
              logo: "https://your-logo-url",
            },
            // Create embedded wallets for users who don't have a wallet
            embeddedWallets: {
              createOnLogin: "users-without-wallets",
            },
            defaultChain: zkEVMCardonaTestnet,
            supportedChains: [zkEVMCardonaTestnet],
          }}
        >
          {children}
        </PrivyProvider>
      </body>
    </html>
  );
}
