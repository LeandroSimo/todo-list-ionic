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
  IonText,
  useIonViewWillEnter,
  useIonViewWillLeave,
} from "@ionic/react";
import { useEffect, useState } from "react";

interface ModalTaskProps {
  isOpen: boolean;
  onConfirm: (title: string, description: string) => void;
  onClose: () => void;
  initialTitle?: string;
  initialDescription?: string;
}

const ModalTask: React.FC<ModalTaskProps> = ({
  isOpen,
  onConfirm,
  onClose,
  initialTitle = "",
  initialDescription = "",
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [error, setError] = useState("");
  const [keyboardHeight, setKeyboardHeight] = useState(0); // Estado para armazenar a altura do teclado

  // Atualiza os estados quando os valores iniciais mudam
  useEffect(() => {
    setTitle(initialTitle);
    setDescription(initialDescription);
  }, [initialTitle, initialDescription]);

  // Função para lidar com a confirmação
  const handleConfirm = () => {
    if (!title.trim()) {
      setError("O título é obrigatório!");
      return;
    }

    onConfirm(title, description);
    setTitle("");
    setDescription("");
    setError("");
    onClose();
  };

  // Verifica se a tela é maior que 490px
  const isDesktop = window.innerWidth > 490;

  // Detecta quando o teclado está aberto
  useIonViewWillEnter(() => {
    window.addEventListener("keyboardWillShow", (event: any) => {
      setKeyboardHeight(event.keyboardHeight); // Atualiza a altura do teclado
    });

    window.addEventListener("keyboardWillHide", () => {
      setKeyboardHeight(0); // Reseta a altura do teclado quando fechado
    });
  });

  // Remove os listeners quando o componente é desmontado
  useIonViewWillLeave(() => {
    window.removeEventListener("keyboardWillShow", () => {});
    window.removeEventListener("keyboardWillHide", () => {});
  });

  // Modal tradicional para desktop
  if (isDesktop && isOpen) {
    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000,
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "8px",
            width: "400px",
            padding: "16px",
            boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "16px",
            }}
          >
            <h2 style={{ margin: 0 }}>
              {initialTitle ? "Editar Tarefa" : "Adicionar Tarefa"}
            </h2>
            <button
              onClick={onClose}
              style={{
                background: "none",
                border: "none",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              Fechar
            </button>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            {/* Campo para o título */}
            <div>
              <label
                style={{
                  color: "var(--ion-color-primary)",
                  fontWeight: "bold",
                  marginBottom: "8px",
                  display: "block",
                }}
              >
                Título
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  setError("");
                }}
                placeholder="Digite o título da tarefa"
                style={{
                  width: "100%",
                  padding: "8px",
                  borderRadius: "4px",
                  border: `1px solid ${error ? "red" : "#ccc"}`,
                  backgroundColor: "white",
                }}
              />
              {error && (
                <IonText
                  color="danger"
                  style={{ fontSize: "12px", marginTop: "4px" }}
                >
                  {error}
                </IonText>
              )}
            </div>

            {/* Campo para a descrição */}
            <div>
              <label
                style={{
                  color: "var(--ion-color-primary)",
                  fontWeight: "bold",
                  marginBottom: "8px",
                  display: "block",
                }}
              >
                Descrição
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Digite a descrição da tarefa"
                style={{
                  width: "100%",
                  padding: "8px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                  backgroundColor: "white",
                }}
              />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              gap: "8px",
              marginTop: "16px",
            }}
          >
            {/* Botão para fechar o modal */}
            <button
              onClick={onClose}
              style={{
                padding: "10px 16px",
                backgroundColor: "#ccc",
                color: "black",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Fechar
            </button>
            {/* Botão para confirmar */}
            <button
              onClick={handleConfirm}
              style={{
                padding: "10px 16px",
                backgroundColor: "var(--ion-color-primary)",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              {initialTitle ? "Salvar" : "Confirmar"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // IonModal para dispositivos móveis
  return (
    <IonModal
      isOpen={isOpen}
      onDidDismiss={onClose}
      style={{
        alignItems: "flex-end",
        "--width": "100%",
        "--height": `calc(50vh + ${keyboardHeight}px)`, // Ajusta a altura com base no teclado
        "--border-radius": "16px 16px 0 0",
        "--box-shadow": "0 -4px 16px rgba(0, 0, 0, 0.2)",
      }}
    >
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            {initialTitle ? "Editar Tarefa" : "Adicionar Tarefa"}
          </IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onClose}>Fechar</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent
        style={{
          maxHeight: `calc(50vh + ${keyboardHeight}px)`, // Ajusta a altura do conteúdo
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
              onInput={(_e) => {
                setTitle((_e.target as HTMLInputElement).value);
                setError("");
              }}
              placeholder=" Digite o título da tarefa"
              style={{
                border: `1px solid ${error ? "red" : "#ccc"}`,
              }}
            />
            {error && (
              <IonText
                color="danger"
                style={{
                  fontSize: "12px",
                  marginTop: "4px",
                }}
              >
                {error}
              </IonText>
            )}
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
              onInput={(_e) => {
                setDescription((_e.target as HTMLInputElement).value);
              }}
              placeholder=" Digite a descrição da tarefa"
              style={{
                border: "1px solid #ccc",
              }}
            />
          </IonItem>
        </div>
        <IonButton
          expand="block"
          onClick={handleConfirm}
          style={{ margin: "5px" }}
        >
          {initialTitle ? "Salvar" : "Confirmar"}
        </IonButton>
      </IonContent>
    </IonModal>
  );
};

export default ModalTask;
