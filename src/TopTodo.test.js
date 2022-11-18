import React from "react";
import { fireEvent, render } from "@testing-library/react";
import TopTodo from "./TopTodo";

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

const top4 = {
  id: 4,
  title: 'top4',
  priority: 1,
  description: 'mock4',
}

const todos = [top1, top2, top3];

it("renders", function() {
  render(<TopTodo todos={todos}/>)
});

describe("snapshots", function() {
  it("matches snapshot", function() {
      const { asFragment } = render(<TopTodo todos={todos}/>);
      expect(asFragment()).toMatchSnapshot();
  });
});

it("chooses correct top todo", function() {
  const {container} = render(<TopTodo todos={todos}/>)
  expect(container).toContainHTML('top1', '(priority: 1)', 'mock1');
});