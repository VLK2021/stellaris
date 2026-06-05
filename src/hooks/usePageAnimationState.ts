"use client";

import {useEffect, useState} from "react";

export const usePageAnimationState = () => {
    const [enabled, setEnabled] = useState(true);

    useEffect(() => {
        let timeoutId: ReturnType<typeof setTimeout> | null = null;

        const handleVisibilityChange = () => {
            if (document.hidden) {
                if (timeoutId) clearTimeout(timeoutId);
                setEnabled(false);
                return;
            }

            timeoutId = setTimeout(() => {
                setEnabled(true);
            }, 350);
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
            if (timeoutId) clearTimeout(timeoutId);
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, []);

    return enabled;
};