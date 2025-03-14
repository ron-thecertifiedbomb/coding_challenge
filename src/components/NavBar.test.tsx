import { render, screen } from "@testing-library/react";

import "@testing-library/jest-dom";
import NavBar from "./NavBar";

describe("NavBar Component", () => {
  it("renders the navigation bar correctly", () => {
    render(<NavBar />);

    // Check if the title is present
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "My Website"
    );

    // Check if all navigation links are present
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(3);

    // Check if each link has correct text and href
    expect(screen.getByText("Home")).toHaveAttribute("href", "/");
    expect(screen.getByText("About")).toHaveAttribute("href", "/about");
    expect(screen.getByText("Contact")).toHaveAttribute("href", "/contact");
  });
});
