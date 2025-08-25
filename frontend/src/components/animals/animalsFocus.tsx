import { FocusCards } from "../ui/focus-card";


interface Animal {
  _id: string;
  name: string;
  species: string;
  url?: string;
}


interface FocusCardsDemoProps {
  animals: Animal[];
}


const staticFallbackData = [
     { id: "bengal-tiger", title: "Bengal Tiger", src: "/tiger.jpg" },
    { id: "lion-king", title: "Lion king", src: "/lion.jpg" },
    { id: "elephant-family", title: "Elephant family", src: "/elephant.jpg" },
    { id: "peaceful-panda", title: "Peaceful panda", src: "/panda.jpg" },
    { id: "peacocks-dancing", title: "Peacocks dancing", src: "/peacocks.jpg" },
    { id: "snake-in-action", title: "Snake in action", src: "/snake.jpg" },
    { id: "cheetah-sprinting", title: "Cheetah sprinting", src: "/cheetah.jpg" },
    { id: "deer-in-forest", title: "Deer in the forest", src: "/deer.jpg" },
    { id: "monkey-business", title: "Monkey business", src: "/monkey.jpg" },
    { id: "giraffe-grazing", title: "Giraffe grazing", src: "/giraffe.jpg" },
    { id: "owl-in-night", title: "Owl in the night", src: "/owl.jpg" },
    { id: "bear-in-wild", title: "bear in the wild", src: "/bear.jpg" },
    { id: "crocodile-lurking", title: "Crocodile lurking", src: "/crocodile.jpg" },
    { id: "zebra-crossing", title: "Zebra crossing", src: "/zebra.jpg" },
    { id: "ostrich-running", title: "Ostrich running", src: "/ostrich.jpg" },
    { id: "chad-ape", title: "Chad Ape", src: "/gorilla.jpg" },
    { id: "hopper-kangaroo", title: "Hopper Kangaroo", src: "/kangaroo.jpg" },
    { id: "tiger-in-snow", title: "Tiger in Snow", src: "/white_tiger.jpg" },
    
];


export function FocusCardsDemo({ animals }: FocusCardsDemoProps) {
  const hasBackendData = animals && animals.length > 0;

  const cardsToDisplay = hasBackendData
    ? animals.map((animal) => ({ 
        id: animal._id,
        title: animal.name,
        src: animal.url || "/placeholder.jpg",
      }))
    : staticFallbackData;

  return <FocusCards cards={cardsToDisplay} />;
}