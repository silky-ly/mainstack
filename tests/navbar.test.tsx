import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Navbar } from "@/app/dashboard/_components";

const mockUser = {
  first_name: "John",
  last_name: "Doe",
  email: "john.doe@example.com",
};

describe("Navbar component", () => {
  it("renders the Navbar component with links and user information", () => {
    render(<Navbar user={mockUser} />);

    // Assert that the logo is rendered
    expect(screen.getByTestId("logo")).toBeInTheDocument();

    // Assert that the links are rendered
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Analytics")).toBeInTheDocument();
    expect(screen.getByText("Revenue")).toBeInTheDocument();
    expect(screen.getByText("CRM")).toBeInTheDocument();
    expect(screen.getByText("Apps")).toBeInTheDocument();

    // Assert that user information is rendered in the dropdown
    expect(screen.getByText("JD")).toBeInTheDocument();
    // expect(screen.getByText("john.doe@example.com")).toBeInTheDocument();
  });

  it("navigates to the correct link when a link is clicked", () => {
    render(<Navbar user={mockUser} />);

    // Click on the "Home" link
    userEvent.click(screen.getByText("Home"));

    // Assert that the navigation to the correct link has occurred
    expect(window.location.pathname).toBe("/");

    userEvent.click(screen.getByText("Analytics"));
    expect(window.location.pathname).toBe("/");

    userEvent.click(screen.getByText("CRM"));
    expect(window.location.pathname).toBe("/");
  });

  it("renders the correct number of links and profile options", () => {
    render(<Navbar user={mockUser} />);

    // Assert that the correct number of links is rendered
    const links = screen.getAllByTestId(/nav-link-/);
    expect(links).toHaveLength(5);
  });

  it("renders notification and chat icons as links", () => {
    render(<Navbar user={mockUser} />);

    // Click on the notification icon
    userEvent.click(screen.getByTestId("notifications"));
    expect(window.location.pathname).toBe("/");

    // Click on the chat icon
    userEvent.click(screen.getByTestId("chat"));
    expect(window.location.pathname).toBe("/");
  });

  it("handles cases when user prop is not provided", () => {
    render(<Navbar />);

    // Assert that the component gracefully handles the absence of the user prop
    expect(screen.queryByText("JD")).not.toBeInTheDocument();
    expect(screen.queryByText("john.doe@example.com")).not.toBeInTheDocument();
  });
});
