import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";
import ListCardTasks from "./ListCardTasks";
import { Task, TaskStatus } from "../../../core/entities/Task";

// Mock do @ionic/react
vi.mock("@ionic/react", async () => {
  const actual = await import("@ionic/react"); // Importa o módulo original
  return {
    ...actual, // Mantém todos os componentes originais
    IonModal: ({ children, isOpen }: any) =>
      isOpen ? <div>{children}</div> : null, // Mock do IonModal
  };
});

describe("ListCardTasks Component", () => {
  const tasks: Task[] = [
    {
      id: 1,
      title: "Tarefa 1",
      description: "Descrição 1",
      status: TaskStatus.OPEN,
    },
    {
      id: 2,
      title: "Tarefa 2",
      description: "Descrição 2",
      status: TaskStatus.DONE,
    },
  ];

  const onDeleteMock = vi.fn();
  const onEditMock = vi.fn();

  it("deve renderizar a lista de tarefas corretamente", () => {
    render(
      <ListCardTasks
        tasks={tasks}
        onDelete={onDeleteMock}
        onEdit={onEditMock}
      />
    );

    // Verifica se o número de tarefas renderizadas está correto
    const cardTasks = screen.getAllByTestId("card-task");
    expect(cardTasks).toHaveLength(tasks.length);

    // Verifica se os títulos das tarefas estão presentes
    tasks.forEach((task) => {
      expect(screen.getByText(task.title)).toBeInTheDocument();
    });
  });

  it("deve chamar onDelete ao clicar no botão Excluir de uma tarefa", () => {
    render(
      <ListCardTasks
        tasks={tasks}
        onDelete={onDeleteMock}
        onEdit={onEditMock}
      />
    );

    // Seleciona todos os botões de exclusão
    const deleteButtons = screen.getAllByTestId("delete-task-button");

    // Clica no botão Excluir da primeira tarefa (índice 0)
    fireEvent.click(deleteButtons[0]);

    // Verifica se onDelete foi chamado com a tarefa correta
    expect(onDeleteMock).toHaveBeenCalledWith(tasks[0]);
  });

  it("deve chamar onEdit ao clicar no botão Editar de uma tarefa", () => {
    render(
      <ListCardTasks
        tasks={tasks}
        onDelete={onDeleteMock}
        onEdit={onEditMock}
      />
    );

    // Clica no botão Editar da segunda tarefa
    const editButtons = screen.getAllByTestId("edit-task-button");

    // Clica no botão Editar da segunda tarefa (índice 1)
    fireEvent.click(editButtons[1]);

    // Verifica se onEdit foi chamado com a tarefa correta
    expect(onEditMock).toHaveBeenCalledWith(tasks[1]);
  });
});
