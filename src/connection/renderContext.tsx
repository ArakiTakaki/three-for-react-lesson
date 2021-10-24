import { createContext, FC, useContext, useEffect, useRef, useState } from "react";
import * as THREE from 'three';
import { useCalcWindowSize } from "../uses/useCalcWindowSize";

interface ThreeContext {
    renderer: THREE.WebGLRenderer | null,
    currentScene: THREE.Scene | null,
}

const threeContext = createContext<ThreeContext>({
    renderer: null,
    currentScene: new THREE.Scene(),
});

export const ThreeProvider: FC = ({ children }) => {
    const [ctx, setRenderer] = useState<ThreeContext>();
    const refCanvas = useRef<HTMLCanvasElement>(null);
    const windowSize = useCalcWindowSize();
    // options
    useEffect(() => {
        if (ctx?.renderer == null) return;
    }, [ctx?.renderer]);

    useEffect(() => {
        if (refCanvas.current == null) return;
        const renderer = new THREE.WebGLRenderer({
            canvas: refCanvas.current,
            antialias: true,
        });

        setRenderer({
            renderer: renderer,
            currentScene: new THREE.Scene(),
        });
    }, []);

    // resize effect
    useEffect(() => {
        if (ctx?.renderer == null) return;
        ctx.renderer.setSize(windowSize.width, windowSize.height);
        ctx.renderer.setPixelRatio(window.devicePixelRatio);
    }, [windowSize, ctx]);

    return (
        <threeContext.Provider value={ctx || { renderer: null, currentScene: null }}>
            {children}
            <canvas ref={refCanvas}/>
        </threeContext.Provider>
    )
};

export const useThreeContext = () => useContext(threeContext);
