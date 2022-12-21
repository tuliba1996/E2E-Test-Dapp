import { useSendTransaction, usePrepareSendTransaction } from "wagmi";
import { ethers } from "ethers";
import React from "react";

export const SendEth = () => {
  const { config: nativeConfig } = usePrepareSendTransaction({
    request: {
      to: "0xC9BD16deEC88e32dd1433D959498fe0dd5d90a93",
      value: ethers.utils.parseEther("0"),
    },
  });

  const { config: eip1559Config } = usePrepareSendTransaction({
    request: {
      to: "0xC9BD16deEC88e32dd1433D959498fe0dd5d90a93",
      value: ethers.utils.parseEther("0.01"),
      gasLimit: "0x5208",
      gasPrice: "0x2540be400",
      type: 0,
      maxFeePerGas: "0x2540be400",
      maxPriorityFeePerGas: "0x3b9aca00",
    },
  });

  const { data, isSuccess, isLoading, sendTransaction } =
    useSendTransaction(nativeConfig);

  const eipSend = useSendTransaction(eip1559Config);

  const handleSend = () => {
    if (sendTransaction) {
      sendTransaction({
        recklesslySetUnpreparedRequest: {
          to: "0xC9BD16deEC88e32dd1433D959498fe0dd5d90a93",
          value: ethers.utils.parseEther("0.1"),
          gasLimit: "0x5208",
          gasPrice: "28000",
          type: 0,
          data: "0x",
        },
      });
    }
  };

  return (
    <>
      <button
        className="btn btn-primary btn-lg btn-block mb-3"
        disabled={!sendTransaction}
        onClick={handleSend}
      >
        Send Transaction
      </button>
      {isLoading && <div>Check Wallet</div>}
      {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
      <button
        disabled={!eipSend.sendTransaction}
        onClick={() => eipSend.sendTransaction?.()}
        className="btn btn-primary btn-lg btn-block mb-3"
        hidden
      >
        Send EIP 1559 Transaction
      </button>
      {eipSend.isLoading && <div>Check Wallet</div>}
      {eipSend.isSuccess && (
        <div>Transaction: {JSON.stringify(eipSend.data)}</div>
      )}
    </>
  );
};
