import {
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonText,
} from "@ionic/react";
import { add } from "ionicons/icons";
import { ptBR } from "date-fns/locale";
import { format } from "date-fns";
import { setDefaultOptions } from "date-fns/setDefaultOptions";

setDefaultOptions({ locale: ptBR });

const TodoHeader = () => {
  const currentDate = new Date();
  const formattedDate = format(currentDate, "EEE', 'd' 'MMM'")
    .replace(/^\w/, (c) => c.toUpperCase())
    .replace(
      /(\w{3})$/,
      (month) => month.charAt(0).toUpperCase() + month.slice(1)
    );

  return (
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
          style={{ fontSize: "24px", fontWeight: "bold", color: "black" }}
        >
          {formattedDate}
        </IonText>
        {/* Tarefas pendentes */}
        <IonText>
          <p style={{ fontSize: "14px", color: "gray", margin: 0 }}>
            0 tarefas pendentes
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
        >
          <IonIcon
            slot="icon-only"
            icon={add}
            style={{ fontSize: "44px", color: "white" }}
          />
        </IonButton>
      </IonButtons>
    </div>
  );
};

export default TodoHeader;
