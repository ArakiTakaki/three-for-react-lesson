import { FC, useMemo } from "react";
import * as THREE from 'three';
import { useAddScene } from "../../uses/useAddScene";

export const ExampleObject: FC<{
    position: [number, number, number],
}> = ({
    position,
}) => {
    const mesh = useMemo(() => {
        const geo = new THREE.BoxGeometry(0.5, 0.5, 0.5);
        const mat = new THREE.MeshLambertMaterial({ 
            color: 0xffffff,
        });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.name = 'example object'
        mesh.position.set(...position);
        return mesh;
    }, [position])

    useAddScene(mesh);
    return null;
}