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
    [wallet]
  );

  return (
    <>
      <section className="pt-12 px-10 grid sm:grid-cols-3 gap-20">
        <div className="col-span-2 flex flex-col">
          <div className="w-2/4 flex justify-between items-center mb-5">
            <div className="flex flex-col">
              <p className="text-xs font-medium leading-4 text-[#56616B]">
                Available Balance
              </p>
              <h2 className="block mt-3 text-[2.25rem] font-bold leading-9 text-[#131316]">
                {loading ? (
                  <Skeleton className="h-3 mt-4 w-full" />
                ) : (
                  `USD ${wallet?.balance}`
                )}
              </h2>
            </div>
            <Button
              size={"lg"}
              className="text-sm font-semibold leading-6 rounded-full px-12 border-[#131316] hover:bg-[#131316]/90"
              disabled={!wallet || wallet?.balance <= 0}
            >
              Withdraw
            </Button>
          </div>

          {loading ? (
            <div className="flex justify-center items-center mt-12">
              <Icons.spinner
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
              <LineChart data={transactions} height={100}>
                <Symbols type="circle" sizeType="area" size={20} />
                <XAxis
                  allowDataOverflow
                  allowDuplicatedCategory={false}
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
                  animationDuration={1700}
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

        <div className="col-span-1 ml-16 flex flex-col justify-between">
          {balances.map((balance) => (
            <div key={balance.title} className="flex flex-col">
              <div className="flex justify-between items-center">
                <p className="text-xs font-medium leading-4 tracking-tighter text-[#56616B]">
                  {balance.title}
                </p>
                <Icons.info />
              </div>
              <h2 className="block mt-2 mb-4 text-[1.75rem] font-bold leading-9 tracking-tight text-[#131316]">
                {loading ? (
                  <Skeleton className="h-3 mb-5 mt-4 w-full" />
                ) : (
                  `USD ${balance?.amount}`
                )}
              </h2>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
