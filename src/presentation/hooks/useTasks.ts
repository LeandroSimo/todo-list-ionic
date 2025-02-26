// presentation/hooks/useTasks.ts
import { useEffect, useMemo, useState } from "react";
import { Task, TaskStatus } from "../../core/entities/Task";
import { TaskRepositoryImpl } from "../../data/repositories/TaskRepositoryImpl";
import { GetTasksByStatus } from "../../domain/usecases/GetTasksByStatus";
import { CreateTask } from "../../domain/usecases/CreateTask";
import { UpdateTask } from "../../domain/usecases/UpdateTask";
import { DeleteTask } from "../../domain/usecases/DeleteTask";

const useTasks = (filter: TaskStatus) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [openTasks, setOpenTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
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

  // Carrega as tarefas com base no filtro
  useEffect(() => {
    const loadTasks = async () => {
      try {
        setIsLoading(true);

        // Adiciona um delay para simular o carregamento
        await new Promise((resolve) => setTimeout(resolve, 800));

        const tasks = await getTasksByStatusUseCase.execute(filter);
        setTasks(tasks);

        // Atualiza as tarefas OPEN apenas se o filtro for OPEN
        if (filter === TaskStatus.OPEN) {
          setOpenTasks(tasks);
        }
      } catch (error) {
        console.error("Erro ao carregar tarefas:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTasks();
  }, [filter, getTasksByStatusUseCase]);

  // Adicionar uma nova tarefa
  const addTask = async (task: Task): Promise<Task> => {
    setIsLoading(true);
    try {
      const addedTask = await addTaskUseCase.execute(task);
      setTasks((prevTasks) => [...prevTasks, addedTask]);

      // Se a tarefa adicionada tiver status OPEN, atualiza o estado openTasks
      if (addedTask.status === TaskStatus.OPEN) {
        setOpenTasks((prevOpenTasks) => [...prevOpenTasks, addedTask]);
      }

      return addedTask;
    } catch (error) {
      console.error("Erro ao adicionar tarefa:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Atualizar uma tarefa existente
  const updateTask = async (task: Task): Promise<Task> => {
    setIsLoading(true);
    try {
      const updatedTask = await updateTaskUseCase.execute(task);
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t.id === task.id ? updatedTask : t))
      );

      // Atualiza o estado openTasks se a tarefa atualizada mudar de status
      if (
        task.status === TaskStatus.OPEN &&
        updatedTask.status !== TaskStatus.OPEN
      ) {
        setOpenTasks((prevOpenTasks) =>
          prevOpenTasks.filter((t) => t.id !== task.id)
        );
      } else if (
        task.status !== TaskStatus.OPEN &&
        updatedTask.status === TaskStatus.OPEN
      ) {
        setOpenTasks((prevOpenTasks) => [...prevOpenTasks, updatedTask]);
      }

      return updatedTask;
    } catch (error) {
      console.error("Erro ao atualizar tarefa:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Deletar uma tarefa
  const deleteTask = async (task: Task): Promise<void> => {
    setIsLoading(true);
    try {
      await deleteTaskUseCase.execute(task);
      setTasks((prevTasks) => prevTasks.filter((t) => t.id !== task.id));

      // Se a tarefa deletada tiver status OPEN, atualiza o estado openTasks
      if (task.status === TaskStatus.OPEN) {
        setOpenTasks((prevOpenTasks) =>
          prevOpenTasks.filter((t) => t.id !== task.id)
        );
      }
    } catch (error) {
      console.error("Erro ao deletar tarefa:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    tasks,
    openTasks,
    isLoading,
    addTask,
    updateTask,
    deleteTask,
  };
};

export default useTasks;
