xrf.addEventListener('eval', (opts) => {
  let { frag, mesh, model, camera, scene, renderer, THREE} = opts
  if( frag.bg ){
    console.log("└ bg "+v.x+","+v.y+","+v.z);
    if( scene.background ) delete scene.background
    scene.background = new THREE.Color( v.x, v.y, v.z )
  }
})
