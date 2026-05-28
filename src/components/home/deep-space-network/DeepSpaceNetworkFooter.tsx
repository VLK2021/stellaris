import {RadioTower} from "lucide-react";

import type {
    DeepSpaceNetworkLocale,
    DeepSpaceNetworkData,
} from "@/src/types/deepSpaceNetwork";

import {formatUpdatedAt} from "@/src/helpers/deepSpaceNetwork.helpers";

type Props = {
    locale: DeepSpaceNetworkLocale;
    data: DeepSpaceNetworkData | null;
};

export const DeepSpaceNetworkFooter = ({locale, data}: Props) => {
    const onlineCount =
        data?.signals.filter((item) => item.status === "online").length ?? 0;

    return (
        <div className="relative z-20 grid gap-5 rounded-[1.6rem] border border-white/10 bg-black/30 p-5 backdrop-blur-xl lg:grid-cols-[1.3fr_1fr_1fr_1fr_1fr]">
            <div className="flex gap-4">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-cyan-300/15 bg-cyan-300/8">
                    <RadioTower className="h-5 w-5 text-cyan-300" />
                </div>

                <div>
                    <h4 className="text-sm font-black uppercase text-white">
                        {locale.footerTitle}
                    </h4>

                    <p className="mt-2 text-xs leading-5 text-slate-400">
                        {locale.footerText}
                    </p>
                </div>
            </div>

            <Info value={`${onlineCount}/6`} label="Horizons telemetry" />
            <Info value={locale.signalStrength} label="Signal layer" />
            <Info value="JPL Horizons" label={locale.source} />
            <Info value={formatUpdatedAt(data?.updatedAt)} label="Last sync" />
        </div>
    );
};

const Info = ({value, label}: {value: string; label: string}) => (
    <div>
        <p className="text-2xl font-black text-white">{value}</p>
        <p className="mt-1 text-xs text-slate-400">{label}</p>
    </div>
);