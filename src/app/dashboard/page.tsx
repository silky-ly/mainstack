"use client";

import useSWR from "swr";
import axios, { AxiosError } from "axios";
import { useMemo } from "react";
import { Overview, Sidebar, Transactions } from "./_components";
import { BASE_URL } from "@/constants";
import { AppContextType } from "@/lib/context";

const fetcher = async (url: string) =>
  await axios.get(url).then((response) => response.data);

export default function Page() {
  const { data: transactions, isLoading: isTransactionsLoading } = useSWR<
    AppContextType["transactions"],
    AxiosError
  >(`${BASE_URL}/transactions`, fetcher);

  const { data: wallet, isLoading: isWalletLoading } = useSWR<
    AppContextType["wallet"],
    AxiosError
  >(`${BASE_URL}/wallet`, fetcher);

  const sortedTransactions = useMemo(
    () =>
      transactions
        ?.map((transaction) => ({
          ...transaction,
          date: new Date(transaction.date),
        }))
        ?.toSorted(
          (a: Record<string, any>, b: Record<string, any>) => b.date - a.date,
        ),
    [transactions],
  );

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="app-content">
        <Overview
          wallet={wallet}
          loading={isWalletLoading}
          transactions={sortedTransactions}
        />

        <Transactions
          transactions={sortedTransactions}
          loading={isTransactionsLoading}
        />
      </div>
    </div>
  );
}
