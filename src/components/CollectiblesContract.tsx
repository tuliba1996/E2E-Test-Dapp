import React from "react";
import { ethers } from "ethers";
import abiFactory from "../web3/constants.json";
import { useContract, useSigner } from "wagmi";
export const CollectiblesContract = () => {
  const { data: signer } = useSigner();

  let collectiblesContract: ethers.Contract | null = null;
  const [contractStatus, setContractStatus] = React.useState("");

  const [contractAddress, setContractAddress] = React.useState("");
  const [amount, setAmount] = React.useState(1);
  const [approveTokenInput, setApproveTokenInput] = React.useState(1);
  const [transferTokenInput, setTransferTokenInput] = React.useState(1);

  const collectiblesFactory = new ethers.ContractFactory(
    abiFactory.collectiblesAbi,
    abiFactory.collectiblesBytecode,
    // @ts-ignore
    signer
  );

  const deployContract = async () => {
    try {
      collectiblesContract = await collectiblesFactory.deploy();
      setContractStatus("Contract deploying...");
      await collectiblesContract.deployTransaction.wait();
      setContractAddress(collectiblesContract.address);
      setContractStatus(`Contract deployed - ${collectiblesContract.address}`);
    } catch (error) {
      setContractStatus("Contract deploy failed");
      throw error;
    }
  };

  const ecr721Contract = useContract({
    address: contractAddress ? contractAddress : undefined,
    abi: abiFactory.collectiblesAbi,
    signerOrProvider: signer,
  });

  const mintNFT = async () => {
    try {
      const result = await ecr721Contract?.mintCollectibles(amount, {
        from: signer?.getAddress(),
      });
      await result.wait();
    } catch (error) {
      throw error;
    }
  };

  const approveNFT = async () => {
    try {
      const result = await ecr721Contract?.approve(
        contractAddress,
        approveTokenInput,
        {
          from: signer?.getAddress(),
        }
      );
      await result.wait();
    } catch (error) {
      throw error;
    }
  };

  const approveForAllNFT = async () => {
    try {
      const result = await ecr721Contract?.setApprovalForAll(
        contractAddress,
        true,
        {
          from: signer?.getAddress(),
        }
      );
      await result.wait();
    } catch (error) {
      throw error;
    }
  };

  const revokeNFT = async () => {
    try {
      const result = await ecr721Contract?.setApprovalForAll(
        contractAddress,
        false,
        {
          from: signer?.getAddress(),
        }
      );
      await result.wait();
    } catch (error) {
      throw error;
    }
  };

  const transferFromNFT = async () => {
    try {
      const result = await ecr721Contract?.transferFrom(
        signer?.getAddress(),
        "0xC9BD16deEC88e32dd1433D959498fe0dd5d90a93",
        transferTokenInput,
        {
          from: signer?.getAddress(),
        }
      );
      await result.wait();
    } catch (error) {
      throw error;
    }
  };

  return (
    <>
      <button
        className="btn btn-primary btn-lg btn-block mb-3"
        id="deployCollectiblesButton"
        onClick={deployContract}
      >
        Deploy
      </button>

      <div className="form-group">
        <label>Amount</label>
        <input
          className="form-control"
          value={amount}
          onChange={(e) => setAmount(parseInt(e.target.value))}
        />
      </div>

      <button
        className="btn btn-primary btn-lg btn-block mb-3"
        disabled={!contractAddress}
        onClick={mintNFT}
      >
        Mint
      </button>

      <div className="form-group">
        <label>Approve Token</label>
        <input
          className="form-control"
          type="number"
          value={approveTokenInput}
          onChange={(e) => setApproveTokenInput(parseInt(e.target.value))}
        />
      </div>

      <button
        className="btn btn-primary btn-lg btn-block mb-3"
        id="approveButton"
        disabled={!contractAddress}
        onClick={approveNFT}
      >
        Approve
      </button>

      <button
        className="btn btn-primary btn-lg btn-block mb-3"
        id="setApprovalForAllButton"
        disabled={!contractAddress}
        onClick={approveForAllNFT}
      >
        Set Approval For All
      </button>

      <button
        className="btn btn-primary btn-lg btn-block mb-3"
        id="revokeButton"
        disabled={!contractAddress}
        onClick={revokeNFT}
      >
        Revoke
      </button>

      <div className="form-group">
        <label>Transfer Token</label>
        <input
          className="form-control"
          type="number"
          onChange={(e) => setTransferTokenInput(parseInt(e.target.value))}
          value={transferTokenInput}
        />
      </div>

      <button
        className="btn btn-primary btn-lg btn-block mb-3"
        id="transferFromButton"
        disabled={!contractAddress}
        onClick={transferFromNFT}
      >
        Transfer From
      </button>

      <p className="info-text alert alert-secondary">
        Collectibles: <span>{contractStatus}</span>
      </p>
    </>
  );
};
