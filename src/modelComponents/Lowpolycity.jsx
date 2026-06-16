import { useGLTF } from "@react-three/drei";

const Lowpolycity = () => {
  const model = useGLTF("./low_poly_city/scene.gltf");


  model.scene.traverse( function( node ) {
    if ( node.isMesh ) { 
      node.castShadow = true; 
      if ( node.name.startsWith("pPlane11") ) {
        node.visible = false;
      }
    }
  } );

  // model.scene.traverse(function (node) {
  //   if (node.isMesh) {
  //     node.castShadow = true;
  //   }
  // });
  return (
    <mesh  castShadow scale={[200, 200, 200]}>
      <primitive object={model.scene} />
    </mesh>
  );
};

export default Lowpolycity;
