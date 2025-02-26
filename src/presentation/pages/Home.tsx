import { IonContent, IonPage } from "@ionic/react";
import TodoHeader from "../components/TodoHeader/TodoHeader";
import ListButtonsFilter from "../components/ListButtonsFilter";
import { Task, TaskStatus } from "../../core/entities/Task";
import ListCardTasks from "../components/ListCardTasks/ListCardTasks";
import useTasks from "../hooks/useTasks";
import { useState } from "react";

const Home: React.FC = () => {
  const [filter, setFilter] = useState<TaskStatus>(TaskStatus.OPEN);

  const { tasks, openTasks, isLoading, addTask } = useTasks(filter);

  const handleDelete = (task: Task) => {
    console.log("Tarefa deletada:", task);
  };

  const handleEdit = (task: Task) => {
    console.log("Tarefa editada:", task);
  };

  const handleAddTask = async (title: string, description: string) => {
    try {
      await addTask({
        id: crypto.randomUUID(), // Gera um ID único
        title,
        description,
        status: TaskStatus.OPEN, // Define o status como OPEN
      });
    } catch (error) {
      console.error("Erro ao adicionar tarefa:", error);
    }
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
        <TodoHeader countTasks={openTasks.length} onAddTask={handleAddTask} />
        {/* Botões de filtro */}
        <ListButtonsFilter
          listSizePending={openTasks.length}
          filter={filter}
          setFilter={setFilter}
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
