import { Task } from "../../core/entities/Task";

export interface TaskRepository {
  getTasks(): Promise<Task[]>;
  getTasksByStatus(status: string): Promise<Task[]>;
  addTask(task: Task): Promise<Task>;
  updateTask(task: Task): Promise<Task>;
  deleteTask(task: Task): Promise<void>;
}
