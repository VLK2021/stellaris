"use client";

import {motion} from "framer-motion";

import LiveEarthScene from "./LiveEarthScene";

export const LiveOrbitShowcase = () => {
    return (
        <motion.article
            initial={{opacity: 0, scale: 0.96, y: 18}}
            whileInView={{opacity: 1, scale: 1, y: 0}}
            viewport={{once: true, margin: "-100px"}}
            transition={{duration: 0.65}}
            className="relative mx-auto aspect-square w-full max-w-[390px] overflow-hidden rounded-full border border-cyan-300/20 bg-[#020611]/80 shadow-[0_0_95px_rgba(34,211,238,0.22)] backdrop-blur-2xl lg:mr-16"
        >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,211,238,0.24),transparent_50%)]" />

            <LiveEarthScene />

            <div className="pointer-events-none absolute inset-0 rounded-full border border-white/5" />
        </motion.article>
    );
};

export default LiveOrbitShowcase;