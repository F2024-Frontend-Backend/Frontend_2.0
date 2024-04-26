import { describe, expect, it, test, vitest } from "vitest";
import { render, screen } from "@testing-library/react";
import Basket from "../components/Basket";
import App from "../../../App";
import { mockItems } from "./mockData";
import { BasketProvider } from "../../../context/BasketProvider";

describe("App rendes.", () => {
  it("Renders the App component", () => {
    render(<App />);
    expect(screen.getByText("Your Shopping Basket")).toBeInTheDocument();
  });
});

describe("Basket components", () => {
  it("Renders all items correctly", () => {
    render(
      <BasketProvider>
        <Basket items={mockItems} />
      </BasketProvider>
    );
    expect(screen.getByText("D-vitamin, 90ug, 120 stk")).toBeInTheDocument();
    expect(screen.getByText("C-vitamin, 500mg, 200 stk")).toBeInTheDocument();
    expect(
      screen.getByText("C-vitamin Depot, 500mg, 200 stk")
    ).toBeInTheDocument();

    expect(Basket.length == 3);
  });
});
