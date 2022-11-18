import React from "react";
import { render } from "@testing-library/react";
import TodoForm from "./TodoForm";

const existingFormData = {
  title: 'title1',
  description: 'mock1',
  priority: 2,
  id: 1
};

describe("renders correctly", function () {
  it("renders", function () {
    render(<TodoForm />);
  });
});

describe("snapshots", function () {
  it("matches snapshot", function () {
    const { asFragment } = render(<TodoForm />);
    expect(asFragment()).toMatchSnapshot();
  });
});

describe("displays form correctly", function () {
  it("no pre-existing values for new todo", function () {
    const { container, queryByText } = render(<TodoForm />);

    const todoForm = container.querySelector("form");
    const titleInput = todoForm.querySelector("#newTodo-title");
    const descriptionInput = todoForm.querySelector("#newTodo-description");
    const priorityInput = todoForm.querySelector("#newTodo-priority");
    const selectOpt = priorityInput.querySelectorAll("option");
    const submitBtn = queryByText("Gø!")

    expect(submitBtn).toBeInTheDocument();
    expect(todoForm).toBeInTheDocument();
    expect(titleInput).toContainHTML('');
    expect(descriptionInput).toContainHTML('');
    expect(selectOpt[0].selected).toBeTruthy();
  });

  it("pre-existing values for edit form", function () {
    const { container, queryByText } = render(<TodoForm initialFormData={existingFormData} />);

    const todoForm = container.querySelector("form");
    const titleInput = todoForm.querySelector("#newTodo-title");
    const descriptionInput = todoForm.querySelector("#newTodo-description");
    const priorityInput = todoForm.querySelector("#newTodo-priority");
    const selectOpt = priorityInput.querySelectorAll("option");
    const submitBtn = queryByText("Gø!")

    expect(submitBtn).toBeInTheDocument();
    expect(todoForm).toBeInTheDocument();
    expect(titleInput).toContainHTML('title1');
    expect(descriptionInput).toContainHTML('mock1');
    expect(selectOpt[1].selected).toBeTruthy();
  });
});