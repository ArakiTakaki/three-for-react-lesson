import { useCallback, useRef } from "react"
import { useKeyPress } from "./useKeyDown";

export const useKeyEffect = (keyName: string, callback: (deltaTime: number, time: number) => void) => {
    const rafId = useRef(0);
    const prevTime = useRef(0);

    const start = useCallback(() => {
        const mainLoop = (time: number) => {
            rafId.current = window.requestAnimationFrame(mainLoop);
            callback(time - prevTime.current, time);
            prevTime.current = time;
        }
        rafId.current = window.requestAnimationFrame((time) => {
            prevTime.current = time;
            mainLoop(time);
        });
    }, [callback]);

    const stop = useCallback(() => {
        window.cancelAnimationFrame(rafId.current);
        prevTime.current = 0;
    }, []);

    useKeyPress(keyName, start, stop);
};
