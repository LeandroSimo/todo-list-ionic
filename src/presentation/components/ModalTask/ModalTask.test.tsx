import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import ModalTask from "./ModalTask";
import { vi } from "vitest";

// Mock do @ionic/react
vi.mock("@ionic/react", async () => {
  const actual = await import("@ionic/react"); // Importa o módulo original
  return {
    ...actual, // Mantém todos os componentes originais
    IonModal: ({ children, isOpen }: any) =>
      isOpen ? <div>{children}</div> : null, // Mock do IonModal
  };
});

describe("ModalTask Component", () => {
  const onConfirmMock = vi.fn();
  const onCloseMock = vi.fn();

  it("deve renderizar o modal quando isOpen for true", () => {
    render(
      <ModalTask
        isOpen={true}
        onConfirm={onConfirmMock}
        onClose={onCloseMock}
      />
    );
    const modalTitle = screen.getByText(/Adicionar Tarefa/i);
    expect(modalTitle).toBeInTheDocument();
  });

  test("deve chamar a função onConfirm ao clicar no botão de confirmar", () => {
    const onConfirmMock = vi.fn();
    const onCloseMock = vi.fn();

    render(
      <ModalTask
        isOpen={true}
        onClose={onCloseMock}
        onConfirm={onConfirmMock}
      />
    );

    // Preenche os campos
    fireEvent.change(screen.getByPlaceholderText("Digite o título da tarefa"), {
      target: { value: "Nova Tarefa" },
    });
    fireEvent.change(
      screen.getByPlaceholderText("Digite a descrição da tarefa"),
      {
        target: { value: "Descrição da tarefa" },
      }
    );

    // Clica no botão Confirmar
    fireEvent.click(screen.getByText("Confirmar"));

    // Verifica se onConfirm foi chamado com os valores corretos
    expect(onConfirmMock).toHaveBeenCalledWith(
      "Nova Tarefa",
      "Descrição da tarefa"
    );
  });

  test("deve chamar a função onClose ao clicar no botão de fechar", () => {
    const onCloseMock = vi.fn();

    render(
      <ModalTask isOpen={true} onClose={onCloseMock} onConfirm={() => {}} />
    );

    // Seleciona o botão de fechar no cabeçalho
    const closeButton = screen.getAllByText("Fechar");
    fireEvent.click(closeButton[0]);
    fireEvent.click(closeButton[1]);

    // Verifica se onClose foi chamado uma vez
    expect(onCloseMock).toHaveBeenCalledTimes(2);
  });
});
