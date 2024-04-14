const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full overflow-y-auto bg-gray-600 bg-opacity-50">
      <div className="p-5 mx-auto bg-white border rounded-md shadow-lg top-20 w-96">
        <div className="mt-3 text-center">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Confirm Deletion
          </h3>
          <div className="py-3 mt-2 px-7">
            <p className="text-sm text-gray-500">
              Are you sure you want to delete this sensor? This action cannot be
              undone.
            </p>
          </div>
          <div className="items-center px-4 py-3">
            <button
              className="px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase bg-red-500 rounded shadow outline-none active:bg-red-600 hover:shadow-lg focus:outline-none"
              type="button"
              style={{ transition: "all .15s ease" }}
              onClick={onConfirm}
            >
              Delete
            </button>
            <button
              className="px-6 py-3 mb-1 ml-4 mr-1 text-sm font-bold text-gray-700 uppercase bg-gray-200 rounded shadow outline-none active:bg-gray-300 hover:shadow-lg focus:outline-none"
              type="button"
              style={{ transition: "all .15s ease" }}
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
