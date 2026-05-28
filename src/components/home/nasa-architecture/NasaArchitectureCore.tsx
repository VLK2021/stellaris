import {motion} from "framer-motion";

type Props = {
    title: string;
    subtitle: string;
};

export const NasaArchitectureCore = ({title, subtitle}: Props) => {
    return (
        <div className="relative mx-auto grid h-[190px] w-[190px] place-items-center rounded-full border border-cyan-300/20 bg-[#03101f]/55 shadow-[0_0_90px_rgba(34,211,238,0.22)] backdrop-blur-xl lg:absolute lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2">
            <motion.div
                className="absolute inset-3 rounded-full border border-cyan-300/18"
                animate={{rotate: 360}}
                transition={{duration: 24, repeat: Infinity, ease: "linear"}}
            />

            <motion.div
                className="absolute inset-8 rounded-full border border-violet-300/18"
                animate={{rotate: -360}}
                transition={{duration: 34, repeat: Infinity, ease: "linear"}}
            />

            <div className="relative z-10 text-center">
                <motion.div
                    animate={{scale: [1, 1.06, 1], rotate: [0, 2, -2, 0]}}
                    transition={{duration: 4, repeat: Infinity}}
                    className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-cyan-300/25 bg-[radial-gradient(circle,rgba(34,211,238,0.25),rgba(2,6,17,0.78))] shadow-[0_0_38px_rgba(34,211,238,0.35)]"
                >
                    <span className="text-xl font-black tracking-[-0.08em] text-white">
                        NASA
                    </span>
                </motion.div>

                <h3 className="mt-3 text-xl font-black tracking-[-0.055em] text-white">
                    {title}
                </h3>

                <p className="mt-1 text-xs text-slate-400">{subtitle}</p>
            </div>
        </div>
    );
};