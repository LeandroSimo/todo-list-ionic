import { IonContent, IonPage, IonToast } from "@ionic/react";
import TodoHeader from "../components/TodoHeader/TodoHeader";
import ListButtonsFilter from "../components/ListButtonsFilter";
import { Task, TaskStatus } from "../../core/entities/Task";
import ListCardTasks from "../components/ListCardTasks/ListCardTasks";
import useTasks from "../hooks/useTasks";
import { useState } from "react";

const Home: React.FC = () => {
  const [filter, setFilter] = useState<TaskStatus>(TaskStatus.OPEN); // Filtro inicial é "Pendentes"
  const { allTasks, isLoading, error, addTask, updateTask, deleteTask } =
    useTasks();

  // Filtra as tarefas com base no status selecionado
  const filteredTasks = allTasks.filter((task) => task.status === filter);

  // Conta o número de tarefas pendentes (OPEN)
  const pendingTasksCount = allTasks.filter(
    (task) => task.status === TaskStatus.OPEN
  ).length;

  const handleDelete = async (task: Task) => {
    try {
      await deleteTask(task);
    } catch (error) {
      console.error("Erro ao deletar tarefa:", error);
    }
  };

  const handleEdit = async (task: Task) => {
    try {
      await updateTask(task);
    } catch (error) {
      console.error("Erro ao editar tarefa:", error);
    }
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
        <TodoHeader countTasks={pendingTasksCount} onAddTask={handleAddTask} />
        {/* Botões de filtro */}
        <ListButtonsFilter
          listSizePending={pendingTasksCount}
          filter={filter}
          setFilter={setFilter}
        />
        {/* Lista de tarefas filtradas */}
        <ListCardTasks
          tasks={filteredTasks}
          isLoading={isLoading}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
        {/* Exibe mensagens de erro */}
        <IonToast
          isOpen={!!error} // Exibe o toast se houver erro
          message={error as string} // Mensagem de erro
          duration={3000} // Duração do toast
          color="danger" // Estilo de erro
        />
      </IonContent>
    </IonPage>
  );
};

export default Home;
