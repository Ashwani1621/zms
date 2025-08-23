import { HeroSectionOne } from "@/components/hero-section/hero-section";
import { ImagesSliderDemo } from "@/components/hero/hero";
import { MapSection } from "@/components/map/map";
export default function Home() {
  return (
  <div className="min-h-screen items-start  h-full w-full ">
      <HeroSectionOne/>
      <ImagesSliderDemo/>

      <MapSection />
  </div>
  );
}
