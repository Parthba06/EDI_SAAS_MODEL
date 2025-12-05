import { atom } from "jotai";

export const selectedPlatformAtom = atom<"youtube" | "twitter" | "instagram">("youtube");
