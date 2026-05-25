import type {NasaAsset, NasaAssetKey} from "@/src/types/nasa";

export const getAssetByKey = (
    assets: NasaAsset[],
    key: NasaAssetKey,
): NasaAsset | undefined => {
    return assets.find((asset) => asset.key === key);
};