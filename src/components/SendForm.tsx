import {
  useSendTransaction,
  usePrepareSendTransaction,
  useSigner,
  useAccount,
} from "wagmi";
import { ethers } from "ethers";
import React, { useEffect } from "react";

export const SendForm = () => {
  const { data: signer } = useSigner();

  const { address } = useAccount();

  const [from, setFrom] = React.useState(address);
  const [to, setTo] = React.useState("");
  const [amount, setAmount] = React.useState("0");
  const [typeTran, setTypeTran] = React.useState(0);
  const [gas, setGas] = React.useState("");
  const [maxFee, setMaxFee] = React.useState("");
  const [maxPriority, setMaxPriority] = React.useState("");
  const [data, setData] = React.useState("");

  const { config } = usePrepareSendTransaction({
    request: {
      to: to,
      value: ethers.utils.parseEther("0"),
    },
  });

  useEffect(() => {
    setFrom(address);
  }, [address]);

  const { sendTransaction } = useSendTransaction(config);
  const handleSend = () => {
    const payload =
      typeTran === 0
        ? {
            to: to,
            value: ethers.utils.parseEther(amount),
            gasPrice: gas,
            gasLimit: "0x5208",
            type: typeTran,
            data: `0x${Buffer.from(data, "utf8").toString("hex")}`,
          }
        : {
            to: to,
            value: ethers.utils.parseEther(amount),
            gasPrice: gas,
            type: typeTran,
            gasLimit: "0x5208",
            data: `0x${Buffer.from(data, "utf8").toString("hex")}`,
            maxFeePerGas: maxFee,
            maxPriorityFeePerGas: maxPriority,
          };
    console.log(payload);
    if (sendTransaction) {
      sendTransaction({ recklesslySetUnpreparedRequest: payload });
    }
  };

  return (
    <>
      <h4 className="card-title">Send Form</h4>
      <div className="form-group">
        <label>From</label>
        <input className="form-control" type="text" value={from} />
      </div>
      <div className="form-group">
        <label>To</label>
        <input
          className="form-control"
          type="text"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Amount</label>
        <input
          className="form-control"
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Type</label>
        <select
          className="browser-default custom-select"
          value={typeTran}
          onChange={(e) => setTypeTran(parseInt(e.target.value))}
        >
          <option value={0}>0x0</option>
          <option value={1}>0x2</option>
        </select>
      </div>
      <div className="form-group">
        <label>Gas Price</label>
        <input
          className="form-control"
          type="text"
          value={gas}
          onChange={(e) => setGas(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Max Fee</label>
        <input
          className="form-control"
          type="text"
          value={maxFee}
          onChange={(e) => setMaxFee(e.target.value)}
        />
      </div>
      <div className="form-group" id="maxPriorityDiv">
        <label>Max Priority Fee</label>
        <input
          className="form-control"
          type="text"
          value={maxPriority}
          onChange={(e) => setMaxPriority(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Data</label>
        <input
          className="form-control"
          type="text"
          value={data}
          onChange={(e) => setData(e.target.value)}
        />
      </div>
      <button
        className="btn btn-primary btn-lg btn-block mb-3"
        onClick={handleSend}
      >
        Submit
      </button>
    </>
  );
};
