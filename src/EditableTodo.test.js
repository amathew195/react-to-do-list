import React from "react";
import { fireEvent, render } from "@testing-library/react";
import EditableTodo from "./EditableTodo";

const test = {
  id: 1,
  title: 'test1',
  priority: 1,
  description: 'mock1',
}

describe("renders correctly", function () {
  it("renders", function () {
    render(<EditableTodo todo={test}/>);
  });

  it("renders edit/delete buttons", function() {
    const {container, queryByText} = render(<EditableTodo todo={test}/>);
    const editBtn = queryByText('Edit');
    const deleteBtn = queryByText('Del');

    expect(editBtn).toBeInTheDocument();
    expect(deleteBtn).toBeInTheDocument();
  });

  it("renders form when edit button clicked with previous values", function() {
    const {container, queryByText} = render(<EditableTodo todo={test}/>);
    const editBtn = queryByText('Edit');
    const deleteBtn = queryByText('Del');

    fireEvent.click(editBtn);
    expect(editBtn).not.toBeInTheDocument();
    expect(deleteBtn).not.toBeInTheDocument();

    const editForm = container.querySelector("form");
    const titleInput = editForm.querySelector("#newTodo-title")
    const descriptionInput = editForm.querySelector("#newTodo-description")
    const priorityInput = editForm.querySelector("#newTodo-priority")
    const selectOpt = priorityInput.querySelectorAll("option")

    expect(editForm).toBeInTheDocument()
    expect(titleInput).toContainHTML('test1');
    expect(descriptionInput).toContainHTML('mock1');
    expect(selectOpt[0].selected).toBeTruthy();
  });
});

