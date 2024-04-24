import { Icons } from "@/components/icons";
import { Button } from "@/components/ui";

export function EmptyData() {
  return (
    <section className="mx-auto my-20 flex w-[30%] flex-col items-start justify-center gap-6">
      <Icons.EmptyHistory data-testid="empty-history-icon" />

      <div className="w-11/12">
        <h1 className="mb-2 text-[28px] font-bold leading-10 text-[#131316] [letter-spacing:-0.6px]">
          No matching transaction found for the selected filter
        </h1>

        <span className="text-sm font-medium text-[#56616B] [letter-spacing:-0.2px]">
          Change your filters to see more results, or add a new product.
        </span>
      </div>

      <Button
        size={"lg"}
        className="rounded-full bg-[#EFF1F6] px-12 text-sm font-semibold leading-6 text-[#131316] hover:bg-[#EFF1F6]"
      >
        Clear Filter
      </Button>
    </section>
  );
}
