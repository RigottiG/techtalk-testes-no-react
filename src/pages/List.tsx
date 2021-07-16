import React, { useState, FormEvent } from "react";

export default function List() {
  const [items, setItems] = useState<string[]>([]);
  const [newItem, setNewItem] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!newItem || items.includes(newItem)) return;

    setItems([...items, newItem]);
    setNewItem("");
  }

  function handleDelete(item: string) {
    const todoList = items.filter((itemInList) => itemInList !== item);
    setItems(todoList);
  }

  return (
    <>
      <ul data-testid="ul-todos">
        {items.map((item) => (
          <li data-testid={item} key={item}>
            {item}
            {"  "}
            <button
              disabled={item === "Learn"}
              data-testid={`${ item }-btn-delete`}
              type="button"
              onClick={() => handleDelete(item)}
            >
              ❌
            </button>
          </li>
        ))}
      </ul>

      <form data-testid="form-add-todo" onSubmit={handleSubmit}>
        <input
          data-testid="input-add-todo"
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
        <button type="submit">Salvar</button>
      </form>
    </>
  );
};
