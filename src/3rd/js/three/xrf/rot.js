xrf.frag.rot = function(v, opts){
  let { frag, mesh, model, camera, scene, renderer, THREE} = opts
  if( xrf.debug ) console.log("#rot.js: setting camera rotation to "+v.string)

  if( !camera || !scene ) return 

  if( !model.isSRC ){
    camera.rotation.set( 
      v.x * Math.PI / 180,
      v.y * Math.PI / 180,
      v.z * Math.PI / 180
    )
    camera.rotation.offset = camera.rotation.clone() // remember
    //camera.updateProjectionMatrix()
  }else{
    obj = model.scene.isReparented ? model.scene.children[0] : model.scene
    obj.rotation.set( 
      v.x * Math.PI / 180,
      v.y * Math.PI / 180,
      v.z * Math.PI / 180
    )
  }
}
