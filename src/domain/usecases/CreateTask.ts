import { Task } from "../../core/entities/Task";
import { TaskRepository } from "../repositories/TaskRepository";

export class CreateTask {
  constructor(private taskRepository: TaskRepository) {}

  async execute(task: Task): Promise<Task> {
    return await this.taskRepository.addTask(task);
  }
}
