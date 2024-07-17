// switch camera when multiple cameras for url #mycameraname

xrf.addEventListener('navigateLoaded', (opts) => {
  // select active camera if any
  let {id,match,v,THREE} = opts
  let envmap  = {}
  let current = ''

  // Recursive function to traverse the graph
  function traverseAndSetEnvMap(node, closestAncestorMaterialMap = null) {
      // Check if the current node has a material
      if (node.isMesh && node.material) {
          if (node.material.map && closestAncestorMaterialMap) {
              // If the node has a material map, set the closest ancestor material map
              node.material.envMap = closestAncestorMaterialMap;
          }
      }

      // Update the closest ancestor's material map
      if (node.isMesh && node.material && node.material.map) {
        closestAncestorMaterialMap = node.material.map.clone();
        closestAncestorMaterialMap.mapping = xrf.THREE.EquirectangularReflectionMapping;
        closestAncestorMaterialMap.needsUpdate = true
      }

      // Recursively traverse all children
      node.children.forEach(child => traverseAndSetEnvMap(child, closestAncestorMaterialMap));
  }

  // Start traversal from the root node
  traverseAndSetEnvMap(xrf.scene);
})
