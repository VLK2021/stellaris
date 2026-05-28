import {motion} from "framer-motion";

type Props = {
    title: string;
    subtitle: string;
};

export const NasaArchitectureCore = ({title, subtitle}: Props) => {
    return (
        <div className="relative mx-auto grid h-[230px] w-[230px] place-items-center rounded-full border border-cyan-300/20 bg-[#04111f]/80 shadow-[0_0_90px_rgba(34,211,238,0.18)] backdrop-blur-2xl lg:absolute lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2">
            <motion.div
                className="absolute inset-4 rounded-full border border-cyan-300/20"
                animate={{rotate: 360}}
                transition={{duration: 25, repeat: Infinity, ease: "linear"}}
            />
            <motion.div
                className="absolute inset-9 rounded-full border border-violet-300/20"
                animate={{rotate: -360}}
                transition={{duration: 35, repeat: Infinity, ease: "linear"}}
            />

            <div className="relative z-10 text-center">
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-cyan-300/10 text-2xl font-black text-white">
                    NASA
                </div>
                <h3 className="mt-4 text-2xl font-black tracking-[-0.06em] text-white">
                    {title}
                </h3>
                <p className="mt-2 text-sm text-slate-400">{subtitle}</p>
            </div>
        </div>
    );
};