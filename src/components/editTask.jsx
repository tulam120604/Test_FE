import { useEffect, useState } from "react";
import { useStore } from "../storeProvider";
import { useForm } from "react-hook-form";
import LoadingOverlay from "./loadingOverLay";

export default function EditTaskModal({ open, onClose, idTask }) {
  const { _, dispatch } = useStore();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    const viewOneData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:3000/data/${idTask}`);
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await res.json();
        reset(result);
      } catch (error) {
        alert(error);
      } finally {
        setLoading(false);
      }
    };
    viewOneData();
  }, []);

  const onEdit = async (data) => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3000/data/${idTask}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      console.log(result);
      dispatch({
        type: "edit_data",
        payload: result,
      });
      reset();
      onClose();
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  // date
  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0]; // format: yyyy-mm-dd
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      {/* ✅ overlay ngoài form để đóng modal */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* ✅ modal box */}
      <div className="relative z-10 bg-white dark:bg-gray-800 p-6 rounded-xl w-full max-w-md shadow-lg">
        <form onSubmit={handleSubmit(onEdit)} className="space-y-4">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            Cập nhật công việc
          </h2>

          <div className="space-y-3">
            <input
              {...register("title", {
                required: "Tiêu đề không được để trống",
              })}
              type="text"
              placeholder="Tiêu đề"
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500"
            />

            <textarea
              {...register("description", {
                required: "Mô tả không được để trống",
              })}
              placeholder="Mô tả"
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500"
            />

            <select
              {...register("status", { required: true })}
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
            >
              <option value="Chưa bắt đầu">Chưa bắt đầu</option>
              <option value="Đang làm">Đang làm</option>
              <option value="Đã hoàn thành">Đã hoàn thành</option>
            </select>

            {/* ✅ Ngày hết hạn */}
            <input
              {...register("date", {
                required: "Ngày hết hạn không được để trống",
              })}
              type="date"
              min={getTomorrowDate()} // giới hạn từ hôm nay trở đi
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
            />
          </div>

          <div className="flex justify-end gap-3 *:cursor-pointer">
            <button
              type="button"
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-xl"
              onClick={onClose}
            >
              Huỷ
            </button>
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl"
            >
              Cập nhật
            </button>
          </div>
        </form>
        {loading && <LoadingOverlay />}
      </div>
    </div>
  );
}
