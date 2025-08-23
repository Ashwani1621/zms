"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useOutsideClick } from "@/hooks/use-outside-click";

export function ExpandableCardDemo() {
  const [active, setActive] = useState<(typeof cards)[number] | boolean | null>(
    null
  );
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0  grid place-items-center z-[100]">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.05,
                },
              }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-full max-w-[500px]  h-full md:h-fit md:max-h-[90%]  flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
            >
              <motion.div layoutId={`image-${active.title}-${id}`}>
                <img
                  width={200}
                  height={200}
                  src={active.src}
                  alt={active.title}
                  className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
                />
              </motion.div>

              <div>
                <div className="flex justify-between items-start p-4">
                  <div className="">
                    <motion.h3
                      layoutId={`title-${active.title}-${id}`}
                      className="font-bold text-neutral-700 dark:text-neutral-200"
                    >
                      {active.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active.description}-${id}`}
                      className="text-neutral-600 dark:text-neutral-400"
                    >
                      {active.description}
                    </motion.p>
                  </div>

                  <motion.a
                    layoutId={`button-${active.title}-${id}`}
                    href={active.ctaLink}
                    target="_blank"
                    className="px-4 py-3 text-sm rounded-full font-bold bg-green-500 text-white"
                  >
                    {active.ctaText}
                  </motion.a>
                </div>
                <div className="pt-4 relative px-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                  >
                    {typeof active.content === "function"
                      ? active.content()
                      : active.content}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <ul className="max-w-2xl mx-auto w-full gap-4">
        {cards.map((card, index) => (
          <motion.div
            layoutId={`card-${card.title}-${id}`}
            key={`card-${card.title}-${id}`}
            onClick={() => setActive(card)}
            className="p-4 flex flex-col md:flex-row justify-between items-center hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer"
          >
            <div className="flex gap-4 flex-col md:flex-row ">
              <motion.div layoutId={`image-${card.title}-${id}`}>
                <img
                  width={100}
                  height={100}
                  src={card.src}
                  alt={card.title}
                  className="h-40 w-40 md:h-14 md:w-14 rounded-lg object-cover object-top"
                />
              </motion.div>
              <div className="">
                <motion.h3
                  layoutId={`title-${card.title}-${id}`}
                  className="font-medium text-neutral-800 dark:text-neutral-200 text-center md:text-left"
                >
                  {card.title}
                </motion.h3>
                <motion.p
                  layoutId={`description-${card.description}-${id}`}
                  className="text-neutral-600 dark:text-neutral-400 text-center md:text-left"
                >
                  {card.description}
                </motion.p>
              </div>
            </div>
            <motion.button
              layoutId={`button-${card.title}-${id}`}
              className="px-4 py-2 text-sm rounded-full font-bold bg-gray-100 hover:bg-green-500 hover:text-white text-black mt-4 md:mt-0"
            >
              {card.ctaText}
            </motion.button>
          </motion.div>
        ))}
      </ul>
    </>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};

const cards = [
  {
    description: "Businessman",
    title: "Donald Trump",
    src: "/donald_trump.jpg",
    ctaText: "Hire",
    ctaLink: "https://www.youtube.com/shorts/SXHMnicI6Pg",
    content: () => {
      return (
        <p>
          Donald Trump, a prominent businessman and public figure, is recognized for his bold leadership and ambitious vision. As a businessman for the zoo, he brings strategic thinking and a results-driven approach to enhancing operations and guest experiences. <br /> <br /> Trumps focus on innovation, branding, and large-scale development helps drive new initiatives in zoo management, aiming to create world-class attractions and facilities. With a reputation for making impactful decisions, Donald Trump stands out as a dynamic and influential force in the evolution of modern zoos.
        </p>
      );
    },
  },
  {
    description: "Gardener",
    title: "Elon Musk",
    src: "/elon_musk.jpg",
    ctaText: "Hire",
    ctaLink: "https://www.youtube.com/shorts/SXHMnicI6Pg",
    content: () => {
      return (
        <p>
          Elon Musk, a pioneering entrepreneur and innovator, is celebrated for his forward-thinking approach and passion for sustainability. As a gardener in zoo management, he applies his creative vision to transform green spaces and habitats, ensuring a thriving environment for both plants and animals. <br /> <br /> Musks dedication to eco-friendly practices and technological advancement inspires new standards in horticulture and conservation. With a commitment to excellence and a love for nature, Elon Musk has become a unique and influential figure in the world of zoo management, earning respect from colleagues and visitors alike.
        </p>
      );
    },
  },

  {
  description: "Veterinarian",
  title: "Jane Goodall",
  src: "/jane_goodall.jpg",
  ctaText: "Hire",
  ctaLink: "https://www.youtube.com/shorts/SXHMnicI6Pg",
  content: () => (
    <p>
      Jane Goodall, a world-renowned primatologist and conservationist, is admired for her compassionate approach to animal care. As a veterinarian for the zoo, she brings expertise in animal health, welfare, and behavioral studies. <br /> <br /> Goodalls dedication to ethical treatment and her innovative research methods help ensure the well-being of every creature in the zoo, making her an invaluable asset to the team.
    </p>
  ),
},
  {
  description: "Marketing Director",
  title: "Gary Vaynerchuk",
  src: "/gary_vaynerchuk.jpg",
  ctaText: "Hire",
  ctaLink: "https://www.youtube.com/shorts/SXHMnicI6Pg",
  content: () => (
    <p>
      Gary Vaynerchuk, a dynamic entrepreneur and marketing expert, is recognized for his innovative strategies and digital prowess. As marketing director for the zoo, he crafts compelling campaigns to boost attendance and promote conservation efforts. <br /> <br /> Garys energetic approach and mastery of social media help the zoo reach new audiences and build a strong brand presence.
    </p>
  ),
},
{
  description: "Architect",
  title: "Zaha Hadid",
  src: "/zara_hadid.jpg",
  ctaText: "Hire",
  ctaLink: "https://www.youtube.com/shorts/SXHMnicI6Pg",
  content: () => (
    <p>
      Zaha Hadid, a visionary architect, is celebrated for her innovative and futuristic designs. As the zoos architect, she reimagines animal habitats and visitor spaces, blending aesthetics with functionality. <br /> <br /> Hadids creative vision transforms the zoo into a modern landmark, providing inspiring environments for both animals and guests.
    </p>
  ),
},
];
