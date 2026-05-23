export type SkinId = "cafe" | "atelier" | "metro";

export type Skin = {
  id: SkinId;
  label: string;
  hint: string;
  swatch: string;
};

export const SKINS: Skin[] = [
  { id: "cafe", label: "Café", hint: "Parisian notebook", swatch: "#c75d3a" },
  { id: "atelier", label: "Atelier", hint: "Leather dictionary", swatch: "#c9a961" },
  { id: "metro", label: "Métro", hint: "Paris signage", swatch: "#c4302b" },
];

export const DEFAULT_SKIN: SkinId = "cafe";

export function nextSkin(current: SkinId): SkinId {
  const i = SKINS.findIndex((s) => s.id === current);
  return SKINS[(i + 1) % SKINS.length].id;
}

export function isSkinId(v: unknown): v is SkinId {
  return v === "cafe" || v === "atelier" || v === "metro";
}
