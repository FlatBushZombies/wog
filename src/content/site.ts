export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
}

export const site = {
  name: "DMWOG",
  fullName: "Divine Ministry Word of God",
  tagline: "Growing in Christ. Living by Faith. Serving with Purpose.",
  mission: "To know Christ, grow together, and make a difference in our community.",
  pastor: "Pastor Michael Dube",
  address: "Harare, Zimbabwe",
  serviceTimes: "9:00 AM & 11:30 AM",
  serviceDay: "Sundays",
  phone: "+263 77 000 0000",
  email: "hello@dmwog.org",
  founded: 2026,
} as const;

export const navLinks: NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Messages", href: "#messages" },
  { label: "Ministries", href: "#ministries" },
  { label: "Events", href: "#events" },
  { label: "Contact", href: "#contact" },
];

export const socialLinks: SocialLink[] = [
  { label: "Facebook", href: "https://www.facebook.com/DMWOG/" },
];

export const heroContent = {
  eyebrow: "A Community of Faith",
  headingLines: ["A place to belong.", "A faith to live.", "A God to know."],
  body: "DMWOG is a growing community of believers seeking God together through worship, the Word, fellowship and service.",
  primaryCta: "Plan Your Visit",
  secondaryCta: "Watch Messages",
  welcomeLabel: "You Are Welcome Here",
  welcomeChips: ["Worship", "Word", "Fellowship", "Service"],
};

export interface HeroCardSlide {
  label: string;
  title: string;
  description: string;
}

export const heroCardSlides: HeroCardSlide[] = [
  { label: "Worship", title: "Worship", description: "A place to encounter God." },
  { label: "The Word", title: "The Word", description: "Growing deeper in truth." },
  { label: "Community", title: "Community", description: "Walking this journey together." },
];

export const aboutContent = {
  eyebrow: "Who We Are",
  heading: "We believe church is more than a building.",
  body: "It is a community of people discovering who they are in Christ and walking that journey together.",
  footerLabel: "Growing Together",
  footerTags: ["Faith", "Community", "Purpose"],
};

export const faithBandItems = [
  { label: "Word", variant: "light" as const },
  { label: "Worship", variant: "accent" as const },
  { label: "Community", variant: "ghost" as const },
];

export const communityContent = {
  eyebrow: "Our Community",
  heading: "Faith is lived together.",
  columns: [
    { title: "Worship", description: "We gather to encounter God." },
    { title: "Word", description: "We grow through Scripture." },
    { title: "Community", description: "We walk through life together." },
    { title: "Mission", description: "We serve beyond ourselves." },
  ],
};

export const visitContent = {
  heading: "There is a place for you here.",
  body: "Come as you are. Worship with us. Meet the community. Discover what God is doing through DMWOG.",
  primaryCta: "Plan Your Visit",
  secondaryCta: "Contact Us",
  details: [
    { label: "Sundays", value: site.serviceTimes },
    { label: "Location", value: site.address },
  ],
  expect: ["Worship", "Teaching", "Community", "Prayer"],
};

export const footerContent = {
  cta: "Come worship with us.",
  ctaButton: "Plan Your Visit",
  explore: [
    { label: "About", href: "#about" },
    { label: "Messages", href: "#messages" },
    { label: "Ministries", href: "#ministries" },
    { label: "Events", href: "#events" },
  ],
  legal: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ],
};
