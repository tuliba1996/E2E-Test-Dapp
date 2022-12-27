import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from "@web3modal/ethereum";

import { configureChains, createClient } from "wagmi";
import { SafeConnector } from "@gnosis.pm/safe-apps-wagmi";

import {
  arbitrum,
  mainnet,
  polygon,
  goerli,
  bscTestnet,
  polygonMumbai,
} from "wagmi/chains";

const chains = [arbitrum, mainnet, polygon, goerli, bscTestnet, polygonMumbai];
export const projectId = "c4fdf397f2688b29380c8505b85b5d17";

// Wagmi client
const { provider } = configureChains(chains, [
  walletConnectProvider({ projectId: projectId }),
]);
export const wagmiClient = createClient({
  autoConnect: true,
  connectors: [
    new SafeConnector({ chains }),
    ...modalConnectors({ appName: "web3Modal", chains }),
  ],
  provider,
});

// Web3Modal Ethereum Client
export const ethereumClient = new EthereumClient(wagmiClient, chains);
