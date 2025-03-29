// import InfoContractComponent from "@components/InfoContractComponent";
// import { useEffect } from "react";
// import { useAccount } from "wagmi";
// import { WagmiProvider, createConfig } from "wagmi";
// import { getDefaultConfig } from "connectkit";
// import { Chain } from "wagmi/chains";

// const ganache: Chain = {
//   id: 5777,
//   name: "Ganache",
//   nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
//   rpcUrls: {
//     default: { http: ["http://127.0.0.1:7545"] },
//     public: { http: ["http://127.0.0.1:7545"] },
//   },
// };

// const config = createConfig(
//   getDefaultConfig({
//     appName: "InfoContractApp",
//     chains: [ganache],
//     walletConnectProjectId:
//       process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "", // 从环境变量获取
//   })
// );

// const Dapp = () => {
//   const { address, isConnecting, isDisconnected } = useAccount();
//   useEffect(() => {
//     console.log("🍎钱包地址：", address);
//   }, [address]);
//   if (isConnecting) return <div>链接中...</div>;
//   if (isDisconnected) return <div>断开链接</div>;

//   return (
//     <WagmiProvider config={config}>
//       <InfoContractComponent />
//     </WagmiProvider>
//   );
// };
// export default Dapp;

import MetaMaskCard from '@/components/connectorCards/MetaMaskCard';
import InfoContractPage from '@/components/InfoContractPage';

const Dapp = () => {
  return (
    <>
      <MetaMaskCard />
      <br />
      <InfoContractPage />
    </>
  );
};
export default Dapp;
