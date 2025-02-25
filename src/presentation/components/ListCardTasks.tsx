import { Task } from "../../core/entities/Task";
import CardTask from "./CardTask";

interface ListCardTasksProps {
  tasks: Task[];
  onDelete: (task: Task) => void;
  onEdit: (task: Task) => void;
}

const ListCardTasks: React.FC<ListCardTasksProps> = ({
  tasks,
  onDelete,
  onEdit,
}) => {
  return (
    <div
      style={{
        display: "grid",
        gap: "16px",
        margin: "0 12px",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
      }}
    >
      {tasks.map((task) => (
        <CardTask
          key={task.id}
          task={task}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default ListCardTasks;
