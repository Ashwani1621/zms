import { StickyBanner } from "@/components/ui/sticky-banner";

export function StickyBannerDemo() {
  return (
    <div className="relative w-full overflow-y-auto">
      <StickyBanner className="bg-gradient-to-b from-blue-500 to-blue-600">
        <p className="mx-0 max-w-[90%] text-white drop-shadow-md">
            OPEN : 10:00 AM TO 5:00 PM, WEEKLY HOLIDAY : MONDAY {"     "}
          <a href="/#footer" className="transition duration-200 hover:underline">
            Read announcement
          </a>
        </p>
      </StickyBanner>
    </div>
  );
}

