import {
  usePrepareContractWrite,
  useContractWrite,
  useAccount,
  useSigner,
} from "wagmi";
import React, { useEffect } from "react";
import abiFactory from "../web3/constants.json";
import { ethers } from "ethers";

export const DeployContract = () => {
  const { data: signer } = useSigner();

  const [contractStatus, setContractStatus] = React.useState("Not clicked");
  const [actionStatus, setactionStatus] = React.useState("");

  let froggybankContract: ethers.Contract | null = null;
  const [contractAddress, setContractAddress] = React.useState("");

  const froggybankFactory = new ethers.ContractFactory(
    abiFactory.froggybankAbi,
    abiFactory.froggybankBytecode,
    // @ts-ignore
    signer
  );

  const deployContract = async () => {
    try {
      froggybankContract = await froggybankFactory.deploy();
      setContractStatus("Deploying...");
      await froggybankContract.deployTransaction.wait();
      setContractAddress(froggybankContract.address);
      setContractStatus(`Deployed - ${froggybankContract.address}`);
    } catch (error) {
      setContractStatus("Deployment Failed");
      throw error;
    }
  };

  const { write: depositFn, isSuccess: depositIsSuccess } = useContractWrite({
    mode: "recklesslyUnprepared",
    address: contractAddress ? contractAddress : undefined,
    abi: abiFactory.froggybankAbi,
    functionName: "deposit",
    overrides: {
      value: ethers.utils.parseEther("0.1"),
    },
  });

  const { write: withdrawFn, isSuccess: withdrawIsSuccess } = useContractWrite({
    mode: "recklesslyUnprepared",
    address: contractAddress ? contractAddress : undefined,
    abi: abiFactory.froggybankAbi,
    functionName: "withdraw",
  });

  return (
    <>
      <button
        className="btn btn-primary btn-lg btn-block mb-3"
        onClick={deployContract}
      >
        Deploy Contract
      </button>

      <button
        className="btn btn-primary btn-lg btn-block mb-3"
        disabled={!contractAddress}
        onClick={() => depositFn?.()}
      >
        Deposit
      </button>

      <button
        className="btn btn-primary btn-lg btn-block mb-3"
        id="withdrawButton"
        disabled={!contractAddress}
        onClick={() => withdrawFn?.()}
      >
        Withdraw
      </button>

      <p className="info-text alert alert-secondary">
        Contract Status: <span>{contractStatus}</span>
      </p>
      {depositIsSuccess ? (
        <p className="info-text alert alert-secondary">
          <span>Deposited 0.1</span>
        </p>
      ) : null}
      {withdrawIsSuccess ? (
        <p className="info-text alert alert-secondary">
          <span>Withdraw was success</span>
        </p>
      ) : null}
    </>
  );
};
