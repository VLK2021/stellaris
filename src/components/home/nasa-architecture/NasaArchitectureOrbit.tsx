import {motion} from "framer-motion";

export const NasaArchitectureOrbit = () => {
    return (
        <svg
            className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
            viewBox="0 0 1400 760"
            preserveAspectRatio="none"
        >
            <path d="M330 250 C520 250 560 355 700 380" stroke="rgba(34,211,238,.42)" strokeWidth="2" fill="none" />
            <path d="M330 360 C520 350 565 370 700 380" stroke="rgba(52,211,153,.36)" strokeWidth="2" fill="none" />
            <path d="M330 470 C520 455 575 400 700 380" stroke="rgba(251,146,60,.34)" strokeWidth="2" fill="none" />
            <path d="M330 580 C520 535 590 430 700 380" stroke="rgba(168,85,247,.34)" strokeWidth="2" fill="none" />

            <path d="M1070 250 C880 250 840 355 700 380" stroke="rgba(59,130,246,.4)" strokeWidth="2" fill="none" />
            <path d="M1070 360 C880 350 835 370 700 380" stroke="rgba(96,165,250,.34)" strokeWidth="2" fill="none" />
            <path d="M1070 470 C880 455 825 400 700 380" stroke="rgba(236,72,153,.32)" strokeWidth="2" fill="none" />
            <path d="M1070 580 C880 535 810 430 700 380" stroke="rgba(168,85,247,.32)" strokeWidth="2" fill="none" />

            <motion.circle
                cx="700"
                cy="380"
                r="122"
                stroke="rgba(34,211,238,.5)"
                strokeWidth="2"
                fill="none"
                animate={{rotate: 360}}
                transition={{duration: 28, repeat: Infinity, ease: "linear"}}
                style={{transformOrigin: "700px 380px"}}
            />
        </svg>
    );
};