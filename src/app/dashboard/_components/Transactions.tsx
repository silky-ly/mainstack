"use client";

import { useMemo, useState } from "react";
import { AppContextType } from "@/lib/context";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { EmptyData } from ".";
import { Icons } from "@/components/icons";
import {
  Badge,
  Button,
  DatePicker,
  Label,
  MultiSelect,
  Separator,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Skeleton,
} from "@/components";

const features = [
  {
    value: "deposit",
    label: "Store Transactions",
  },
  {
    value: "gettipped",
    label: "Get Tipped ",
  },
  {
    value: "withdrawal",
    label: "Withdrawals",
  },
  {
    value: "chargebacks",
    label: "Chargebacks",
  },
  {
    value: "cashbacks",
    label: "Cashbacks",
  },
  {
    value: "referandearn",
    label: "Refer & Earn",
  },
];

const status = [
  {
    value: "successful",
    label: "Successful",
  },
  {
    value: "pending",
    label: "Pending",
  },
  {
    value: "failed",
    label: "Failed",
  },
];

const times = [
  {
    title: "Today",
  },
  {
    title: "Last 7 days",
  },
  {
    title: "This month",
  },
  {
    title: "Last 3 months",
  },
  {
    title: "This year",
  },
  {
    title: "Last year",
  },
  {
    title: "All time",
  },
];

