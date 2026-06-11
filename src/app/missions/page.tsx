import {MissionsPage} from "@/src/components/mission";
import {
    getMissionStats,
    getMissions,
} from "@/src/services/missions";

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