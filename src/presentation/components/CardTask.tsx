import { IonButton, IonIcon } from "@ionic/react";
import {
  createOutline,
  trashOutline,
  checkmarkCircleOutline,
  arrowUndoOutline,
} from "ionicons/icons";
import { Task, TaskStatus } from "../../core/entities/Task";
import { useState } from "react";
import ModalTask from "./ModalTask/ModalTask";

interface CardTaskProps {
  task: Task;
  onDelete: (task: Task) => void;
  onEdit: (task: Task) => void;
}

const CardTask: React.FC<CardTaskProps> = ({ task, onDelete, onEdit }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmModal = (title: string, description: string) => {
    const taskEdited = { ...task, title, description };
    onEdit(taskEdited); // Chama a função para editar tarefa
    handleCloseModal(); // Fecha o modal
  };

  // Função para alterar o status da tarefa
  const handleStatusChange = (newStatus: TaskStatus) => {
    onEdit({ ...task, status: newStatus });
  };

  return (
    <>
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
        data-testid="card-task"
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
              onClick={handleOpenModal}
              style={{
                "--padding-start": "0",
                "--padding-end": "0",
                "--background": "transparent",
                "--background-activated": "transparent",
                "--background-focused": "transparent",
                "--box-shadow": "none",
              }}
              data-testid="edit-task-button"
            >
              <IonIcon
                icon={createOutline}
                style={{
                  color: "#0051E0",
                  "--ion-button-hover-background": "transparent",
                  "--ion-button-hover-opacity": "0",
                }}
              />
            </IonButton>

            {/* Ícone de deletar */}
            <IonButton
              onClick={() => onDelete(task)}
              style={{
                "--padding-start": "0",
                "--padding-end": "0",
                "--background": "transparent",
                "--background-activated": "transparent",
                "--background-focused": "transparent",
                "--box-shadow": "none",
              }}
              data-testid="delete-task-button"
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

        {/* Botões para alterar o status */}
        <div
          style={{
            marginTop: "10px",
            display: "flex",
            gap: "8px",
            flexWrap: "wrap", // Permite que os botões quebrem para a próxima linha
            justifyContent:
              task.status === TaskStatus.IN_PROGRESS
                ? "space-between"
                : "flex-start",
          }}
        >
          {task.status === TaskStatus.IN_PROGRESS ? (
            <>
              {/* Botão para definir como OPEN (Pendentes) */}
              <IonButton
                expand="block"
                onClick={() => handleStatusChange(TaskStatus.OPEN)}
                style={{
                  "--background": "#0051E0",
                  "--background-activated": "#0040a0",
                  flex: "1 1 45%", // Ocupa 45% do espaço disponível
                  minWidth: "120px", // Largura mínima para evitar quebras inadequadas
                }}
              >
                <IonIcon icon={arrowUndoOutline} slot="start" />
                Pendentes
              </IonButton>

              {/* Botão para definir como DONE (Concluídas) */}
              <IonButton
                expand="block"
                onClick={() => handleStatusChange(TaskStatus.DONE)}
                style={{
                  "--background": "#4CAF50",
                  "--background-activated": "#45a049",
                  flex: "1 1 45%", // Ocupa 45% do espaço disponível
                  minWidth: "120px", // Largura mínima para evitar quebras inadequadas
                }}
              >
                <IonIcon icon={checkmarkCircleOutline} slot="start" />
                Concluídas
              </IonButton>
            </>
          ) : task.status === TaskStatus.OPEN ? (
            // Botão para definir como IN_PROGRESS (Iniciar)
            <IonButton
              expand="block"
              onClick={() => handleStatusChange(TaskStatus.IN_PROGRESS)}
              style={{
                width: "100%",
                "--background": "#0051E0",
                "--background-activated": "#0040a0",
              }}
            >
              <IonIcon icon={checkmarkCircleOutline} slot="start" />
              Iniciar
            </IonButton>
          ) : (
            // Botão para definir como IN_PROGRESS (Reabrir)
            <IonButton
              expand="block"
              onClick={() => handleStatusChange(TaskStatus.IN_PROGRESS)}
              style={{
                width: "100%",
                "--background": "#4CAF50",
                "--background-activated": "#4CAF50",
              }}
            >
              <IonIcon icon={arrowUndoOutline} slot="start" />
              Reabrir
            </IonButton>
          )}
        </div>
      </div>

      {/* Modal para editar tarefa */}
      <ModalTask
        initialTitle={task.title}
        initialDescription={task.description}
        onClose={handleCloseModal}
        onConfirm={handleConfirmModal}
        isOpen={isModalOpen}
      />
    </>
  );
};

export default CardTask;
