import type {NasaArchitectureLocale} from "@/src/types/nasaArchitecture";
import {NasaArchitectureIcon} from "./NasaArchitectureIcon";

type Props = {
    features: NasaArchitectureLocale["features"];
};

export const NasaArchitectureFeatureStrip = ({features}: Props) => {
    return (
        <div className="grid gap-4 rounded-[2rem] border border-white/10 bg-white/[0.035] p-4 backdrop-blur-xl md:grid-cols-2 xl:grid-cols-5">
            {features.map((feature) => (
                <div key={feature.title} className="flex gap-4 border-white/10 xl:border-r xl:last:border-r-0">
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white/5">
                        <NasaArchitectureIcon name={feature.icon} className="h-5 w-5 text-slate-300" />
                    </div>

                    <div>
                        <h4 className="text-sm font-black text-white">{feature.title}</h4>
                        <p className="mt-1 text-xs leading-5 text-slate-400">{feature.text}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};