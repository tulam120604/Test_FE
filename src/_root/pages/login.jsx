import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate()
  const [error, setError] = useState(false)
  const submitForm = (value) => {
    if (!value.username.trim()) {
      setError(true);
    } else {
      setError(false);
      localStorage.setItem("username", value.username);
      reset();
      navigate("/dashboard");
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">
          Đăng nhập
        </h2>
        <form className="space-y-5" onSubmit={handleSubmit(submitForm)}>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Tên đăng nhập
            </label>
            <input
              {...register("username", { required: true })}
              type="text"
              className="mt-1 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nhập tên đăng nhập"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl transition cursor-pointer"
          >
            Đăng nhập
          </button>
          {error && <span className="text-sm text-red-500">Tên đăng nhập không được để trống</span>}
        </form>
      </div>
    </div>
  );
}
