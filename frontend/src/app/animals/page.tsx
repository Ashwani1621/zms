import { ParallaxScrollDemo } from "@/components/animals/animals";
import { FocusCardsDemo } from "@/components/animals/animalsFocus";

export default function AnimalsPage() {
  return (
    <div className="min-h-screen items-start h-full w-full px-5 py-20">
      {/* // <ParallaxScrollDemo /> */}
      <FocusCardsDemo />
    </div>
  )
}
