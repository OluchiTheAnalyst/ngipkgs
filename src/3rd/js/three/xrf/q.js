// spec: https://xrfragment.org/#queries

xrf.frag.q = function(v, opts){
  let { frag, mesh, model, camera, scene, renderer, THREE} = opts
  console.log("   └ running query ")
  let qobjs = Object.keys(v.query)

  // convience function for other fragments (which apply to the query)
  frag.q.getObjects = () => {
    let objs = []
    scene.traverse( (o) => {
      for ( let name in v.query ) {
        let qobj = v.query[name];
        if( qobj.class && o.userData.class && o.userData.class == name ) objs.push(o)
        else if( qobj.id && o.name == name ) objs.push(o)
      }
    })
    return objs.filter( (o) => o ) // return and filter out empty
               .map( (o) => {
                 if( !o.positionOriginal ) o.positionOriginal = o.position.clone() 
                 return o
               })
  }
  xrf.frag.q.filter(scene,frag) // spec : https://xrfragment.org/#queries
}

xrf.frag.q.filter = function(scene,frag){
  // spec: https://xrfragment.org/#queries
  let q = frag.q.query 
  scene.traverse( (mesh) => {
    for ( let i in q ) {
      let isMeshId       = q[i].id    != undefined 
      let isMeshClass    = q[i].class != undefined 
      let isMeshProperty = q[i].rules != undefined && q[i].rules.length && !isMeshId && !isMeshClass 
      if( q[i].root && mesh.isSRC ) continue;  // ignore nested object for root-items (queryseletor '/foo' e.g.)
      if( isMeshId       && i == mesh.name           ) mesh.visible = q[i].id 
      if( isMeshClass    && i == mesh.userData.class ) mesh.visible = q[i].class
      if( isMeshProperty && mesh.userData[i]         ) mesh.visible = (new xrf.Query(frag.q.string)).testProperty(i,mesh.userData[i])
    }
  })
}
