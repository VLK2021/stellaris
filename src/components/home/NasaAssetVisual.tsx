"use client";

import Image from "next/image";

type NasaAssetVisualProps = {
    src: string;
    alt: string;
    size?: "sm" | "md" | "lg" | "xl";
    glow?: string;
};

const sizeClasses = {
    sm: "h-9 w-9",
    md: "h-13 w-13",
    lg: "h-20 w-20",
    xl: "h-28 w-28",
};

export const NasaAssetVisual = ({
                                    src,
                                    alt,
                                    size = "md",
                                    glow = "rgba(56,189,248,0.28)",
                                }: NasaAssetVisualProps) => {
    return (
        <div
            className={`relative shrink-0 overflow-visible rounded-full ${sizeClasses[size]}`}
            style={{
                filter: `drop-shadow(0 0 18px ${glow})`,
            }}
        >
            <Image
                src={src}
                alt={alt}
                fill
                sizes="160px"
                className="object-cover mix-blend-screen"
            />
        </div>
    );
};