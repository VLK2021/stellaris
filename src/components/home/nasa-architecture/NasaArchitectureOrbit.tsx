import {motion} from "framer-motion";

export const NasaArchitectureOrbit = () => {
    return (
        <svg
            className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
            viewBox="0 0 1400 680"
            preserveAspectRatio="none"
        >
            <path d="M350 210 C520 230 570 315 700 340" stroke="rgba(34,211,238,.36)" strokeWidth="2" fill="none" />
            <path d="M350 310 C520 310 575 330 700 340" stroke="rgba(52,211,153,.3)" strokeWidth="2" fill="none" />
            <path d="M350 410 C525 405 580 365 700 340" stroke="rgba(251,146,60,.3)" strokeWidth="2" fill="none" />
            <path d="M350 510 C530 485 595 390 700 340" stroke="rgba(168,85,247,.3)" strokeWidth="2" fill="none" />

            <path d="M1050 210 C880 230 830 315 700 340" stroke="rgba(59,130,246,.34)" strokeWidth="2" fill="none" />
            <path d="M1050 310 C880 310 825 330 700 340" stroke="rgba(96,165,250,.3)" strokeWidth="2" fill="none" />
            <path d="M1050 410 C875 405 820 365 700 340" stroke="rgba(236,72,153,.28)" strokeWidth="2" fill="none" />
            <path d="M1050 510 C870 485 805 390 700 340" stroke="rgba(168,85,247,.28)" strokeWidth="2" fill="none" />

            <motion.circle
                cx="700"
                cy="340"
                r="108"
                stroke="rgba(34,211,238,.45)"
                strokeWidth="2"
                fill="none"
                animate={{rotate: 360}}
                transition={{duration: 28, repeat: Infinity, ease: "linear"}}
                style={{transformOrigin: "700px 340px"}}
            />

            <motion.circle
                cx="700"
                cy="340"
                r="138"
                stroke="rgba(168,85,247,.22)"
                strokeWidth="1"
                fill="none"
                animate={{rotate: -360}}
                transition={{duration: 40, repeat: Infinity, ease: "linear"}}
                style={{transformOrigin: "700px 340px"}}
            />
        </svg>
    );
};