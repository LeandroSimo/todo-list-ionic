import { useEffect, useMemo, useState } from "react";
import { Task, TaskStatus } from "../../core/entities/Task";
import { TaskRepositoryImpl } from "../../data/repositories/TaskRepositoryImpl";
import { GetTasks } from "../../domain/usecases/GetTasks";
import { CreateTask } from "../../domain/usecases/CreateTask";
import { UpdateTask } from "../../domain/usecases/UpdateTask";
import { DeleteTask } from "../../domain/usecases/DeleteTask";

const useTasks = () => {
  const [allTasks, setAllTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
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

  // Carrega todas as tarefas ao iniciar
  useEffect(() => {
    const loadAllTasks = async () => {
      try {
        setIsLoading(true);

        const tasks = await getAllTasksUseCase.execute();
        setAllTasks(tasks); // Define todas as tarefas
      } catch (error) {
        console.error("Erro ao carregar tarefas:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadAllTasks();
  }, [getAllTasksUseCase]);

  // Adicionar uma nova tarefa
  const addTask = async (task: Task): Promise<Task> => {
    setIsLoading(true);
    try {
      const addedTask = await addTaskUseCase.execute(task);
      setAllTasks((prevTasks) => [...prevTasks, addedTask]); // Adiciona a nova tarefa à lista completa
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
      setAllTasks((prevTasks) =>
        prevTasks.map((t) => (t.id === task.id ? updatedTask : t))
      ); // Atualiza a tarefa na lista completa
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
      setAllTasks((prevTasks) => prevTasks.filter((t) => t.id !== task.id)); // Remove a tarefa da lista completa
    } catch (error) {
      console.error("Erro ao deletar tarefa:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    allTasks, // Retorna todas as tarefas
    isLoading,
    addTask,
    updateTask,
    deleteTask,
  };
};

export default useTasks;
