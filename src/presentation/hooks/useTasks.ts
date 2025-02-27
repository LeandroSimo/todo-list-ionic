import { useState, useMemo, useEffect } from "react";
import { TaskRepositoryImpl } from "../../data/repositories/TaskRepositoryImpl";
import { CreateTask } from "../../domain/usecases/CreateTask";
import { DeleteTask } from "../../domain/usecases/DeleteTask";
import { GetTasks } from "../../domain/usecases/GetTasks";
import { UpdateTask } from "../../domain/usecases/UpdateTask";
import { Task } from "../../core/entities/Task";

const useTasks = () => {
  const [allTasks, setAllTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const taskRepository = useMemo(() => new TaskRepositoryImpl(), []);

  // Instanciando os use cases com useMemo para evitar recriação
  const getAllTasksUseCase = useMemo(
    () => new GetTasks(taskRepository),
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

  // Carregar todas as tarefas ao montar o componente
  useEffect(() => {
    const loadAllTasks = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 500));
        const tasks = await getAllTasksUseCase.execute();
        setAllTasks(tasks);
      } catch (error: any) {
        handleError(error, "carregar tarefas");
      } finally {
        setIsLoading(false);
      }
    };
    loadAllTasks();
  }, [getAllTasksUseCase]);

  // Função para tratar erros
  const handleError = (error: any, action: string) => {
    console.error(`Erro ao ${action}:`, error);

    if (!navigator.onLine) {
      setError("Sem conexão com a internet. Verifique sua rede.");
      return;
    }

    if (error.code === "ERR_NETWORK" || !error.response) {
      setError(
        "Não foi possível se conectar ao servidor. O servidor pode estar fora do ar."
      );
      return;
    }

    if (error.response.status >= 500) {
      setError("Erro no servidor. Tente novamente mais tarde.");
    } else if (error.response.status === 404) {
      setError("Recurso não encontrado.");
    } else if (error.response.status === 400) {
      setError("Dados inválidos. Verifique as informações e tente novamente.");
    } else {
      setError("Ocorreu um erro inesperado. Tente novamente.");
    }
  };

  // Funções para adicionar
  const addTask = async (task: Task): Promise<Task> => {
    setIsLoading(true);
    setError(null);
    try {
      const addedTask = await addTaskUseCase.execute(task);
      setAllTasks((prevTasks) => [...prevTasks, addedTask]);
      return addedTask;
    } catch (error: any) {
      handleError(error, "adicionar tarefa");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Função para atualizar tarefa
  const updateTask = async (task: Task): Promise<Task> => {
    setIsLoading(true);
    setError(null);
    try {
      const updatedTask = await updateTaskUseCase.execute(task);
      setAllTasks((prevTasks) =>
        prevTasks.map((t) => (t.id === task.id ? updatedTask : t))
      );
      return updatedTask;
    } catch (error: any) {
      handleError(error, "atualizar tarefa");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Função para deletar tarefa
  const deleteTask = async (task: Task): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      await deleteTaskUseCase.execute(task);
      setAllTasks((prevTasks) => prevTasks.filter((t) => t.id !== task.id));
    } catch (error: any) {
      handleError(error, "deletar tarefa");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    allTasks,
    isLoading,
    error,
    addTask,
    updateTask,
    deleteTask,
  };
};

export default useTasks;
