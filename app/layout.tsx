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

const Filecoin = defineChain({
  id: 314159,
  name: "Filecoin - Calibration testnett",
  network: "Filecoin - Calibration testnett",
  nativeCurrency: {
    decimals: 18,
    name: "Filecoin - Calibration testnett",
    symbol: "tFIL",
  },
  rpcUrls: {
    default: {
      http: ["https://filecoin-calibration.chainup.net/rpc/v1"],
    },
  } as any,
  blockExplorers: {
    default: { name: "Explorer", url: "https://calibration.filscan.io" },
  },
}) as any;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
            defaultChain: Filecoin,
            supportedChains: [Filecoin],
          }}
        >
          {children}
        </PrivyProvider>
      </body>
    </html>
  );
}
