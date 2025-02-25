import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
} from "@ionic/react";
import { useState } from "react";

interface ModalTaskProps {
  isOpen: boolean;
  onConfirm: (title: string, description: string) => void;
  onClose: () => void;
}

const ModalTask: React.FC<ModalTaskProps> = ({
  isOpen,
  onConfirm,
  onClose,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Função para lidar com a confirmação
  const handleConfirm = () => {
    onConfirm(title, description);
    setTitle("");
    setDescription("");
  };

  return (
    <IonModal
      isOpen={isOpen}
      onDidDismiss={onClose}
      style={{
        alignItems: "flex-end",
        "--width": "100%",
        "--height": "50vh",
        "--border-radius": "16px 16px 0 0",
        "--box-shadow": "0 -4px 16px rgba(0, 0, 0, 0.2)",
      }}
    >
      <IonHeader>
        <IonToolbar>
          <IonTitle>Adicionar Tarefa</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onClose}>Fechar</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent
        style={{
          maxHeight: "50vh",
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        {/* Formulário para adicionar tarefa */}
        <div
          style={{
            padding: "16px",
            width: "100%",
            boxSizing: "border-box",
            overflowX: "hidden",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          {/* Campo para o título */}
          <IonItem>
            <IonLabel
              position="floating"
              style={{
                color: "var(--ion-color-primary)",
                fontWeight: "bold",
                marginBottom: "30px",
                marginTop: "-10px",
              }}
            >
              Título
            </IonLabel>
            <IonInput
              value={title}
              onIonChange={(e) => setTitle(e.detail.value!)}
              placeholder="Digite o título da tarefa"
            />
          </IonItem>

          {/* Campo para a descrição */}
          <IonItem>
            <IonLabel
              position="floating"
              style={{
                color: "var(--ion-color-primary)",
                fontWeight: "bold",
                marginBottom: "30px",
                marginTop: "-10px",
              }}
            >
              Descrição
            </IonLabel>
            <IonInput
              value={description}
              onIonChange={(e) => setDescription(e.detail.value!)}
              placeholder="Digite a descrição da tarefa"
            />
          </IonItem>
        </div>
        <IonButton
          expand="block"
          onClick={handleConfirm}
          style={{ margin: "5px" }}
        >
          Confirmar
        </IonButton>
      </IonContent>
    </IonModal>
  );
};

export default ModalTask;
