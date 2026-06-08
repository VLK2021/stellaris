import {getMarsRoversSummary} from "./marsRovers.service";

export const getMarsFilters = async () => {
    const rovers = await getMarsRoversSummary();

    return {
        rovers: rovers.map((rover) => ({
            name: rover.name,
            label: rover.label,
            status: rover.status,
            cameras: rover.cameras,
            defaultEarthDate: rover.defaultEarthDate,
            defaultSol: rover.defaultSol,
            maxDate: rover.maxDate,
            maxSol: rover.maxSol,
        })),
    };
};