import { useEffect, useState } from "react";
import { Task_item } from "../../components/taskItem";
import LoadingOverlay from "../../components/loadingOverLay";
import { useStore } from "../../storeProvider";
import { isOverdue, isOnTime } from "../../util.js";

const Dashboard = () => {
  const { data, dispatch, dateTask } = useStore();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const listData = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:3000/data");
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await res.json();
        dispatch({
          type: "set_data",
          payload: result,
        });
      } catch (error) {
        alert(error);
      } finally {
        setLoading(false);
      }
    };
    listData();
  }, []);

  //   delete
  const onRemove = async (id) => {
    // setLoading(true);
    try {
      const res = await fetch(`http://localhost:3000/data/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        dispatch({
          type: "remove_data",
          payload: id,
        });
      }
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  // lọc theo date và status
  // status
  const dataFilter = data?.data?.filter((item) => {
    const matchStatus =
      data.filterStatus === "all" || item.status === data.filterStatus;

    const matchDate =
      dateTask === "0"
        ? true
        : dateTask === "1"
        ? isOverdue(item.date)
        : dateTask === "2"
        ? isOnTime(item.date)
        : true;

    return matchStatus && matchDate;
  });

  // task done
  const totalDone = data?.data?.filter(
    (item) => item.status === "Đã hoàn thành"
  ).length;

  // task overDate
  const totalOverDate = data?.data?.filter((item) =>
    isOverdue(item.date)
  ).length;

  return (
    <div>
      <div className="mb-4 space-y-2">
        <h2 className="text-2xl font-semibold">Danh sách công việc</h2>
        <div className="space-x-6">
          <span>Đã hoàn thành {totalDone}</span>
          <span>Quá hạn {totalOverDate}</span>
        </div>
      </div>
      {loading ? (
        <LoadingOverlay />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {dataFilter?.map((item) => (
            <Task_item
              key={item?.id}
              data={item}
              onDelete={onRemove}
              onEdit={""}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
