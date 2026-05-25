"use client";

import Link from "next/link";
import {AnimatePresence, motion} from "framer-motion";

import type {HeaderNavItem} from "./types";

type HeaderExploreMenuProps = {
    isOpen: boolean;
    links: HeaderNavItem[];
    locale: {
        header: {
            missionIndex: string;
            missionTitle: string;
            missionDescription: string;
            openModule: string;
        };
    };
};

export const HeaderExploreMenu = ({isOpen, links, locale}: HeaderExploreMenuProps) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{opacity: 0, y: 14, scale: 0.98}}
                    animate={{opacity: 1, y: 0, scale: 1}}
                    exit={{opacity: 0, y: 10, scale: 0.98}}
                    transition={{duration: 0.18}}
                    className="absolute left-1/2 top-full w-[780px] -translate-x-1/2 pt-5"
                >
                    <div className="overflow-hidden border border-[var(--color-border)] bg-[var(--color-menu)] p-4 shadow-[var(--shadow-card)] backdrop-blur-2xl">
                        <div className="mb-4 border border-[var(--color-border)] bg-[linear-gradient(135deg,var(--color-accent-soft),rgba(139,92,246,0.12))] p-5">
                            <div className="text-xs uppercase tracking-[0.34em] text-[var(--color-accent)]">
                                {locale.header.missionIndex}
                            </div>

                            <div className="mt-2 text-2xl font-bold text-[var(--color-text)]">
                                {locale.header.missionTitle}
                            </div>

                            <p className="mt-2 max-w-xl text-sm leading-6 text-[var(--color-text-muted)]">
                                {locale.header.missionDescription}
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            {links.map((item, index) => {
                                const Icon = item.icon;

                                return (
                                    <motion.div
                                        key={item.href}
                                        initial={{opacity: 0, y: 10}}
                                        animate={{opacity: 1, y: 0}}
                                        transition={{delay: index * 0.025}}
                                    >
                                        <Link
                                            href={item.href}
                                            className="group flex items-center gap-4 border border-transparent p-4 transition hover:border-[var(--color-border-strong)] hover:bg-[var(--color-glass)]"
                                        >
                                            <div className="relative grid h-12 w-12 place-items-center rounded-full border border-[var(--color-border-strong)] bg-[var(--color-accent-soft)] text-[var(--color-accent)] shadow-[var(--shadow-soft)]">
                                                <div className="absolute inset-[-5px] rounded-full border border-[var(--color-border)] opacity-0 transition group-hover:opacity-100" />
                                                <Icon className="h-5 w-5" />
                                            </div>

                                            <div>
                                                <div className="font-semibold text-[var(--color-text)]">
                                                    {item.label}
                                                </div>

                                                <div className="mt-1 text-xs text-[var(--color-text-muted)]">
                                                    {locale.header.openModule}
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};