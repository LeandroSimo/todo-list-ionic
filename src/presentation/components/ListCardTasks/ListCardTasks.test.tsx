import { fireEvent, render, screen, waitFor } from "@testing-library/react";
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
      id: "1",
      title: "Tarefa 1",
      description: "Descrição 1",
      status: TaskStatus.OPEN,
    },
    {
      id: "2",
      title: "Tarefa 2",
      description: "Descrição 2",
      status: TaskStatus.DONE,
    },
  ];

  const onDeleteMock = vi.fn();
  const onEditMock = vi.fn();

  it("deve chamar onEdit ao clicar no botão Editar de uma tarefa e confirmar o modal", async () => {
    render(
      <ListCardTasks
        tasks={tasks}
        onDelete={onDeleteMock}
        onEdit={onEditMock}
      />
    );

    // Seleciona todos os botões de edição
    const editButtons = screen.getAllByTestId("edit-task-button");

    // Clica no botão Editar da primeira tarefa (índice 0)
    fireEvent.click(editButtons[0]);

    // Verifica se o modal foi aberto
    const modalTitleInput = screen.getByDisplayValue(tasks[0].title); // Campo de título do modal
    const modalDescriptionInput = screen.getByDisplayValue(
      tasks[0].description
    ); // Campo de descrição do modal

    // Simula a edição dos campos do modal
    fireEvent.change(modalTitleInput, {
      target: { value: "Tarefa 1 Editada" },
    });
    fireEvent.change(modalDescriptionInput, {
      target: { value: "Descrição 1 Editada" },
    });

    // Encontra o botão de confirmação (pode ser "Confirmar" ou "Salvar")
    const confirmButton = screen.getByRole("button", {
      name: /confirmar|salvar/i, // Usa regex para encontrar "Confirmar" ou "Salvar"
    });

    // Clica no botão de confirmação do modal
    fireEvent.click(confirmButton);

    // Verifica se onEdit foi chamado com a tarefa editada
    await waitFor(() => {
      expect(onEditMock).toHaveBeenCalledWith({
        ...tasks[0],
        title: "Tarefa 1 Editada",
        description: "Descrição 1 Editada",
      });
    });
  });
});
