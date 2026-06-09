export const MarsBackground = () => {
    return (
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
            <div className="absolute inset-0" style={{background: "var(--mars-bg)"}} />

            <div className="absolute left-1/2 top-[-25rem] h-[780px] w-[780px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_34%_30%,#fed7aa_0%,#f97316_18%,#9a3412_44%,#431407_70%,transparent_73%)] opacity-70 shadow-[var(--mars-glow)]" />

            <div className="absolute inset-0 opacity-[0.12] [background-image:radial-gradient(rgba(251,146,60,.8)_1px,transparent_1px)] [background-size:36px_36px]" />
            <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(2,132,199,.65)_1px,transparent_1px),linear-gradient(90deg,rgba(2,132,199,.45)_1px,transparent_1px)] [background-size:96px_96px]" />

            <div className="absolute inset-x-0 top-[48%] h-px bg-gradient-to-r from-transparent via-[var(--mars-accent)]/35 to-transparent" />
            <div className="absolute inset-x-0 top-[64%] h-px bg-gradient-to-r from-transparent via-[var(--mars-blue)]/25 to-transparent" />

            <div className="absolute left-[-10%] top-[34%] h-[560px] w-[560px] rounded-full bg-orange-700/15 blur-3xl" />
            <div className="absolute right-[-12%] top-[18%] h-[620px] w-[620px] rounded-full bg-sky-700/10 blur-3xl" />

            <div className="absolute inset-0 opacity-[0.055] [background-image:linear-gradient(rgba(255,255,255,.9)_1px,transparent_1px)] [background-size:100%_7px]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,.08)_62%,rgba(0,0,0,.38)_100%)]" />
        </div>
    );
};