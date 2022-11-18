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
  debug(container)

  expect(container).toContainHTML("You have no todos.")

  fireEvent.change(titleInput, { target: { value: "Test task" } });
  fireEvent.change(priorityInput, { target: { value: 1 } });
  fireEvent.change(descriptionInput, { target: { value: "Test description" } });
  fireEvent.click(submitBtn);

  const toDosSection = container.querySelector(".EditableTodoList")

  expect(toDosSection).toContainHTML("(priority: 1)")
  expect(toDosSection).toContainHTML("Test task")
  expect(toDosSection).toContainHTML("Test description")
});
