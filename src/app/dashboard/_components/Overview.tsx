import { useMemo } from "react";
import { AppContextType } from "@/lib/context";
import { format } from "date-fns";
import { Icons } from "@/components/icons";
import { Button, Skeleton } from "@/components/ui";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  Tooltip,
  XAxis,
  Symbols,
} from "recharts";

export function Overview({
  wallet,
  transactions,
  loading,
}: Partial<Pick<AppContextType, "transactions" | "wallet">> & {
  loading?: boolean;
}) {
  const balances = useMemo(
    () => [
      {
        title: "Ledger Balance",
        amount: wallet?.ledger_balance,
      },
      {
        title: "Total Payout",
        amount: wallet?.total_payout,
      },
      {
        title: "Total Revenue",
        amount: wallet?.total_revenue,
      },
      {
        title: "Pending Payout",
        amount: wallet?.pending_payout,
      },
    ],
    [wallet],
  );

  const reverseTransactions = transactions && [...transactions].reverse();

  return (
    <section className="grid gap-20 px-10 pt-12 sm:h-[400px] sm:grid-cols-3">
      <div className="col-span-2 flex flex-col">
        <div className="mb-5 flex max-h-fit w-2/4 items-center justify-between">
          <div className="flex flex-col">
            <p className="text-xs font-medium leading-4 text-[#56616B]">
              Available Balance
            </p>
            <h2 className="mt-3 block text-[2.25rem] font-bold leading-9 text-[#131316]">
              {loading ? (
                <Skeleton className="mt-1 h-8 w-full" />
              ) : (
                `USD ${wallet?.balance}`
              )}
            </h2>
          </div>
          <Button
            size={"lg"}
            className="rounded-full border-[#131316] px-12 text-sm font-semibold leading-6 hover:bg-[#131316]/90"
            disabled={!wallet || wallet?.balance <= 0}
          >
            Withdraw
          </Button>
        </div>

        {loading ? (
          <div className="mt-12 flex items-center justify-center">
            <Icons.Spinner
              className="h-26 w-26 animate-spin"
              data-testid="spinner"
            />
          </div>
        ) : (
          <ResponsiveContainer
            width="100%"
            height="100%"
            data-testid="line-chart"
          >
            <LineChart data={reverseTransactions} height={100}>
              <Symbols type="circle" sizeType="area" size={20} />
              <XAxis
                allowDataOverflow
                dataKey="date"
                interval="preserveStartEnd"
                type="category"
                ticks={[
                  transactions?.[0]?.date,
                  transactions?.[transactions?.length - 1]?.date,
                ]}
                tick={{
                  fontSize: "12px",
                  fontWeight: "500",
                }}
                tickFormatter={(value) => format(new Date(value), "PP")}
                tickSize={20}
                tickLine={{ stroke: "none" }}
                axisLine={{
                  stroke: "#DBDEE5",
                  strokeLinecap: "butt",
                  strokeLinejoin: "round",
                  strokeWidth: "0.5px",
                  type: "round",
                }}
              />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#FF5403"
                strokeWidth={1.5}
                activeDot={false}
                dot={false}
                animationEasing="ease-in-out"
                animationDuration={2000}
              />
              <Tooltip
                formatter={(value, name, props) => {
                  return [`USD ${value}`];
                }}
                labelFormatter={(label) => format(new Date(label), "PPP")}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      <div className="col-span-1 ml-16 flex h-full flex-col justify-between">
        {balances.map((balance) => (
          <div key={balance.title} className="flex flex-col">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium leading-4 tracking-tighter text-[#56616B]">
                {balance.title}
              </p>
              <Icons.Info />
            </div>
            <h2 className="mb-4 mt-2 block text-[1.75rem] font-bold leading-9 tracking-tight text-[#131316]">
              {loading ? (
                <Skeleton className="mt-1 h-8 w-3/5" />
              ) : (
                `USD ${balance?.amount}`
              )}
            </h2>
          </div>
        ))}
      </div>
    </section>
  );
}
