import type {ReactNode} from "react";
import {Header} from "@/src/components/header/Header";
import {Footer} from "@/src/components/layout/Footer";

type SiteShellProps = {
    children: ReactNode;
};

export const SiteShell = ({children}: SiteShellProps) => {
    return (
        <div className="relative flex min-h-screen flex-col overflow-hidden bg-[var(--color-background)] text-[var(--color-text)]">
            <div className="pointer-events-none fixed inset-0 -z-10">
                <div className="absolute left-[-10%] top-[-10%] h-[420px] w-[420px] rounded-full bg-[var(--color-accent-soft)] blur-3xl" />
                <div className="absolute right-[-8%] top-[12%] h-[380px] w-[380px] rounded-full bg-[rgba(139,92,246,0.14)] blur-3xl" />
                <div className="absolute bottom-[-12%] left-[20%] h-[460px] w-[460px] rounded-full bg-[rgba(59,130,246,0.10)] blur-3xl" />
            </div>

            <Header />

            <main className="relative z-10 flex-1 pt-20">
                {children}
            </main>

            <Footer />
        </div>
    );
};