import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { WagmiConfig } from "wagmi";
import { ethereumClient, projectId, wagmiClient } from "./web3/config";
import SafeProvider from "@gnosis.pm/safe-apps-react-sdk";
import { Web3Modal } from "@web3modal/react";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <>
    <SafeProvider>
      <WagmiConfig client={wagmiClient}>
        <App />
      </WagmiConfig>
    </SafeProvider>

    <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