export function Transactions({
  transactions,
  loading = false,
}: {
  transactions?: AppContextType["transactions"];
  loading?: boolean;
}) {
  const [transactionType, setTransactionTypes] = useState<string[]>([]);
  const [transactionStatus, setTransactionStatus] = useState<string[]>([]);

  const [isSheetOpen, toggleSheet] = useState<boolean>(false);

  const withFiltersAppliedTransactions = useMemo(() => {
    let found = transactions;

    if (transactionType?.length) {
      found = transactions?.filter((transaction) =>
        transactionType?.includes(transaction?.type)
      );
    }

    if (transactionStatus?.length) {
      found = transactions?.filter((transaction) =>
        transactionStatus?.includes(transaction?.status)
      );
    }

    return found;
  }, [transactions, transactionType, transactionStatus]);

  return (
    <section className="mt-20 px-10">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <div className="inline-flex items-center">
            <h3 className="text-2xl font-bold [letter-spacing:-0.6px] text-[#131316]">
              {loading ? (
                <Skeleton className="h-3 mt-4 w-full" />
              ) : (
                withFiltersAppliedTransactions?.length
              )}{" "}
              Transactions
            </h3>
          </div>
          <p className="text-sm font-medium [letter-spacing:-0.2px] text-[#56616B]">
            Your transactions for the last 7 days
          </p>
        </div>
        <div className="flex">
          <Sheet open={isSheetOpen} onOpenChange={toggleSheet}>
            <SheetTrigger asChild>
              <Button
                size={"lg"}
                className="mr-3 items-center align-middle font-semibold rounded-full hover:bg-[#EFF1F6] text-[#131316] bg-[#EFF1F6]"
              >
                Filter &nbsp;{" "}
                {transactionType.length !== 0 ||
                transactionStatus.length !== 0 ? (
                  <Badge>{withFiltersAppliedTransactions?.length}</Badge>
                ) : null}
                &nbsp; <Icons.expand />
              </Button>
            </SheetTrigger>

            <SheetContent className="rounded-3xl">
              <SheetHeader>
                <SheetTitle className="mb-3 text-2xl font-bold [letter-spacing:-0.6px] text-[#131316]">
                  Filters
                </SheetTitle>

                <SheetDescription className="flex justify-between gap-3 overflow-scroll no-scrollbar">
                  {times.map((time) => (
                    <Button
                      key={time.title}
                      size={"sm"}
                      variant="outline"
                      className="w-full px-[18px] text-sm font-semibold rounded-full hover:bg-[#EFF1F6] [letter-spacing:-0.4px] border-[0.5px] text-[#131316] border-[#EFF1F6]"
                    >
                      {time.title}
                    </Button>
                  ))}
                </SheetDescription>
              </SheetHeader>

              <div className="mt-5 grid gap-5">
                <div className="flex flex-col gap-2">
                  <Label
                    htmlFor="date-range"
                    className="text-base font-semibold text-[#131316] [letter-spacing:-0.4px]"
                  >
                    Date Range
                  </Label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <DatePicker />
                    <DatePicker />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Label
                    htmlFor="date-range"
                    className="text-base font-semibold text-[#131316] [letter-spacing:-0.4px]"
                  >
                    Transaction Type
                  </Label>

                  <MultiSelect
                    options={features}
                    selected={transactionType}
                    onChange={setTransactionTypes}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label
                    htmlFor="date-range"
                    className="text-base font-semibold text-[#131316] [letter-spacing:-0.4px]"
                  >
                    Transaction Status
                  </Label>

                  <MultiSelect
                    options={status}
                    selected={transactionStatus}
                    onChange={setTransactionStatus}
                  />
                </div>
              </div>

              <SheetFooter>
                {/* sheet close. */}
                <div className="w-full grid sm:grid-cols-2 gap-5">
                  <Button
                    type="submit"
                    size={"lg"}
                    variant="outline"
                    className="w-full text-base font-semibold rounded-full [letter-spacing:-0.4px] border-[0.5px] hover:bg-transparent text-[#131316] border-[#EFF1F6]"
                  >
                    Clear
                  </Button>

                  <Button
                    type="submit"
                    size={"lg"}
                    onClick={() => toggleSheet(false)}
                    className="w-full text-base font-semibold rounded-full [letter-spacing:-0.4px] text-white bg-[#131316] hover:bg-[#131316]"
                  >
                    Apply
                  </Button>
                </div>
              </SheetFooter>
            </SheetContent>
          </Sheet>

          <Button
            size={"lg"}
            className="items-center font-semibold rounded-full text-[#131316] bg-[#EFF1F6] hover:bg-[#EFF1F6]"
          >
            Export List &nbsp; <Icons.export />
          </Button>
        </div>
      </div>

      <Separator className="my-4" />

      {loading ? (
        <div className="flex justify-center items-center mt-24">
          <Icons.spinner
            className="h-26 w-26 animate-spin"
            data-testid="spinner"
          />
        </div>
      ) : withFiltersAppliedTransactions!.length <= 0 ? (
        <EmptyData />
      ) : (
        <div className="flex flex-col">
          {withFiltersAppliedTransactions?.map(
            (transaction: AppContextType["transactions"][0], index: number) => (
              <div
                key={`${index}-${transaction.amount}`}
                className="flex justify-between mb-8"
              >
                <div className="flex">
                  {transaction.type === "deposit" ? (
                    <Icons.incoming />
                  ) : (
                    <Icons.outgoing />
                  )}
                  &nbsp; &nbsp;
                  <div>
                    <p className="text-base font-medium [letter-spacing:-0.2px] [word-spacing:1px] text-[#131316]">
                      {transaction?.type === "deposit"
                        ? transaction?.metadata?.product_name ||
                          transaction?.metadata?.name
                        : "Cash Withdrawal"}
                    </p>
                    <span
                      className={cn(
                        "text-sm font-medium [letter-spacing:-0.2px] text-[#56616B]",
                        transaction?.status === "successful" &&
                          transaction?.type === "withdrawal" &&
                          "text-[#0EA163]"
                      )}
                    >
                      {transaction?.metadata?.name || transaction?.status}
                    </span>
                  </div>
                </div>

                <div className="w-36 text-end">
                  <p
                    className="text-base font-bold [letter-spacing:-0.2px] text-[#131316]"
                    data-testid={`usd-${index}`}
                  >
                    {`USD ${transaction?.amount}`}
                  </p>

                  {/* convert date from 2022-3-03*/}
                  <span className="text-sm font-medium [letter-spacing:-0.2px] text-[#56616B]">
                    {format(new Date(transaction?.date), "PP").toString()}
                  </span>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </section>
  );
}
