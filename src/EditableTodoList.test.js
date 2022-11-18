import React from "react";
import { render } from "@testing-library/react";
import EditableTodoList from "./EditableTodoList";

const top1 = {
  id: 1,
  title: 'top1',
  priority: 1,
  description: 'mock1',
}

const top2 = {
  id: 2,
  title: 'top2',
  priority: 2,
  description: 'mock2',
}

const top3 = {
  id: 3,
  title: 'top3',
  priority: 3,
  description: 'mock3',
}

const todos = [top1, top2, top3];

describe("renders correctly", function () {
  it("renders", function () {
    render(<EditableTodoList todos={todos}/>);
  })
})

describe("snapshots", function() {
  it("matches snapshot", function() {
      const { asFragment } = render(<EditableTodoList todos={todos}/>);
      expect(asFragment()).toMatchSnapshot();
  });
});

describe("displays appropriate number of todos", function(){
  it("displays 0 todos when no todos", function() {
    const { container, debug } = render(<EditableTodoList todos={[]}/>);

    expect(container.querySelectorAll(".EditableTodo").length).toEqual(0);
  })

  it("displays appropriate amount of todos", function() {
    const { container, debug } = render(<EditableTodoList todos={todos}/>);

    expect(container.querySelectorAll(".EditableTodo").length).toEqual(3);
  })
})
