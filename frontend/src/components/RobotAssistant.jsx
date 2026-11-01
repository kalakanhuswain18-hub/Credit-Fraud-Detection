
import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, RoundedBox } from "@react-three/drei";
import "./RobotAssistant.css";

const messages = [
  "Hello! I'm CreditGuard AI.",
  "I'll protect your transactions!",
  "Detecting suspicious activities...",
  "Your financial security is my priority!"
];

// SPEECH BUBBLE WITH TYPEWRITER ANIMATION
function SpeechBubble() {
  const [messageIndex, setMessageIndex] = useState(0);
  const [text, setText] = useState("");

  useEffect(() => {
    const message = messages[messageIndex];
    let index = 0;
    let timeout;

    setText("");

    const typing = setInterval(() => {
      index++;
      setText(message.slice(0, index));

      if (index >= message.length) {
        clearInterval(typing);

        timeout = setTimeout(() => {
          setMessageIndex(
            (prev) => (prev + 1) % messages.length
          );
        }, 2200);
      }
    }, 65);

    return () => {
      clearInterval(typing);
      clearTimeout(timeout);
    };
  }, [messageIndex]);

  return (
    <div className="robot-speech">
      <div className="speech-label">
        <span className="speech-dot" />
        CREDITGUARD AI
      </div>

      <p>
        {text}
        <span className="typing-cursor">|</span>
      </p>

      <div className="speech-tail" />
    </div>
  );
}

