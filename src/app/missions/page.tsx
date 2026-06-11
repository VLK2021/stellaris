import {
    getMissionStats,
    getMissions,
} from "@/src/services/missions";
import {MissionsPage} from "@/src/components/mission";

export default function Page() {
    const missions = getMissions();
    const stats = getMissionStats();

    return (
        <MissionsPage
            missions={missions}
            stats={stats}
        />
    );
}