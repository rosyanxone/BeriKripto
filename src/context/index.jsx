import { createContext, useContext } from "react";
import { createThirdwebClient, getContract, defineChain } from "thirdweb";
import { useReadContract } from "thirdweb/react";

const StateContext = createContext();

export function useStateContext() {
  return useContext(StateContext);
}

export function StateContextProvider({ children }) {
  // Create thirdweb client with ClientId
  const client = createThirdwebClient({
    clientId: import.meta.env.VITE_CLIENT_ID,
  });

  // Connect to contract
  const contract = getContract({
    client,
    chain: defineChain(11155420),
    address: "0xA9ad914Fc3320d9c1477E24BFBc366ee16e02C5e",
  });

  const getPrograms = () => {
    const { data, isLoading } = useReadContract({
      contract,
      method:
        "function getPrograms() view returns ((address owner, address recipient, string title, string description, uint256 deadline, uint256 target, uint256 amountCollected, string image, address[] donators, uint256[] donations, string[] messages, bool isFinish)[])",
      params: [],
    });

    return { programs: data, isLoading };
  };

  const getProgram = (_id) => {
    let { data, isLoading } = useReadContract({
      contract,
      method:
        "function getProgram(uint256 _id) view returns ((address owner, address recipient, string title, string description, uint256 deadline, uint256 target, uint256 amountCollected, string image, address[] donators, uint256[] donations, string[] messages, bool isFinish))",
      params: [_id],
    });

    if (!isLoading) {
      data = { ...data, deadline: parseInt(data.deadline) };
    }

    return { program: data, isLoading };
  };

  return (
    <StateContext.Provider
      value={{
        contract,
        getPrograms,
        getProgram,
      }}
    >
      {children}
    </StateContext.Provider>
  );
}
