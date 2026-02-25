import type { Task } from "@/lib/zodSchemas";
import TaskCard from "@/components/molecules/TaskCard";
import { type Column } from "@/lib/zodSchemas";

const TasksList = ({ column, tasks }: { column: Column; tasks: Task[] }) => {
  const filteredTasks = tasks.filter(
    (task) => (task.column ?? "backlog") === column,
  );

  return (
    <div className="d-flex flex-column gap-2">
      {filteredTasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TasksList;
