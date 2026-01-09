import defaultLogoTexture from "../hireslogo.png";
import phoenixImg from "./assets/phoenix.jpg";
import eventCenterImg from "./assets/event_center.jpg";
import whiteHouseImg from "./assets/white_house.jpg";
import freebirdImg from "./assets/freebird.jpg";

export type VenuePosition = "top-left" | "top-right" | "bottom-left" | "bottom-right";

export interface Venue {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  position: VenuePosition;
  color: string;
  link: string;
}

export interface RawConfig {
  headline?: string;
  subheadline?: string;
  primaryCtaLabel?: string;
  secondaryCtaLabel?: string;
  logoTextureUrl?: string;
  venues?: Array<Partial<Venue> & { position?: VenuePosition } & { id?: string }>;
}

export interface ResolvedConfig {
  headline: string;
  subheadline: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
  logoTextureUrl: string;
  venues: Venue[];
}

const defaultVenues: Venue[] = [
  {
    id: "phoenix",
    name: "The Phoenix",
    description: "Modern Wedding Venue in Bethany, Oklahoma. Best for large-scale weddings and grand milestone celebrations where your story takes flight.",
    imageUrl: phoenixImg,
    position: "top-left",
    color: "#E8D5C4",
    link: "https://www.36square.com/phoenix"
  },
  {
    id: "event-center",
    name: "The Event Center",
    description: "Vibrant Party Venue for Every Gathering. Best for birthday parties, baby showers, and energetic corporate gatherings designed to pop with style.",
    imageUrl: eventCenterImg,
    position: "top-right",
    color: "#C4D5E8",
    link: "https://www.36square.com/eventcenter"
  },
  {
    id: "white-house",
    name: "The White House",
    description: "Iconic Boutique Venue for Intimate Events. Best for sophisticated bridal showers, professional meetings, and high-end brand photography sessions.",
    imageUrl: whiteHouseImg,
    position: "bottom-left",
    color: "#D4E8C4",
    link: "https://www.36square.com/whitehouse"
  },
  {
    id: "freebird",
    name: "Freebird Co-op",
    description: "Light-filled Creative and Fitness Studio. Best for movement-based classes, dance classes/rehearsals, and intimate creative workshops.",
    imageUrl: freebirdImg,
    position: "bottom-right",
    color: "#E8C4D5",
    link: "https://www.36square.com/freebird"
  }
];

export const defaultConfig: ResolvedConfig = {
  headline: "Discover Your Perfect Venue",
  subheadline: "Hover or tap squares to explore our premium spaces",
  primaryCtaLabel: "Learn More",
  secondaryCtaLabel: "Book Now",
  logoTextureUrl: defaultLogoTexture,
  venues: defaultVenues
};

const parseJson = (value?: string | null): RawConfig | undefined => {
  if (!value) return undefined;

  try {
    return JSON.parse(value) as RawConfig;
  } catch (error) {
    console.warn("InteractiveVenueSquareElement: Failed to parse config JSON", error);
    return undefined;
  }
};

const readConfigFromScript = (): RawConfig | undefined => {
  const script = document.getElementById("venue-square-config") as HTMLScriptElement | null
    ?? document.querySelector('script[type="application/json"][data-venue-square-config]');

  if (!script) return undefined;
  return parseJson(script.textContent);
};

const readConfigFromContainer = (container?: HTMLElement): RawConfig | undefined => {
  const target = container
    ?? document.querySelector<HTMLElement>("[data-venue-square-root]")
    ?? document.getElementById("interactive-venue-square");

  if (!target) return undefined;

  const inlineConfig = parseJson(target.getAttribute("data-venue-config"));
  if (inlineConfig) return inlineConfig;

  const embeddedScript = target.querySelector<HTMLScriptElement>('script[type="application/json"][data-venue-square-config]');
  return embeddedScript ? parseJson(embeddedScript.textContent) : undefined;
};

const mergeVenues = (rawVenues?: RawConfig["venues"]): Venue[] => {
  if (!rawVenues || rawVenues.length === 0) return defaultVenues;

  return defaultVenues.map((defaultVenue) => {
    const override = rawVenues.find((candidate) =>
      candidate.id === defaultVenue.id || candidate.position === defaultVenue.position
    );

    return {
      ...defaultVenue,
      ...override,
      position: override?.position ?? defaultVenue.position,
      id: override?.id ?? defaultVenue.id
    } satisfies Venue;
  });
};

export const resolveConfig = (rawConfig?: RawConfig): ResolvedConfig => {
  if (!rawConfig) return defaultConfig;

  return {
    headline: rawConfig.headline || defaultConfig.headline,
    subheadline: rawConfig.subheadline || defaultConfig.subheadline,
    primaryCtaLabel: rawConfig.primaryCtaLabel || defaultConfig.primaryCtaLabel,
    secondaryCtaLabel: rawConfig.secondaryCtaLabel || defaultConfig.secondaryCtaLabel,
    logoTextureUrl: rawConfig.logoTextureUrl || defaultConfig.logoTextureUrl,
    venues: mergeVenues(rawConfig.venues)
  };
};

export const loadSquarespaceConfig = (container?: HTMLElement): ResolvedConfig => {
  const globalConfig = (window as unknown as { INTERACTIVE_VENUE_SQUARE_CONFIG?: RawConfig; interactiveVenueSquareConfig?: RawConfig }).INTERACTIVE_VENUE_SQUARE_CONFIG
    || (window as unknown as { interactiveVenueSquareConfig?: RawConfig }).interactiveVenueSquareConfig;

  const rawConfig =
    globalConfig
    || readConfigFromScript()
    || readConfigFromContainer(container);

  return resolveConfig(rawConfig);
};
