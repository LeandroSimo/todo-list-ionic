import { IonButtons, IonButton, IonIcon, IonText } from "@ionic/react";
import { add } from "ionicons/icons";
import { ptBR } from "date-fns/locale";
import { format } from "date-fns";
import { setDefaultOptions } from "date-fns/setDefaultOptions";
import ModalTask from "../ModalTask/ModalTask";
import { useState } from "react";

setDefaultOptions({ locale: ptBR });

interface TodoHeaderProps {
  countTasks: number;
  onAddTask: (title: string, description: string) => void;
}

const TodoHeader = ({ countTasks, onAddTask }: TodoHeaderProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const currentDate = new Date();
  const formattedDate = format(currentDate, "EEE', 'd' 'MMM'")
    .replace(/^\w/, (c) => c.toUpperCase())
    .replace(
      /(\w{3})$/,
      (month) => month.charAt(0).toUpperCase() + month.slice(1)
    );

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmModal = (title: string, description: string) => {
    onAddTask(title, description); // Chama a função para adicionar tarefa
    handleCloseModal(); // Fecha o modal
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          padding: "16px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          {/* Dia atual  */}
          <IonText
            style={{ fontSize: "26px", fontWeight: "bold", color: "black" }}
          >
            {formattedDate}
          </IonText>
          {/* Tarefas pendentes */}
          <IonText>
            <p style={{ fontSize: "14px", color: "gray", margin: 0 }}>
              {countTasks} tarefas pendentes
            </p>
          </IonText>
        </div>
        {/* Botão para adicionar nova tarefa */}
        <IonButtons slot="end">
          <IonButton
            shape="round"
            style={{
              width: "45px",
              height: "45px",
              "--border-radius": "50%",
              "--background": "var(--ion-color-primary)",
            }}
            onClick={handleOpenModal}
            data-testid="add-task-button"
          >
            <IonIcon
              slot="icon-only"
              icon={add}
              style={{ fontSize: "44px", color: "white" }}
            />
          </IonButton>
        </IonButtons>
      </div>

      <ModalTask
        isOpen={isModalOpen}
        onConfirm={handleConfirmModal}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default TodoHeader;
