import {
  usePrepareContractWrite,
  useContractWrite,
  useAccount,
  useSigner,
  usePrepareSendTransaction,
  useSendTransaction,
} from "wagmi";
import React, { useEffect } from "react";
import abiFactory from "../web3/constants.json";
import { ethers } from "ethers";

export const FallingContract = () => {
  const { data: signer } = useSigner();

  const [contractStatus, setContractStatus] = React.useState("Not clicked");

  let fallingContract: ethers.Contract | null = null;
  const [contractAddress, setContractAddress] = React.useState("");

  const fallingFactory = new ethers.ContractFactory(
    abiFactory.failingContractAbi,
    abiFactory.failingContractBytecode,
    // @ts-ignore
    signer
  );

  const deployContract = async () => {
    try {
      fallingContract = await fallingFactory.deploy();
      setContractStatus("Deploying...");
      await fallingContract.deployTransaction.wait();
      setContractAddress(fallingContract.address);
      setContractStatus(`Deployed - ${fallingContract.address}`);
    } catch (error) {
      setContractStatus("Deployment Failed");
      throw error;
    }
  };

  const { config } = usePrepareSendTransaction({
    request: {
      to: contractAddress,
      value: ethers.utils.parseEther("0.1"),
      // gasLimit: "0x5208",
      // gasPrice: "0x2540be400",
    },
  });

  const { sendTransaction, isLoading, isSuccess } = useSendTransaction(config);

  return (
    <>
      <button
        className="btn btn-primary btn-lg btn-block mb-3"
        onClick={deployContract}
      >
        Deploy Failing Contract
      </button>

      <button
        className="btn btn-primary btn-lg btn-block mb-3"
        disabled={!contractAddress}
        onClick={() => sendTransaction?.()}
      >
        Send Failing Transaction
      </button>

      <p className="info-text alert alert-secondary">
        Failing Contract Status: <span>{contractStatus}</span>
      </p>
      <p className="info-text alert alert-secondary">
        <span>{isSuccess ? "Sent" : isLoading ? "Sending..." : null}</span>
      </p>
    </>
  );
};
