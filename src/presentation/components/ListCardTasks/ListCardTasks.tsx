import { Task } from "../../../core/entities/Task";
import CardTask from "../CardTask";
import CircularProgress from "@mui/material/CircularProgress";

interface ListCardTasksProps {
  tasks: Task[];
  isLoading?: boolean;
  onDelete: (task: Task) => void;
  onEdit: (task: Task) => void;
}

const ListCardTasks: React.FC<ListCardTasksProps> = ({
  tasks,
  onDelete,
  onEdit,
  isLoading = false,
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
      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
            width: "100%",
            position: "absolute",
          }}
        >
          <CircularProgress
            style={{
              color: "#0051E0",
            }}
          />
        </div>
      ) : tasks.length === 0 ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
            width: "100%",
            position: "absolute",
          }}
        >
          <p style={{ fontSize: "1.2rem" }}>Nenhuma tarefa</p>
        </div>
      ) : (
        tasks.map((task) => (
          <CardTask
            key={task.id}
            task={task}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))
      )}
    </div>
  );
};

export default ListCardTasks;
