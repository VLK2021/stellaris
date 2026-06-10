"use client";

import Image from "next/image";


import type { MediaItem } from "@/src/types/media";
import {BackButton} from "@/src/common";

type Props = {
    item: MediaItem;

    assets: string[];

    preview: string | null;

    video: string | null;

    audio: string | null;
};

export const MediaDetailsPage = ({
                                     item,
                                     assets,
                                     preview,
                                     video,
                                     audio,
                                 }: Props) => {
    const data = item.data[0];

    return (
        <main className="mx-auto max-w-[1600px] px-4 py-8">
            <BackButton label="Назад" />

            <div className="mt-6 grid gap-6 xl:grid-cols-[1.2fr_.8fr]">
                <section className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-card)] p-4">
                    {video ? (
                        <video
                            controls
                            className="w-full rounded-[1.5rem]"
                            src={video}
                        />
                    ) : audio ? (
                        <audio
                            controls
                            className="w-full"
                            src={audio}
                        />
                    ) : preview ? (
                        <div className="relative aspect-video overflow-hidden rounded-[1.5rem]">
                            <Image
                                fill
                                src={preview}
                                alt={data.title}
                                className="object-cover"
                                unoptimized
                            />
                        </div>
                    ) : null}
                </section>

                <section className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-card)] p-6">
                    <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-accent)]">
                        {data.media_type}
                    </p>

                    <h1 className="mt-4 text-4xl font-black">
                        {data.title}
                    </h1>

                    {data.description && (
                        <p className="mt-6 leading-8 text-[var(--color-text-muted)]">
                            {data.description}
                        </p>
                    )}
                </section>
            </div>
        </main>
    );
};