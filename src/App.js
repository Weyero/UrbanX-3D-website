import * as THREE from 'three'
import { useLayoutEffect, useRef, useState, useEffect } from 'react'
import { Canvas, applyProps, useFrame } from '@react-three/fiber'
import { useAnimations } from '@react-three/drei';
import { PerformanceMonitor, AccumulativeShadows, RandomizedLight, Environment, Lightformer, Float, useGLTF } from '@react-three/drei'
import { LayerMaterial, Color, Depth } from 'lamina'

export function App() {
  const [degraded, degrade] = useState(false)
  return (
    <Canvas shadows camera={{ position: [5, 0, 15], fov: 50 }}>
      <spotLight position={[0, 15, 0]} angle={0.3} penumbra={1} castShadow intensity={2} shadow-bias={-0.0001} />
      <ambientLight intensity={0.5} />
      <Porsche scale={1.6} position={[-0.5, -1.15, 0]} rotation={[0, -1.5, 0]} />
      <AccumulativeShadows position={[0, -1.16, 0]} frames={100} alphaTest={0.9} scale={10}>
        <RandomizedLight amount={8} radius={10} ambient={0.5} position={[1, 5, -1]} />
      </AccumulativeShadows>
      {/** PerfMon will detect performance issues */}
      <PerformanceMonitor onDecline={() => degrade(true)} />
      {/* Renders contents "live" into a HDRI environment (scene.environment). */}
      <Environment frames={degraded ? 1 : Infinity} resolution={256} background blur={1}>
        <Lightformers />
      </Environment>

      <CameraRig />

    </Canvas>
  )
}

function Porsche(props) {
  const { scene, nodes, materials, animations } = useGLTF('/scene.glb')
  const { actions } = useAnimations(animations, scene);
  useLayoutEffect(() => {
    Object.values(nodes).forEach((node) => node.isMesh && (node.receiveShadow = node.castShadow = true))

    applyProps(materials.rubber, { color: '#222', roughness: 0.6, roughnessMap: null, normalScale: [4, 4] })
    applyProps(materials.window, { color: 'black', roughness: 0, clearcoat: 0.1 })
    applyProps(materials.coat, { envMapIntensity: 4, roughness: 0.5, metalness: 1 })
    applyProps(materials.paint, { envMapIntensity: 2, roughness: 0.45, metalness: 0.8, color: '#555' })
  }, [nodes, materials])
  useEffect(() => {
    if (actions) {
      Object.values(actions).forEach((action) => action.stop()); // Остановить все анимации
      const firstAnimation = Object.keys(actions)[0]; // Берём первую анимацию
      if (firstAnimation) {
        actions[firstAnimation].play(); // Запускаем её
      }
    }
  }, [actions]);
  return <primitive object={scene} {...props} />
}

function CameraRig() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  // Обработчик движения мыши
  const handleMouseMove = (event) => {
    const { innerWidth, innerHeight } = window;
    setMouse({
      x: (event.clientX / innerWidth) * 2 - 1, // Нормализуем в диапазон [-1, 1]
      y: -(event.clientY / innerHeight) * 2 + 1,
    });
  };

  // Подписка на событие мыши
  useState(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Анимация камеры
  useFrame((state) => {
    state.camera.position.x = mouse.x * 2; // Двигаем камеру влево/вправо
    state.camera.position.y = mouse.y * 1; // Двигаем камеру вверх/вниз
    state.camera.lookAt(0, 0, 0); // Камера всегда смотрит в центр
  });

  return null;
}

function Lightformers({ positions = [2, 0, 2, 0, 2, 0, 2, 0] }) {
  const group = useRef()
  useFrame((state, delta) => (group.current.position.z += delta * 10) > 20 && (group.current.position.z = -60))
  return (
    <>
      {/* Ceiling */}
      <Lightformer intensity={0.75} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[10, 10, 1]} />
      <group rotation={[0, 0.5, 0]}>
        <group ref={group}>
          {positions.map((x, i) => (
            <Lightformer key={i} form="circle" intensity={2} rotation={[Math.PI / 2, 0, 0]} position={[x, 4, i * 4]} scale={[3, 1, 1]} />
          ))}
        </group>
      </group>
      {/* Sides */}
      <Lightformer intensity={4} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[20, 0.1, 1]} />
      <Lightformer rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={[20, 0.5, 1]} />
      <Lightformer rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={[20, 1, 1]} />
      {/* Accent (red) */}
      <Float speed={5} floatIntensity={2} rotationIntensity={2}>
        <Lightformer form="ring" color="red" intensity={1} scale={10} position={[-15, 4, -18]} target={[0, 0, 0]} />
      </Float>
      {/* Background */}
      <mesh scale={100}>
        <sphereGeometry args={[1, 64, 64]} />
        <LayerMaterial side={THREE.BackSide}>
          <Color color="#444" alpha={1} mode="normal" />
          <Depth colorA="black" colorB="black" alpha={0.5} mode="normal" near={0} far={300} origin={[100, 100, 100]} />
        </LayerMaterial>
      </mesh>
    </>
  )
}
