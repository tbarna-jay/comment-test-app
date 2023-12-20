import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Header from "../components/Header";
import * as nextRouter from "next/router";
import "@testing-library/jest-dom";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("Header Component", () => {
  it("renders the header with the correct page number", () => {
    render(<Header page={2} totalComments={100} commentsPerPage={10} />);
    expect(screen.getByText("Comments list page 2")).toBeInTheDocument();
  });
  const push = jest.fn();

  it("handles next and previous button clicks", () => {
    (nextRouter.useRouter as jest.Mock).mockReturnValue({
      push,
    });

    render(<Header page={2} totalComments={100} commentsPerPage={10} />);
    fireEvent.click(screen.getByText("⇦"));
    expect(screen.getByText("Comments list page 2")).toBeInTheDocument();
    expect(push).toHaveBeenCalledWith("/1");
    fireEvent.click(screen.getByText("⇨"));
    expect(push).toHaveBeenCalledWith("/3");
  });

  it("disables the previous button on the first page", () => {
    render(<Header page={1} totalComments={100} commentsPerPage={10} />);
    expect(screen.getByText("⇦")).toBeDisabled();
  });

  it("disables the next button on the last page", () => {
    render(<Header page={10} totalComments={100} commentsPerPage={10} />);
    expect(screen.getByText("⇨")).toBeDisabled();
  });
});
