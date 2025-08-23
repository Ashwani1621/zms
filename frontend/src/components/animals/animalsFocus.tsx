// import { FocusCards } from "@/components/ui/focus-cards";

import { FocusCards } from "../ui/focus-card";

export function FocusCardsDemo() {
  const cards = [
    {
      title: "Bengal Tiger",
      src: "/tiger.jpg",
    },
    {
      title: "Lion king",
      src: "/lion.jpg",
    },
    {
      title: "Elephant family",
      src: "/elephant.jpg",
    },
    {
      title: "Peaceful panda",
      src: "/panda.jpg",
    },
    {
      title: "Peacocks dancing",
      src: "/peacocks.jpg",
    },
    {
      title: "Snake in action",
      src: "/snake.jpg",
    },
    {
      title: "Cheetah sprinting",
      src: "/cheetah.jpg",
    },
    {
      title: "Deer in the forest",
      src: "/deer.jpg",
    },
    {
      title: "Monkey business",
      src: "/monkey.jpg",
    },
    {
      title: "Giraffe grazing",
      src: "/giraffe.jpg",
    },
    {
      title: "Owl in the night",
      src: "/owl.jpg",
    },
    {
      title: "bear in the wild",
      src: "/bear.jpg",
    },
    {
      title: "Crocodile lurking",
      src: "/crocodile.jpg",
    },
    {
      title: "Zebra crossing",
      src: "/zebra.jpg",
    },
    {
      title: "Ostrich running",
      src: "/ostrich.jpg",
    },
    {
      title: "Chad Ape",
      src: "/gorilla.jpg",
    },
    {
      title: "Hopper Kangaroo",
      src: "/kangaroo.jpg",
    },
    {
      title: "Tiger in Snow",
      src: "/white_tiger.jpg",
    },
  ];

  return <FocusCards cards={cards} />;
}
