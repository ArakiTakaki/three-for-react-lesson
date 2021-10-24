import { useEffect } from 'react';
import * as THREE from 'three';
import { useThreeContext } from '../connection/renderContext';

// sceneに追加する命令　ほぼ必須
export const useAddScene = (obj: THREE.Object3D) => {
    const ctx = useThreeContext();
    useEffect(() => {
        if (ctx.currentScene == null) return;
        const scene = ctx.currentScene;
        const currentObj = obj;
        scene.add(currentObj);
        console.log(currentObj.name, 'added');
        return () => {
            console.log('remove object')
            scene.remove(currentObj);
        };
    }, [ctx, obj]);
}