xrfragment.xrf.pos = function(v, opts){
  let { mesh, model, camera, scene, renderer, THREE} = opts
  console.log("   └ setting camera position to "+v.string)
  camera.position.x = v.x
  camera.position.y = v.y
  camera.position.z = v.z
}
