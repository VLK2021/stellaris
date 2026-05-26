"use client";

import {motion} from "framer-motion";
import {Activity, Radio} from "lucide-react";

type Props = {
    locale: {
        badge: string;
        title: string;
        text: string;
        status: {
            syncing: string;
            live: string;
            degraded: string;
            updated: string;
        };
    };
    updatedAt?: string;
    isLoading: boolean;
    error: string | null;
};

export const LiveCommandHeader = ({
                                      locale,
                                      updatedAt,
                                      isLoading,
                                      error,
                                  }: Props) => {
    return (
        <motion.div
            initial={{opacity: 0, y: 24}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, margin: "-100px"}}
            transition={{duration: 0.65}}
            className="max-w-4xl"
        >
            <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-cyan-300/20 bg-cyan-300/8 px-5 py-2 text-xs font-black uppercase tracking-[0.28em] text-cyan-300 backdrop-blur-xl">
                <Radio className="h-4 w-4" />
                {locale.badge}
            </div>

            <h3 className="bg-gradient-to-r from-white via-cyan-200 to-emerald-300 bg-clip-text text-3xl font-black tracking-[-0.06em] text-transparent sm:text-4xl lg:text-5xl leading-[0.95]">
                {locale.title}
            </h3>

            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300">
                {locale.text}
            </p>

            <div className="mt-7 inline-flex flex-wrap items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-4 text-sm font-bold text-slate-300 backdrop-blur-2xl">
                <Activity className="h-4 w-4 text-cyan-300" />

                {error
                    ? locale.status.degraded
                    : isLoading
                        ? locale.status.syncing
                        : locale.status.live}

                {updatedAt && (
                    <span className="text-cyan-300">
                        {locale.status.updated}:{" "}
                        {new Date(updatedAt).toLocaleTimeString()}
                    </span>
                )}
            </div>
        </motion.div>
    );
};