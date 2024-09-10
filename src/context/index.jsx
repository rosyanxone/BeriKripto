import { createContext, useContext } from "react";
import {
  createThirdwebClient,
  getContract,
  defineChain,
  prepareContractCall,
} from "thirdweb";
import {
  useActiveAccount,
  useActiveWallet,
  useAutoConnect,
  useReadContract,
  useSendTransaction,
} from "thirdweb/react";

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
    address: "0x26995044946B064436135b07c048b7c4d28c9fbe",
  });

  // Connect user wallet
  const { isLoading: accountLoading } = useAutoConnect({ client });

  const account = useActiveAccount();
  const wallet = useActiveWallet();

  const {
    mutate: sendTransaction,
    data: transactionResult,
    isPending,
    isError,
    isSuccess,
  } = useSendTransaction({ payModal: false });

  const donateToProgram = ({ _id, _message, _amountDonation }) => {
    const transaction = prepareContractCall({
      contract,
      method: "function donateToProgram(uint256 _id, string _message) payable",
      params: [_id, _message],
      value: _amountDonation,
    });

    sendTransaction(transaction, {
      onError: (error) => {
        console.error(error);
      },
      onSuccess: (success) => {
        console.log(success);
      },
    });
  };

  const getPrograms = () => {
    let { data, isLoading } = useReadContract({
      contract,
      method:
        "function getPrograms() view returns ((address owner, address recipient, string title, string description, uint256 deadline, uint256 target, uint256 amountCollected, string image, bool isFinish, (address donator, uint256 amount, string message, uint256 createdAt)[] donations, (string title, string story, string image, uint256 createdAt) report, uint256 createdAt)[])",
      params: [],
    });

    if (!isLoading) {
      data = data.map((d) => {
        return {
          ...d,
          target: String(d.target),
          amountCollected: String(d.amountCollected),
        };
      });
    }

    return { programs: data, isLoading };
  };

  const getProgram = (_id) => {
    let { data, isLoading } = useReadContract({
      contract,
      method:
        "function getProgram(uint256 _id) view returns ((address owner, address recipient, string title, string description, uint256 deadline, uint256 target, uint256 amountCollected, string image, bool isFinish, (address donator, uint256 amount, string message, uint256 createdAt)[] donations, (string title, string story, string image, uint256 createdAt) report, uint256 createdAt))",
      params: [_id],
    });

    if (!isLoading) {
      data = {
        ...data,
        target: String(data.target),
        deadline: parseInt(data.deadline),
        amountCollected: String(data.amountCollected),
        createdAt: parseInt(data.createdAt),
      };

      data.donations = data.donations.map((donation) => {
        return {
          ...donation,
          amount: String(donation.amount),
          createdAt: parseInt(donation.createdAt),
        };
      });
    }

    return { program: data, isLoading };
  };

  const getDonators = (_id) => {
    const { data, isLoading } = useReadContract({
      contract,
      method:
        "function getDonators(uint256 _id) view returns ((address donator, uint256 amount, string message, uint256 createdAt)[])",
      params: [_id],
    });

    return { donators: data, isLoading };
  };

  const getDonation = (_id) => {
    const transaction = prepareContractCall({
      contract,
      method: "function getDonation(uint256 _id)",
      params: [_id],
    });

    sendTransaction(transaction, {
      onError: (error) => {
        console.error(error);
      },
      onSuccess: (success) => {
        console.log(success);
      },
    });
  };

  const getReport = (_id) => {
    const { data } = useReadContract({
      contract,
      method:
        "function getReport(uint256 _id) view returns ((string title, string story, string image, uint256 createdAt))",
      params: [_id],
    });

    return { report: data };
  };

  return (
    <StateContext.Provider
      value={{
        client,
        contract,
        accountLoading,
        account,
        wallet,
        donateToProgram,
        getPrograms,
        getProgram,
        getDonation,
        getReport,
        transactionResult,
        isPending,
        isError,
        isSuccess,
      }}
    >
      {children}
    </StateContext.Provider>
  );
}
