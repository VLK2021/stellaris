import {getMarsOverview} from "@/src/services/mars";
import {MarsOverviewPage} from "@/src/components/mars/overview";

export default async function Page() {
    const data = await getMarsOverview();

    return <MarsOverviewPage data={data} />;
}