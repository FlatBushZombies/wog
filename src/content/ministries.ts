export interface Ministry {
  id: string;
  number: string;
  title: string;
  description: string;
  href?: string;
}

export const ministries: Ministry[] = [
  {
    id: "worship",
    number: "01",
    title: "Worship",
    description: "Leading the church into God's presence through music and song.",
  },
  {
    id: "youth",
    number: "02",
    title: "Youth",
    description: "Helping the next generation build a lasting faith of their own.",
  },
  {
    id: "children",
    number: "03",
    title: "Children",
    description: "A safe, joyful place for kids to discover who Jesus is.",
  },
  {
    id: "men",
    number: "04",
    title: "Men",
    description: "Building brotherhood and accountability among the men of DMWOG.",
  },
  {
    id: "women",
    number: "05",
    title: "Women",
    description: "Encouraging women to grow in faith, purpose and friendship.",
  },
  {
    id: "outreach",
    number: "06",
    title: "Outreach",
    description: "Serving our community and sharing the love of Christ beyond our walls.",
  },
];
