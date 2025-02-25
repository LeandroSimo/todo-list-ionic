import { fireEvent, render, screen } from "@testing-library/react";
import TodoHeader from "./presentation/components/TodoHeader ";
import { vi } from "vitest";

// Mock do @ionic/react
vi.mock("@ionic/react", async () => {
  const actual = await import("@ionic/react"); // Importa o módulo original
  return {
    ...actual, // Mantém todos os componentes originais
    IonModal: ({ children, isOpen }: any) =>
      isOpen ? <div>{children}</div> : null, // Substitui apenas o IonModal
  };
});

describe("TodoHeader Component", () => {
  it("deve renderizar a data formatada corretamente", () => {
    render(<TodoHeader />);

    // Verifica se a data formatada está presente
    const dateElement = screen.getByText(/Terça, 25 Fev/i); // Ajuste o texto conforme a data atual
    expect(dateElement).toBeInTheDocument();
  });

  it('deve renderizar o texto "0 tarefas pendentes"', () => {
    render(<TodoHeader />);

    // Verifica se o texto de tarefas pendentes está presente
    const tasksText = screen.getByText(/0 tarefas pendentes/i);
    expect(tasksText).toBeInTheDocument();
  });

  it("deve renderizar o botão de adicionar tarefa", () => {
    render(<TodoHeader />);

    // Verifica se o botão está presente
    const addButton = screen.getByTestId("add-task-button");
    expect(addButton).toBeInTheDocument();
  });

  it("deve abrir o modal ao clicar no botão de adicionar tarefa", () => {
    render(<TodoHeader />);

    // Clica no botão de adicionar tarefa
    const addButton = screen.getByTestId("add-task-button");
    fireEvent.click(addButton);

    // Verifica se o modal foi aberto
    const modalTitle = screen.getByText(/Adicionar Tarefa/i);
    expect(modalTitle).toBeInTheDocument();
  });
});
