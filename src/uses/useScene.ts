import { RefObject, useEffect, useRef } from "react";
import * as THREE from 'three';
import { useCalcWindowSize } from "./useCalcWindowSize";

export const useThree = (elCanvas: RefObject<HTMLCanvasElement>) => {
    const refThreeInstance = useRef<THREE.WebGLRenderer | null>(null);
    const windowSize = useCalcWindowSize();

    useEffect(() => {
        if (elCanvas.current == null) return;

        if (refThreeInstance.current == null) {
            refThreeInstance.current = new THREE.WebGLRenderer({
                canvas: elCanvas.current,
            });
        }

        refThreeInstance.current.setSize(windowSize.width, windowSize.height);
        refThreeInstance.current.setPixelRatio(window.devicePixelRatio);

        // camera作成
        const camera = new THREE.PerspectiveCamera(60, windowSize.width / windowSize.height, 1, 10);
        camera.position.z = 3;

        // Scene
        const scene = new THREE.Scene();

        // Light
        const light = new THREE.PointLight(0x00ffff);

        light.position.set(2, 2, 1);
        scene.add(light);

        const geo = new THREE.BoxGeometry(1, 1, 1);
        const mat = new THREE.MeshLambertMaterial({ color: 0xffffff });
        const mesh = new THREE.Mesh(geo, mat);
        scene.add(mesh);

        window.requestAnimationFrame(() => {
            if (refThreeInstance.current == null) return;
            refThreeInstance.current.render(scene, camera);
        });

        return () => {
            refThreeInstance.current = null;
        };
    }, [elCanvas, windowSize]);
};
