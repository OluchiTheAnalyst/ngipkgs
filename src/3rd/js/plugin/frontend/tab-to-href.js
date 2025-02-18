
window.hrefCycle = (e) => {
  if( !xrf || !xrf.scene || e.key != "Tab" && e.key != "Enter" ) return
  console.log("ja")

  let subScene = xrf.scene.getObjectByName( xrf.frag.pos.last )
  if( !subScene ) subScene = xrf.scene 
  let cache = window.hrefCycle.cache  = window.hrefCycle.cache || {current: -1}
  let objects = []
  subScene.traverse( (n) => (n.userData.href || n.userData['aria-description']) && objects.push(n) )
  
  const highlight = (n) => {
    if( this.helper){
      if( this.helper.selected == n.uuid ) return // already selected
      xrf.scene.remove(this.helper)
    }
    this.selected = n
    this.helper = new THREE.BoxHelper( n, 0xFF00FF )
    this.helper.computeLineDistances()
    this.helper.material.linewidth = 8
    this.helper.material.color     = xrf.focusLine.material.color
    this.helper.material.dashSize  = xrf.focusLine.material.dashSize
    this.helper.material.gapSize   = xrf.focusLine.material.gapSize  
    this.helper.selected = n.uuid
    xrf.scene.add(this.helper)

    const isAction = n.userData.href

    if( typeof notify != 'undefined'){
      notify(`${n.userData['aria-description']||''}` + (n.userData.href ? `<br><b>name:</b> ${n.name}<br><b>href:</b> ${n.userData['href']}` :'') )
    }
    if( typeof term != 'undefined'){
      term.send(`\n\r${isAction?'press enter for option ':''}${n.userData['aria-description']||n.userData['aria-label']||n.name}`)
    }
  }

  if( e.key == 'Enter' && objects[cache.current]?.userData.href ){
    xrf.navigator.to( objects[cache.current].userData.href )
  }

  // increment to next
  cache.current = (cache.current + 1) % objects.length

  if( e.key == 'Tab'){
    highlight( objects[cache.current] )
  }

  e.preventDefault()
  return false
}

window.addEventListener('keydown', window.hrefCycle )
