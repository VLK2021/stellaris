import {EXPLORATION_MANIFEST_FEATURES} from "@/src/constants/explorationManifest.constants";
import type {ExplorationManifestLocale} from "@/src/types/explorationManifest";

import {ExplorationManifestCard} from "./ExplorationManifestCard";

type Props = {
    locale: ExplorationManifestLocale;
};

export const ExplorationManifestGrid = ({locale}: Props) => {
    return (
        <div className="mx-auto mt-16 grid max-w-6xl gap-10 md:grid-cols-2 lg:grid-cols-5 lg:gap-0">
            {EXPLORATION_MANIFEST_FEATURES.map((feature, index) => (
                <ExplorationManifestCard
                    key={feature.id}
                    feature={feature}
                    locale={locale}
                    index={index}
                />
            ))}
        </div>
    );
};