import defaultLogoTexture from "../hireslogo.png";

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
  venues?: Array<Partial<Venue> & { position?: VenuePosition } & { id?: string } >;
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
    id: "wedding",
    name: "The Grand Ballroom",
    description: "Best for elegant weddings and milestone celebrations with timeless sophistication",
    imageUrl: "https://images.unsplash.com/photo-1674970538959-e7475d8d376f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwd2VkZGluZyUyMHZlbnVlfGVufDF8fHx8MTc2MzkwMDQzM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    position: "top-left",
    color: "#E8D5C4",
    link: "/spaces/wedding"
  },
  {
    id: "corporate",
    name: "Executive Center",
    description: "Best for corporate events, conferences, and professional gatherings with cutting-edge technology",
    imageUrl: "https://images.unsplash.com/photo-1758285477208-2300ae0c668d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjb3Jwb3JhdGUlMjBldmVudCUyMHNwYWNlfGVufDF8fHx8MTc2MzkwODY3M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    position: "top-right",
    color: "#C4D5E8",
    link: "/spaces/corporate"
  },
  {
    id: "dining",
    name: "The Garden Terrace",
    description: "Best for intimate dining experiences, cocktail receptions, and culinary showcases",
    imageUrl: "https://images.unsplash.com/photo-1726533765356-2608b035ff6b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1cHNjYWxlJTIwcmVzdGF1cmFudCUyMGRpbmluZ3xlbnwxfHx8fDE3NjM5MDg2NzR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    position: "bottom-left",
    color: "#D4E8C4",
    link: "/spaces/dining"
  },
  {
    id: "gallery",
    name: "The Atrium Gallery",
    description: "Best for art exhibitions, product launches, and creative showcases with natural lighting",
    imageUrl: "https://images.unsplash.com/photo-1761386001767-4bc6f2648077?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBnYWxsZXJ5JTIwZXhoaWJpdGlvbiUyMHNwYWNlfGVufDF8fHx8MTc2MzkwODY3NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    position: "bottom-right",
    color: "#E8C4D5",
    link: "/spaces/gallery"
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
