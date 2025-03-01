import * as THREE from 'three'
import './styles.css'; 
import { useLayoutEffect, useRef, useState, useEffect } from 'react'
import { Canvas, applyProps, useFrame } from '@react-three/fiber'
import { useAnimations } from '@react-three/drei';
import { PerformanceMonitor, AccumulativeShadows, RandomizedLight, Environment, Lightformer, Float, useGLTF, ScrollControls, useScroll, Scroll } from '@react-three/drei'
import { LayerMaterial, Color, Depth } from 'lamina'
import gsap from 'gsap';
import { OverlayUI } from './OverlayUI';


export function App() {
  const [degraded, setDegraded] = useState(false); // true/false as switch for bg animation
  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      <Canvas 
        shadows 
        style={{ backgroundColor: '#000000' }}
      >
        <spotLight position={[0, 15, 0]} angle={0.3} penumbra={1} castShadow intensity={2} shadow-bias={-0.0001} />
        <ambientLight intensity={0.5} />

        <Porsche scale={1} position={[-0.5, -1.15, 0]} rotation={[0, -1.5, 0]} />
        
        <AccumulativeShadows position={[0, -1.16, 0]} frames={100} alphaTest={0.9} scale={10}>
          <RandomizedLight amount={8} radius={10} ambient={0.5} position={[1, 5, -1]} />
        </AccumulativeShadows>

        {/** PerfMon will detect performance issues */}
        <PerformanceMonitor onDecline={() => degrade(true)} />
        
        {/* Renders contents "live" into a HDRI environment (scene.environment). */}
        <Environment frames={degraded ? 1 : Infinity} resolution={256} background={false} blur={0}>

          <color attach="background" args={["#000000"]} />
          <Lightformers />
        </Environment>
        
        <ScrollControls pages={10} damping={0.3}>
          <CameraRig />
        </ScrollControls>
      </Canvas>

      <OverlayUI />

    </div>
  );
}


function Porsche(props) {
  const { scene, nodes, materials, animations } = useGLTF('/scene.glb');
  const { actions } = useAnimations(animations, scene);

  useLayoutEffect(() => {
    Object.values(nodes).forEach((node) => {
      if (node.isMesh) {
        node.castShadow = true;
        node.receiveShadow = true;
        node.frustumCulled = false;
      }
    });

    applyProps(materials.rubber, { color: '#222', roughness: 0.6, roughnessMap: null, normalScale: [4, 4] });
    applyProps(materials.window, { color: 'black', roughness: 0, clearcoat: 0.1 });
    applyProps(materials.coat, { envMapIntensity: 4, roughness: 0.5, metalness: 1 });
    applyProps(materials.paint, { envMapIntensity: 2, roughness: 0.45, metalness: 0.8, color: '#555' });
  }, [nodes, materials]);

  useEffect(() => {
  if (!scene) return;

  const lights = scene.userData?.gltfExtensions?.KHR_lights_punctual?.lights || [];
  
  lights.forEach((lightData) => {
    let light;
    
    switch (lightData.type) {
      case 'point':
        light = new THREE.PointLight(lightData.color || 0xffffff, lightData.intensity || 1);
        break;
      case 'spot':
        light = new THREE.SpotLight(lightData.color || 0xffffff, lightData.intensity || 1);
        light.angle = lightData.spot?.outerConeAngle || Math.PI / 4;
        light.penumbra = lightData.spot?.innerConeAngle || 0.1;
        break;
      case 'directional':
        light = new THREE.DirectionalLight(lightData.color || 0xffffff, lightData.intensity || 1);
        break;
      default:
        return;
    }

    const node = scene.getObjectByName(lightData.name);
    if (node) {
      light.position.copy(node.position);
      scene.add(light);
    }
  });
  }, [scene]);

  useEffect(() => {
  if (actions) {
    Object.values(actions).forEach((action) => {
      action.reset().fadeIn(0.5).play();
    });
  }
  }, [actions]);
  return <primitive object={scene} {...props} />;
}


