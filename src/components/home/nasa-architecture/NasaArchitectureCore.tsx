import {motion} from "framer-motion";

type Props = {
    title: string;
    subtitle: string;
};

const NASA_LOGO =
    "https://www.nasa.gov/wp-content/uploads/2023/04/nasa-logo-web-rgb.png";

export const NasaArchitectureCore = ({title, subtitle}: Props) => {
    return (
        <div className="relative mx-auto grid h-[190px] w-[190px] place-items-center rounded-full border border-cyan-300/20 bg-[#03101f]/75 shadow-[0_0_80px_rgba(34,211,238,0.18)] backdrop-blur-2xl lg:absolute lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2">
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
                    animate={{scale: [1, 1.05, 1]}}
                    transition={{duration: 3, repeat: Infinity}}
                    className="relative mx-auto h-16 w-16"
                >
                    <img
                        src={NASA_LOGO}
                        alt="NASA"
                        className="h-full w-full object-contain"
                    />
                </motion.div>

                <h3 className="mt-3 text-xl font-black tracking-[-0.055em] text-white">
                    {title}
                </h3>

                <p className="mt-1 text-xs text-slate-400">{subtitle}</p>
            </div>
        </div>
    );
};