"use client";

import Image from "next/image";
import {motion} from "framer-motion";
import {useEffect, useState, type ReactNode} from "react";

import type {NasaAsset} from "@/src/types/nasa";
import {getAssetByKey} from "@/src/helpers/nasa.helpers";

type Props = {
    assets: NasaAsset[];
    children: ReactNode;
};

export const GlobalLandingBackground = ({assets, children}: Props) => {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const root = document.documentElement;

        const updateTheme = () => {
            setIsDark(root.classList.contains("dark"));
        };

        updateTheme();

        const observer = new MutationObserver(updateTheme);

        observer.observe(root, {
            attributes: true,
            attributeFilter: ["class"],
        });

        return () => observer.disconnect();
    }, []);

    const darkBackground =
        getAssetByKey(assets, "galaxy") ||
        getAssetByKey(assets, "earth") ||
        getAssetByKey(assets, "sun");

    const lightBackground =
        getAssetByKey(assets, "sun") ||
        getAssetByKey(assets, "galaxy") ||
        getAssetByKey(assets, "earth");

    const background = isDark ? darkBackground : lightBackground;

    return (
        <div className="relative isolate overflow-hidden bg-[var(--color-background)]">
            <div className="pointer-events-none absolute inset-0 -z-10">
                <div
                    className={
                        isDark
                            ? "absolute inset-0 bg-[#020617]"
                            : "absolute inset-0 bg-[#f3f8ff]"
                    }
                />

                {background && (
                    <motion.div
                        className="absolute inset-0"
                        animate={{
                            scale: [1.03, 1.07, 1.03],
                            x: isDark ? [0, -14, 0] : [0, 12, 0],
                            y: [0, 8, 0],
                        }}
                        transition={{
                            duration: 34,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    >
                        <Image
                            src={background.imageUrl}
                            alt={background.title}
                            fill
                            sizes="100vw"
                            className={
                                isDark
                                    ? "object-cover object-center opacity-[0.28] saturate-[1.25] contrast-[1.12]"
                                    : "object-cover object-center opacity-[0.42] saturate-[1.3] contrast-[1.18]"
                            }
                        />
                    </motion.div>
                )}

                <div
                    className={
                        isDark
                            ? "absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.82)_0%,rgba(2,6,23,0.78)_42%,rgba(2,6,23,0.96)_100%)]"
                            : "absolute inset-0 bg-[linear-gradient(180deg,rgba(243,248,255,0.44)_0%,rgba(238,248,255,0.58)_44%,rgba(248,250,252,0.88)_100%)]"
                    }
                />

                <motion.div
                    className={isDark ? "absolute inset-0 opacity-[0.26]" : "absolute inset-0 opacity-[0.34]"}
                    animate={{backgroundPosition: ["0px 0px", "190px 140px"]}}
                    transition={{
                        duration: 58,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    style={{
                        backgroundImage: isDark
                            ? "radial-gradient(circle, rgba(255,255,255,0.72) 1px, transparent 1px)"
                            : "radial-gradient(circle, rgba(15,23,42,0.24) 1px, transparent 1px)",
                        backgroundSize: "54px 54px",
                    }}
                />

                <motion.div
                    className={isDark ? "absolute inset-0 opacity-[0.16]" : "absolute inset-0 opacity-[0.24]"}
                    animate={{backgroundPosition: ["0px 0px", "-240px 170px"]}}
                    transition={{
                        duration: 86,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    style={{
                        backgroundImage: isDark
                            ? "radial-gradient(circle, rgba(56,189,248,0.62) 1px, transparent 1px)"
                            : "radial-gradient(circle, rgba(14,165,233,0.38) 1px, transparent 1px)",
                        backgroundSize: "118px 118px",
                    }}
                />

                <div
                    className={
                        isDark
                            ? "absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(56,189,248,0.18),transparent_30%),radial-gradient(circle_at_82%_16%,rgba(16,185,129,0.13),transparent_30%),radial-gradient(circle_at_50%_70%,rgba(124,58,237,0.12),transparent_36%)]"
                            : "absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(14,165,233,0.22),transparent_30%),radial-gradient(circle_at_82%_16%,rgba(20,184,166,0.18),transparent_30%),radial-gradient(circle_at_50%_70%,rgba(124,58,237,0.14),transparent_36%)]"
                    }
                />

                <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[var(--color-background)] to-transparent" />
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[var(--color-background)] to-transparent" />
            </div>

            <div className="relative z-10">{children}</div>
        </div>
    );
};