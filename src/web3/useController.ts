import { useAccount, useNetwork } from "wagmi";

export const useController = () => {
  const { address } = useAccount();

  const { chain } = useNetwork();

  return {
    address,
    chain,
  };
};
