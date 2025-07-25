const isOverdue = (taskDate) => {
  if (!taskDate) return false;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const task = new Date(taskDate);
  task.setHours(0, 0, 0, 0);

  return task < today;
};
const isOnTime = (taskDate) => {
  if (!taskDate) return false;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const task = new Date(taskDate);
  task.setHours(0, 0, 0, 0);

  return task >= today;
};

export { isOverdue, isOnTime };
