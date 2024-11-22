// DialogModal.js
import React from "react";

const DialogModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null; // Return null if the modal is not open

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg max-w-sm w-full p-5"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        <h2 className="text-lg font-bold text-gray-800">{title}</h2>
        <p className="mt-3 text-gray-600">{message}</p>
        <div className="mt-5 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default DialogModal;
