import { forwardRef, ForwardRefRenderFunction, useCallback, useEffect, useImperativeHandle, useMemo } from "react";
import * as THREE from 'three';
import { useAddScene } from "../../uses/useAddScene";
import { useRaf, UseRafContext } from "../../uses/useRaf";
import { range } from "../../utils/math";

export interface ShaderObjectHandler {
    geometry: THREE.BufferGeometry;
    material: THREE.ShaderMaterial;
    mesh: THREE.Points;
}

export interface ShaderObjectProps {
    fragment?: string;
    vertex?: string;
}

const vert = `attribute vec3 color;

uniform float time;
uniform float size;

varying vec4 vMvPosition;
varying vec3 vColor;

void main() {
    float offset = sin(position.z + position.x + position.y) * 1000.0 * cos(position.z + position.x + position.y);
    vec4 mvPosition = modelViewMatrix * vec4(
        position.x + 10.0 * sin((time + offset) / 1000.0),
        position.y + 10.0 * sin((time + offset) / 700.0) + 10.0 * cos((time + offset) / 1200.0),
        position.z + 10.0 * cos((time + offset) / 800.0),
        1.0
    );
    vMvPosition = mvPosition;
    vColor = color;
    gl_PointSize = (size + (sin(radians(((time + offset) / 10.0) * 2.0)) * 10.0 - 10.0)) * (100.0 / length(mvPosition.xyz));
    gl_Position = projectionMatrix * mvPosition;
    // gl_Position.x = sin(time / 100.0) * 100.0 + gl_Position.x;
}
`;

const frag = `
uniform sampler2D texture5;

varying vec4 vMvPosition;
varying vec3 vColor;

vec3 hsv2rgb(vec3 c){
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

void main() {
    vec3 custom_color = hsv2rgb(vColor);
    float opacity = 200.0 / length(vMvPosition.xyz);
    
    gl_FragColor = vec4(custom_color, opacity) * texture2D(texture5, gl_PointCoord);
}
`;

const createTexture = (size = 1024) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (ctx == null) throw new Error('not found canvas');
    canvas.width = size;
    canvas.height = size;
    const grad = ctx.createRadialGradient(
        size / 2,
        size / 2,
        0,
        size / 2,
        size / 2,
        size / 2,
    );

    grad.addColorStop(0.1, 'rgba(255, 255, 255, .1)');
    grad.addColorStop(1.0, 'rgba(255, 255, 255, 0)');

    ctx.fillStyle = grad;
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI / 180, true);
    ctx.fill();
    const texture = new THREE.Texture(canvas);
    texture.minFilter = THREE.NearestFilter;
    texture.needsUpdate = true;
    return texture;
};

const ShaderObjectDOM: ForwardRefRenderFunction<ShaderObjectHandler, ShaderObjectProps> = ({
    vertex = vert,
    fragment = frag,
}, ref) => {
    const texture = useMemo(() => createTexture(), [])

    const geometry = useMemo(() => new THREE.BufferGeometry(), [])
    const material = useMemo(() => new THREE.ShaderMaterial({
        uniforms: {
            time: {
                value: 1.0,
            },
            size: {
                value: 50.0,
            },
            texture5: {
                value: texture,
            }
        },
        vertexShader: vertex,
        fragmentShader: fragment,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
    }), [vertex, fragment, texture]);

    const mesh = useMemo(() => new THREE.Points(geometry, material), [geometry, material]);

    useEffect(() => {
        const { vertices_base, colors_base } = range(500)
            .reduce<{
                vertices_base: number[],
                colors_base: number[],
            }>(({
                vertices_base,
                colors_base,
            }) => {
                const x = Math.floor(Math.random() * 100 - 50);
                const y = Math.floor(Math.random() * 100 - 50);
                const z = Math.floor(Math.random() * 100 - 50);
                const h = Math.random() * 0.2;
                const s = 0.2 + Math.random() * 0.2;
                const v = 0.8 + Math.random() * 0.2;
                return {
                    vertices_base: [...vertices_base, x, y, z],
                    colors_base: [...colors_base, h, s, v],
                }
            }, {
                vertices_base: [],
                colors_base: [],
            });
        geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(vertices_base), 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(colors_base), 3));
    }, [geometry]);

    useImperativeHandle(ref, () => {
        return {
            geometry,
            material,
            mesh,
        };
    });
    const update = useCallback((context: UseRafContext) => {
        material.uniforms.time.value = context.time;
    }, [material]);
    useRaf(update)
    useAddScene(mesh);
    return null;
};

export const ShaderObject = forwardRef(ShaderObjectDOM);
