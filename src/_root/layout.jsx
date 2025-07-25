import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import ConfirmDialog from "../components/confirmDialog";
import CreateTaskModal from "../components/createTask";
import { useStore } from "../storeProvider";

export default function Dashboard_layout() {
  const [open, setOpen] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const { _, dispatch, setDateTask } = useStore();

  useEffect(() => {
    const saved = localStorage.getItem("username");
    if (saved) setUsername(saved);
    else navigate("/login");
  }, []);

  // logout
  const logout = () => {
    localStorage.removeItem("username");
    navigate("/login");
  };

  // filter status
  const filterTaskStatus = (value) => {
    dispatch({
      type: "filter_status",
      payload: value,
    });
  };

  // filter date
  const filterTaskDate = (value) => {
    setDateTask(value);
  };
  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100">

      {/* Main content */}
      <main className="flex-1 p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:justify-between gap-4 mb-8">
          <div className="flex flex-col gap-3">
            <h1 className="text-3xl font-bold">
              Xin chào, {username || "người dùng"} 👋
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Search input */}
            <input
              type="text"
              placeholder="Tìm kiếm..."
              className="px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-48"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            {/* create */}
            <button
              onClick={() => setShowCreateForm(true)} // hoặc navigate tới trang tạo task
              className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-xl cursor-pointer"
            >
              Tạo mới công việc
            </button>

            {/* Logout button */}
            <button
              type="button"
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-xl"
              onClick={() => setOpen((pre) => !pre)}
            >
              Đăng xuất
            </button>
          </div>
        </div>

        {/* confirm dialog */}
        <ConfirmDialog
          open={open}
          title="Xác nhận đăng xuất?"
          onConfirm={logout}
          onCancel={() => setOpen(false)}
        />

        {/* create task */}
        {showCreateForm && (
          <CreateTaskModal
            open={showCreateForm}
            onClose={() => setShowCreateForm(false)}
          />
        )}

        {/* Content */}
        <div>
          {/* filter */}
          <div className="flex items-center gap-4 -mt-5 mb-5">
            {/* Filter select status */}
            <select
              className="px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 
              focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-800 dark:text-white cursor-pointer"
              onChange={(e) => filterTaskStatus(e.target.value)}
            >
              <option value="all">Trạng thái</option>
              <option value="Chưa bắt đầu">Chưa bắt đầu</option>
              <option value="Đang làm">Đang làm</option>
              <option value="Đã hoàn thành">Đã hoàn thành</option>
            </select>

            {/* Filter select date */}
            <select
              className="px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 
              focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-800 dark:text-white cursor-pointer"
              onChange={(e) => filterTaskDate(e.target.value)}
            >
              <option value="0">Thời hạn</option>
              <option value="1">Đã hết hạn</option>
              <option value="2">Chưa hết hạn</option>
            </select>
          </div>
          <Outlet />
        </div>
      </main>
    </div>
  );
}
