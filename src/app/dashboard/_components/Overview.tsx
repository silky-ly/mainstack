import axios from "axios";
import useSWR from "swr";
import { BASE_URL } from "@/constants";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui";

const fetcher = (url: string) =>
  axios.get(url).then((response) => response.data);

export function Overview() {
  const {
    data: wallet,
    error,
    isLoading,
  } = useSWR(`${BASE_URL}/wallet`, fetcher);

  const balances = [
    {
      title: "Ledger Balance",
      // amount: wallet.ledger_balance,
    },
    {
      title: "Total Payout",
      // amount: wallet.total_payout,
    },
    {
      title: "Total Revenue",
      // amount: wallet.total_revenue,
    },
    {
      title: "Pending Payout",
      // amount: wallet.pending_payout,
    },
  ];

  return (
    <section className="pt-12 grid sm:grid-cols-3 gap-20">
      <div className="col-span-2">
        <div className="w-2/4 flex justify-between items-center">
          <p className="w-full text-xs font-medium leading-4 text-[#56616B]">
            Available Balance <br />{" "}
            <span className="block mt-3 text-[28px] font-bold leading-9 text-[#131316]">
              {/* {`USD ${wallet.balance}`} */}
            </span>
          </p>
          <Button
            size={"lg"}
            className="text-xs font-semibold leading-6 rounded-full px-12"
          >
            Withdraw
          </Button>
        </div>
        <div>graph</div>
      </div>

      <div className="col-span-1 ml-16 flex flex-col gap-6 justify-between">
        {balances.map((balance) => (
          <div key={balance.title} className="flex ">
            <p className="w-full text-xs font-medium leading-4 tracking-tighter text-[#56616B]">
              {balance.title} <br />{" "}
              <span className="block mt-3 text-[28px] font-bold leading-9 tracking-tight text-[#131316]">
                {/* {`USD ${balance.amount}`} */}
              </span>
            </p>
            <Icons.info />
          </div>
        ))}
      </div>
    </section>
  );
}
