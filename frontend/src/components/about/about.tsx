"use client";
import React from "react";
import { twMerge } from "tailwind-merge";
import { TracingBeam } from "../ui/tracing-beam";
import { calsans } from "@/fonts/calsans";

export function TracingBeamDemo() {
  return (
    <TracingBeam className="px-6">
      <div className="max-w-2xl mx-auto antialiased pt-4 relative">
        {dummyContent.map((item, index) => (
          <div key={`content-${index}`} className="mb-10">
            <h2 className="bg-black text-white rounded-full text-sm w-fit px-4 py-1 mb-4">
              {item.badge}
            </h2>

            <p className={twMerge(calsans.className, "text-xl mb-4")}>
              {item.title}
            </p>

            <div className="text-sm  prose prose-sm dark:prose-invert">
              {item?.image && (
                <img
                  src={item.image}
                  alt="blog thumbnail"
                  height="1000"
                  width="1000"
                  className="rounded-lg mb-10 object-cover"
                />
              )}
              {item.description}
            </div>
          </div>
        ))}
      </div>
    </TracingBeam>
  );
}

const dummyContent = [
  {
    title: "Our History",
    description: (
      <>
        <p>
          Bangalore Zoo, officially known as Sri Chamarajendra Zoological Gardens or Mysuru Zoo, is one of the oldest and most well-maintained zoos in India. Established in 1892 by Sri Chamarajendra Wadiyar Bahadur, the then ruler of Mysore, the zoo began as a private menagerie and was later opened to the public. Over the years, it has grown to cover more than 150 acres, housing a diverse collection of animals from India and around the world.
        </p>
        <br />
        <p>
          The zoo is renowned for its spacious enclosures, focus on animal welfare, and successful breeding programs for endangered species. It has played a significant role in wildlife conservation and education, attracting millions of visitors annually. Bangalore Zoo continues to evolve, blending heritage with modern zoological practices to provide a safe haven for animals and an enriching experience for guests.
        </p>
      </>
    ),
    badge: "History",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=3540&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Attractions Within the Zoo",
    description: (
      <>
        <p>
          Bangalore Zoo is home to a wide variety of attractions that delight visitors of all ages. The zoo features spacious enclosures for animals such as elephants, lions, tigers, giraffes, zebras, and exotic birds, providing a glimpse into the rich biodiversity of India and beyond.
      </p>
      <br />
      <p>
        In addition to its animal exhibits, the zoo offers a dedicated reptile house, an aviary, and a butterfly park, each designed to educate and inspire guests about the importance of conservation. The zoo also has interactive zones for children, lush botanical gardens, and informative signage throughout the grounds to enhance the visitor experience.
        </p>
        <br />
        <p>
          Regular educational programs, guided tours, and wildlife shows are organized to engage the public and promote awareness about animal welfare and environmental stewardship. Bangalore Zoos commitment to conservation and education makes it a must-visit destination for nature lovers and families.
        </p>
      </>
    ),
    badge: "Zoo Attractions",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=3540",
  },
  {
    title: "Our Mission & Vision",
    description: (
      <>
        <p>
          <strong>Vision:</strong> To inspire a world where wildlife and people thrive together, fostering respect, understanding, and stewardship for all living beings.
        </p>
        <br />
        <p>
            <strong>Mission:</strong> To conserve biodiversity through scientific management, education, and community engagement. We are dedicated to providing exceptional care for animals, supporting conservation breeding and research, and promoting awareness about the importance of wildlife protection and habitat preservation.
        </p>
      </>
    ),
    badge: "Vison & Mission",
    image:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=3540&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];
