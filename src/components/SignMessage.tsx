import React from "react";
import { useSignMessage } from "wagmi";

export const SignMessage = () => {
  const { data, signMessage, isLoading } = useSignMessage({
    message: "Dapp test sign message",
  });

  return (
    <>
      <h4>Eth Sign</h4>

      <button
        className="btn btn-primary btn-lg btn-block mb-3"
        disabled={isLoading}
        onClick={() => signMessage()}
      >
        Sign
      </button>

      <p className="info-text alert alert-warning">
        Result: <span>{data}</span>
      </p>
    </>
  );
};
