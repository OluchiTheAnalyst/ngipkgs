xrf.sceneToTranscript = (scene, node, currentPosition ) => {
  let items = []
  scene = currentPosition && xrf.frag.pos.last ? xrf.scene.getObjectByName(xrf.frag.pos.last) : (scene || xrf.scene)
  scene.traverse( (n) => {
    let isSRC = false
    n.traverseAncestors( (m) => m.userData.src ? isSRC = true : false )
    if( !isSRC && n.userData['aria-description'] && (!node || n.uuid != node.uuid) ){
      items.push({name: n.name, description: n.userData['aria-description']})
    }
  })
  return items
}

xrf.listExits = (scene, currentPosition ) => {
  let destinations = []
  scene = currentPosition && xrf.frag.pos.last ? xrf.scene.getObjectByName(xrf.frag.pos.last) : scene || xrf.scene
  scene.traverse( (n) => {
    if( n.userData && n.userData.href && n.userData.href.match(/pos=/) ){
      destinations.push({name: n.name, destination: n.userData['aria-label'] || n.userData.href})
    }
  })
  return destinations
}
