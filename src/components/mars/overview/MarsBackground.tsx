export const MarsBackground = () => {
    return (
        <div className="pointer-events-none fixed inset-0 overflow-hidden bg-[#030308]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(251,146,60,.18),transparent_30%),radial-gradient(circle_at_85%_22%,rgba(59,130,246,.10),transparent_28%),linear-gradient(180deg,#05030a_0%,#0b0507_42%,#030308_100%)]" />

            <div className="absolute left-1/2 top-[-24rem] h-[760px] w-[760px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_34%_30%,#fed7aa_0%,#f97316_18%,#9a3412_44%,#431407_70%,transparent_73%)] opacity-90 shadow-[0_0_120px_rgba(249,115,22,.28)]" />

            <div className="absolute left-1/2 top-[-24rem] h-[760px] w-[760px] -translate-x-1/2 rounded-full bg-[linear-gradient(115deg,transparent_0%,rgba(255,255,255,.16)_42%,transparent_58%)] opacity-50" />

            <div className="absolute left-[8%] top-[18%] h-[420px] w-[420px] rounded-full bg-orange-700/20 blur-3xl" />
            <div className="absolute right-[-8%] top-[24%] h-[560px] w-[560px] rounded-full bg-sky-900/18 blur-3xl" />
            <div className="absolute bottom-[-18%] left-[22%] h-[520px] w-[620px] rounded-full bg-red-950/45 blur-3xl" />

            <div className="absolute inset-0 opacity-[0.15] [background-image:radial-gradient(rgba(255,218,185,.8)_1px,transparent_1px)] [background-size:36px_36px]" />

            <div className="absolute inset-0 opacity-[0.09] [background-image:linear-gradient(rgba(255,255,255,.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.55)_1px,transparent_1px)] [background-size:96px_96px]" />

            <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent_0%,rgba(251,146,60,.08)_42%,rgba(59,130,246,.055)_50%,transparent_68%)]" />

            <div className="absolute inset-x-0 top-[46%] h-px bg-gradient-to-r from-transparent via-orange-300/35 to-transparent" />
            <div className="absolute inset-x-0 top-[62%] h-px bg-gradient-to-r from-transparent via-sky-300/20 to-transparent" />

            <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(rgba(255,255,255,.95)_1px,transparent_1px)] [background-size:100%_7px]" />

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,.18)_62%,rgba(0,0,0,.72)_100%)]" />
        </div>
    );
};