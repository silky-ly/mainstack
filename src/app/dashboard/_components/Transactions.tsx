"use client";

import { useMemo, useState } from "react";
import { AppContextType } from "@/lib/context";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { EmptyData } from ".";
import { features, status, times } from "./config";
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

export function Transactions({
  transactions,
  loading = false,
}: Readonly<{
  transactions?: AppContextType["transactions"];
  loading?: boolean;
}>) {
  const [transactionType, setTransactionType] = useState<string[]>([]);
  const [transactionStatus, setTransactionStatus] = useState<string[]>([]);
  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);

  const withFiltersAppliedTransactions = useMemo(() => {
    let found = transactions;

    if (transactionType?.length) {
      found = transactions?.filter((transaction) =>
        transactionType?.includes(transaction?.type),
      );
    }

    if (transactionStatus?.length) {
      found = transactions?.filter((transaction) =>
        transactionStatus?.includes(transaction?.status),
      );
    }

    return found;
  }, [transactions, transactionType, transactionStatus]);

  console.log(withFiltersAppliedTransactions, "applied");

  return (
    <section className="mt-20 px-10">
      <div className="flex justify-between  sm:h-[72px]">
        <div className="flex flex-col">
          <div className="inline-flex items-center">
            <h3 className="align-base inline-flex w-full items-baseline gap-1 text-2xl font-bold text-[#131316] [letter-spacing:-0.6px]">
              {loading ? (
                <Skeleton className="my-1 h-6 w-full rounded-[2px]" />
              ) : (
                <span>
                  {withFiltersAppliedTransactions?.length} Transactions
                </span>
              )}
            </h3>
          </div>
          <p className="text-sm font-medium text-[#56616B] [letter-spacing:-0.2px]">
            Your transactions for the last 7 days
          </p>
        </div>

        <div className="flex">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button
                size={"lg"}
                className="mr-3 items-center justify-center rounded-full bg-[#EFF1F6] font-semibold text-[#131316] hover:bg-[#EFF1F6]"
              >
                Filter
                {transactionType.length !== 0 ||
                transactionStatus.length !== 0 ? (
                  <>
                    &nbsp;
                    <Badge>{withFiltersAppliedTransactions?.length}</Badge>
                  </>
                ) : null}
                &nbsp; <Icons.Expand />
              </Button>
            </SheetTrigger>

            <SheetContent className="!max-w-[456px] rounded-3xl">
              <SheetHeader>
                <SheetTitle className="mb-3 text-2xl font-bold text-[#131316] [letter-spacing:-0.6px]">
                  Filter
                </SheetTitle>

                <SheetDescription className="no-scrollbar flex justify-between gap-3 overflow-scroll">
                  {times.map((time) => (
                    <Button
                      key={time.title}
                      size={"sm"}
                      variant="outline"
                      className="w-full rounded-full border-[0.5px] border-[#EFF1F6] px-[18px] text-sm font-semibold text-[#131316] [letter-spacing:-0.4px] hover:bg-[#EFF1F6]"
                    >
                      {time.title}
                    </Button>
                  ))}
                </SheetDescription>
              </SheetHeader>

              <div className="mt-5 w-full space-y-5 overflow-hidden">
                <div className="flex w-full flex-col gap-2">
                  <Label
                    htmlFor="date-range"
                    className="text-base font-semibold text-[#131316] [letter-spacing:-0.4px]"
                  >
                    Date Range
                  </Label>

                  <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2">
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
                    onChange={setTransactionType}
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
                <div className="grid w-full gap-5 sm:grid-cols-2">
                  <Button
                    type="submit"
                    size={"lg"}
                    variant="outline"
                    className="w-full rounded-full border-[0.5px] border-[#EFF1F6] text-base font-semibold text-[#131316] [letter-spacing:-0.4px] hover:bg-transparent"
                  >
                    Clear
                  </Button>

                  <Button
                    type="submit"
                    size={"lg"}
                    onClick={() => setIsSheetOpen(false)}
                    className="w-full rounded-full bg-[#131316] text-base font-semibold text-white [letter-spacing:-0.4px] hover:bg-[#131316]"
                  >
                    Apply
                  </Button>
                </div>
              </SheetFooter>
            </SheetContent>
          </Sheet>

          <Button
            size={"lg"}
            className="items-center rounded-full bg-[#EFF1F6] font-semibold text-[#131316] hover:bg-[#EFF1F6]"
          >
            Export List &nbsp; <Icons.Export />
          </Button>
        </div>
      </div>

      <Separator className="mb-4" />

      {loading ? (
        <div className="mt-24 flex items-center justify-center">
          <Icons.Spinner
            className="h-26 w-26 animate-spin"
            data-testid="spinner"
          />
        </div>
      ) : withFiltersAppliedTransactions!.length <= 0 ? (
        <EmptyData />
      ) : (
        <div className="flex flex-col">
          {withFiltersAppliedTransactions?.map((transaction, index: number) => (
            <div
              key={`${index}-${transaction.amount}`}
              className="mb-8 flex justify-between"
            >
              <div className="flex">
                {transaction.type === "deposit" ? (
                  <Icons.Incoming />
                ) : (
                  <Icons.Outgoing />
                )}
                &nbsp; &nbsp;
                <div>
                  <p className="text-base font-medium text-[#131316] [letter-spacing:-0.2px] [word-spacing:1px]">
                    {transaction?.type === "deposit"
                      ? transaction?.metadata?.product_name ||
                        transaction?.metadata?.name
                      : "Cash Withdrawal"}
                  </p>
                  <span
                    className={cn(
                      "text-sm font-medium text-[#56616B] [letter-spacing:-0.2px]",
                      transaction?.status === "successful" &&
                        transaction?.type === "withdrawal" &&
                        "text-[#0EA163]",
                    )}
                  >
                    {transaction?.metadata?.name || transaction?.status}
                  </span>
                </div>
              </div>

              <div className="w-36 text-end">
                <p
                  className="text-base font-bold text-[#131316] [letter-spacing:-0.2px]"
                  data-testid={`usd-${index}`}
                >
                  {`USD ${transaction?.amount}`}
                </p>

                {/* convert date from 2022-3-03*/}
                <span className="text-sm font-medium text-[#56616B] [letter-spacing:-0.2px]">
                  {format(new Date(transaction?.date), "PP").toString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
