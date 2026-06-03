"use client";

import {useState} from "react";
import {motion} from "framer-motion";
import {Braces, ChevronDown} from "lucide-react";

type Props = {
    template: string | null;
};

export const EarthLayerTemplateBlock = ({template}: Props) => {
    const [open, setOpen] = useState(false);

    return (
        <section className="relative overflow-hidden rounded-[1.8rem] border border-[var(--color-border)] bg-[var(--color-card)] shadow-[var(--shadow-card)] backdrop-blur-2xl">
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
                        <h2 className="text-xl font-black uppercase tracking-[-0.04em]">
                            WMTS Resource Template
                        </h2>

                        <p className="earth-muted mt-1 text-xs">
                            Official NASA GIBS tile template for developers.
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
                    transition={{duration: 0.25}}
                    className="relative z-10 max-h-[320px] overflow-auto border-t border-[var(--color-border)] bg-black/20 p-5 text-xs leading-6 text-[var(--color-text-muted)]"
                >
                    {template ?? "—"}
                </motion.pre>
            )}
        </section>
    );
};