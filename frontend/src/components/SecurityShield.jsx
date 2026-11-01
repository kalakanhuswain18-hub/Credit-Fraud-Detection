
import { useMemo } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { Float, OrbitControls } from "@react-three/drei";

function Shield() {
  const shieldShape = useMemo(() => {
    const shape = new THREE.Shape();

    shape.moveTo(0, 1.4);
    shape.lineTo(1, 1.1);
    shape.lineTo(0.85, -0.35);
    shape.quadraticCurveTo(0.7, -0.9, 0, -1.35);
    shape.quadraticCurveTo(-0.7, -0.9, -0.85, -0.35);
    shape.lineTo(-1, 1.1);
    shape.closePath();

    return shape;
  }, []);

  const checkShape = useMemo(() => {
    const shape = new THREE.Shape();

    shape.moveTo(-0.38, 0.02);
    shape.lineTo(-0.22, -0.15);
    shape.lineTo(-0.06, -0.31);
    shape.lineTo(0.38, 0.22);
    shape.lineTo(0.23, 0.38);
    shape.lineTo(-0.06, -0.02);
    shape.closePath();

    return shape;
  }, []);

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <group>
        {/* Main 3D Shield */}
        <mesh>
          <extrudeGeometry
            args={[
              shieldShape,
              {
                depth: 0.25,
                bevelEnabled: true,
                bevelSegments: 5,
                steps: 1,
                bevelSize: 0.08,
                bevelThickness: 0.08,
              },
            ]}
          />
          <meshStandardMaterial
            color="#155EEF"
            emissive="#123DFF"
            emissiveIntensity={0.5}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>

        {/* Glowing Checkmark */}
        <mesh position={[0, 0, 0.38]}>
          <shapeGeometry args={[checkShape]} />
          <meshStandardMaterial
            color="#FFFFFF"
            emissive="#60A5FA"
            emissiveIntensity={2}
            metalness={0.5}
            roughness={0.2}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>
    </Float>
  );
}

export default function SecurityShield() {
  return (
    <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }}>
      <ambientLight intensity={1.5} />

      <pointLight
        position={[3, 3, 3]}
        intensity={3}
        color="#4287FF"
      />

      <pointLight
        position={[-3, -2, 2]}
        intensity={2}
        color="#8B5CF6"
      />

      <Shield />

      <OrbitControls enableZoom={false} />
    </Canvas>
  );
}
