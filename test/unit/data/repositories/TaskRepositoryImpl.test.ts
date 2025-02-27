import { Task, TaskStatus } from "../../../../src/core/entities/Task";
import { TaskRepositoryImpl } from "../../../../src/data/repositories/TaskRepositoryImpl";
import { vi } from "vitest";
import api from "../../../../src/data/services/api";

// Mock da API
vi.mock("../../../../src/data/services/api", () => ({
  default: {
    get: vi.fn(() => Promise.resolve({ data: [] })), // Mock para api.get
    post: vi.fn(() => Promise.resolve({ data: {} })), // Mock para api.post
    put: vi.fn(() => Promise.resolve({ data: {} })), // Mock para api.put
    delete: vi.fn(() => Promise.resolve({})), // Mock para api.delete
  },
}));

const mockTasks: Task[] = [
  {
    id: "1",
    title: "Tarefa 1",
    description: "Descrição 1",
    status: TaskStatus.DONE,
  },
  {
    id: "2",
    title: "Tarefa 2",
    description: "Descrição 2",
    status: TaskStatus.DONE,
  },
];

describe("TaskRepositoryImpl", () => {
  describe("getTasks", () => {
    it("deve retornar a lista de tarefas com sucesso", async () => {
      (api.get as ReturnType<typeof vi.fn>).mockResolvedValue({
        data: mockTasks,
      });

      const repository = new TaskRepositoryImpl();
      const tasks = await repository.getTasks();

      expect(api.get).toHaveBeenCalledWith("/tasks");
      expect(tasks).toEqual(mockTasks);
    });

    it("deve lançar erro ao carregar tarefas", async () => {
      (api.get as jest.Mock).mockRejectedValue(new Error("Erro na API"));
      const repository = new TaskRepositoryImpl();
      await expect(repository.getTasks()).rejects.toThrow(
        "Erro ao carregar tarefas. Tente novamente mais tarde."
      );
    });
  });

  it("deve retornar a lista de tarefas filtrada por status", async () => {
    (api.get as ReturnType<typeof vi.fn>).mockResolvedValue({
      data: mockTasks,
    });

    const repository = new TaskRepositoryImpl();
    const tasks = await repository.getTasksByStatus("DONE");

    expect(api.get).toHaveBeenCalledWith("/tasks", {
      params: { status: "DONE" },
    });
    expect(tasks).toEqual(mockTasks);
  });

  it("deve lançar erro ao carregar tarefas filtradas por status", async () => {
    (api.get as jest.Mock).mockRejectedValue(new Error("Erro na API"));
    const repository = new TaskRepositoryImpl();
    await expect(repository.getTasksByStatus("DONE")).rejects.toThrow(
      "Erro ao carregar tarefas. Tente novamente mais tarde."
    );
  });

  it("deve adicionar uma tarefa com sucesso", async () => {
    (api.post as ReturnType<typeof vi.fn>).mockResolvedValue({
      data: mockTasks[0],
    });

    const repository = new TaskRepositoryImpl();
    const task = await repository.addTask(mockTasks[0]);

    expect(api.post).toHaveBeenCalledWith("/tasks", mockTasks[0]);
    expect(task).toEqual(mockTasks[0]);
  });

  it("deve lançar erro ao adicionar tarefa", async () => {
    (api.post as jest.Mock).mockRejectedValue(new Error("Erro na API"));
    const repository = new TaskRepositoryImpl();
    await expect(repository.addTask(mockTasks[0])).rejects.toThrow(
      "Erro ao adicionar tarefa. Tente novamente mais tarde."
    );
  });

  it("deve atualizar uma tarefa com sucesso", async () => {
    (api.put as ReturnType<typeof vi.fn>).mockResolvedValue({
      data: mockTasks[0],
    });

    const repository = new TaskRepositoryImpl();
    const task = await repository.updateTask(mockTasks[0]);

    expect(api.put).toHaveBeenCalledWith("/tasks/1", mockTasks[0]);
    expect(task).toEqual(mockTasks[0]);
  });

  it("deve lançar erro ao atualizar tarefa", async () => {
    (api.put as jest.Mock).mockRejectedValue(new Error("Erro na API"));
    const repository = new TaskRepositoryImpl();
    await expect(repository.updateTask(mockTasks[0])).rejects.toThrow(
      "Erro ao atualizar tarefa. Tente novamente mais tarde."
    );
  });

  it("deve deletar uma tarefa com sucesso", async () => {
    const repository = new TaskRepositoryImpl();
    await repository.deleteTask(mockTasks[0]);

    expect(api.delete).toHaveBeenCalledWith("/tasks/1");
  });

  it("deve lançar erro ao deletar tarefa", async () => {
    (api.delete as jest.Mock).mockRejectedValue(new Error("Erro na API"));
    const repository = new TaskRepositoryImpl();
    await expect(repository.deleteTask(mockTasks[0])).rejects.toThrow(
      "Erro ao deletar tarefa. Tente novamente mais tarde."
    );
  });
});
