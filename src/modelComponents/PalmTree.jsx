
import { useGLTF } from "@react-three/drei";

export function PalmTree(props) {
  const { nodes, materials } = useGLTF("./Palm_Tree_Low.gltf");
  return (
    <group {...props} dispose={null}>
      <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Coconut_02.geometry}
          material={materials.Palm}
          scale={3}
        />
      </group>
    </group>
  );
}

export default PalmTree;

useGLTF.preload("/Palm_Tree_Low.gltf");


