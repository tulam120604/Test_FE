import { Pencil, Trash } from "lucide-react";
import { useState } from "react";
import EditTaskModal from "./editTask";
import ConfirmDialog from "./confirmDialog";

export function Task_item({ data, onDelete }) {
  const [showEditForm, setShowEditForm] = useState(false);
  const [open, setOpen] = useState(false);
  const [idTask, setIdTask] = useState(undefined);
  const getStatusStyle = (status) => {
    switch (status) {
      case "Chưa bắt đầu":
        return "bg-gray-200 text-gray-800 ring-1 ring-gray-300";
      case "Đang làm":
        return "bg-yellow-100 text-yellow-800 ring-1 ring-yellow-300";
      case "Đã hoàn thành":
        return "bg-green-100 text-green-800 ring-1 ring-green-300";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  function formatDateDash(dateStr) {
    return dateStr.split("-").reverse().join("-");
  }
  return (
    <>
      <div className="p-6 rounded-2xl shadow-md bg-white dark:bg-gray-800 space-y-3 transition-all group">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold">{data?.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {data?.description}
            </p>
          </div>

          <div className="flex space-x-2 *:cursor-pointer">
            <button
              type="button"
              className="text-blue-600 hover:text-blue-800 transition"
              title="Edit"
              onClick={() => {
                setShowEditForm(true), setIdTask(data.id);
              }}
            >
              <Pencil size={18} />
            </button>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="text-red-600 hover:text-red-800 transition"
              title="Delete"
            >
              <Trash size={18} />
            </button>
          </div>
        </div>

        <span
          className={`inline-block px-4 py-1 rounded-full text-sm font-medium transition ${getStatusStyle(
            data?.status
          )}`}
        >
          {data?.status}
        </span>
        <br />
        <span>Ngày hết hạn {formatDateDash(data?.date)}</span>
      </div>

      {/* edit task */}
      {showEditForm && (
        <EditTaskModal
          open={showEditForm}
          onClose={() => setShowEditForm(false)}
          idTask={idTask}
        />
      )}

      {/* confirm remove dialog */}
      {open && (
        <ConfirmDialog
          open={open}
          title="Xác nhận xoá"
          message="Bạn có chắc chắn muốn xoá công việc này không?"
          onConfirm={() => onDelete(data?.id)}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
