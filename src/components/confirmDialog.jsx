// components/ModalConfirm.jsx
export default function ConfirmDialog({
  title,
  message,
  open,
  onConfirm,
  onClose,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      {/* Overlay để click ra ngoài và đóng */}
      <div className="absolute inset-0" onClick={onClose}></div>

      {/* Modal box */}
      <div className="relative z-10 bg-white dark:bg-gray-800 p-6 rounded-xl w-full max-w-sm shadow-lg">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
          {title}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2">{message}</p>

        <div className="mt-6 flex justify-end gap-3 *:cursor-pointer">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-800"
          >
            Huỷ
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white"
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
}
