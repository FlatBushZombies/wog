// Centralized photography sourced from Pexels (free to use, no attribution required).
// Swap these values to update imagery across the entire site without touching components.

export interface SiteImage {
  src: string;
  alt: string;
}

function pexels(id: number, width = 1600): string {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}`;
}

export const siteImages = {
  heroBase: {
    src: pexels(34770978, 2400),
    alt: "Congregation members raising their hands during a passionate worship service",
  },
  heroReveal: {
    src: pexels(36117935, 2400),
    alt: "Silhouettes of worshippers with raised hands under vibrant stage lighting",
  },
  worship: {
    src: pexels(7520354),
    alt: "A robed choir singing together as sunlight streams through the windows",
  },
  congregation: {
    src: pexels(34623696),
    alt: "A congregation gathered together during a Sunday worship service",
  },
  pastor: {
    src: pexels(7218344),
    alt: "A pastor delivering a sermon from the front of the church",
  },
  community: {
    src: pexels(34328510),
    alt: "Worshippers gathered closely together under warm sanctuary lighting",
  },
} satisfies Record<string, SiteImage>;
