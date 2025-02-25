import { IonContent, IonPage } from "@ionic/react";
import "./Home.css";
import TodoHeader from "../components/TodoHeader ";

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <TodoHeader />
      </IonContent>
    </IonPage>
  );
};

export default Home;
