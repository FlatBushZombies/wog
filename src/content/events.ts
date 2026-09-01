export interface ChurchEvent {
  id: string;
  month: string;
  day: string;
  title: string;
  frequency: string;
  time: string;
  location?: string;
  description: string;
  image?: { src: string; alt: string };
}

function pexels(id: number, width = 1200): string {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}`;
}

export const events: ChurchEvent[] = [
  {
    id: "sunday-worship",
    month: "SEP",
    day: "06",
    title: "Sunday Worship",
    frequency: "Every Sunday",
    time: "9:00 AM & 11:30 AM",
    location: "Harare, Zimbabwe",
    description: "Join us as we gather to worship, hear the Word and connect as a church family.",
    image: {
      src: pexels(29422233),
      alt: "A large congregation gathered together in a church auditorium",
    },
  },
  {
    id: "midweek-bible-study",
    month: "SEP",
    day: "09",
    title: "Midweek Bible Study",
    frequency: "Every Wednesday",
    time: "6:00 PM",
    description: "A midweek gathering to dig deeper into Scripture together.",
    image: {
      src: pexels(32632182),
      alt: "A hymn book and Bible resting on a church pew",
    },
  },
  {
    id: "night-of-worship",
    month: "SEP",
    day: "11",
    title: "Night of Worship",
    frequency: "Friday",
    time: "6:30 PM",
    description: "An evening set apart for extended worship and prayer.",
    image: {
      src: pexels(39009428),
      alt: "Silhouette of a worshipper with raised hands under blue stage lighting",
    },
  },
  {
    id: "community-outreach",
    month: "SEP",
    day: "12",
    title: "Community Outreach",
    frequency: "Saturday",
    time: "9:00 AM",
    description: "Serving our neighbors and sharing the love of Christ in Harare.",
    image: {
      src: pexels(35043644),
      alt: "A volunteer distributing supplies during a community outreach event",
    },
  },
];
