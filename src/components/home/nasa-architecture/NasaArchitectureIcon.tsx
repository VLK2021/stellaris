import {
    Activity,
    Boxes,
    Database,
    Earth,
    Orbit,
    Radar,
    Satellite,
    ShieldCheck,
    TerminalSquare,
} from "lucide-react";

import type {NasaArchitectureIconName} from "@/src/types/nasaArchitecture";

type Props = {
    name: NasaArchitectureIconName;
    className?: string;
};

export const NasaArchitectureIcon = ({name, className}: Props) => {
    const icons = {
        activity: Activity,
        earth: Earth,
        mars: Radar,
        galaxy: Orbit,
        satellite: Satellite,
        database: Database,
        terminal: TerminalSquare,
        shield: ShieldCheck,
    };

    const Icon = icons[name] ?? Boxes;

    return <Icon className={className} />;
};