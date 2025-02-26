import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { Task, TaskStatus } from "../../core/entities/Task";
import { GetTasks } from "../../domain/usecases/GetTasks";
import { TaskRepositoryImpl } from "../../data/repositories/TaskRepositoryImpl";
import { GetTasksByStatus } from "../../domain/usecases/GetTasksByStatus";
import { CreateTask } from "../../domain/usecases/CreateTask";
import { UpdateTask } from "../../domain/usecases/UpdateTask";
import { DeleteTask } from "../../domain/usecases/DeleteTask";

// Definindo o tipo do contexto
interface TaskContextType {
  tasks: Task[];
  isLoading: boolean;
  addTask: (task: Task) => Promise<Task>;
  updateTask: (task: Task) => Promise<Task>;
  deleteTask: (task: Task) => Promise<void>;
  getTasksByStatus: (status: TaskStatus) => Promise<Task[]>;
}

// Criando o contexto com um valor padrão (opcional)
const TaskContext = createContext<TaskContextType | undefined>(undefined);

// Hook personalizado para acessar o contexto
export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
};

// Provedor de contexto
export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false); // Estado de loading
  const taskRepository = new TaskRepositoryImpl();

  // Instanciando todos os use cases
  const getTasksUseCase = new GetTasks(taskRepository);
  const getTasksByStatusUseCase = new GetTasksByStatus(taskRepository);
  const addTaskUseCase = new CreateTask(taskRepository);
  const updateTaskUseCase = new UpdateTask(taskRepository);
  const deleteTaskUseCase = new DeleteTask(taskRepository);

  // Função para carregar as tarefas
  const loadTasks = useCallback(async () => {
    // Inicia o loading
    try {
      const tasks = await getTasksUseCase.execute(); // Usa o use case GetTasks
      setTasks(tasks);
    } catch (error) {
      console.error("Erro ao carregar tarefas:", error);
    } finally {
      setIsLoading(false); // Finaliza o loading
    }
    setIsLoading(false);
  }, [getTasksUseCase, isLoading, setIsLoading]);

  // Carrega as tarefas ao montar o componente
  useEffect(() => {
    setIsLoading(true);
    // loadTasks();
  }, [loadTasks]);

  // Adicionar uma nova tarefa
  const addTask = async (task: Task): Promise<Task> => {
    setIsLoading(true); // Inicia o loading
    try {
      const addedTask = await addTaskUseCase.execute(task); // Usa o use case CreateTask
      await loadTasks(); // Atualiza a lista de tarefas
      return addedTask; // Retorna a tarefa adicionada
    } finally {
      setIsLoading(false); // Finaliza o loading
    }
  };

  // Atualizar uma tarefa existente
  const updateTask = async (task: Task): Promise<Task> => {
    setIsLoading(true); // Inicia o loading
    try {
      const updatedTask = await updateTaskUseCase.execute(task); // Usa o use case UpdateTask
      await loadTasks(); // Atualiza a lista de tarefas
      return updatedTask; // Retorna a tarefa atualizada
    } finally {
      setIsLoading(false); // Finaliza o loading
    }
  };

  // Deletar uma tarefa
  const deleteTask = async (task: Task): Promise<void> => {
    setIsLoading(true); // Inicia o loading
    try {
      await deleteTaskUseCase.execute(task); // Usa o use case DeleteTask
      await loadTasks(); // Atualiza a lista de tarefas
    } finally {
      setIsLoading(false); // Finaliza o loading
    }
  };

  // Buscar tarefas por status
  const getTasksByStatus = async (status: TaskStatus): Promise<Task[]> => {
    setIsLoading(true); // Inicia o loading
    try {
      return await getTasksByStatusUseCase.execute(status); // Usa o use case GetTasksByStatus
    } finally {
      setIsLoading(false); // Finaliza o loading
    }
  };

  // Valor do contexto
  const contextValue: TaskContextType = {
    tasks,
    isLoading,
    addTask,
    updateTask,
    deleteTask,
    getTasksByStatus,
  };

  return (
    <TaskContext.Provider value={contextValue}>{children}</TaskContext.Provider>
  );
};
