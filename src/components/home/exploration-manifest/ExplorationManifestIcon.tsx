import {
    ImageIcon,
    Radio,
    Rocket,
    SunMedium,
    Telescope,
} from "lucide-react";

import type {ExplorationManifestIcon as IconName} from "@/src/types/explorationManifest";

type Props = {
    name: IconName;
    className?: string;
};

export const ExplorationManifestIcon = ({name, className}: Props) => {
    const icons = {
        signal: Radio,
        rocket: Rocket,
        sun: SunMedium,
        image: ImageIcon,
        telescope: Telescope,
    };

    const Icon = icons[name];

    return <Icon className={className} />;
};