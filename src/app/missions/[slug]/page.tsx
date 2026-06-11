import Image from "next/image";

type Props = {
    params: Promise<{
        slug: string;
    }>;
};

async function getMission(slug: string) {
    const response = await fetch(
        `http://localhost:3000/api/missions/aggregate?slug=${slug}`,
        {
            cache: "no-store",
        },
    );

    const json = await response.json();

    return json.data;
}

export default async function MissionPage({
                                              params,
                                          }: Props) {
    const {slug} = await params;

    const mission = await getMission(slug);

    if (!mission) {
        return <div>Mission not found</div>;
    }

    return (
        <div className="mx-auto max-w-7xl p-8">
            <h1 className="mb-4 text-5xl font-bold">
                {mission.title}
            </h1>

            <p className="mb-8 text-zinc-400">
                {mission.description}
            </p>

            <div className="mb-8">
                <p>
                    Launch date: {mission.launchDate}
                </p>

                <p>
                    Category: {mission.category}
                </p>

                <p>
                    Target: {mission.target}
                </p>
            </div>

            <h2 className="mb-4 text-3xl font-bold">
                Images
            </h2>

            <div className="grid grid-cols-4 gap-4">
                {mission.media.images.map(
                    (image: any) => (
                        <div
                            key={image.nasaId}
                            className="overflow-hidden rounded-xl border"
                        >
                            {image.preview && (
                                <Image
                                    src={image.preview}
                                    alt={image.title}
                                    width={500}
                                    height={500}
                                    className="h-64 w-full object-cover"
                                />
                            )}

                            <div className="p-3">
                                <p className="font-medium">
                                    {image.title}
                                </p>
                            </div>
                        </div>
                    ),
                )}
            </div>
        </div>
    );
}