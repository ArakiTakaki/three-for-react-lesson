import React, { FC, useMemo } from 'react';
import { Camera } from './objects/Camera';
import { ThreeProvider } from './renderContext';
import { Ligth } from './objects/Light';
import { useCalcWindowSize } from '../uses/useCalcWindowSize';
import { ShaderObject } from './objects/ShaderObject';

const CameraProperty = () => {
    const size = useCalcWindowSize();
    const position = useMemo<[number, number, number]>(() => [0, 0, 3.4], []);
    return (
        <Camera
            position={position}
            width={size.width}
            near={2}
            height={size.height}
            far={1000}
        />
    );
};

export const ThreeForReact: FC = () => {
    return (
        <ThreeProvider>
            <CameraProperty />
            <ShaderObject />
            <Ligth />
        </ThreeProvider>
    );
};
