import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import List from '../pages/ListClass'

describe('Testando o componente List', () => {
  it('Deve iniciar a lista vazia', () => {
    render(<List />)
    const todoList = screen.getByTestId('ul-todos')

    expect(todoList.children.length).toBe(0)
  })

  it("Deve ter um botao submit", () => {
    render(<List />)
    const buttonSubmit = screen.getByRole('button', { name: /salvar/i })

    expect(buttonSubmit).toBeInTheDocument()
  })

  it('Deve ser possivel adicionar novos itens', () => {
    render(<List />)

    const input = screen.getByTestId("input-add-todo")
    const form = screen.getByTestId("form-add-todo")
    userEvent.type(input, "Teste")
    fireEvent.submit(form)

    expect(screen.getByTestId("Teste")).toBeTruthy()
  })

  it("deve ser possivel listar 3 itens", () => {
    render(<List />)

    const input = screen.getByTestId("input-add-todo")
    const form = screen.getByTestId("form-add-todo")

    userEvent.type(input, "Teste 1")
    fireEvent.submit(form)

    userEvent.type(input, "Teste 2")
    fireEvent.submit(form)

    userEvent.type(input, "Teste 3")
    fireEvent.submit(form)

    const todoList = screen.getByTestId('ul-todos')
    expect(todoList.children.length).toBe(3)
  })

  it("Deve ser possível deletar um item", () => {
    render(<List />);

    const input = screen.getByTestId("input-add-todo");
    const form = screen.getByTestId("form-add-todo");

    userEvent.type(input, "Estudar");
    fireEvent.submit(form);

    expect(screen.getByTestId("Estudar")).toBeTruthy();

    const itemButton = screen.getByTestId("Estudar-btn-delete");
    userEvent.click(itemButton);

    expect(screen.queryByTestId("Estudar")).toBeNull();
  });

  it("Se o item for igual a Lern nao deve ser permitido excluir", () => {
    render(<List />)

    const input = screen.getByTestId("input-add-todo")
    const form = screen.getByTestId("form-add-todo")

    userEvent.type(input, "Learn")
    fireEvent.submit(form)

    const buttonDelete = screen.getByTestId("Learn-btn-delete")

    expect(buttonDelete).toBeDisabled()
  })

  it("Não deve adicionar todo se nao tiver nada escrito no input", () => {
    render(<List />);

    const input = screen.getByTestId("input-add-todo");
    const form = screen.getByTestId("form-add-todo");

    userEvent.type(input, "");
    fireEvent.submit(form);

    const todoList = screen.getByTestId("ul-todos")

    expect(todoList.children.length).toBe(0)
  });
})
