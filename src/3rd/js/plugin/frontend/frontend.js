// this has some overlap with $menu.js
// frontend serves as a basis for shared functions (download, share e.g.)

window.frontend = (opts) => new Proxy({

  html: `
    <div id="topbar" class="xrf">
      <div class="logo" ></div>
      <button id="navback"  onclick="history.back()">&#8249;</button>
      <button id="navforward" onclick="history.forward()">&#8250;</button>
      <input id="load" type="submit" value="load 3D file"></input>
      <input type="text" id="uri" value="" onchange="AFRAME.XRF.navigator.to( $('#uri').value )" style="display:none"/>
    </div>
  `,
  el:   null,
  notify_links: true,
  plugin: {},
  xrf,

  // this SUPER-emit forwards custom events to all objects supporting dispatchEvent
  // perfect to broadcast events simultaniously to document + 3D scene
  emit(k,v){
    v = v || {event:k}
    for( let i in opts ){
      if( opts[i].dispatchEvent ){
        if( opts.debug ) console.log(`${i}.emit(${k},{...})`)
        opts[i].dispatchEvent( new CustomEvent(k,{detail:v}) )
      }
    }
  },

  init(){

    // setup element and delegate events
    this.el = document.createElement("div")
    this.el.innerHTML = this.html
    document.body.appendChild(this.el);
    (['click']).map( (e) => this.el.addEventListener(e, (ev) => this[e] && this[e](ev.target.id,ev) ) )

    this
    .setupFileLoaders()
    .setupIframeUrlHandler()
    .setupCapture()
    .setupUserHints()
    .setupNetworkListeners()
    .hidetopbarWhenMenuCollapse()
    .hideUIWhenNavigating()

    window.notify   = this.notify
    setTimeout( () => {
      document.dispatchEvent( new CustomEvent("frontend:ready", {detail:opts} ) )
    },1)
    return this
  },

  click(id,ev){
    switch( id ){
      case "load": this.fileLoaders()
    }
  },

  setupFileLoaders(){
    // enable user-uploaded asset files (activated by load button)
    this.fileLoaders = this.loadFile({
      ".gltf": (file) => file.arrayBuffer().then( (data) => xrf.navigator.to(file.name,null, (new xrf.loaders.gltf()), data) ),
      ".glb":  (file) => file.arrayBuffer().then( (data) => xrf.navigator.to(file.name,null, (new xrf.loaders.gltf()), data) )
    })
    return this
  },

  setupIframeUrlHandler(){
    // allow iframe to open url
    window.addEventListener('message', (event) => {
      if (event.data && event.data.url) {
        window.open(event.data.url, '_blank');
      }
    });
    return this
  },

  setupCapture(){
    // add screenshot component with camera to capture bigger size equirects
    // document.querySelector('a-scene').components.screenshot.capture('perspective')
    $('a-scene').setAttribute("screenshot",{camera: "[camera]",width: 4096*2, height:2048*2})
    return this
  },

  setupUserHints(){
    // notify navigation + href mouseovers to user
    setTimeout( () => {
      window.notify('loading '+document.location.search.substr(1))

      setTimeout( () => {
        let instructions = AFRAME.utils.device.isMobile() 
                           ? "hold 2-3 fingers to move forward/backward" 
                           :  "use W A S D keys and mouse-drag to move around"
        window.notify(instructions,{timeout:false})
        xrf.addEventListener('pos', (opts) => {
          let pos = opts.frag.pos.string 
          window.notify('<b class="badge">teleporting</b> to <b>'+pos+"</b><br>use back/forward (browserbutton) to undo")
        }) // close dialogs when url changes
      },2000 )

      xrf.addEventListener('href', (data) => {
        if( !data.selected  ) return


        let html     = this.notify_links ? `<b class="badge">${data.mesh.isSRC && !data.mesh.portal ? 'src' : 'href'}</b>${ data.xrf ? data.xrf.string : data.mesh.userData.src}<br>` : ''
        let metadata = data.mesh.userData
        let meta     = xrf.Parser.getMetaData()

        let hasMeta = false
        for ( let label in meta ) {
          let fields = meta[label]
          for ( let i = 0; i < fields.length;i++ ) {
            let field = fields[i]
            if( metadata[field] ){
              hasMeta = true
              html += `<br><b style="min-width:110px;display:inline-block">${label}:</b> ${metadata[field]}\n`
              break
            }
          }
        }
        let root = data.mesh.portal ? data.mesh.portal.stencilObject : data.mesh
        let transcript = xrf.sceneToTranscript(root,data.mesh)
        if( transcript.length ) html += `<br><b>transcript:</b><br><div class="transcript">${transcript}</div>`
        if (hasMeta && !data.mesh.portal && metadata.XRF.src ) html += `<br><br><a class="btn" style="float:right" onclick="xrf.navigator.to('${data.mesh.userData.href}')">Visit embedded scene</a>`
        if( !html ) return 
    
        window.notify(html,{timeout: 7000 * (hasMeta ? 1.5 : 1) })
      })

    },100)
    return this
  },

  setupNetworkListeners(){

    document.addEventListener('network.connect',    (e) => {
      window.notify("🪐 connecting to awesomeness..")
      $chat.send({message:`🪐 connecting to awesomeness..`,class:['info'], timeout:5000})
    })

    document.addEventListener('network.connected',    (e) => {
      window.notify("🪐 connected to awesomeness..")
      $chat.visibleChatbar = true
      $chat.send({message:`🎉 ${e.detail.plugin.profile.name||''} connected!`,class:['info'], timeout:5000})
    })

    document.addEventListener('network.disconnect', () => {
      window.notify("🪐 disconnecting..")
    })

    document.addEventListener('network.info',    (e) => {
      window.notify(e.detail.message)
      $chat.send({...e.detail, class:['info'], timeout:5000})
    })

    document.addEventListener('network.error',    (e) => {
      window.notify(e.detail.message)
      $chat.send({...e.detail, class:['info'], timeout:5000})
    })

    return this
  },

  hidetopbarWhenMenuCollapse(){
    // hide topbar when menu collapse button is pressed
    document.addEventListener('$menu:collapse', (e) => this.el.querySelector("#topbar").style.display = e.detail === true ? 'block' : 'none')
    return this
  },

  hideUIWhenNavigating(){
    // hide ui when user is navigating the scene using mouse/touch
    let showUI = (show) => (e) => {
      let isChatMsg        = e.target.closest('.msg')
      let isChatLine       = e.target.id == 'chatline'
      let isChatEmptySpace = e.target.id == 'messages'
      let isUI             = e.target.closest('.ui')      || 
                             e.target.closest('.btn')     ||
                             e.target.closest('button')   ||
                             e.target.closest('textarea') ||
                             e.target.closest('input')    ||
                             e.target.closest('a')
      //console.dir({class: e.target.className, id: e.target.id, isChatMsg,isChatLine,isChatEmptySpace,isUI, tagName: e.target.tagName})
      if( isUI ) return 
      if( show ){
        if( typeof $chat != 'undefined' ) $chat.visible = true
      }else{
        if( typeof $chat != 'undefined' ) $chat.visible = false
        $menu.toggle(false)
      }
      return true
    }
    document.addEventListener('mousedown',  showUI(false) )
    document.addEventListener('mouseup',    showUI(true)  )
    document.addEventListener('touchstart', showUI(false) )
    document.addEventListener('touchend',   showUI(true)  )
  },

  loadFile(contentLoaders, multiple){
    return () => {
      window.notify("if you're on Meta browser, file-uploads might be disabled")
      let input = document.createElement('input');
      input.type = 'file';
      input.multiple = multiple;
      input.accept = Object.keys(contentLoaders).join(",");
      input.onchange = () => {
          let files = Array.from(input.files);
          let file = files.slice ? files[0] : files
          for( var i in contentLoaders ){
            let r = new RegExp('\\'+i+'$')
            if( file.name.match(r) ){
              xrf.navigator.URI.file = '' // bypass cached file (easy refresh same file for testing)
              return contentLoaders[i](file)
            }
          }
          alert(file.name+" is not supported")
      };
      input.click();
    }
  },

  notify(_str,opts){
      if( window.accessibility && window.accessibility.enabled ) return $chat.send({message:_str,class:['info']})
      opts = opts || {status:'info'}
      opts = Object.assign({ status, timeout:4000 },opts)
      opts.message = _str
      if( typeof str == 'string' ){
        str = _str.replace(/(^\w+):/,"<div class='badge'>\$1</div>")
        if( !opts.status ){
          if( str.match(/error/g)   ) opts.status = "danger"
          if( str.match(/warning/g) ) opts.status = "warning"
        }
        opts.message = str
      }
      window.SnackBar( opts )
      opts.message = typeof _str == 'string' ? _str : _str.innerText
      window.frontend.emit("notify",opts)
  },

  download(){

    function download(dataurl, filename) {
      var a = document.createElement("a");
      a.href = URL.createObjectURL( new Blob([dataurl]) );
      a.setAttribute("download", filename);
      a.click();
      return false;
    }

    function exportScene(model,ext,file){
      document.dispatchEvent( new CustomEvent('frontend.export',{detail:{ scene: model.scene,ext}}) )
      xrf.emit('export', {scene: model.scene, ext})
      .then( () => {
        // setup exporters
        let defaultExporter = THREE.GLTFExporter
        xrf.loaders['gltf'].exporter    = defaultExporter
        xrf.loaders['glb'].exporter     = defaultExporter
        const exporter = new THREE.GLTFExporter() 
        exporter.parse(
          model.scene,
          function ( glb   ) { download(glb, `${file}`) },    // ready
          function ( error ) { console.error(error) },   // error
          {
            binary:true, 
            onlyVisible: false, 
            animations: model.animations,
            includeCustomExtensions: true,
            trs:true
          } 
        );
      })      
    }

    // load original scene and overwrite with updates
    let url = document.location.search.replace(/\?/,'')
    let {urlObj,dir,file,hash,ext} = xrf.navigator.origin = xrf.URI.parse(url)
    const Loader = xrf.loaders[ext]
    loader = new Loader().setPath( dir )
    notify('exporting scene<br><br>please wait..')
    loader.load(url, (model) => {
      exportScene(model,ext,file)
    })
  },

  updateHashPosition(randomize){
    const pos = xrf.frag.pos.get()
    xrf.navigator.updateHash.active = false // prevent teleport
    xrf.navigator.URI.hash.pos = `${pos.x},${pos.y},${pos.z}`
    document.location.hash = `#${xrf.navigator.URI.fragment}`
    xrf.navigator.updateHash.active = true
    return document.location.href
  },

  copyToClipboard(text){
    // copy url to clipboard
    var dummy = document.createElement('input')
    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand('copy');
    document.body.removeChild(dummy);
  },

  share(opts){
    opts = opts || {notify:true,qr:true,share:true,linkonly:false}
    if( network.meetingLink && !xrf.navigator.URI.hash.meet ){
      xrf.navigator.URI.hash.meet = network.meetingLink
    }
    let url = frontend.updateHashPosition()
    console.log(url)
    if( opts.linkonly ) return url
    this.copyToClipboard( url )
    // End of *TODO*
    if( opts.notify ){
      window.notify(`<h2>${ network.connected ? 'Meeting link ' : 'Link'} copied to clipboard!</h2>
        Now share it with your friends ❤️<br>
        <canvas id="qrcode" width="121" height="121"></canvas><br>
        <button onclick="frontend.download()"><i class="gg-software-download"></i>&nbsp;&nbsp;&nbsp;download scene file</button> <br>
        <button onclick="alert('this might take a while'); $('a-scene').components.screenshot.capture('equirectangular')"><i class="gg-image"></i>&nbsp;&nbsp;download 360 screenshot</button> <br>
        <a class="btn" target="_blank" href="https://github.com/coderofsalvation/xrfragment-helloworld"><i class="gg-serverless"></i>&nbsp;&nbsp;&nbsp;clone & selfhost this experience</a><br>
        To embed this experience in your blog,<br>
        copy/paste the following into your HTML:<br><input type="text" value="&lt;iframe src='${document.location.href}'&gt;&lt;/iframe&gt;" id="share"/>
        <br>
        <br>
      `,{timeout:false})
    }
    // draw QR code
    if( opts.qr ){
      setTimeout( () => {
        let QR  = window.QR
        QR.canvas = document.getElementById('qrcode')
        QR.draw( url, QR.canvas )
      },1)
    }
    // mobile share
    if( opts.share && typeof navigator.share != 'undefined'){
      navigator.share({
        url,
        title: 'your meeting link'
      })
    }
    $menu.collapse = true
  }

},
{
  // auto-trigger events on changes
  get(me,k,receiver){ return me[k] },
  set(me,k,v){
    let from   = me[k]
    me[k] = v
    switch( k ){
      case "logo":       $logo.style.backgroundImage = `url(${v})`;          break;
      default:           me.emit(`me.${k}.change`, {from,to:v}); break;
    }
  }
})

frontend = frontend({xrf,document}).init()
