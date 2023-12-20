import React from "react";
import { render, screen } from "@testing-library/react";
import GaugeChart from "../components/GaugeChart";
import "@testing-library/jest-dom";

jest.mock("d3", () => ({
  select: () => ({
    append: jest.fn().mockReturnThis(),
    attr: jest.fn().mockReturnThis(),
    style: jest.fn().mockReturnThis(),
    datum: jest.fn().mockReturnThis(),
    selectAll: jest.fn().mockReturnThis(),
    remove: jest.fn().mockReturnThis(),
    text: jest.fn().mockReturnThis(),
  }),
  // arc: jest.fn(),
  arc: () => ({
    innerRadius: jest.fn().mockReturnThis(),
    outerRadius: jest.fn().mockReturnThis(),
    startAngle: jest.fn().mockReturnThis(),
  }),
  // ... add other d3 methods you use
}));

describe("GaugeChart Component", () => {
  it("renders the gauge chart with the correct value", () => {
    const testValue = 30;
    const maxValue = 100;

    render(<GaugeChart value={testValue} max={maxValue} />);

    const gaugeChart = screen.getByLabelText(`Words count: ${testValue}`);
    expect(gaugeChart).toBeInTheDocument();

    // You can add more assertions here depending on what
    // aspects of the chart you'd like to test. However, remember
    // that detailed testing of the D3.js rendered chart itself
    // might be beyond the scope of React Testing Library.
  });

  // Additional tests can be written to cover other scenarios
});
