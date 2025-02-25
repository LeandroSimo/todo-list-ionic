import { IonButton, IonIcon } from "@ionic/react";
import { createOutline, trashOutline } from "ionicons/icons";
import { Task } from "../../core/entities/Task";

interface CardTaskProps {
  task: Task;
  onDelete: (task: Task) => void;
  onEdit: (task: Task) => void;
}

const CardTask: React.FC<CardTaskProps> = ({ task, onDelete, onEdit }) => {
  return (
    <div
      style={{
        position: "relative",
        backgroundColor: "white",
        borderRadius: "12px",
        padding: "10px 16px",
        boxShadow: "0 0 6px rgba(0, 0, 0, 0.2)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        overflow: "hidden",
      }}
    >
      {/* Contêiner para o título e os ícones */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "6px",
        }}
      >
        {/* Título da tarefa */}
        <h3
          style={{
            margin: "0",
            fontSize: "18px",
            fontWeight: "bold",
            color: "#333",
          }}
        >
          {task.title}
        </h3>

        {/* Ícones de ações (deletar e editar) */}
        <div
          style={{
            display: "flex",
            gap: "8px", // Espaçamento entre os ícones
          }}
        >
          {/* Ícone de editar */}
          <IonButton
            onClick={() => onEdit(task)} // Passa a task ao clicar em editar
            style={{
              "--padding-start": "0",
              "--padding-end": "0",
              "--background": "transparent",
              "--box-shadow": "none",
            }}
          >
            <IonIcon icon={createOutline} style={{ color: "#0051E0" }} />
          </IonButton>

          {/* Ícone de deletar */}
          <IonButton
            onClick={() => onDelete(task)} // Passa a task ao clicar em deletar
            style={{
              "--padding-start": "0",
              "--padding-end": "0",
              "--background": "transparent",
              "--box-shadow": "none",
            }}
          >
            <IonIcon icon={trashOutline} style={{ color: "#ff3b30" }} />
          </IonButton>
        </div>
      </div>

      {/* Descrição da tarefa */}
      <p
        style={{
          margin: "0",
          fontSize: "14px",
          color: "#666",
        }}
      >
        {task.description}
      </p>
    </div>
  );
};

export default CardTask;
