import { Task } from "../../core/entities/Task";
import { TaskRepository } from "../../domain/repositories/TaskRepository";
import api from "../services/api";

export class TaskRepositoryImpl implements TaskRepository {
  async getTasks(): Promise<Task[]> {
    try {
      const responde = await api.get(API_URL);
      return responde.data as Task[];
    } catch (error) {
      console.error("Erro ao carregar tarefas:", error);
      throw new Error("Erro ao carregar tarefas. Tente novamente mais tarde.");
    }
  }

  async getTasksByStatus(status: string): Promise<Task[]> {
    try {
      const response = await api.get(API_URL, {
        params: { status },
      });
      return response.data as Task[];
    } catch (error) {
      console.error("Erro ao carregar tarefas:", error);
      throw new Error("Erro ao carregar tarefas. Tente novamente mais tarde.");
    }
  }

  async addTask(task: Task): Promise<Task> {
    try {
      const response = await api.post(API_URL, task);
      return response.data as Task;
    } catch (error) {
      console.error("Erro ao adicionar tarefa:", error);
      throw new Error("Erro ao adicionar tarefa. Tente novamente mais tarde.");
    }
  }

  async updateTask(task: Task): Promise<Task> {
    try {
      const response = await api.put(`${API_URL}/${task.id}`, task);
      return response.data as Task;
    } catch (error) {
      console.error("Erro ao atualizar tarefa:", error);
      throw new Error("Erro ao atualizar tarefa. Tente novamente mais tarde.");
    }
  }

  async deleteTask(task: Task): Promise<void> {
    try {
      await api.delete(`${API_URL}/${task.id}`);
    } catch (error) {
      console.error("Erro ao deletar tarefa:", error);
      throw new Error("Erro ao deletar tarefa. Tente novamente mais tarde.");
    }
  }
}
