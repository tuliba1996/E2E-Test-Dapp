import React from "react";
import { useNetwork, useSignMessage, useSignTypedData } from "wagmi";

export const SignTypeData = () => {
  const { chain } = useNetwork();
  const domain = {
    name: "Ether Mail",
    version: "1",
    chainId: chain?.id,
    verifyingContract: "0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC",
  } as const;

  // The named list of all type definitions
  const types = {
    Person: [
      { name: "name", type: "string" },
      { name: "wallet", type: "address" },
    ],
    Mail: [
      { name: "from", type: "Person" },
      { name: "to", type: "Person" },
      { name: "contents", type: "string" },
    ],
  } as const;

  const value = {
    from: {
      name: "Cow",
      wallet: "0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826",
    },
    to: {
      name: "Bob",
      wallet: "0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB",
    },
    contents: "Hello, Bob!",
  } as const;

  const { data, isError, isLoading, isSuccess, signTypedData } =
    useSignTypedData({
      domain,
      types,
      value,
    });

  return (
    <>
      <h4>Sign Typed Data</h4>

      <button
        className="btn btn-primary btn-lg btn-block mb-3"
        onClick={() => signTypedData()}
      >
        Sign
      </button>

      <p className="info-text alert alert-warning">
        Result:{" "}
        <span>
          {isLoading ? "Loading..." : isError ? "Error" : isSuccess ? data : ""}
        </span>
      </p>
    </>
  );
};
