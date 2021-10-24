import { forwardRef, ForwardRefRenderFunction, useImperativeHandle, useMemo } from 'react';
import * as THREE from 'three';

export interface TorusObjectHandler {
    geometory: THREE.TorusGeometry;
    material: THREE.MeshLambertMaterial;
    mesh: THREE.Mesh;
}
export interface TorusObjectProps {
}

// ForwardRefRenderFunction
const TorusObjectDom: ForwardRefRenderFunction<TorusObjectHandler, TorusObjectProps> = (props, ref) => {
    const geometory = useMemo(() => new THREE.TorusGeometry(), []);
    const material = useMemo(() => new THREE.MeshLambertMaterial(), []);
    const mesh = useMemo(() => new THREE.Mesh(geometory, material), [geometory, material]);

    // ref interface
    useImperativeHandle(ref, () => {
        return {
            geometory,
            material,
            mesh,
        };
    });

    return null;
};

export const TorusObject = forwardRef(TorusObjectDom);
