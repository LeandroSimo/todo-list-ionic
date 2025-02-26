import { Task, TaskStatus } from "../../core/entities/Task";
import { TaskRepository } from "../repositories/TaskRepository";

export class GetTasksByStatus {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(status: TaskStatus): Promise<Task[]> {
    return this.taskRepository.getTasksByStatus(status);
  }
}
