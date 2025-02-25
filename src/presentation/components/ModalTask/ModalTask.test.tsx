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

  it("deve chamar a função onConfirm ao clicar no botão de confirmar", () => {
    render(
      <ModalTask
        isOpen={true}
        onConfirm={onConfirmMock}
        onClose={onCloseMock}
      />
    );

    const confirmButton = screen.getByText(/Confirmar/i);
    fireEvent.click(confirmButton);

    expect(onConfirmMock).toHaveBeenCalledTimes(1);
  });

  it("deve chamar a função onClose ao clicar no botão de fechar", () => {
    render(
      <ModalTask
        isOpen={true}
        onConfirm={onConfirmMock}
        onClose={onCloseMock}
      />
    );

    const closeButton = screen.getByText(/Fechar/i);
    fireEvent.click(closeButton);

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