function CameraRig() {
  const cameraRef = useRef();
  const mouse = useRef({ x: 0, y: 0 });
  const scroll = useScroll();

  useEffect(() => {
    const handleMouseMove = (event) => {
      const { innerWidth, innerHeight } = window;
      mouse.current = {
        x: (event.clientX / innerWidth) * 2 - 1,
        y: -(event.clientY / innerHeight) * 2 + 1,
      };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state) => {
    // Позиции камеры
    const positions = [
      new THREE.Vector3(0.3, 0.15, 5), // Start - Side
      new THREE.Vector3(-10, 1, 0.5), // Front
      new THREE.Vector3(0.1, 5, 0), // Up
      new THREE.Vector3(0.1, 7, 0), // Up and Up again
      new THREE.Vector3(0.3, 0.15, 3.8) // Back to DEFAULT
    ];

    // Направления, куда должна смотреть камера
    const lookAtTargets = [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0.094, 0.1, -0.1), // Micro aligning - interpolation крякнуто :)
      new THREE.Vector3(0.094, 0.1, -0.1), // Micro aligning again
      new THREE.Vector3(0, 0, 0) // Back to default
    ];

    const sections = positions.length - 1; // Количество переходов
    const sectionIndex = Math.floor(scroll.offset * sections); // Определяем текущий переход (0, 1, 2 и т. д.)
    const localLerp = (scroll.offset * sections) % 1; // Локальный offset внутри одной секции

    // Интерполяция позиции камеры
    state.camera.position.lerpVectors(
      positions[sectionIndex], 
      positions[Math.min(sectionIndex + 1, positions.length - 1)], 
      localLerp
    );

    // Интерполяция поворота камеры (кватернионы)
    const startQuaternion = new THREE.Quaternion().setFromRotationMatrix(
      new THREE.Matrix4().lookAt(state.camera.position, lookAtTargets[sectionIndex], new THREE.Vector3(0, 1, 0))
    );

    const endQuaternion = new THREE.Quaternion().setFromRotationMatrix(
      new THREE.Matrix4().lookAt(state.camera.position, lookAtTargets[Math.min(sectionIndex + 1, lookAtTargets.length - 1)], new THREE.Vector3(0, 1, 0))
    );

    state.camera.quaternion.slerpQuaternions(startQuaternion, endQuaternion, localLerp);

    // Добавляем параллакс-эффект
    state.camera.position.x += (mouse.current.x - state.camera.position.x) * 0.3;
    state.camera.position.y += (mouse.current.y * 0.35 - state.camera.position.y) * 0.15;
  });

  return <group ref={cameraRef} />;
}


function Lightformers({ positions = [2, 0, 2, 0, 2, 0, 2, 0] }) {
  const group = useRef()
  useFrame((state, delta) => (group.current.position.z += delta * 10) > 24 && (group.current.position.z = -28))
  return (
    <>
      {/* Ceiling */}
      <Lightformer intensity={0.75} rotation-x={Math.PI / 2} position={[0, 5, -5]} scale={[10, 10, 1]} />
      <group rotation={[0, 0.3, 0]}>
        <group ref={group}>
          {positions.map((x, i) => (
            <Lightformer key={i} form="circle" intensity={1} rotation={[Math.PI / 2, 0, 0]} position={[x, 4, i * 3]} scale={[3, 1, 1]} />
          ))}
        </group>
      </group>
      
      {/* Sides */}
      <Lightformer intensity={4} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[20, 0.1, 1]} />
      <Lightformer rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={[20, 0.5, 1]} />
      <Lightformer rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={[20, 1, 1]} />
      
      {/* Accent (red) */}
      <Float speed={3.5} floatIntensity={2} rotationIntensity={3}>
        <Lightformer form="ring" color="red" intensity={1} scale={10} position={[-15, 4, -18]} target={[0, 0, 0]} />
      </Float>

      {/* Background */}
      <mesh scale={100}>
        <sphereGeometry args={[1, 64, 64]} />
        
        <LayerMaterial side={THREE.BackSide}>
          <Color color="#444" alpha={1} mode="normal" />
          /* change bg graytone with alpha below*/
          <Depth colorA="black" colorB="black" alpha={0} mode="normal" near={0} far={300} origin={[100, 100, 100]} />
        </LayerMaterial>
      </mesh>
    </>
  )
}