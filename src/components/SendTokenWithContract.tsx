import React, { useEffect, useState } from "react";
import {
  Address,
  erc20ABI,
  useAccount,
  useBalance,
  useContract,
  useSigner,
  useToken,
} from "wagmi";

export const SendTokenWithContract = () => {
  const { data: signer } = useSigner();
  const { address } = useAccount();
  const [contractAddress, setContractAddress] = useState();
  const [to, setTo] = useState();
  const [amount, setAmount] = useState<number>(1);

  const { data: tokenInfo, refetch } = useToken({
    address: contractAddress,
  });

  const { data: balance } = useBalance({
    address: address,
    token: contractAddress,
  });

  const erc20TokenContract = useContract({
    address: contractAddress ? contractAddress : undefined,
    abi: erc20ABI,
    signerOrProvider: signer,
  });

  useEffect(() => {
    refetch();
  }, [contractAddress]);

  const transferToken = async () => {
    try {
      const result = await erc20TokenContract?.transfer(
        to ? to : "0xC",
        // @ts-ignore
        amount * 10 ** parseInt(tokenInfo?.decimals),
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

  return (
    <>
      <div className="form-group">
        <label>Contract Address</label>
        <input
          className="form-control"
          value={contractAddress}
          // @ts-ignore
          onChange={(e) => setContractAddress(e.target.value)}
        />
      </div>
      {tokenInfo ? (
        <div>
          <p>Token: {tokenInfo?.name}</p>
          <p>Decimals: {tokenInfo?.decimals}</p>
          <p>
            Balance: {balance?.formatted} {balance?.symbol}
          </p>
        </div>
      ) : null}

      <div className="form-group">
        <label>To</label>
        <input
          className="form-control"
          value={to}
          // @ts-ignore
          onChange={(e) => setTo(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Amount</label>
        <input
          className="form-control"
          value={amount}
          // @ts-ignore
          onChange={(e) => setAmount(parseInt(e.target.value))}
        />
      </div>

      <button
        className="btn btn-primary btn-lg btn-block mb-3"
        disabled={!contractAddress}
        onClick={transferToken}
      >
        Send Token
      </button>
    </>
  );
};
