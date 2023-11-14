"use client";

import axios, { AxiosError } from "axios";
import { Overview, Sidebar, Transactions } from "./_components";
import useSWR from "swr";
import { BASE_URL } from "@/constants";
import { AppContextType } from "@/lib/context";
import { useMemo } from "react";

const fetcher = async (url: string) =>
  await axios.get(url).then((response) => response.data);

export default function Page() {
  const {
    data: transactions,
    error: transactionError,
    isLoading: isTransactionsLoading,
  } = useSWR<AppContextType["transactions"], AxiosError>(
    `${BASE_URL}/transactions`,
    fetcher
  );

  const {
    data: wallet,
    error,
    isLoading: isWalletLoading,
  } = useSWR<AppContextType["wallet"], AxiosError>(
    `${BASE_URL}/wallet`,
    fetcher,
    {
      refreshInterval: 4000,
    }
  );

  const sortedTransactions = useMemo(
    () =>
      transactions
        ?.map((transaction) => ({
          ...transaction,
          date: new Date(transaction.date),
        }))
        ?.toSorted(
          (a: Record<string, any>, b: Record<string, any>) => b.date - a.date
        ),
    [transactions]
  );

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="app-content">
        <Overview
          wallet={wallet}
          loading={isWalletLoading}
          transactions={transactions}
        />

        <Transactions
          transactions={sortedTransactions}
          loading={isTransactionsLoading}
        />
      </div>
    </div>
  );
}
