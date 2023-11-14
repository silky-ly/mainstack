import { render } from "@testing-library/react";
import { Sidebar } from "@/app/dashboard/_components/Sidebar";

describe("Sidebar component", () => {
  it("renders the Sidebar component with SVG icons", () => {
    const { getByTestId } = render(<Sidebar />);

    // Assert that each SVG icon is present in the rendered output
    expect(getByTestId("product-icon")).toBeInTheDocument();
    expect(getByTestId("productTwo-icon")).toBeInTheDocument();
    expect(getByTestId("productThree-icon")).toBeInTheDocument();
    expect(getByTestId("productFour-icon")).toBeInTheDocument();
  });

  it("renders the Sidebar component with hover styles", () => {
    const { getAllByTestId } = render(<Sidebar />);

    // Assert that each icon has hover styles applied
    const icons = getAllByTestId(/-icon$/);
    icons.forEach((icon) => {
      expect(icon.parentElement).toHaveClass(
        "hover:bg-[#EFF1F6] p-2 hover:rounded-full"
      );
    });
  });

  it("renders the Sidebar component with the correct number of icons", () => {
    const { getAllByTestId } = render(<Sidebar />);

    // Assert that the correct number of icons is rendered
    const icons = getAllByTestId(/-icon$/);
    expect(icons).toHaveLength(4); // Assuming there are four icons in the sidebar
  });
});
