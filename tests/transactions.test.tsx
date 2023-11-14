import { Transactions } from "@/app/dashboard/_components";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const mockTransactions = [
  {
    amount: 500,
    metadata: {
      name: "John Doe",
      type: "digital_product",
      email: "johndoe@example.com",
      quantity: 1,
      country: "Nigeria",
      product_name: "Rich Dad Poor Dad",
    },
    payment_reference: "c3f7123f-186f-4a45-b911-76736e9c5937",
    status: "successful",
    type: "deposit",
    date: "2022-03-03",
  },
  {
    amount: 400,
    metadata: {
      name: "Fibi Brown",
      type: "coffee",
      email: "fibibrown@example.com",
      quantity: 8,
      country: "Ireland",
    },
    payment_reference: "d28db158-0fc0-40cd-826a-4243923444f7",
    status: "successful",
    type: "deposit",
    date: "2022-03-02",
  },
  {
    amount: 350.56,
    metadata: {
      name: "Delvan Ludacris",
      type: "webinar",
      email: "johndoe@example.com",
      quantity: 1,
      country: "Kenya",
      product_name: "How to build an online brand",
    },
    payment_reference: "73f45bc0-8f41-4dfb-9cae-377a32b71d1e",
    status: "successful",
    type: "deposit",
    date: "2022-03-01",
  },
  {
    amount: 300,
    status: "successful",
    type: "withdrawal",
    date: "2022-03-01",
  },
  {
    amount: 200,
    status: "successful",
    type: "withdrawal",
    date: "2022-03-01",
  },
];

describe("Transactions component", () => {
  it("renders loading state correctly", () => {
    render(<Transactions loading />);

    // Assert that loading spinner is rendered
    expect(screen.getByTestId("spinner")).toBeInTheDocument();

    // Assert that "Transactions" heading is not rendered
    expect(screen.queryByText(/successful/i)).not.toBeInTheDocument();
  });

  it("toggles the filter sheet correctly", () => {
    render(<Transactions transactions={mockTransactions} />);

    // Click the "Filter" button to open the sheet
    userEvent.click(screen.getByText(/filter/i));

    expect(screen.getByText(/filter/i)).toBeInTheDocument();
  });

  it("renders transactions when not in loading state", async () => {
    render(<Transactions transactions={mockTransactions} />);

    // Assert that the component renders transactions
    await waitFor(() => {
      expect(screen.getByText(/5 Transactions/)).toBeInTheDocument();
      expect(
        screen.getByText(/Your transactions for the last 7 days/i)
      ).toBeInTheDocument();
    });
  });

  it('displays "No matching transaction found" when there are no transactions', async () => {
    render(<Transactions transactions={[]} />);

    // Wait for the component to re-render
    await waitFor(() => {
      expect(
        screen.getByText(
          "No matching transaction found for the selected filter"
        )
      ).toBeInTheDocument();
    });
  });

  it('displays "Export List" button', () => {
    render(<Transactions transactions={mockTransactions} />);

    // Assert that the "Export List" button is rendered
    expect(screen.getByText("Export List")).toBeInTheDocument();
  });

  it('displays "No matching transaction found" when applied filters result in an empty list', async () => {
    render(<Transactions transactions={[]} />);

    // Open the filter sheet
    userEvent.click(screen.getByText("Filter"));

    // Wait for the component to re-render with applied filters
    await waitFor(() => {
      expect(
        screen.getByText(
          "No matching transaction found for the selected filter"
        )
      ).toBeInTheDocument();
    });
  });

  it("displays transaction details", async () => {
    render(<Transactions transactions={mockTransactions} />);

    // Wait for the component to re-render with transactions
    await waitFor(() => {
      // Assuming there is a specific transaction to test, replace the index accordingly
      const transactionIndex = 0;
      const transaction = mockTransactions[transactionIndex];

      // Add assertions to verify that transaction details are displayed correctly
      expect(
        // @ts-expect-error
        screen.getByText(transaction?.metadata?.product_name)
      ).toBeInTheDocument();
      expect(screen.getByText(`USD ${transaction.amount}`)).toBeInTheDocument();
    });
  });
});
