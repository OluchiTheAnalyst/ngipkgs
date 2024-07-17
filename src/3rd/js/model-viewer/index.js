const enableXRF = (mv) => {

  let opts = {
    arButton:   mv[getSymbol(mv,'arButtonContainer')],
    editButton: null, 
    mv
  }

  overrideARButton(opts)
  createEditButton(opts)

  console.dir(opts)
}

const overrideARButton = (opts) => {
  const arButton = opts.arButton.cloneNode(true)
  opts.arButton.parentNode.appendChild( arButton )
  opts.arButton.remove()
  opts.arButton = arButton
  opts.arButton.addEventListener('click', () => enableXRFViewer(opts.mv) )
}

const createEditButton = (opts) => {
  opts.editButton = opts.arButton.querySelector('a').cloneNode(true)
  opts.editButton.innerHTML = `
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M21.2635 2.29289C20.873 1.90237 20.2398 1.90237 19.8493 2.29289L18.9769 3.16525C17.8618 2.63254 16.4857 2.82801 15.5621 3.75165L4.95549 14.3582L10.6123 20.0151L21.2189 9.4085C22.1426 8.48486 22.338 7.1088 21.8053 5.99367L22.6777 5.12132C23.0682 4.7308 23.0682 4.09763 22.6777 3.70711L21.2635 2.29289ZM16.9955 10.8035L10.6123 17.1867L7.78392 14.3582L14.1671 7.9751L16.9955 10.8035ZM18.8138 8.98525L19.8047 7.99429C20.1953 7.60376 20.1953 6.9706 19.8047 6.58007L18.3905 5.16586C18 4.77534 17.3668 4.77534 16.9763 5.16586L15.9853 6.15683L18.8138 8.98525Z"
        fill="currentColor"
      />
      <path
        d="M2 22.9502L4.12171 15.1717L9.77817 20.8289L2 22.9502Z"
        fill="currentColor"
      />
    </svg>
  `
  opts.editButton.id = "edit-button"
  opts.editButton.style.bottom   = '16px'
  opts.editButton.style.left     = '16px'
  opts.editButton.style.color    = 'black'
  opts.editButton.style.position = 'absolute'
  opts.editButton.addEventListener('click', () => enableXRFViewer(opts) )
  opts.arButton.querySelector('a').parentNode.appendChild(opts.editButton)
}

function getSymbol(mv,name) {
  let obj = mv;
  do {
    const sym = Object.getOwnPropertySymbols(obj).find( (x) => x.description === name);
    if (sym) { return sym; }
  } while ((obj = Object.getPrototypeOf(obj)));
}

function enableXRFViewer(mv){
  const html = `
    <a-scene xr-mode-ui="XRMode: xr"  
             renderer="colorManagement: false; antialias:true; highRefreshRate:true; foveationLevel: 0.5; toneMapping: ACESFilmic; exposure: 3.0" 
             device-orientation-permission-ui
             light="defaultLightsEnabled: false" embedded>
      <a-entity id="player" movement-controls touch-controls wasd-controls="fly:false" look-controls="magicWindowTrackingEnabled:true">
        <a-entity camera="fov:90" position="0 1.6 0" id="camera"></a-entity>
        <a-entity id="left-hand" hand-tracking-grab-controls="hand:left;modelColor:#cccccc" raycaster="objects:.ray" blink-controls="cameraRig:#player; teleportOrigin: #camera; collisionEntities: .floor">
          <a-entity rotation="-35 0 0" position="0 0.1 0" id="navigator"> 
            <a-entity id="back" xrf-button="label: <; width:0.05; action: history.back()"    position="-0.025 0 0" class="ray"></a-entity>
            <a-entity id="next" xrf-button="label: >; width:0.05; action: history.forward()" position=" 0.025 0 0" class="ray"></a-entity>
          </a-entity>
        </a-entity>
        <a-entity id="right-hand" hand-tracking-grab-controls="hand:right;modelColor:#cccccc" laser-controls="hand: right" raycaster="objects:.ray" blink-controls="cameraRig:#player; teleportOrigin: #camera; collisionEntities: .floor" xrf-pinchmove="rig: #player"></a-entity>
      </a-entity>
      <a-entity id="home" xrf="${mv.getAttribute('xrf')}" xrf-menu></a-entity>
    </a-scene>
    <!-- important: allow touchevents in AR -->
    <style type="text/css">
      canvas.a-dom-overlay:not(.a-no-style) { padding: 0; pointer-events: auto; }
    </style>
  `
  mv.innerHTML += html
}

const mvs = [...document.querySelectorAll('model-viewer')]
mvs.map( (mv) => {
  mv.addEventListener('load', () => enableXRF(mv) ) 
  // prevent loading in model-viewer mode
  mv.setAttribute('xrf', mv.getAttribute('src') )
  mv.removeAttribute('src')
  enableXRFViewer(mv)
})
