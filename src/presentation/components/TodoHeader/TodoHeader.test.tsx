import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";
import TodoHeader from "./TodoHeader";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { setDefaultOptions } from "date-fns/setDefaultOptions";

// Mock do @ionic/react
vi.mock("@ionic/react", async () => {
  const actual = await import("@ionic/react"); // Importa o módulo original
  return {
    ...actual, // Mantém todos os componentes originais
    IonModal: ({ children, isOpen }: any) =>
      isOpen ? <div>{children}</div> : null, // Substitui apenas o IonModal
  };
});

setDefaultOptions({ locale: ptBR });

describe("TodoHeader Component", () => {
  const currentDate = new Date();
  const formattedDate = format(currentDate, "EEE', 'd' 'MMM'")
    .replace(/^\w/, (c) => c.toUpperCase())
    .replace(
      /(\w{3})$/,
      (month) => month.charAt(0).toUpperCase() + month.slice(1)
    );

  it("deve renderizar a data formatada corretamente", () => {
    render(
      <TodoHeader
        countTasks={0}
        onAddTask={function (title: string, description: string): void {
          throw new Error("Function not implemented.");
        }}
      />
    );

    // Verifica se a data formatada está presente
    const dateElement = screen.getByText(formattedDate); // Ajuste o texto conforme a data atual
    expect(dateElement).toBeInTheDocument();
  });

  it('deve renderizar o texto "0 tarefas pendentes"', () => {
    render(
      <TodoHeader
        countTasks={0}
        onAddTask={function (title: string, description: string): void {
          throw new Error("Function not implemented.");
        }}
      />
    );

    // Verifica se o texto de tarefas pendentes está presente
    const tasksText = screen.getByText(/0 tarefas pendentes/i);
    expect(tasksText).toBeInTheDocument();
  });

  it("deve renderizar o botão de adicionar tarefa", () => {
    render(
      <TodoHeader
        countTasks={0}
        onAddTask={function (title: string, description: string): void {
          throw new Error("Function not implemented.");
        }}
      />
    );

    // Verifica se o botão está presente
    const addButton = screen.getByTestId("add-task-button");
    expect(addButton).toBeInTheDocument();
  });

  it("deve abrir o modal ao clicar no botão de adicionar tarefa", () => {
    render(
      <TodoHeader
        countTasks={0}
        onAddTask={function (title: string, description: string): void {
          throw new Error("Function not implemented.");
        }}
      />
    );

    // Clica no botão de adicionar tarefa
    const addButton = screen.getByTestId("add-task-button");
    fireEvent.click(addButton);

    // Verifica se o modal foi aberto
    const modalTitle = screen.getByText(/Adicionar Tarefa/i);
    expect(modalTitle).toBeInTheDocument();
  });
});
