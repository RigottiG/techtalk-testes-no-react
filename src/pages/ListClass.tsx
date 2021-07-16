import { Component, FormEvent } from "react";

interface AppState {
  items: string[]
  newItem: string
}

export default class ListClass extends Component<any, AppState> {
  constructor(props) {
    super(props)

    this.state = {
      items: [],
      newItem: ''
    }
  }

  handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!this.state.newItem || this.state.items.includes(this.state.newItem)) return;

    this.setState({ items: [...this.state.items, this.state.newItem] })
    this.setState({ newItem: '' })
  }

  handleDelete = (item: string) => {
    const todoList = this.state.items.filter((itemInList) => itemInList !== item);
    this.setState({ items: todoList });
  }


  render() {
    return (
      <>
        <ul data-testid="ul-todos">
          {this.state.items.map((item) => (
            <li data-testid={item} key={item}>
              {item}
              {"  "}
              <button
                disabled={item === "Learn"}
                data-testid={`${ item }-btn-delete`}
                type="button"
                onClick={() => this.handleDelete(item)}
              >
                ❌
              </button>
            </li>
          ))}
        </ul>

        <form data-testid="form-add-todo" onSubmit={this.handleSubmit}>
          <input
            data-testid="input-add-todo"
            type="text"
            value={this.state.newItem}
            onChange={(e) => this.setState({ newItem: e.target.value })}
          />
          <button type="submit">Salvar</button>
        </form>
      </>
    );
  }
}