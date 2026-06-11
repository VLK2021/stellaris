import Image from "next/image";
import Link from "next/link";
import {ExternalLink, FileAudio, Film, ImageIcon} from "lucide-react";

import type {MissionMediaResource} from "@/src/types/missions";

type Props = {
    title: string;
    type: "image" | "video" | "audio";
    items: MissionMediaResource[];
};

const getIcon = (type: Props["type"]) => {
    if (type === "video") return Film;
    if (type === "audio") return FileAudio;

    return ImageIcon;
};

export const MissionMediaSection = ({
                                        title,
                                        type,
                                        items,
                                    }: Props) => {
    if (!items.length) return null;

    const Icon = getIcon(type);

    return (
        <section className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-card)] p-6 shadow-[var(--shadow-card)]">
            <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-full border border-[var(--color-border)] bg-[var(--color-glass)]">
                    <Icon className="h-5 w-5 text-[var(--color-accent)]" />
                </div>

                <h2 className="text-2xl font-black uppercase tracking-[-0.05em]">
                    {title}
                </h2>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {items.map((item) => (
                    <Link
                        key={item.nasaId}
                        href={`/media/${encodeURIComponent(item.nasaId)}`}
                        className="group overflow-hidden rounded-[1.3rem] border border-[var(--color-border)] bg-[var(--color-glass)] transition hover:-translate-y-1 hover:border-[var(--color-accent)] hover:shadow-[var(--shadow-glow)]"
                    >
                        {item.preview ? (
                            <div className="relative aspect-[4/3]">
                                <Image
                                    src={item.preview}
                                    alt={item.title}
                                    fill
                                    sizes="25vw"
                                    className="object-cover transition duration-500 group-hover:scale-105"
                                    unoptimized
                                />
                            </div>
                        ) : (
                            <div className="grid aspect-[4/3] place-items-center bg-black/30">
                                <Icon className="h-12 w-12 text-[var(--color-accent)]" />
                            </div>
                        )}

                        <div className="p-4">
                            <p className="line-clamp-3 text-sm font-black">
                                {item.title}
                            </p>

                            <p className="mt-4 inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.14em] text-[var(--color-accent)]">
                                Відкрити медіа
                                <ExternalLink className="h-3.5 w-3.5" />
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};