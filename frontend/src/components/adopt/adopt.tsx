import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

export function AnimatedTestimonialsDemo() {
  const testimonials = [
    {
      quote:
        "After my injury, the care and kindness I received from the zoo staff helped me heal and regain my strength. Their support gave me a second chance at life.",
      name: "Rani",
      designation: "Rescued Elephant",
      src: "/rescued_elephant.jpg",
    },
    {
      quote:
        "I was found weak and alone, but the dedicated team at the zoo provided me with food, shelter, and medical attention. Now, I am thriving and happy.",
      name: "Milo",
      designation: "Rehabilitated Deer",
      src: "/rehab_deer.jpg",
    },
    {
      quote:
        "Thanks to the zoos rescue program, I received the treatment I needed to recover from my wounds. I am grateful for their compassion and care.",
      name: "Simba",
      designation: "Rescued Lion Cub",
      src: "/rescued_lion.jpg",
    },
    {
      quote:
        "The zoo staff never gave up on me, even when I was at my weakest. Their patience and expertise helped me get back on my feet.",
      name: "Peanut",
      designation: "Rehabilitated Tortoise",
      src: "/rehsb_tortoise.jpg",
    },
    {
      quote:
        "With gentle care and a safe environment, I was able to recover from my injuries. The zoo is truly a place of hope for animals like me.",
      name: "Chirpy",
      designation: "Rescued Parakeet",
      src: "/rescued_parakeet.jpg",
    },
  ];
  return <AnimatedTestimonials testimonials={testimonials} />;
}
