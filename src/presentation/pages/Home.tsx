import { IonContent, IonPage } from "@ionic/react";
import TodoHeader from "../components/TodoHeader/TodoHeader";
import ListButtonsFilter from "../components/ListButtonsFilter";
import { Task, TaskStatus } from "../../core/entities/Task";
import ListCardTasks from "../components/ListCardTasks/ListCardTasks";
import useTasks from "../hooks/useTasks";

const Home: React.FC = () => {
  const { tasks, isLoading } = useTasks();

  const handleDelete = (task: Task) => {
    console.log("Tarefa deletada:", task);
  };

  const handleEdit = (task: Task) => {
    console.log("Tarefa editada:", task);
  };

  return (
    <IonPage>
      <IonContent
        fullscreen
        style={{
          "--background": "#f4f5f8",
          "--padding-bottom": "10px",
        }}
      >
        {/* Cabeçalho da página */}
        <TodoHeader countTasks={tasks.length} />
        {/* Botões de filtro */}
        <ListButtonsFilter
          listSizePending={tasks.length}
          filter="pendentes"
          setFilter={() => {}}
        />
        {/* Lista de tarefas */}
        <ListCardTasks
          tasks={tasks}
          isLoading={isLoading}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </IonContent>
    </IonPage>
  );
};

export default Home;
