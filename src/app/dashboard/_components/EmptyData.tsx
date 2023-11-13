import { Icons } from "@/components/icons";
import { Button } from "@/components/ui";

export function EmptyData() {
  return (
    <section className="w-[30%] my-20 mx-auto flex flex-col gap-6 justify-center items-start">
      <Icons.emptyHistory />

      <div className="w-11/12">
        <h1 className="mb-2 text-[28px] leading-10 font-bold [letter-spacing:-0.6px] text-[#131316]">
          No matching transaction found for the selected filter
        </h1>

        <span className="text-sm font-medium [letter-spacing:-0.2px] text-[#56616B]">
          Change your filters to see more results, or add a new product.
        </span>
      </div>

      <Button
        size={"lg"}
        className="text-sm font-semibold leading-6 rounded-full px-12 hover:bg-[#EFF1F6] text-[#131316] bg-[#EFF1F6]"
      >
        Clear Filter
      </Button>
    </section>
  );
}
