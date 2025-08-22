import { HeroSectionOne } from "@/components/hero-section/hero-section";
import { ImagesSliderDemo } from "@/components/hero/hero";
import { MapSection } from "@/components/map/map";
import { ImagesSlider } from "@/components/ui/images-slider";
import Image from "next/image";
export default function Home() {
  return (
  <div className="min-h-screen items-start  h-full w-full ">
    {/* <Container> */}
      <HeroSectionOne/>
      <ImagesSliderDemo/>

      <MapSection />
    {/* </Container> */}
  </div>
  );
}
