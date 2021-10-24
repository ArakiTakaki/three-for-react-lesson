import { FC, useMemo } from 'react';
import * as THREE from 'three';
import { useAddScene } from '../../uses/useAddScene';

export const Ligth: FC = () => {
    const light = useMemo(() => {
        const light = new THREE.PointLight(0x00ffff);
        light.position.set(2, 2, 1);
        light.name = 'light';
        return light;
    }, []);
    useAddScene(light);

    return null;
}
