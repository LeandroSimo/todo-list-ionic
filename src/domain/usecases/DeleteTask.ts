import { Task } from "../../core/entities/Task";
import { TaskRepository } from "../repositories/TaskRepository";

export class DeleteTasks {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(task: Task): Promise<void> {
    await this.taskRepository.deleteTask(task);
  }
}
