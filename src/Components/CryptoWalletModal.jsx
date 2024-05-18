import React from "react";
import { Dialog } from "@headlessui/react";
import { useSelector } from "react-redux";
const CryptoWalletModal = ({ isOpen, onClose }) => {
  const walletValue = useSelector((state) => state.voteAmountWallet.value);

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />

      <div className="px-6 py-8 bg-white rounded-lg shadow-lg fixed top-12 z-10 right-36 max-w-sm flex gap-10 flex-col">
        <Dialog.Title className="text-md text-center font-semibold text-gray-900 mb-2">
          Facecast Wallet
        </Dialog.Title>

        <Dialog.Description className="flex items-center justify-center flex-col text-sm text-center font-medium text-regal-blue-600 mb-4">
          <span>Total Assets:</span>
          <span className="text-6xl font-bold pl-3">{walletValue} <span className="text-sm text-gray-800">FSC</span></span>
        </Dialog.Description>

        <p className="text-sm text-gray-600">
          5 FSC coins are required to cast a vote
        </p>

        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-white bg-regal-blue-600 rounded-md hover:bg-regal-blue-700 focus:outline-none focus:ring focus:ring-blue-200"
          >
            Close
          </button>
        </div>
      </div>
    </Dialog>
  );
};

export default CryptoWalletModal;
