"use client";

import Link from "next/link";
import {motion} from "framer-motion";
import type {LucideIcon} from "lucide-react";

type Props = {
    href: string;
    icon: LucideIcon;
    label: string;
    title: string;
    value: string;
    meta: string;
    className: string;
    tone: "cyan" | "violet" | "orange";
};

const toneMap = {
    cyan: {
        text: "text-cyan-300",
        border: "border-cyan-300/18",
        bg: "rgba(34,211,238,0.14)",
    },
    violet: {
        text: "text-violet-300",
        border: "border-violet-300/18",
        bg: "rgba(168,85,247,0.14)",
    },
    orange: {
        text: "text-orange-300",
        border: "border-orange-300/18",
        bg: "rgba(251,146,60,0.14)",
    },
};

export const LiveSignalNode = ({
                                   href,
                                   icon: Icon,
                                   label,
                                   title,
                                   value,
                                   meta,
                                   className,
                                   tone,
                               }: Props) => {
    const colors = toneMap[tone];

    return (
        <Link href={href} className={`absolute z-20 block rounded-full ${className}`}>
            <motion.article
                whileHover={{scale: 1.045, y: -4}}
                className={`h-full w-full rounded-full border ${colors.border} backdrop-blur-2xl`}
                style={{
                    background: `radial-gradient(circle, ${colors.bg}, rgba(2,6,17,0.82))`,
                }}
            >
                <div className="flex h-full w-full flex-col items-center justify-center px-7 text-center">
                    <Icon className={`mb-3 h-6 w-6 ${colors.text}`} />

                    <p className={`max-w-[160px] text-[8px] font-black uppercase leading-tight tracking-[0.22em] ${colors.text}`}>
                        {label}
                    </p>

                    <h3 className="mt-3 line-clamp-2 max-w-[155px] text-lg font-black leading-[1.05] tracking-[-0.04em] text-white">
                        {title}
                    </h3>

                    <p className="mt-3 line-clamp-3 max-w-[155px] text-[11px] leading-5 text-slate-300">
                        {value}
                    </p>

                    <p className="mt-3 line-clamp-1 max-w-[155px] text-[9px] uppercase tracking-[0.12em] text-slate-500">
                        {meta}
                    </p>
                </div>
            </motion.article>
        </Link>
    );
};