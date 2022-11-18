import React from "react";
import { fireEvent, render } from "@testing-library/react";
import TodoApp from "./TodoApp";

const top1 = {
  id: 1,
  title: 'top1',
  priority: 1,
  description: 'mock1',
};

const top2 = {
  id: 2,
  title: 'top2',
  priority: 2,
  description: 'mock2',
};

const top3 = {
  id: 3,
  title: 'top3',
  priority: 3,
  description: 'mock3',
};


const todos = [top1, top2, top3];

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

  expect(container).toContainHTML("You have no todos.");

  fireEvent.change(titleInput, { target: { value: "Test task" } });
  fireEvent.change(priorityInput, { target: { value: 1 } });
  fireEvent.change(descriptionInput, { target: { value: "Test description" } });
  fireEvent.click(submitBtn);

  const toDos = container.querySelectorAll(".EditableTodo");

  expect(toDos.length).toEqual(1);

  const toDosSection = container.querySelector(".EditableTodoList");

  expect(toDosSection).toContainHTML("(priority: 1)");
  expect(toDosSection).toContainHTML("Test task");
  expect(toDosSection).toContainHTML("Test description");

  debug(container)
});

it ("has no todos when there is no todos", function () {
  const { container } = render(<TodoApp />);

  expect(container).toContainHTML("You have no todos.");
  expect(container).not.toContainHTML("Top Todo");
  expect(container.querySelector(".EditableTodoList")).not.toBeInTheDocument();
  expect(container.querySelector(".NewTodoForm")).toBeInTheDocument();
  expect(container).toContainHTML("Add Nü");
});

it ("delete button removes todo", function () {
  const { container, queryByText } = render(<TodoApp initialTodos={[top1]} />);

  expect(container.querySelector(".Todo")).toContainHTML('top1')

  const deleteBtn = queryByText("Del");
  fireEvent.click(deleteBtn);

  expect(container.querySelector(".Todo")).not.toBeInTheDocument()
});

it ("edit button edits todo", function () {
  const { container, queryByText, debug } = render(<TodoApp initialTodos={[top1]} />);

  expect(container.querySelector(".Todo")).toContainHTML('top1')

  const toDosSection = container.querySelector(".EditableTodoList");

  const editBtn = queryByText("Edit");
  fireEvent.click(editBtn);

  const titleInput = toDosSection.querySelector("#newTodo-title");
  const priorityInput = toDosSection.querySelector("#newTodo-priority");
  const descriptionInput = toDosSection.querySelector("#newTodo-description");

  fireEvent.change(titleInput, { target: { value: "editTitle" } });
  fireEvent.change(priorityInput, { target: { value: 2 } });
  fireEvent.change(descriptionInput, { target: { value: "editDescription" } });

  const goBtn = toDosSection.querySelector(".NewTodoForm-addBtn")
  fireEvent.click(goBtn);

  expect(toDosSection).toContainHTML("(priority: 2)");
  expect(toDosSection).toContainHTML("editTitle");
  expect(toDosSection).toContainHTML("editDescription");
});


//Check that go button in edit form edits the text

