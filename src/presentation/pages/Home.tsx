import { IonContent, IonPage } from "@ionic/react";
import TodoHeader from "../components/TodoHeader ";
import ListButtonsFilter from "../components/ListButtonsFilter";

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        {/* Cabeçalho da página */}
        <TodoHeader />
        {/* Botões de filtro */}
        <ListButtonsFilter
          listSizePending={20}
          filter="pendentes"
          setFilter={() => {}}
        />
      </IonContent>
    </IonPage>
  );
};

export default Home;
