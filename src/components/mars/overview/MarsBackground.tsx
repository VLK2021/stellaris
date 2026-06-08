export const MarsBackground = () => {
        return (
            <div className="pointer-events-none fixed inset-0 overflow-hidden bg-[#030308]">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_16%,rgba(251,146,60,.20),transparent_30%),radial-gradient(circle_at_86%_22%,rgba(56,189,248,.10),transparent_28%),linear-gradient(180deg,#05030a_0%,#0b0507_44%,#030308_100%)]" />
                    <div className="absolute left-1/2 top-[-25rem] h-[780px] w-[780px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_34%_30%,#fed7aa_0%,#f97316_18%,#9a3412_44%,#431407_70%,transparent_73%)] opacity-90 shadow-[0_0_120px_rgba(249,115,22,.28)]" />
                    <div className="absolute inset-0 opacity-[0.14] [background-image:radial-gradient(rgba(255,218,185,.8)_1px,transparent_1px)] [background-size:36px_36px]" />
                    <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.5)_1px,transparent_1px)] [background-size:96px_96px]" />
                    <div className="absolute inset-x-0 top-[48%] h-px bg-gradient-to-r from-transparent via-orange-300/35 to-transparent" />
                    <div className="absolute inset-x-0 top-[64%] h-px bg-gradient-to-r from-transparent via-sky-300/20 to-transparent" />
                    <div className="absolute left-[-10%] top-[34%] h-[560px] w-[560px] rounded-full bg-orange-700/18 blur-3xl" />
                    <div className="absolute right-[-12%] top-[18%] h-[620px] w-[620px] rounded-full bg-sky-900/16 blur-3xl" />
                    <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(rgba(255,255,255,.95)_1px,transparent_1px)] [background-size:100%_7px]" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,.18)_62%,rgba(0,0,0,.74)_100%)]" />
            </div>
        );
};