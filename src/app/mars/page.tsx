import Link from "next/link";

export default function MarsPage() {
    return (
        <main className="pageContainer">
            <section className="heroSection">
                <div className="heroCard">
                    <div className="sectionEyebrow">
                        NASA MARS PROGRAM
                    </div>

                    <h1 className="gradientTitle">
                        MARS EXPLORATION
                    </h1>

                    <p className="sectionDescription">
                        The Mars module is currently under development.
                        We are researching official NASA data sources that
                        provide reliable and long-term access to Mars mission,
                        rover and planetary science information.
                    </p>

                    <div className="heroActions">
                        <Link
                            href="/"
                            className="primaryButton"
                        >
                            Back Home
                        </Link>

                        <Link
                            href="/earth"
                            className="secondaryButton"
                        >
                            Explore Earth
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}