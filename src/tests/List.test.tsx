import React from "react";
import { render, screen } from "@testing-library/react";
import List from "../components/List";
import "@testing-library/jest-dom";

// Mock data for testing
const mockComments = [
  {
    id: 1,
    postId: 1,
    name: "John Doe",
    email: "john@example.com",
    body: "This is a test comment",
    wordNumber: 5,
  },
  {
    id: 2,
    postId: 2,
    name: "Jane Doe",
    email: "jane@example.com",
    body: "Another test comment",
    wordNumber: 10,
  },
];

jest.mock("../components/GaugeChart", () => {
  return {
    __esModule: true,
    default: () => <div>GaugeChart Mock</div>,
  };
});

describe("List Component", () => {
  it("renders a list of comments", () => {
    render(<List comments={mockComments} />);

    // Check if the comments are rendered
    mockComments.forEach((comment) => {
      expect(screen.getByText(comment.name)).toBeInTheDocument();
      expect(screen.getByText(comment.email)).toBeInTheDocument();
      expect(screen.getByText(comment.body)).toBeInTheDocument();
    });

    // Check for the mock GaugeChart
    expect(screen.getAllByText("GaugeChart Mock").length).toBe(
      mockComments.length
    );
  });

  // Additional tests can be written to cover other scenarios
});
