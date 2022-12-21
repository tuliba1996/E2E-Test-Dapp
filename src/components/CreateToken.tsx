import React from "react";
import { ethers } from "ethers";
import abiFactory from "../web3/constants.json";
import { useContract, useSigner } from "wagmi";
export const CreateToken = () => {
  const _initialAmount = 10 ** 6;
  const _tokenName = "DUNA";
  const decimalUnits = 4;
  const tokenSymbol = "DUNA";

  const { data: signer } = useSigner();

  let hstContract: ethers.Contract | null = null;
  const [contractStatus, setContractStatus] = React.useState("");

  const [contractAddress, setContractAddress] = React.useState("");

  const hstFactory = new ethers.ContractFactory(
    abiFactory.hstAbi,
    abiFactory.hstBytecode,
    // @ts-ignore
    signer
  );

  const deployContract = async () => {
    try {
      hstContract = await hstFactory.deploy(
        _initialAmount,
        _tokenName,
        decimalUnits,
        tokenSymbol
      );
      setContractStatus("Token Creating...");
      await hstContract.deployTransaction.wait();
      setContractAddress(hstContract.address);
      setContractStatus(`Token Created - ${hstContract.address}`);
    } catch (error) {
      setContractStatus("Creation Failed");
      throw error;
    }
  };

  const erc20TokenContract = useContract({
    address: contractAddress ? contractAddress : undefined,
    abi: abiFactory.hstAbi,
    signerOrProvider: signer,
  });

  const transferToken = async () => {
    try {
      const result = await erc20TokenContract?.transfer(
        "0xC9BD16deEC88e32dd1433D959498fe0dd5d90a93",
        `${10 ** decimalUnits}`,
        {
          from: signer?.getAddress(),
          gasLimit: 60000,
          gasPrice: "20000000000",
        }
      );
      console.log("result", result);
    } catch (e) {
      console.log(e);
    }
  };

  const transferTokenWithoutGas = async () => {
    try {
      const result = await erc20TokenContract?.transfer(
        "0xC9BD16deEC88e32dd1433D959498fe0dd5d90a93",
        `${10 ** decimalUnits}`,
        {
          gasPrice: "20000000000",
        }
      );
      console.log("result", result);
    } catch (e) {
      console.log(e);
    }
  };

  const approveToken = async () => {
    try {
      const result = await erc20TokenContract?.approve(
        contractAddress,
        `${10 ** decimalUnits}`,
        {
          from: signer?.getAddress(),
          gasLimit: 60000,
          gasPrice: "20000000000",
        }
      );
      console.log("result", result);
    } catch (e) {
      console.log(e);
    }
  };

  const approveTokenWithoutGas = async () => {
    try {
      const result = await erc20TokenContract?.approve(
        contractAddress,
        `${10 ** decimalUnits}`,
        {
          gasPrice: "20000000000",
        }
      );
      console.log("result", result);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <p className="info-text alert alert-success">
        Token: <span>{contractStatus}</span>
      </p>

      <button
        className="btn btn-primary btn-lg btn-block mb-3"
        onClick={deployContract}
      >
        Create Token
      </button>

      <button
        className="btn btn-primary btn-lg btn-block mb-3"
        id="watchAsset"
        disabled
      >
        Add Token to Wallet
      </button>

      <button
        className="btn btn-primary btn-lg btn-block mb-3"
        id="transferTokens"
        disabled={!contractAddress}
        onClick={transferToken}
      >
        Transfer Tokens
      </button>

      <button
        className="btn btn-primary btn-lg btn-block mb-3"
        id="approveTokens"
        disabled={!contractAddress}
        onClick={approveToken}
      >
        Approve Tokens
      </button>

      <button
        className="btn btn-primary btn-lg btn-block mb-3"
        id="transferTokensWithoutGas"
        disabled={!contractAddress}
        onClick={transferTokenWithoutGas}
      >
        Transfer Tokens Without Gas
      </button>

      <button
        className="btn btn-primary btn-lg btn-block mb-3"
        id="approveTokensWithoutGas"
        disabled={!contractAddress}
        onClick={approveTokenWithoutGas}
      >
        Approve Tokens Without Gas
      </button>
    </>
  );
};