// 3D ROBOT MODEL
function RobotModel() {
  const robot = useRef();
  const head = useRef();
  const wavingArm = useRef();
  const wrist = useRef();
  const mouth = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    // Floating animation
    if (robot.current) {
      robot.current.position.y =
        Math.sin(t * 1.5) * 0.06;
    }

    // Natural head movement
    if (head.current) {
      head.current.rotation.y =
        Math.sin(t * 0.9) * 0.12;

      head.current.rotation.z =
        Math.sin(t * 1.2) * 0.025;
    }

    // Left hand waving animation
    if (wavingArm.current) {
      wavingArm.current.rotation.z =
        -2.35 + Math.sin(t * 5) * 0.16;
    }

    // Keep wrist straight
    if (wrist.current) {
      wrist.current.rotation.z = 0;
    }

   // Gentle smile animation
if (mouth.current) {
  mouth.current.scale.y =
    1 + Math.sin(t * 2) * 0.06;
}
  });

  return (
    <Float
      speed={1.5}
      rotationIntensity={0.04}
      floatIntensity={0.15}
    >
      <group
        ref={robot}
        position={[-0.25, -0.75, 0]}
      >

        {/* ROBOT HEAD */}
        <group ref={head} position={[0, 1.65, 0]}>

          {/* Round white head */}
          <mesh scale={[0.95, 0.88, 0.58]}>
            <sphereGeometry args={[1, 64, 64]} />
            <meshStandardMaterial
              color="#F4F7FF"
              metalness={0.25}
              roughness={0.22}
            />
          </mesh>

          {/* Black face screen */}
          <RoundedBox
            args={[1.3, 0.82, 0.06]}
            radius={0.3}
            smoothness={12}
            position={[0, 0, 0.62]}
          >
            <meshStandardMaterial
              color="#061329"
              roughness={0.15}
              metalness={0.2}
            />
          </RoundedBox>

          {/* Left glowing eye */}
          <mesh position={[-0.34, 0.15, 0.76]}>
            <sphereGeometry args={[0.105, 32, 32]} />
            <meshBasicMaterial color="#65FFFF" />
          </mesh>

          {/* Right glowing eye */}
          <mesh position={[0.34, 0.15, 0.76]}>
            <sphereGeometry args={[0.105, 32, 32]} />
            <meshBasicMaterial color="#65FFFF" />
          </mesh>

          {/* Eye glow */}
          <pointLight
            position={[-0.34, 0.15, 0.95]}
            color="#00FFFF"
            intensity={0.5}
            distance={0.5}
          />

          <pointLight
            position={[0.34, 0.15, 0.95]}
            color="#00FFFF"
            intensity={0.5}
            distance={0.5}
          />

          {/* Animated smiling mouth */}
          <mesh
            ref={mouth}
            position={[0, -0.20, 0.76]}
            rotation={[0, 0, Math.PI]}
          >
            <torusGeometry
  args={[0.10, 0.018, 16, 40, Math.PI]}
/>
            <meshBasicMaterial color="#00F5D4" />
          </mesh>

          {/* Blue headphone band */}
          <mesh position={[0, 0.48, 0]}>
            <torusGeometry
              args={[0.72, 0.065, 16, 64, Math.PI]}
            />
            <meshStandardMaterial
              color="#514CFF"
              metalness={0.7}
              roughness={0.2}
            />
          </mesh>

          {/* Headphone sides */}
          {[-1, 1].map((side) => (
            <group
              key={side}
              position={[side * 0.85, 0, 0]}
            >
              <RoundedBox
                args={[0.22, 0.55, 0.3]}
                radius={0.09}
              >
                <meshStandardMaterial color="#277BFF" />
              </RoundedBox>

              <mesh position={[0, 0, 0.17]}>
                <cylinderGeometry
                  args={[0.12, 0.12, 0.04, 32]}
                />
                <meshStandardMaterial
                  color="#25D9FF"
                  emissive="#087DFF"
                />
              </mesh>
            </group>
          ))}
        </group>

        {/* ROBOT BODY */}
        <group position={[0, 0.25, 0]}>
          <RoundedBox
            args={[1.25, 1.35, 0.8]}
            radius={0.38}
            smoothness={10}
          >
            <meshStandardMaterial
              color="#F2F5FC"
              metalness={0.25}
              roughness={0.3}
            />
          </RoundedBox>

          {/* Chest glowing circle */}
          <mesh position={[0, 0.25, 0.42]}>
            <cylinderGeometry
              args={[0.19, 0.19, 0.06, 40]}
            />
            <meshStandardMaterial color="#514CFF" />
          </mesh>

          <mesh position={[0, 0.25, 0.47]}>
            <sphereGeometry args={[0.105, 32, 32]} />
            <meshStandardMaterial
              color="#2BF5FF"
              emissive="#00AFFF"
              emissiveIntensity={2.5}
            />
          </mesh>
        </group>

        {/* RIGHT ARM - RELAXED */}
        <group
          position={[0.68, 0.55, 0]}
          rotation={[0, 0, 0.25]}
        >
          <mesh position={[0, -0.28, 0]}>
            <capsuleGeometry args={[0.12, 0.42, 8, 16]} />
            <meshStandardMaterial color="#F1F4FC" />
          </mesh>

          <mesh position={[0, -0.57, 0]}>
            <sphereGeometry args={[0.16, 24, 24]} />
            <meshStandardMaterial color="#E7ECF8" />
          </mesh>
        </group>

        {/* LEFT ARM - HELLO WAVE */}
        <group
          ref={wavingArm}
          position={[-0.68, 0.65, 0]}
        >
          <mesh position={[0, -0.28, 0]}>
            <capsuleGeometry args={[0.12, 0.42, 8, 16]} />
            <meshStandardMaterial color="#F1F4FC" />
          </mesh>

          <mesh position={[0, -0.55, 0]}>
            <sphereGeometry args={[0.15, 24, 24]} />
            <meshStandardMaterial color="#E5EAF7" />
          </mesh>

          {/* Wrist */}
          <group ref={wrist} position={[0, -0.62, 0]}>
            <mesh position={[0, -0.15, 0]}>
              <sphereGeometry args={[0.19, 24, 24]} />
              <meshStandardMaterial color="#F5F7FF" />
            </mesh>

            {/* Fingers */}
            {[-0.13, -0.04, 0.05, 0.14].map((x) => (
              <mesh
                key={x}
                position={[x, -0.27, 0]}
              >
                <capsuleGeometry args={[0.045, 0.13, 6, 12]} />
                <meshStandardMaterial color="#F5F7FF" />
              </mesh>
            ))}
          </group>
        </group>

        {/* ROBOT LEGS */}
        {[-0.32, 0.32].map((x) => (
          <group key={x} position={[x, -0.55, 0]}>
            <mesh position={[0, -0.23, 0]}>
              <capsuleGeometry args={[0.13, 0.38, 8, 16]} />
              <meshStandardMaterial color="#DCE5F8" />
            </mesh>

            <RoundedBox
              args={[0.38, 0.2, 0.5]}
              radius={0.09}
              position={[0, -0.52, 0.1]}
            >
              <meshStandardMaterial color="#514CFF" />
            </RoundedBox>
          </group>
        ))}
      </group>
    </Float>
  );
}

// MAIN ROBOT ASSISTANT
export default function RobotAssistant() {
  return (
    <div className="robot-assistant">

      {/* 3D ROBOT STAGE */}
      <div className="robot-stage">
        <Canvas
          camera={{
            position: [0, 0.9, 8.5],
            fov: 45
          }}
          dpr={[1, 1.5]}
        >
          <ambientLight intensity={1.8} />

          <directionalLight
            position={[3, 5, 5]}
            intensity={2.5}
          />

          <pointLight
            position={[-3, 2, 3]}
            intensity={2}
            color="#258BFF"
          />

          <pointLight
            position={[3, -2, 2]}
            intensity={1.5}
            color="#514CFF"
          />

          <RobotModel />
        </Canvas>
      </div>

      {/* ANIMATED SPEECH BUBBLE */}
      <SpeechBubble />

      {/* ROBOT STATUS */}
      <div className="robot-caption">
        <span className="robot-status-dot" />
        YOUR AI SECURITY ASSISTANT
      </div>

    </div>
  );
}
