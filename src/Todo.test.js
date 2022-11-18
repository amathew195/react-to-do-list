import React from "react";
import { fireEvent, render } from "@testing-library/react";
import Todo from "./Todo";

const testTodo = {
  id: 1,
  title: 'test',
  priority: 1,
  description: 'this is a mock',
}

describe("renders", function () {
  it("renders without fail", function () {
    render(<Todo todo={testTodo}/>);
  });

  it("test that it renders with title, priority, description", function() {
    const { container, debug } = render(<Todo todo={testTodo}/>);

    expect(container).toContainHTML('test');
    expect(container).toContainHTML('(priority: 1)');
    expect(container).toContainHTML('this is a mock');

  });
});

describe("snapshots", function() {
  it("matches snapshot", function() {
      const { asFragment } = render(<Todo todo={testTodo}/>);
      expect(asFragment()).toMatchSnapshot();
  });
});
