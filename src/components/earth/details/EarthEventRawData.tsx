"use client";

import {useState} from "react";
import {motion} from "framer-motion";
import {Braces, ChevronDown} from "lucide-react";

import type {EarthLocale} from "@/src/types/earth/earthUi.types";

type Props = {
    raw: Record<string, unknown>;
    t: EarthLocale;
};

export const EarthEventRawData = ({raw, t}: Props) => {
    const [open, setOpen] = useState(false);

    return (
        <motion.section
            initial={{opacity: 0, y: 18}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true}}
            transition={{duration: 0.4}}
            className="relative overflow-hidden rounded-[1.8rem] border border-[var(--color-border)] bg-[var(--color-card)] shadow-[var(--shadow-card)] backdrop-blur-2xl"
        >
            <div className="absolute inset-0 opacity-25" style={{background: "var(--hero-bg)"}} />

            <button
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                className="relative z-10 flex w-full items-center justify-between gap-4 p-5 text-left"
            >
                <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-full border border-[var(--color-border)] bg-[var(--color-glass)] text-[var(--color-accent)]">
                        <Braces className="h-4 w-4" />
                    </div>

                    <div>
                        <h2 className="bg-gradient-to-r from-[var(--color-text)] via-[var(--color-accent)] to-[var(--color-brand-secondary)] bg-clip-text text-xl font-black uppercase tracking-[-0.04em] text-transparent">
                            {t.details.rawPayload}
                        </h2>

                        <p className="earth-muted mt-1 text-xs">
                            JSON payload returned by NASA EONET
                        </p>
                    </div>
                </div>

                <ChevronDown
                    className={`h-5 w-5 text-[var(--color-accent)] transition ${
                        open ? "rotate-180" : ""
                    }`}
                />
            </button>

            {open && (
                <motion.pre
                    initial={{height: 0, opacity: 0}}
                    animate={{height: "auto", opacity: 1}}
                    exit={{height: 0, opacity: 0}}
                    transition={{duration: 0.25}}
                    className="relative z-10 max-h-[620px] overflow-auto border-t border-[var(--color-border)] bg-black/20 p-5 text-xs leading-6 text-[var(--color-text-muted)]"
                >
                    {JSON.stringify(raw, null, 2)}
                </motion.pre>
            )}
        </motion.section>
    );
};