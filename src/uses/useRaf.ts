import { useEffect } from "react";

export interface UseRafContext {
    time: number;
    deltaTiem: number;
}

export const useRaf = (animation :(context: UseRafContext) => void) => {

    useEffect(() => {
        let id: number;
        let prevTime: number = 0;

        const mainLoop = (time: number) => {
            id = window.requestAnimationFrame(mainLoop);
            animation({
                time: time,
                deltaTiem: time - prevTime,
            });
            prevTime = time;
        };
        id = window.requestAnimationFrame(mainLoop);
        return () => {
            window.cancelAnimationFrame(id);
        };
    }, [animation]);
}