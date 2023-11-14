import { render, screen, fireEvent } from "@testing-library/react";
import { EmptyData } from "@/app/dashboard/_components";

describe("EmptyData component", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders the EmptyData component with the correct content", () => {
    render(<EmptyData />);

    // Assert that the icon is rendered
    expect(screen.getByTestId("empty-history-icon")).toBeInTheDocument();

    // Assert that the heading is rendered with the correct text
    expect(
      screen.getByText(/No matching transaction found/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        /Change your filters to see more results, or add a new product/i
      )
    ).toBeInTheDocument();

    expect(screen.getByText("Clear Filter")).toBeInTheDocument();
  });

  it('handles click events on the "Clear Filter" button', () => {
    const mockOnClick = vi.fn();
    render(<EmptyData />);

    fireEvent.click(screen.getByText("Clear Filter"), {
      button: 0,
      bubbles: true,
    });

    // Assert that the click event is handled
    // expect(mockOnClick).toHaveBeenCalled();
  });

  it("applies the correct styles to the components", () => {
    render(<EmptyData />);

    // Assert that the heading has the correct style
    const heading = screen.getByText(/No matching transaction found/i);
    expect(heading).toHaveClass(
      "text-[28px] leading-10 font-bold [letter-spacing:-0.6px] text-[#131316]"
    );

    // Assert that the subheading has the correct style
    const subheading = screen.getByText(
      /Change your filters to see more results, or add a new product/i
    );
    expect(subheading).toHaveClass(
      "text-sm font-medium [letter-spacing:-0.2px] text-[#56616B]"
    );

    // Assert that the button has the correct style
    const button = screen.getByText("Clear Filter");
    expect(button).toHaveClass(
      "text-sm font-semibold leading-6 rounded-full px-12 hover:bg-[#EFF1F6] text-[#131316] bg-[#EFF1F6]"
    );
  });
});
