import type {LucideIcon} from "lucide-react";
import type {NasaAsset} from "@/src/types/nasa";

export type TrustCardItem = {
    title: string;
    text: string;
    href: string;
    action: string;
    badge: string;
    facts: string[];
    image?: NasaAsset;
    icon: LucideIcon;
    glow: string;
};