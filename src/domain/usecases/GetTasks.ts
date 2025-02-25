import { Task } from "../../core/entities/Task";
import { TaskRepository } from "../repositories/TaskRepository";

export class GetTasks {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(): Promise<Task[]> {
    return this.taskRepository.getTasks();
  }
}
