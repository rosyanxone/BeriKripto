import { createContext, useContext, useState } from "react";
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
import { upload } from "thirdweb/storage";

import { slugify } from "../utils";

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
    address: "0xA16817f7cdf8aFe8805fc12cB24457E35913081e",
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

  const [transactionFeedback, setTransactionFeedback] = useState({
    result: null,
    error: null,
  });

  const createProgram = ({
    _recipient,
    _title,
    _description,
    _target,
    _deadline,
    _image,
  }) => {
    const transaction = prepareContractCall({
      contract,
      method:
        "function createProgram(address _recipient, string _title, string _description, uint256 _target, uint256 _deadline, string _image)",
      params: [_recipient, _title, _description, _target, _deadline, _image],
    });

    sendTransaction(transaction, {
      onError: (error) => {
        console.error(error);
        setTransactionFeedback({ ...transactionFeedback, error: error });
      },
      onSuccess: (success) => {
        console.log(success);
        setTransactionFeedback({ ...transactionFeedback, success: success });
      },
    });
  };

  const createReport = ({ _id, _title, _story, _image }) => {
    const transaction = prepareContractCall({
      contract,
      method:
        "function createReport(uint256 _id, string _title, string _story, string _image)",
      params: [_id, _title, _story, _image],
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

  const donateToProgram = ({ _id, _amountDonation }) => {
    const transaction = prepareContractCall({
      contract,
      method: "function donateToProgram(uint256 _id) payable",
      params: [_id],
      value: _amountDonation,
    });

    sendTransaction(transaction, {
      onError: (error) => {
        console.error(error);
        setTransactionFeedback({ ...transactionFeedback, error: error });
      },
      onSuccess: (success) => {
        console.log(success);
        setTransactionFeedback({ ...transactionFeedback, success: success });
      },
    });
  };

  const getPrograms = () => {
    let { data, isLoading } = useReadContract({
      contract,
      method:
        "function getPrograms() view returns ((address owner, address recipient, string title, string description, uint256 deadline, uint256 target, uint256 amountCollected, string image, bool isFinish, (address donator, uint256 amount, uint256 createdAt)[] donations, (string title, string story, string image, uint256 createdAt) report, uint256 createdAt)[])",
      params: [],
    });

    if (!isLoading) {
      data = data.map((d) => {
        return {
          ...d,
          target: String(d.target),
          amountCollected: String(d.amountCollected),
          createdAt: parseInt(d.createdAt),
        };
      });
    }

    return { programs: data, isLoading };
  };

  const getProgram = (_id) => {
    let { data, isLoading } = useReadContract({
      contract,
      method:
        "function getProgram(uint256 _id) view returns ((address owner, address recipient, string title, string description, uint256 deadline, uint256 target, uint256 amountCollected, string image, bool isFinish, (address donator, uint256 amount, uint256 createdAt)[] donations, (string title, string story, string image, uint256 createdAt) report, uint256 createdAt))",
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

  const uploadToIpfs = async (image, title) => {
    const uris = await upload({
      client,
      files: [new File([image], slugify(title))],
    });

    const ipfsUrl = import.meta.env.VITE_IPFS;
    const imageFile = uris.split("ipfs://")[1];

    return ipfsUrl + imageFile;
  };

  return (
    <StateContext.Provider
      value={{
        client,
        contract,
        accountLoading,
        account,
        wallet,
        transactionFeedback,
        createProgram,
        createReport,
        donateToProgram,
        getPrograms,
        getProgram,
        getDonation,
        getReport,
        uploadToIpfs,
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
