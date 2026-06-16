import {
  Canvas,
  extend,
  useThree,
  useLoader,
  useFrame,
} from "@react-three/fiber";
import * as THREE from "three";
import { useRef, useMemo, useEffect, useState } from "react";
import Lowpolycity from "./modelComponents/lowpolycity";
import {
  ScrollControls,
  OrbitControls,
  useScroll,
  Plane,
  SpotLight,
  Stars,
} from "@react-three/drei";
import { getProject, val } from "@theatre/core";

import {
  SheetProvider,
  PerspectiveCamera,
  useCurrentSheet,
} from "@theatre/r3f";
import flythroughstate from "./FlyThroughstate.json";
import {
  EffectComposer,
  Noise,
} from "@react-three/postprocessing";
import { Water } from "three-stdlib";



extend({ Water });

function App() {
  const [orbitEnabled, setOrbitEnabled] = useState(false);
  const sheet = getProject("Fly Through", { state: flythroughstate }).sheet(
    "Scene"
  );
  // const sheet = getProject("Fly Through").sheet("Scene");

  function Ocean() {
    const ref = useRef();
    const gl = useThree((state) => state.gl);
    const waterNormals = useLoader(THREE.TextureLoader, "/waternormals.jpeg");
    waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;
    const position = [0, 0.3, -40];
    const geom = useMemo(() => new THREE.PlaneGeometry(40, 150, 10, 1), []);
    const config = useMemo(
      () => ({
        textureWidth: 512,
        textureHeight: 512,
        waterNormals,
        sunDirection: new THREE.Vector3(),
        sunColor: 0xffffff,
        waterColor: 0xff2000,
        distortionScale: 10,
        fog: false,
        format: gl.encoding,
      }),
      [waterNormals, gl.encoding]
    );
    useFrame(
      (state, delta) => (ref.current.material.uniforms.time.value += delta)
    );
    return (
      <water
        ref={ref}
        args={[geom, config]}
        rotation-x={-Math.PI / 2}
        position={position}
      />
    );
  }

  return (
    <>
      <div className="canvas-container">
        <Canvas shadows gl={{ preserveDrawingBuffer: true }}>
          <ScrollControls pages={50} damping={2} maxSpeed={0.04}>
            <SheetProvider sheet={sheet}>
              {/* <Environment /> */}
              <Ocean />
              <Plane
                receiveShadow
                args={[1000, 1000]}
                rotation={[-Math.PI / 2, 0, 0]}
                position={[0, 0, 0]}
                material-color="#050505"
              />
              <Scene orbitEnabled={orbitEnabled} />
              <CameraController orbitEnabled={orbitEnabled} />
            </SheetProvider>
          </ScrollControls>
          {/* <OrbitControls /> */}
          {/* <Clouds material={THREE.MeshLambertMaterial} limit={400}>
            <Cloud
              growth={100}
              speed={0.04}
              bounds={300}
              seed={2}
              position={[50, 100, -12]}
              volume={200}
            />
          </Clouds> */}
          <Stars
            radius={100}
            depth={20}
            count={1000}
            factor={2}
            fade={true}
            speed={1.5}
          />
          <EffectComposer>
            {/* <DepthOfField
              focusDistance={0}
              focalLength={0.2}
              bokehScale={3}
              height={480}
            /> */}
            {/* <Bloom
              luminanceThreshold={100}
              intensity={1}
              luminanceSmoothing={3}
              height={300}
            /> */}
            <Noise opacity={0.02} />
            {/* <Vignette eskil={false} offset={0.1} darkness={1} /> */}
          </EffectComposer>
        </Canvas>
      </div>

      <div className="ui-overlay">
        <button
          className={`control-btn ${orbitEnabled ? 'active' : ''}`}
          onClick={() => setOrbitEnabled(!orbitEnabled)}
        >
          {orbitEnabled ? (
            <>
              <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                <path d="M12 6v12M6 12h12" />
              </svg>
              <span>Back to Fly-Through</span>
            </>
          ) : (
            <>
              <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
              <span>Explore Environment</span>
            </>
          )}
        </button>

        {!orbitEnabled && (
          <div className="scroll-hint">
            <div className="mouse-wheel"></div>
            <span>Scroll to Fly Through</span>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
//
//

function Scene({ orbitEnabled }) {
  const sheet = useCurrentSheet();
  const scroll = useScroll();

  useEffect(() => {
    if (scroll?.el) {
      if (orbitEnabled) {
        scroll.el.style.overflowY = "hidden";
      } else {
        scroll.el.style.overflowY = "auto";
      }
    }
  }, [orbitEnabled, scroll]);

  useFrame(() => {
    if (orbitEnabled) return;
    // the length of our sequence
    const sequenceLength = val(sheet.sequence.pointer.length);
    // update the "position" of the playhead in the sequence, as a fraction of its whole length
    sheet.sequence.position = scroll.offset * sequenceLength;
  });

  const spotlightTargetRef = useRef(new THREE.Object3D());
  spotlightTargetRef.current.position.set(59, 0, -15.6);

  const spotlightTargetRef1 = useRef(new THREE.Object3D());
  spotlightTargetRef1.current.position.set(59, 0, 62);

  const spotlightTargetRef2 = useRef(new THREE.Object3D());
  spotlightTargetRef2.current.position.set(74.5, 0, 22.5);

  const spotlightTargetRef3 = useRef(new THREE.Object3D());
  spotlightTargetRef3.current.position.set(-86, 0, 65);

  const spotlightTargetRef4 = useRef(new THREE.Object3D());
  spotlightTargetRef4.current.position.set(-23.5, 0, 65);

  const bgColor = "#050505";

  return (
    <>
      <color attach="background" args={[bgColor]} />

      <fog attach="fog" color={bgColor} near={-10} far={200} />
      <ambientLight intensity={0.25} color="#ffffff" />
      {/* <directionalLight position={[-5, 5, -5]} intensity={5} /> */}
      <SpotLight
        color={"#ffcc00"}
        intensity={100}
        position={[59, 13.3, -15.5]}
        angle={Math.PI / 0.12}
        penumbra={1}
        delay={10}
        distance={700}
        target={spotlightTargetRef.current}
        castShadow
      />

      <SpotLight
        color={"#ffcc00"}
        intensity={100}
        position={[59, 13.3, 62.1]}
        angle={Math.PI / 0.12}
        penumbra={1}

        distance={700}
        target={spotlightTargetRef1.current}
        castShadow
      />

      <SpotLight
        color={"#ffcc00"}
        intensity={100}
        position={[74.5, 13.3, 22.45]}
        angle={Math.PI / 0.12}
        penumbra={1}
        distance={700}
        target={spotlightTargetRef2.current}
        castShadow
      />

      <SpotLight
        color={"#ffcc00"}
        intensity={100}
        position={[-85.8, 13.3, 64.8]}
        angle={Math.PI / 0.12}
        penumbra={1}
        distance={700}
        target={spotlightTargetRef3.current}
        castShadow
      />

      <SpotLight
        color={"#ffcc00"}
        intensity={100}
        position={[-23.54, 13.3, 64.8]}
        angle={Math.PI / 0.12}
        penumbra={1}
        distance={700}
        target={spotlightTargetRef4.current}
        castShadow
      />

      <primitive object={spotlightTargetRef} />
      <mesh position={spotlightTargetRef.current.position} />

      <primitive object={spotlightTargetRef1} />
      <mesh position={spotlightTargetRef1.current.position} />

      <primitive object={spotlightTargetRef2} />
      <mesh position={spotlightTargetRef2.current.position} />

      <primitive object={spotlightTargetRef3} />
      <mesh position={spotlightTargetRef3.current.position} />

      <primitive object={spotlightTargetRef4} />
      <mesh position={spotlightTargetRef4.current.position} />



      <Lowpolycity castShadow />
      {/* <Environment files={"./Noight_4k.exr"} background/> */}
      <directionalLight castShadow position={[-30, 10, 0]} intensity={0.09} />

      {!orbitEnabled && (
        <PerspectiveCamera
          theatreKey="Camera"
          makeDefault
          position={[0, 0, 0]}
          fov={1000}
          near={0.1}
          far={100}
        />
      )}
    </>
  );
}

function CameraController({ orbitEnabled }) {
  const lastPosition = useRef(new THREE.Vector3());
  const lastRotation = useRef(new THREE.Euler());
  const lastTarget = useRef(new THREE.Vector3());

  useFrame((state) => {
    if (!orbitEnabled) {
      lastPosition.current.copy(state.camera.position);
      lastRotation.current.copy(state.camera.rotation);
      // Project a point 15 units in front of the camera for the orbit target
      const direction = new THREE.Vector3(0, 0, -15);
      direction.applyEuler(state.camera.rotation);
      lastTarget.current.copy(state.camera.position).add(direction);
    }
  });

  if (orbitEnabled) {
    return (
      <>
        <perspectiveCamera
          makeDefault
          position={[lastPosition.current.x, lastPosition.current.y, lastPosition.current.z]}
          rotation={[lastRotation.current.x, lastRotation.current.y, lastRotation.current.z]}
          fov={60}
          near={0.1}
          far={1000}
        />
        <OrbitControls
          enableDamping={true}
          dampingFactor={0.05}
          target={[lastTarget.current.x, lastTarget.current.y, lastTarget.current.z]}
        />
      </>
    );
  }

  return null;
}
