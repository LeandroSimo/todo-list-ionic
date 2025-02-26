// presentation/hooks/useTasks.ts
import { useEffect, useMemo, useState } from "react";
import { Task, TaskStatus } from "../../core/entities/Task";
import { TaskRepositoryImpl } from "../../data/repositories/TaskRepositoryImpl";
import { GetTasksByStatus } from "../../domain/usecases/GetTasksByStatus";
import { CreateTask } from "../../domain/usecases/CreateTask";
import { UpdateTask } from "../../domain/usecases/UpdateTask";
import { DeleteTask } from "../../domain/usecases/DeleteTask";

const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Inicia como true para exibir o loading inicial
  const taskRepository = useMemo(() => new TaskRepositoryImpl(), []);

  // Instanciando os use cases com useMemo para evitar recriação
  const getTasksByStatusUseCase = useMemo(
    () => new GetTasksByStatus(taskRepository),
    [taskRepository]
  );
  const addTaskUseCase = useMemo(
    () => new CreateTask(taskRepository),
    [taskRepository]
  );
  const updateTaskUseCase = useMemo(
    () => new UpdateTask(taskRepository),
    [taskRepository]
  );
  const deleteTaskUseCase = useMemo(
    () => new DeleteTask(taskRepository),
    [taskRepository]
  );

  // Carrega as tarefas com status "OPEN" ao inicializar
  useEffect(() => {
    const loadTasks = async () => {
      try {
        // Adiciona um delay de 1 segundo para simular o carregamento
        await new Promise((resolve) => setTimeout(resolve, 800));

        const tasks = await getTasksByStatusUseCase.execute(TaskStatus.OPEN);
        setTasks(tasks);
      } catch (error) {
        console.error("Erro ao carregar tarefas:", error);
      } finally {
        setIsLoading(false); // Define isLoading como false após o carregamento
      }
    };

    loadTasks();
  }, [getTasksByStatusUseCase]);

  // Adicionar uma nova tarefa
  const addTask = async (task: Task): Promise<Task> => {
    setIsLoading(true); // Define isLoading como true durante a operação
    try {
      const addedTask = await addTaskUseCase.execute(task);
      setTasks((prevTasks) => [...prevTasks, addedTask]);
      return addedTask;
    } catch (error) {
      console.error("Erro ao adicionar tarefa:", error);
      throw error;
    } finally {
      setIsLoading(false); // Define isLoading como false após a operação
    }
  };

  // Atualizar uma tarefa existente
  const updateTask = async (task: Task): Promise<Task> => {
    setIsLoading(true); // Define isLoading como true durante a operação
    try {
      const updatedTask = await updateTaskUseCase.execute(task);
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t.id === task.id ? updatedTask : t))
      );
      return updatedTask;
    } catch (error) {
      console.error("Erro ao atualizar tarefa:", error);
      throw error;
    } finally {
      setIsLoading(false); // Define isLoading como false após a operação
    }
  };

  // Deletar uma tarefa
  const deleteTask = async (task: Task): Promise<void> => {
    setIsLoading(true); // Define isLoading como true durante a operação
    try {
      await deleteTaskUseCase.execute(task);
      setTasks((prevTasks) => prevTasks.filter((t) => t.id !== task.id));
    } catch (error) {
      console.error("Erro ao deletar tarefa:", error);
      throw error;
    } finally {
      setIsLoading(false); // Define isLoading como false após a operação
    }
  };

  return {
    tasks,
    isLoading,
    addTask,
    updateTask,
    deleteTask,
  };
};

export default useTasks;
