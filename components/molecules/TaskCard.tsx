import Link from "next/link";
import type { Task } from "@/utils/zodSchema";
import DeleteButton from "@/components/atom/DeleteButton";

const TaskCard = ({ task }: { task: Task }) => {
  return (
    <div className="bg-white border rounded-3 p-3 shadow-sm">
      <div className="d-flex align-items-start justify-content-between gap-2">
        <div className="pe-2">
          <h6 className="mb-1">{task.title}</h6>
          <p className="mb-2 small text-body-secondary">
            {task.description}
          </p>
        </div>
        <Link
          className="small text-decoration-none link-primary"
          href={`/tasks/edit-task/${task.id}`}
        >
          Edit
        </Link>
      </div>
      <div className="d-flex justify-content-end">
        <DeleteButton taskId={task.id} />
      </div>
    </div>
  );
};

export default TaskCard;
