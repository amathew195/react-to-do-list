import React from "react";
import { fireEvent, render } from "@testing-library/react";
import TodoApp from "./TodoApp";

describe("renders correctly", function () {
  it("renders properly", function () {
    render(<TodoApp />);
  });
});

it("adds to-do", function () {
  const { container, queryByText, debug } = render(<TodoApp />);

  const titleInput = container.querySelector("#newTodo-title");
  const priorityInput = container.querySelector("#newTodo-priority");
  const descriptionInput = container.querySelector("#newTodo-description");

  const submitBtn = queryByText("Gø!");

  expect(container).toContainHTML("You have no todos.")

  fireEvent.change(titleInput, { target: { value: "Test task" } });
  fireEvent.change(priorityInput, { target: { value: 1 } });
  fireEvent.change(descriptionInput, { target: { value: "Test description" } });
  fireEvent.click(submitBtn);

  const toDos = container.querySelectorAll(".EditableTodo");

  expect(toDos.length).toEqual(1);

  const toDosSection = container.querySelector(".EditableTodoList");

  expect(toDosSection).toContainHTML("(priority: 1)")
  expect(toDosSection).toContainHTML("Test task")
  expect(toDosSection).toContainHTML("Test description")
});

//Check that no todos says You have no todos
  // Check that Top Todo isn't rendered
//Check that delete button works
//Check that edit button renders form
//Check that hitting go button updates task