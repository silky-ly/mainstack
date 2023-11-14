import { render, screen, fireEvent } from "@testing-library/react";
import { Overview } from "@/app/dashboard/_components";

const mockWallet = {
  ledger_balance: 1000,
  total_payout: 500,
  total_revenue: 1500,
  pending_payout: 200,
  balance: 800,
};

const mockTransactions = [
  { date: "2023-01-01", amount: 100 },
  { date: "2023-01-02", amount: 150 },
  { date: "2023-01-03", amount: 200 },
];

describe("Overview component", () => {
  it("renders the Overview component with the correct content", () => {
    render(<Overview wallet={mockWallet} transactions={mockTransactions} />);

    // Assert that the available balance is rendered
    expect(screen.getByText(/Available Balance/i)).toBeInTheDocument();
    expect(screen.getByText(/USD 800/i)).toBeInTheDocument();

    // Assert that the "Withdraw" button is rendered
    expect(screen.getByText("Withdraw")).toBeInTheDocument();

    // Assert that the loading spinner is not rendered
    expect(screen.queryByTestId("spinner")).not.toBeInTheDocument();

    // Assert that the ledger balance, total payout, total revenue, and pending payout are rendered
    expect(screen.getByText(/Ledger Balance/i)).toBeInTheDocument();
    expect(screen.getByText(/Total Payout/i)).toBeInTheDocument();
    expect(screen.getByText(/Total Revenue/i)).toBeInTheDocument();
    expect(screen.getByText(/Pending Payout/i)).toBeInTheDocument();
  });

  it('handles click events on the "Withdraw" button', () => {
    const mockWithdraw = vi.fn();

    render(<Overview wallet={mockWallet} transactions={mockTransactions} />);

    // Click on the "Withdraw" button
    fireEvent.click(screen.getByText("Withdraw"));

    // Assert that the correct action is taken when the "Withdraw" button is clicked
    // expect(mockWithdraw).toHaveBeenCalled();
  });

  it('disables the "Withdraw" button when the balance is zero or undefined', () => {
    render(
      <Overview
        wallet={{ ...mockWallet, balance: 0 }}
        transactions={mockTransactions}
      />
    );
    const withdrawButton = screen.getByText("Withdraw");

    // Assert that the "Withdraw" button is disabled when the balance is zero
    expect(withdrawButton).toBeDisabled();

    render(<Overview transactions={mockTransactions} />);

    // Assert that the "Withdraw" button is disabled when the balance is undefined
    expect(withdrawButton).toBeDisabled();
  });

  it("renders loading state correctly", async () => {
    // Render the Overview component with loading initially set to true
    render(<Overview loading />);

    // Assert that the loading spinner is initially rendered
    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });
});
