"use client";

import axios from "axios";
import useSWR from "swr";
import { useState } from "react";
import { BASE_URL } from "@/constants";
import { Icons } from "@/components/icons";
import { EmptyData } from ".";
import {
  Button,
  DatePicker,
  Label,
  MultiSelect,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components";

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

const fetcher = async (url: string) =>
  await axios.get(url).then((response) => response.data);

export function Transactions() {
  const [selected, setSelected] = useState<string[]>([]);
  const {
    data: transactions,
    error,
    isLoading,
  } = useSWR(`${BASE_URL}/transactions`, fetcher);

  // console.log("TRANSACTIONS", transactions);
  // console.log("TRANSACTIONS", transactions[0].amount);

  return (
    <section className="mt-20">
      <div className="flex justify-between">
        <div>
          <h3 className="text-xl font-bold [letter-spacing:-0.6px] text-[#131316]">
            24 Transactions
          </h3>
          <p className="text-sm font-medium [letter-spacing:-0.2px] text-[#56616B]">
            Your transactions for the last 7 days
          </p>
        </div>

        <div className="flex">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                size={"lg"}
                className="mr-3 items-center align-middle font-semibold rounded-full hover:bg-[#EFF1F6] text-[#131316] bg-[#EFF1F6]"
              >
                Filter &nbsp; <Icons.expand />
              </Button>
            </SheetTrigger>

            <SheetContent className="rounded-3xl">
              <SheetHeader>
                <SheetTitle className="mb-3 text-2xl font-bold [letter-spacing:-0.6px] text-[#131316]">
                  Filter
                </SheetTitle>

                <SheetDescription className="flex justify-between gap-3 overflow-scroll no-scrollbar">
                  {times.map((time) => (
                    <Button
                      key={time.title}
                      size={"sm"}
                      variant="outline"
                      className="w-full px-[18px] text-sm font-semibold rounded-full [letter-spacing:-0.4px] border-[0.5px] hover:bg-transparent text-[#131316] border-[#EFF1F6]"
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
                    options={[
                      {
                        value: "storetransaction",
                        label: "Store Transactions",
                      },
                      {
                        value: "gettipped",
                        label: "Get Tipped ",
                      },
                      {
                        value: "withdrawals",
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
                    ]}
                    selected={selected}
                    onChange={setSelected}
                    className=""
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
                    options={[
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
                    ]}
                    selected={selected}
                    onChange={setSelected}
                    className=""
                  />
                </div>
              </div>

              <SheetFooter>
                {/* <SheetClose className=""> */}
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
                  className="w-full text-base font-semibold rounded-full [letter-spacing:-0.4px] text-white bg-[#131316] hover:bg-[#131316]"
                >
                  Apply
                </Button>
                {/* </SheetClose> */}
              </SheetFooter>
            </SheetContent>
          </Sheet>

          <Button
            size={"lg"}
            className="items-center font-semibold rounded-full text-[#131316] bg-[#EFF1F6]"
          >
            Export List &nbsp; <Icons.export />
          </Button>
        </div>
      </div>

      <Separator className="my-4" />

      {/* <EmptyData /> */}

      <div className="flex justify-between">
        {/* {transactions.map((transaction: any) => ( */}
        {/* <div key={transaction.amount}> */}
        <div className="flex">
          {/* {transaction.type === "deposit" ? (
            <Icons.incoming />
          ) : (
            <Icons.outgoing />
          )} */}
          &nbsp; &nbsp;
          <div>
            <p className="text-sm font-medium [letter-spacing:-0.2px] [word-spacing:1px] text-[#131316]">
              {/* {transaction.type === "deposit"
                ? transaction?.metadata.product_name ||
                  transaction?.metadata.name
                : "Cash Withdrawal"} */}
            </p>
            <span className="text-xs font-medium [letter-spacing:-0.2px] text-[#56616B]">
              {/* {transaction?.status || transaction?.metadata.name} */}
            </span>
          </div>
        </div>

        <div>
          <p className="text-sm font-bold [letter-spacing:-0.2px] text-[#131316]">
            {/* {`USD ${transaction.amount}`} */}
          </p>

          {/* convert date from 2022-3-03*/}
          <span className="text-xs font-medium [letter-spacing:-0.2px] text-[#56616B]">
            {/* {transaction.date} */}
          </span>
        </div>
        {/* </div> */}
        {/* ))} */}
      </div>
    </section>
  );
}
