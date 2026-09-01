export interface Message {
  id: string;
  title: string;
  category: string;
  speaker: string;
  date: string;
  description: string;
  image: { src: string; alt: string };
  tags: string[];
  videoUrl?: string;
}

function pexels(id: number, width = 1200): string {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}`;
}

export const messages: Message[] = [
  {
    id: "01",
    title: "When Faith Becomes Action",
    category: "Sunday Message",
    speaker: "Pastor Michael Dube",
    date: "2026",
    description:
      "Exploring what it means to move from belief to obedience in everyday life.",
    image: {
      src: pexels(7218333),
      alt: "A pastor in a moment of deep prayer inside the church",
    },
    tags: ["Faith", "Obedience"],
  },
  {
    id: "02",
    title: "Built on the Word",
    category: "Teaching",
    speaker: "Pastor Michael Dube",
    date: "2026",
    description: "A foundational look at why Scripture anchors everything we do.",
    image: {
      src: pexels(8815004),
      alt: "A pastor speaking to the congregation with a choir behind them",
    },
    tags: ["Scripture", "Foundations"],
  },
  {
    id: "03",
    title: "Walking Through the Storm",
    category: "Sunday Message",
    speaker: "Pastor Michael Dube",
    date: "2026",
    description: "Finding steady faith when life feels uncertain.",
    image: {
      src: pexels(36425622),
      alt: "Congregation members with raised hands during worship",
    },
    tags: ["Faith", "Perseverance"],
  },
  {
    id: "04",
    title: "The Power of Community",
    category: "Special Message",
    speaker: "Pastor Michael Dube",
    date: "2026",
    description: "Why we were never meant to walk this journey alone.",
    image: {
      src: pexels(7708458),
      alt: "Silhouette of a hand raised in worship against stage lighting",
    },
    tags: ["Community", "Fellowship"],
  },
];
