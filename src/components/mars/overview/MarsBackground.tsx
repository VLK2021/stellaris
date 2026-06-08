export const MarsBackground = () => {
    return (
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(185,82,38,.28),transparent_34%),linear-gradient(180deg,#09040a_0%,#12080a_45%,#05030a_100%)]" />

            <div className="absolute left-1/2 top-[-22rem] h-[720px] w-[720px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_35%_30%,#f97316,#9a3412_44%,#431407_72%,transparent_74%)] opacity-80 blur-[1px]" />

            <div className="absolute inset-0 opacity-[0.16] [background-image:radial-gradient(rgba(255,196,130,.8)_1px,transparent_1px)] [background-size:34px_34px]" />

            <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent_0%,rgba(251,146,60,.08)_45%,transparent_68%)]" />

            <div className="absolute left-[-12%] top-[32%] h-[520px] w-[520px] rounded-full bg-orange-700/20 blur-3xl" />
            <div className="absolute right-[-12%] top-[18%] h-[620px] w-[620px] rounded-full bg-red-900/24 blur-3xl" />

            <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,.9)_1px,transparent_1px)] [background-size:100%_7px]" />
        </div>
    );
};