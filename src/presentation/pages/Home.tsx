import { IonContent, IonPage } from "@ionic/react";
import TodoHeader from "../components/TodoHeader ";
import ListButtonsFilter from "../components/ListButtonsFilter";
import { Task, TaskStatus } from "../../core/entities/Task";
import ListCardTasks from "../components/ListCardTasks";

const Home: React.FC = () => {
  const tasks: Task[] = [
    {
      id: 1,
      title: "Tarefa de exemplo",
      description: "Esta é uma descrição de exemplo para a tarefa.",
      status: TaskStatus.OPEN,
    },
    {
      id: 2,
      title: "Tarefa de exemplo 2",
      description: "Esta é uma descrição de exemplo para a tarefa 2.",
      status: TaskStatus.OPEN,
    },
    {
      id: 3,
      title: "Tarefa de exemplo 3",
      description: "Esta é uma descrição de exemplo para a tarefa 3.",
      status: TaskStatus.OPEN,
    },
  ];

  const handleDelete = (task: Task) => {
    console.log("Tarefa deletada:", task);
  };

  const handleEdit = (task: Task) => {
    console.log("Tarefa editada:", task);
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        {/* Cabeçalho da página */}
        <TodoHeader />
        {/* Botões de filtro */}
        <ListButtonsFilter
          listSizePending={tasks.length}
          filter="pendentes"
          setFilter={() => {}}
        />
        {/* Lista de tarefas */}
        <ListCardTasks
          tasks={tasks}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </IonContent>
    </IonPage>
  );
};

export default Home;
