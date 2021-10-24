import { useCallback, useEffect } from "react";

export const useInterval = (cb: () => void, intervalTime: number, deps: any[]) => {
    const callback = useCallback(() => {
        cb();
    }, deps);
    useEffect(() => {
        const id = window.setInterval(callback, intervalTime);
        return () => {
            window.clearInterval(id);
        };
    }, [callback, intervalTime]);
};