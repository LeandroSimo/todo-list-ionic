import { Task } from "../../core/entities/Task";
import { API_URL } from "../../core/utils/constants";
import { TaskRepository } from "../../domain/repositories/TaskRepository";
import api from "../services/api";

export class TaskRepositoryImpl implements TaskRepository {
  async getTasks(): Promise<Task[]> {
    try {
      const response = await api.get<Task[]>(API_URL);
      return response.data;
    } catch (error) {
      console.error("Erro ao carregar tarefas:", error);
      throw new Error("Erro ao carregar tarefas. Tente novamente mais tarde.");
    }
  }

  async getTasksByStatus(status: string): Promise<Task[]> {
    try {
      const response = await api.get<Task[]>(API_URL, {
        params: { status },
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao carregar tarefas:", error);
      throw new Error("Erro ao carregar tarefas. Tente novamente mais tarde.");
    }
  }

  async addTask(task: Task): Promise<Task> {
    try {
      const response = await api.post<Task>(API_URL, task);
      return response.data;
    } catch (error) {
      console.error("Erro ao adicionar tarefa:", error);
      throw new Error("Erro ao adicionar tarefa. Tente novamente mais tarde.");
    }
  }

  async updateTask(task: Task): Promise<Task> {
    try {
      const response = await api.put<Task>(`${API_URL}/${task.id}`, task);
      return response.data;
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
