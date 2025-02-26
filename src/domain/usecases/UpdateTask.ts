import { Task } from "../../core/entities/Task";
import { TaskRepository } from "../repositories/TaskRepository";

export class UpdateTask {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(task: Task): Promise<Task> {
    return await this.taskRepository.updateTask(task);
  }
}
