"use client";

import {motion} from "framer-motion";
import type {ReactNode} from "react";

type Props = {
    children: ReactNode;
};

export const GlobalLandingBackground = ({children}: Props) => {
    return (
        <div className="relative isolate overflow-hidden bg-[var(--color-background)]">
            <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,var(--color-accent-soft),transparent_30%),radial-gradient(circle_at_82%_18%,rgba(16,185,129,0.16),transparent_28%),radial-gradient(circle_at_50%_70%,rgba(139,92,246,0.12),transparent_34%)]" />

                <motion.div
                    className="absolute inset-0 opacity-30"
                    animate={{backgroundPosition: ["0px 0px", "180px 130px"]}}
                    transition={{duration: 42, repeat: Infinity, ease: "linear"}}
                    style={{
                        backgroundImage:
                            "radial-gradient(circle, var(--star-color) 1px, transparent 1px)",
                        backgroundSize: "46px 46px",
                    }}
                />

                <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[var(--color-background)] to-transparent" />
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[var(--color-background)] to-transparent" />
            </div>

            <div className="relative z-10">{children}</div>
        </div>
    );
};