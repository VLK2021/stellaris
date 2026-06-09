import {getMarsRoversSummary} from "@/src/services/mars";
import {MarsRoversPage} from "@/src/components/mars/rovers";

export default async function Page() {
    const rovers = await getMarsRoversSummary();

    return <MarsRoversPage rovers={rovers} />;
}