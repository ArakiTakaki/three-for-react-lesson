import { forwardRef, ForwardRefRenderFunction, useCallback, useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { Position } from '../../interfaces/vec';
import { useKeyEffect } from '../../uses/useEffectLoop';
import { useRaf } from '../../uses/useRaf';
import { useThreeContext } from '../renderContext';

interface CameraElement {
    camera: THREE.PerspectiveCamera;
}

interface CameraProps {
    width?: number;
    height?: number;
    fov?: number;
    near?: number;
    far?: number;
    position?: Position;
    name?: string;
    movementSpeed?: number;
}

const CameraFunction: ForwardRefRenderFunction<CameraElement, CameraProps> = ({
    name = 'camera',
    width = window.innerWidth,
    height = window.innerHeight,
    fov = 50,
    near = 0.1,
    far = 100,
    position = [0, 0, 0],
    movementSpeed = 0.005
}) => {
    const ctx = useThreeContext();

    const camera =  useMemo(
        () => new THREE.PerspectiveCamera(fov, width / height, near, far),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [],
    );

    const handleMoveUp = useCallback((deltaTime) => {
        camera.position.x -= (deltaTime * movementSpeed) * Math.sin(camera.rotation.y);
        camera.position.z -= (deltaTime * movementSpeed) * Math.cos(camera.rotation.y);
    }, [camera, movementSpeed]);

    const handleMoveDown = useCallback((deltaTime) => {
        camera.position.x += (deltaTime * movementSpeed) * Math.sin(camera.rotation.y);
        camera.position.z += (deltaTime * movementSpeed) * Math.cos(camera.rotation.y);
    }, [movementSpeed, camera]);

    const handleMoveRight = useCallback((deltaTime) => {
        camera.position.x += (deltaTime * movementSpeed) * Math.sin(camera.rotation.y + Math.PI / 2);
        camera.position.z += (deltaTime * movementSpeed) * Math.cos(camera.rotation.y + Math.PI / 2);
    }, [camera, movementSpeed]);

    const handleMoveLeft = useCallback((deltaTime) => {
        camera.position.x -= (deltaTime * movementSpeed) * Math.sin(camera.rotation.y + Math.PI / 2);
        camera.position.z -= (deltaTime * movementSpeed) * Math.cos(camera.rotation.y + Math.PI / 2);
    }, [camera, movementSpeed]);

    useKeyEffect('w', handleMoveUp);
    useKeyEffect('s', handleMoveDown);
    useKeyEffect('d', handleMoveRight);
    useKeyEffect('a', handleMoveLeft);

    useEffect(() => {
        camera.fov = fov;
    }, [fov, camera]);

    useEffect(() => {
        camera.near = near;
    }, [near, camera]);

    useEffect(() => {
        camera.far = far;
    }, [far, camera]);

    useEffect(() => {
        camera.aspect = width / height;
    }, [width, height, camera]);

    useEffect(() => {
        camera.name = name;
    }, [camera, name]);

    useEffect(() => {
        if (position == null) return;
        camera.position.set(...position);
    }, [position, camera]);

    // TODO: カメラの位置を調整する。
    const mainLoop = useCallback(() => {
        if (ctx?.renderer == null || ctx.currentScene == null) return;
        ctx.renderer.render(ctx.currentScene, camera);
    }, [ctx, camera]);

    useRaf(mainLoop);
    return null;
};

export const Camera = forwardRef(CameraFunction);
