/*
 * v0.5.1 generated at Mon Dec 16 02:15:25 PM CET 2024
 * https://xrfragment.org
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
(function(){
// a portable snackbar

window.SnackBar = function(userOptions) {
    var snackbar = this || (window.snackbar = {});
    var _Interval;
    var _Message;
    var _Element;
    var _Container;
    
    var _OptionDefaults = {
        message: "Operation performed successfully.",
        dismissible: true,
        timeout: 7000,
        status: ""
    }
    var _Options = _OptionDefaults;

    function _Create() {
        _Container = document.querySelector(".js-snackbar-container") 
        if( _Container ){
          _Container.remove()
        }
        _Container = null

        if (!_Container) {
            // need to create a new container for notifications
            _Container = document.createElement("div");
            _Container.classList.add("js-snackbar-container");

            document.body.appendChild(_Container);
        }
        _Container.opts = _Options
        _Container.innerHTML = ''
        _Element = document.createElement("div");
        _Element.classList.add("js-snackbar__wrapper","xrf");

        let innerSnack = document.createElement("div");
        innerSnack.classList.add("js-snackbar", "js-snackbar--show");
    
        if (_Options.status) {
            _Options.status = _Options.status.toLowerCase().trim();

            let status = document.createElement("span");
            status.classList.add("js-snackbar__status");


            if (_Options.status === "success" || _Options.status === "green") {
                status.classList.add("js-snackbar--success");
            }
            else if (_Options.status === "warning" || _Options.status === "alert" || _Options.status === "orange") {
                status.classList.add("js-snackbar--warning");
            }
            else if (_Options.status === "danger" || _Options.status === "error" || _Options.status === "red") {
                status.classList.add("js-snackbar--danger");
            }
            else {
                status.classList.add("js-snackbar--info");
            }

            innerSnack.appendChild(status);
        }
        
        _Message = document.createElement("span");
        _Message.classList.add("js-snackbar__message");
        if( typeof _Options.message == 'string' ){
          _Message.innerHTML = _Options.message;
        }else _Message.appendChild(_Options.message)

        innerSnack.appendChild(_Message);

        if (_Options.dismissible) {
            let closeBtn = document.createElement("span");
            closeBtn.classList.add("js-snackbar__close");
            closeBtn.innerText = "\u00D7";

            closeBtn.onclick = snackbar.Close;

            innerSnack.appendChild(closeBtn);
        }

        _Element.style.height = "0px";
        _Element.style.opacity = "0";
        _Element.style.marginTop = "0px";
        _Element.style.marginBottom = "0px";

        _Element.appendChild(innerSnack);
        _Container.appendChild(_Element);

        if (_Options.timeout !== false) {
            _Interval = setTimeout(snackbar.Close, _Options.timeout);
        }
    }

    snackbar.Open = function() {
        let contentHeight = _Element.firstElementChild.scrollHeight; // get the height of the content

        _Element.style.height = contentHeight + "px";
        _Element.style.opacity = 1;
        _Element.style.marginTop = "5px";
        _Element.style.marginBottom = "5px";

        _Element.addEventListener("transitioned", function() {
            _Element.removeEventListener("transitioned", arguments.callee);
            _Element.style.height = null;
        })
    }

    snackbar.Close = function () {
        if (_Interval)
            clearInterval(_Interval);

        let snackbarHeight = _Element.scrollHeight; // get the auto height as a px value
        let snackbarTransitions = _Element.style.transition;
        _Element.style.transition = "";

        requestAnimationFrame(function() {
            _Element.style.height = snackbarHeight + "px"; // set the auto height to the px height
            _Element.style.opacity = 1;
            _Element.style.marginTop = "0px";
            _Element.style.marginBottom = "0px";
            _Element.style.transition = snackbarTransitions

            requestAnimationFrame(function() {
                _Element.style.height = "0px";
                _Element.style.opacity = 0;
            })
        });

        setTimeout(function() {
            try { 
              _Container.removeChild(_Element); 
            } catch (e) { }
        }, 1000);
        if( _Options.onclose ) _Options.onclose()

    };

    _Options = { ..._OptionDefaults, ...userOptions }
    _Create();
    if( userOptions ) snackbar.Open();
}

document.head.innerHTML += `
  <style type="text/css">

    .js-snackbar-container .btn,
    .js-snackbar-container input[type=submit],
    .js-snackbar-container button{
      margin-bottom:15px;
    }
    .js-snackbar-container {
        position: absolute;
        top: 10px;
        left: 0px;
        display: flex;
        align-items: center;
        width:100%;
        max-width: 100%;
        max-height: 33vh;
        padding: 10px;
        z-index:1001;
        justify-content: center;
        overflow: hidden;
    }

    .js-snackbar-container * {
        box-sizing: border-box;
    }

    .js-snackbar__wrapper {
      --color-c: #555;
      --color-a: #FFF;
    }


    .js-snackbar__wrapper {
        transition:1s;
        overflow: hidden;
        height: auto;
        margin: 5px 0;
        transition: all ease .5s;
        border-radius: 15px;
        box-shadow: 0 0 4px 0 var(--xrf-box-shadow);
        right: 20px;
        position: fixed;
        max-width:500px;
        top: 18px;
    }

    .js-snackbar {
        display: inline-flex;
        box-sizing: border-box;
        border-radius: 3px;
        color: var(--color-c);
        background-color: var(--color-a);
        vertical-align: bottom;
    }

    .js-snackbar__close,
    .js-snackbar__status,
    .js-snackbar__message {
        position: relative;
    }

    .js-snackbar__message {
      margin: 12px;
    }

    .js-snackbar__status {
        display: none;
        width: 15px;
        margin-right: 5px;
        border-radius: 3px 0 0 3px;
        background-color: transparent;
    }

     .js-snackbar__status.js-snackbar--success,
     .js-snackbar__status.js-snackbar--warning,
     .js-snackbar__status.js-snackbar--danger,
     .js-snackbar__status.js-snackbar--info {
        display: block;
    }

    .js-snackbar__status.js-snackbar--success  {
        background-color: #4caf50;
    }

    .js-snackbar__status.js-snackbar--warning  {
        background-color: #ff9800;
    }

     .js-snackbar__status.js-snackbar--danger {
        background-color: #ff6060;
    }

    .js-snackbar__status.js-snackbar--info {
        background-color: #CCC;
    }

    .js-snackbar__close {
        cursor: pointer;
        display: flex;
        align-items: top;
        padding: 8px 13px 0px 0px;
        user-select: none;
    }

    .js-snackbar__close:hover {
        background-color: #4443;
    }
  </style>
`
window.accessibility = (opts) => new Proxy({
  opts,

  enabled: false,

  // features
  speak_teleports: true,
  speak_keyboard: false,

  // audio settings
  speak_rate: 1,
  speak_pitch: 1,
  speak_volume: 1,
  speak_voice: -1,
  speak_voices: 0,

  toggle(){ this.enabled = !this.enabled },

  settings(){
    this.toggle() // *TODO* should show settings screen 
  },

  speak(str, opts){
    opts = opts || {speaksigns:true}
    if( !this.enabled || !str) return
    if( opts.speaksigns ){
      str = str.replace(/\/\//,' ')
               .replace(/:/,'')
               .replace(/\//,' slash ')
               .replace(/\./,' dot ')
               .replace(/#/,' hash ')
               .replace(/&/,' and ')
               .replace(/=/,' is ')
    }
    if( str == this.speak.lastStr ) return // no duplicates
    this.speak.lastStr = str
    let speech = window.speechSynthesis
    let utterance = new SpeechSynthesisUtterance( str )
    this.speak_voices = speech.getVoices().length
    if( this.speak_voice != -1 && this.speak_voice < this.speak_voices ){
      utterance.voice  = speech.getVoices()[ this.speak_voice ];
    }else{
      let voices = speech.getVoices()
      for(let i = 0; i < voices.length; i++ ){
        if( voices[i].lang == navigator.lang ) this.speak_voice = i;
      }
    }
    utterance.rate   = this.speak_rate
    utterance.pitch  = this.speak_pitch
    utterance.volume = this.speak_volume
    if( opts.override ) speech.cancel() 
    speech.speak(utterance)
  },

  init(){

    this
    .speakArrowKeys()
    .setupListeners()
    .setupPersistance()
    .setupHrefCycling()
    .setupSpeechKillOnEscape()

    setTimeout( () => this.initCommands(), 200 )
  },

  speakArrowKeys(){
    // speak arrow keys
    window.addEventListener('keydown', (e) => {
      if( !this.speak_keyboard ) return
      let k = e.key
      switch(k){
        case "ArrowUp":    k = "forward";  break;
        case "ArrowLeft":  k = "left";     break;
        case "ArrowRight": k = "right";    break;
        case "ArrowDown":  k = "backward"; break;
      } 
      this.speak(k,{override:true})
    })
    return this
  },

  setupSpeechKillOnEscape(){
    window.addEventListener('keydown', (e) => {
      if( e.key == "Escape" ){ 
        this.speak("stop",{override:true})
      }
    })
  },

  setupHrefCycling(){
    // speak arrow keys
    window.addEventListener('keydown', (e) => {
      if( e.key != "Tab" && e.key != "Enter" ) return
      let subScene = xrf.scene.getObjectByName( xrf.frag.pos.last )
      if( !subScene ) subScene = xrf.scene 
      let cache = this.setupHrefCycling.cache  = this.setupHrefCycling.cache || {current: -1}
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

        notify(`${n.userData['aria-description']||''}` + (n.userData.href ? `<br><b>name:</b> ${n.name}<br><b>href:</b> ${n.userData['href']}` :'') )
      }

      if( e.key == 'Enter' && objects[cache.current].userData.href ){
        xrf.navigator.to( objects[cache.current].userData.href )
      }

      // increment to next
      cache.current = (cache.current + 1) % objects.length

      if( e.key == 'Tab'){
        highlight( objects[cache.current] )
      }

      e.preventDefault()
      return false
    })
    return this
  },

  setupListeners(){

    document.addEventListener('$menu:buttons:render', (e) => {
      let $    = e.detail
      let a = [...$.querySelectorAll('a')]
      // make sure anchor buttons are accessible by tabbing to them 
      a.map( (btn) => {
        if( !btn.href ) btn.setAttribute("href","javascript:void(0)") // important!
        btn.setAttribute("aria-label","button")
      })
      document.addEventListener('mouseover', (e) => {
        if( e.target.getAttribute("aria-title") ){
          let lines = []
          lines.push( e.target.getAttribute("aria-title") )
          lines.push( e.target.getAttribute("aria-description") )
          lines = lines.filter( (l) => l )
          this.speak( lines.join("."), {override:true,speaksigns:false} )
        }
      })
      document.addEventListener('$chat.send', (opts) => {
        if( opts.detail.message ) this.speak( opts.detail.message)
      })
    })

    document.addEventListener('network.send', (e) => {
      let opts = e.detail
      opts.message = opts.message || ''
      this.speak(opts.message)
    })

    opts.xrf.addEventListener('pos', (opts) => {
      if( this.enabled && this.speak_teleports ){
        network.send({message: this.posToMessage(opts), class:["info","guide"]})
      }
      if( opts.frag.pos.string.match(/,/) ){
        network.pos = opts.frag.pos.string
      }else{
        network.posName = opts.frag.pos.string
      }
    })
    return this 
  },

  setupPersistance(){
    // auto-enable if previously enabled
    if( window.localStorage.getItem("accessibility") === 'true' || xrf.navigator.URI.XRF.accessible ){
      setTimeout( () => {
        this.enabled = true
        this.setFontSize()
      }, 100 )
    }
    return this
  },

  initCommands(){

    document.addEventListener('chat.command.help', (e) => {
      e.detail.message += `<br><b class="badge">&lt;Escape&gt;</b> silence TTS `
      e.detail.message += `<br><b class="badge">&lt;Tab&gt;</b> cycle [href] buttons / silence TTS `
      e.detail.message += `<br><b class="badge">/fontsize &lt;number&gt;</b> set fontsize (default=14) `
    })

    document.addEventListener('chat.command', (e) => {
      if( e.detail.message.match(/^fontsize/) ){
        try{
          let fontsize = parseInt( e.detail.message.replace(/^fontsize /,'').trim() )
          if( fontsize == NaN ) throw 'not a number'
          this.setFontSize(fontsize)
          $chat.send({message:'fontsize set to '+fontsize})
        }catch(e){
          console.error(e)
          $chat.send({message:'example usage: /fontsize 20'})
        }
      }
    })

  },

  setFontSize(size){
    if( size ){
      window.localStorage.setItem("fontsize",size)
    }else size = window.localStorage.getItem("fontsize")
    if( !size ) return 
    document.head.innerHTML += `
      <style type="text/css">
        .accessibility #messages * {
          font-size: ${size}px !important;
          line-height: ${size*2}px !important;
        }
      </style>
    `
    $messages = document.querySelector('#messages')
    setTimeout( () => $messages.scrollTop = $messages.scrollHeight, 1000 )
  },

  posToMessage(opts){
    let obj
    let description
    let msg = "teleported to "
    let pos = opts.frag.pos
    if( pos.string.match(',') ) msg += `coordinates <a href="#pos=${pos.string}">${pos.string}</a>`
    else{
      msg += `location <a href="#pos=${pos.string}">${pos.string}</a>`
      obj = opts.scene.getObjectByName(pos.string)
      if( obj ){
        description = obj.userData['aria-label'] || ''
      }else msg += ", but the teleportation was refused because it cannot be found within this world"      
    } 
    return msg
  },

  sanitizeTranscript(){
    return $chat.$messages.innerText
           .replaceAll("<[^>]*>", "") // strip html
           .split('\n')
           .map( (l) => String(l+'.').replace(/(^|:|;|!|\?|\.)\.$/g,'\$1') ) // add dot if needed
           .join('\n')
  }

},
{ 
  // auto-trigger events on changes 
  get(data,k,receiver){ return data[k] },
  set(data,k,v){ 
    data[k] = v 
    switch( k ){
      case "enabled": {
                        let message = "accessibility mode has been "+(v?"activated":"disabled")+".<br>Type /help for help."
                        $('#accessibility.btn').style.filter= v ? 'brightness(1.0)' : 'brightness(0.5)'
                        if( v ) $chat.visible = true
                        $chat.send({message,class:['info']})
                        data.enabled = true
                        data.speak(message)
                        data.enabled = v
                        window.localStorage.setItem("accessibility", v)
                        $chat.$messages.classList[ v ? 'add' : 'remove' ]('guide')
                        document.body.classList.toggle(['accessibility'])
                        if( !data.readTranscript && (data.readTranscript = true) ){
                          data.speak( data.sanitizeTranscript() )
                        }
                      }
    }
  }
})

document.addEventListener('$menu:ready', (e) => {
  try{
    accessibility = accessibility(e.detail) 
    accessibility.init()
    document.dispatchEvent( new CustomEvent("accessibility:ready", e ) )
    $menu.buttons = $menu.buttons.concat([`<a class="btn" style="background:var(--xrf-dark-gray);filter: brightness(0.5);" aria-label="button" aria-description="enable all accessibility features" id="accessibility" onclick="accessibility.settings()"><i class="gg-yinyang"></i>accessibility</a><br>`])
  }catch(e){console.error(e)}
})

document.querySelector('head').innerHTML += `
  <style type="text/css"> 
    .accessibility #messages * {
      font-size:20px !important;
      line-height:35px;
    }
    .accessibility #messages .msg.self {
      background:var(--xrf-gray);
      color:#FFF;
    }
    .accessibility #messages .msg.info,
    .accessibility #messages .msg.self {
      line-height:unset;
      padding-top:15px;
      padding-bottom:15px;
    }
    .accessibility #chatbar{
      display: block !important;
    }
    .accessibility #chatsend{
      display: block !important;
    }
    .accessibility #chatline {
      text-indent:25px;
    }
  </style>
`

// reactive component for displaying the menu 
menuComponent = (el) => new Proxy({

  html: `
    <div class="xrf footer">
      <div class="menu">
        <div id="buttons"></div>
        <a class="btn" id="more" aria-title="menu button"><i id="icon" class="gg-menu"></i></a><br>
      </div>
    </div>
  `,

  collapsed:    false,
  logo:       './../../assets/logo.png',
  buttons:    [`<a class="btn" aria-label="button" aria-title="share button" aria-description="this allows embedding and sharing of this URL or make a screenshot of it"  id="share"   onclick="frontend.share()"><i class="gg-link"></i>&nbsp;share</a><br>`],
  $buttons:   $buttons = el.querySelector('#buttons'),
  $btnMore:   $btnMore = el.querySelector('#more'),

  toggle(state){   
    this.collapsed = state !== undefined ? state : !this.collapsed 
    el.querySelector("i#icon").className = this.collapsed ? 'gg-close' : 'gg-menu'
    document.body.classList[ this.collapsed ? 'add' : 'remove' ](['menu'])
  },

  init(opts){
    el.innerHTML = this.html
    document.body.appendChild(el);
    (['click']).map( (e) => el.addEventListener(e, (ev) => this[e] && this[e](ev.target.id,ev) ) )
    setTimeout( () => {
      document.dispatchEvent( new CustomEvent("$menu:ready", {detail: {$menu:this,xrf}}) )
    },100)
    return this
  },

  click(id,e){
    switch(id){
      case "icon":
      case "more": return this.toggle(); break;
    }
    this.toggle(false)
  }
},
{

  get(me,k,v){ return me[k] },

  set(me,k,v){ 
    me[k] = v    
    switch( k ){
      case "buttons":    el.querySelector("#buttons").innerHTML = this.renderButtons(me); 
                         document.dispatchEvent( new CustomEvent("$menu:buttons:render", {detail: el.querySelector('.menu') }) )
                         break;
      case "collapsed":  
                         el.querySelector("#buttons").style.display = me.collapsed ? 'block' : 'none'
                         frontend.emit('$menu:collapse', v)
                         break;
    }
  },

  renderButtons: (data) => `${data.buttons.join('')}`

})

// reactify component!
document.addEventListener('frontend:ready', (e) => {
  window.$menu = menuComponent( document.createElement('div') ).init(e.detail)
})
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


        let topic    = data.xrf ? data.xrf.string : data.mesh.userData.src
        if( topic.match(/\.\.\//) || (topic.length > 20 && AFRAME.utils.device.isMobile() ) ){
          topic = topic.replace(/.*\//,'')
        }

        let html     = this.notify_links ? `<b class="badge">${data.mesh.isSRC && !data.mesh.portal ? 'src' : 'href'}</b>${ topic }<br>` : ''
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
        if( !xrf.loaders['gltf'].exporter ) xrf.loaders['gltf'].exporter = defaultExporter
        if( !xrf.loaders['glb'].exporter  ) xrf.loaders['glb'].exporter  = defaultExporter
        const exporter = new xrf.loaders[ext]()
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
    let {urlObj,dir,file,hash,fileExt} = xrf.navigator.origin = xrf.URI.parse(url)
    debugger
    const Loader = xrf.loaders[fileExt]
    loader = new Loader().setPath( dir )
    notify('exporting scene<br><br>please wait..')
    loader.load(url, (model) => {
      exportScene(model,fileExt,file)
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
// this allows surfing to a href by typing its node-name 

// help screen
document.addEventListener('chat.command.help', (e) => {
  e.detail.message += `
    <br><b class="badge">&lt;destinationname&gt;</b> surf to a destination
  ` 
})
        
document.addEventListener('chat.input', (e) => {

  let name = e.detail.message.trim()
  xrf.scene.traverse( (n) => {
    if( n.userData && n.userData.href && n.userData.href.match(/pos=/) && n.name == name ){
      $chat.send({message:'<b class="badge">activating</b> '+n.name, class:['self','info']})
      xrf.navigator.to( n.userData.href )
    }
  })

})
// this allows a more-or-less MUD type interface
//
//


// help screen
document.addEventListener('chat.command.help', (e) => {
  e.detail.message += `
    <br><b class="badge">?</b> help screen
    <br><b class="badge">look</b> view scene and destinations 
    <br><b class="badge">go [left|right|forward|destination]</b> surf [to destination]
    <br><b class="badge">do [action]</b> list [or perform] action(s)
    <br><b class="badge">rotate &lt;left|right|up|down&gt;</b> rotate camera
    <br><b class="badge">back</b> go to previous portal/link 
    <br><b class="badge">forward</b> go to previous portal/link 
    <br><b class="badge">#....</b> execute XR Fragments 
    <hr/>
  ` 
})

const listExits = (scene) => {
  let message = ''
  let destinations = {}
  scene.traverse( (n) => {
    if( n.userData && n.userData.href && n.userData.href.match(/pos=/) ){
      destinations[n.name] = n.userData['aria-label'] || n.userData.href
    } 
  })
  for( let destination in destinations ){
    message += `<br><b class="badge">${destination}</b> ${destinations[destination]}`
  }
  if( !message ) message += '<br>type <b class="badge">back</b> to go back'
  return message
}

const listActions = (scene) => {
  let message = ''
  let destinations = {}
  scene.traverse( (n) => {
    if( n.userData && n.userData.href && !n.userData.href.match(/pos=/) ){
      destinations[n.name] = n.userData['aria-description'] || n.userData['aria-label'] || n.userData.href
    } 
  })
  for( let destination in destinations ){
    message += `<br><b class="badge">${destination}</b> ${destinations[destination]}`
  }
  if( !message ) message += '<br>no actions found'
  return message
}

document.addEventListener('chat.input', (e) => {

  if( e.detail.message.trim() == '?' ){
    document.dispatchEvent( new CustomEvent( 'chat.command', {detail:{message:"help"}} ) )
    e.detail.halt = true // don't send to other peers 
  }

  if( e.detail.message.trim() == 'look' ){
    let scene   = xrf.frag.pos.last ? xrf.scene.getObjectByName(xrf.frag.pos.last)  : xrf.scene
    let message = `<div class="transcript">${xrf.sceneToTranscript(scene)}</div><br>possible destinations in this area:${listExits(scene)}`
    e.detail.halt = true // dont print command to screen
    $chat.send({message})
  }

  if( e.detail.message.match(/^go($| )/) ){
    if( e.detail.message.trim() == 'go' ){
      $chat.send({message: `all possible destinations:${listExits(xrf.scene)}`})
    }else{
      let destination = e.detail.message.replace(/^go /,'').trim()
      if( destination.match(/(left|right|forward|backward)/) ){
        let key = ''
        switch( destination){
          case "left":     key = 'ArrowLeft';    break;
          case "right":    key = 'ArrowRight';   break;
          case "forward":  key = 'ArrowUp';      break;
          case "backward": key = 'ArrowDown';    break;
        }
        if( key ){
          let lookcontrols = document.querySelector('[look-controls]')
          if( lookcontrols ) lookcontrols.removeAttribute('look-controls') // workaround to unlock camera

          var wasd = document.querySelector('[wasd-controls]').components['wasd-controls']
          wasd.keys[ key ] = true
          wasd.velocity = new THREE.Vector3()
          setTimeout( () => delete wasd.keys[ key ], 100 )
          wasd.el.object3D.matrixAutoUpdate = true;
          wasd.el.object3D.updateMatrix()
          xrf.camera.getCam().updateMatrix() 
        }
        
      }else{
        let node
        xrf.scene.traverse( (n) => {
          if( n.userData && n.userData.href && n.name == destination ) node = n
        })
        if( node ) xrf.navigator.to( node.userData.href )
        else $chat.send({message:"type 'look' for possible destinations"})
      }
    }
    e.detail.halt = true // dont write input to chat
  }

  if( e.detail.message.match(/^do($| )/) ){
    if( e.detail.message.trim() == 'do' ){
      $chat.send({message: `all possible actions:${listActions(xrf.scene)}`})
    }else{
      let action = e.detail.message.replace(/^do /,'').trim()
      xrf.scene.traverse( (n) => {
        if( n.userData && n.userData.href && n.name == action ){
          $chat.send({message:'<b class="badge">activating</b> '+n.name, class:['self','info']})
          xrf.navigator.to( n.userData.href )
        }
      })
    }
    e.detail.halt = true // dont write input to chat
  }

  if( e.detail.message.match(/^rotate /) ){
    let dir = e.detail.message.replace(/^rotate /,'').trim()
    let y = 0;
    let x = 0;
    switch(dir){
      case "left":  y =  0.3; break;
      case "right": y = -0.3; break;
      case "up":    x =  0.3; break;
      case "down":  x = -0.3; break;
    }
    let lookcontrols = document.querySelector('[look-controls]')
    if( lookcontrols ) lookcontrols.removeAttribute('look-controls') // workaround to unlock camera
    xrf.camera.rotation.y += y
    xrf.camera.rotation.x += x
    xrf.camera.matrixAutoUpdate = true
    e.detail.halt = true // dont write input to chat
  }

  if( e.detail.message.trim() == 'back' ){
    window.history.back()
  }

  if( e.detail.message.trim() == 'forward' ){
    window.history.forward()
  }

})
// this allows surfing to a href by typing its node-name 

// help screen
document.addEventListener('chat.command.help', (e) => {
  e.detail.message += `
    <br><b class="badge">/speak_keyboard &lt;true|false&gt;</b> turn on/off keyboard input TTS
    <br><b class="badge">/speak_teleports &lt;true|false&gt;</b> turn on/off TTS for teleports
    <br><b class="badge">/speak_rate &lt;1&gt;</b> adjust TTS speed
    <br><b class="badge">/speak_pitch &lt;1&gt;</b> adjust TTS pitch
    <br><b class="badge">/speak_volume &lt;1&gt;</b> adjust TTS volume
    <br><b class="badge">/speak_voice &lt;0&gt;</b> select voice (max: ${window.accessibility.speak_voices})
  ` 
})
        
document.addEventListener('chat.command', (e) => {
  if( !e.detail.message.trim().match(/ /) ) return 
  let action = e.detail.message.trim().split(" ")[0]
  let value  = e.detail.message.trim().split(" ")[1]

  if( window.accessibility[action] == undefined ) return

  window.accessibility[action] = value
  window.localStorage.setItem(action, value )
  $chat.send({message: `${action} set to ${value}`, class:['info']})

})
// original site - https://github.com/mrturck/aframe-joystick
// modified

// copy of nippleJS library
!function(t){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var e;e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,e.nipplejs=t()}}(function(){function t(){}function e(t,i){return this.identifier=i.identifier,this.position=i.position,this.frontPosition=i.frontPosition,this.collection=t,this.defaults={size:100,threshold:.1,color:"white",fadeTime:250,dataOnly:!1,restJoystick:!0,restOpacity:.5,mode:"dynamic",zone:document.body},this.config(i),"dynamic"===this.options.mode&&(this.options.restOpacity=0),this.id=e.id,e.id+=1,this.buildEl().stylize(),this.instance={el:this.ui.el,on:this.on.bind(this),off:this.off.bind(this),show:this.show.bind(this),hide:this.hide.bind(this),add:this.addToDom.bind(this),remove:this.removeFromDom.bind(this),destroy:this.destroy.bind(this),resetDirection:this.resetDirection.bind(this),computeDirection:this.computeDirection.bind(this),trigger:this.trigger.bind(this),position:this.position,frontPosition:this.frontPosition,ui:this.ui,identifier:this.identifier,id:this.id,options:this.options},this.instance}function i(t,e){var n=this;return n.nipples=[],n.idles=[],n.actives=[],n.ids=[],n.pressureIntervals={},n.manager=t,n.id=i.id,i.id+=1,n.defaults={zone:document.body,multitouch:!1,maxNumberOfNipples:10,mode:"dynamic",position:{top:0,left:0},catchDistance:200,size:100,threshold:.1,color:"white",fadeTime:250,dataOnly:!1,restJoystick:!0,restOpacity:.5},n.config(e),"static"!==n.options.mode&&"semi"!==n.options.mode||(n.options.multitouch=!1),n.options.multitouch||(n.options.maxNumberOfNipples=1),n.updateBox(),n.prepareNipples(),n.bindings(),n.begin(),n.nipples}function n(t){var e=this;e.ids={},e.index=0,e.collections=[],e.config(t),e.prepareCollections();var i;return c.bindEvt(window,"resize",function(t){clearTimeout(i),i=setTimeout(function(){var t,i=c.getScroll();e.collections.forEach(function(e){e.forEach(function(e){t=e.el.getBoundingClientRect(),e.position={x:i.x+t.left,y:i.y+t.top}})})},100)}),e.collections}var o,r=!!("ontouchstart"in window),s=!!window.PointerEvent,d=!!window.MSPointerEvent,a={touch:{start:"touchstart",move:"touchmove",end:"touchend, touchcancel"},mouse:{start:"mousedown",move:"mousemove",end:"mouseup"},pointer:{start:"pointerdown",move:"pointermove",end:"pointerup"},MSPointer:{start:"MSPointerDown",move:"MSPointerMove",end:"MSPointerUp"}},p={};s?o=a.pointer:d?o=a.MSPointer:r?(o=a.touch,p=a.mouse):o=a.mouse;var c={};c.distance=function(t,e){var i=e.x-t.x,n=e.y-t.y;return Math.sqrt(i*i+n*n)},c.angle=function(t,e){var i=e.x-t.x,n=e.y-t.y;return c.degrees(Math.atan2(n,i))},c.findCoord=function(t,e,i){var n={x:0,y:0};return i=c.radians(i),n.x=t.x-e*Math.cos(i),n.y=t.y-e*Math.sin(i),n},c.radians=function(t){return t*(Math.PI/180)},c.degrees=function(t){return t*(180/Math.PI)},c.bindEvt=function(t,e,i){for(var n,o=e.split(/[ ,]+/g),r=0;r<o.length;r+=1)n=o[r],t.addEventListener?t.addEventListener(n,i,!1):t.attachEvent&&t.attachEvent(n,i)},c.unbindEvt=function(t,e,i){for(var n,o=e.split(/[ ,]+/g),r=0;r<o.length;r+=1)n=o[r],t.removeEventListener?t.removeEventListener(n,i):t.detachEvent&&t.detachEvent(n,i)},c.trigger=function(t,e,i){var n=new CustomEvent(e,i);t.dispatchEvent(n)},c.prepareEvent=function(t){return t.preventDefault(),t.type.match(/^touch/)?t.changedTouches:t},c.getScroll=function(){return{x:void 0!==window.pageXOffset?window.pageXOffset:(document.documentElement||document.body.parentNode||document.body).scrollLeft,y:void 0!==window.pageYOffset?window.pageYOffset:(document.documentElement||document.body.parentNode||document.body).scrollTop}},c.applyPosition=function(t,e){e.x&&e.y?(t.style.left=e.x+"px",t.style.top=e.y+"px"):(e.top||e.right||e.bottom||e.left)&&(t.style.top=e.top,t.style.right=e.right,t.style.bottom=e.bottom,t.style.left=e.left)},c.getTransitionStyle=function(t,e,i){var n=c.configStylePropertyObject(t);for(var o in n)if(n.hasOwnProperty(o))if("string"==typeof e)n[o]=e+" "+i;else{for(var r="",s=0,d=e.length;s<d;s+=1)r+=e[s]+" "+i+", ";n[o]=r.slice(0,-2)}return n},c.getVendorStyle=function(t,e){var i=c.configStylePropertyObject(t);for(var n in i)i.hasOwnProperty(n)&&(i[n]=e);return i},c.configStylePropertyObject=function(t){var e={};return e[t]="",["webkit","Moz","o"].forEach(function(i){e[i+t.charAt(0).toUpperCase()+t.slice(1)]=""}),e},c.extend=function(t,e){for(var i in e)e.hasOwnProperty(i)&&(t[i]=e[i]);return t},c.safeExtend=function(t,e){var i={};for(var n in t)t.hasOwnProperty(n)&&e.hasOwnProperty(n)?i[n]=e[n]:t.hasOwnProperty(n)&&(i[n]=t[n]);return i},c.map=function(t,e){if(t.length)for(var i=0,n=t.length;i<n;i+=1)e(t[i]);else e(t)},t.prototype.on=function(t,e){var i,n=this,o=t.split(/[ ,]+/g);n._handlers_=n._handlers_||{};for(var r=0;r<o.length;r+=1)i=o[r],n._handlers_[i]=n._handlers_[i]||[],n._handlers_[i].push(e);return n},t.prototype.off=function(t,e){var i=this;return i._handlers_=i._handlers_||{},void 0===t?i._handlers_={}:void 0===e?i._handlers_[t]=null:i._handlers_[t]&&i._handlers_[t].indexOf(e)>=0&&i._handlers_[t].splice(i._handlers_[t].indexOf(e),1),i},t.prototype.trigger=function(t,e){var i,n=this,o=t.split(/[ ,]+/g);n._handlers_=n._handlers_||{};for(var r=0;r<o.length;r+=1)i=o[r],n._handlers_[i]&&n._handlers_[i].length&&n._handlers_[i].forEach(function(t){t.call(n,{type:i,target:n},e)})},t.prototype.config=function(t){var e=this;e.options=e.defaults||{},t&&(e.options=c.safeExtend(e.options,t))},t.prototype.bindEvt=function(t,e){var i=this;return i._domHandlers_=i._domHandlers_||{},i._domHandlers_[e]=function(){"function"==typeof i["on"+e]?i["on"+e].apply(i,arguments):console.warn('[WARNING] : Missing "on'+e+'" handler.')},c.bindEvt(t,o[e],i._domHandlers_[e]),p[e]&&c.bindEvt(t,p[e],i._domHandlers_[e]),i},t.prototype.unbindEvt=function(t,e){var i=this;return i._domHandlers_=i._domHandlers_||{},c.unbindEvt(t,o[e],i._domHandlers_[e]),p[e]&&c.unbindEvt(t,p[e],i._domHandlers_[e]),delete i._domHandlers_[e],this},e.prototype=new t,e.constructor=e,e.id=0,e.prototype.buildEl=function(t){return this.ui={},this.options.dataOnly?this:(this.ui.el=document.createElement("div"),this.ui.back=document.createElement("div"),this.ui.front=document.createElement("div"),this.ui.el.className="nipple collection_"+this.collection.id,this.ui.back.className="back",this.ui.front.className="front",this.ui.el.setAttribute("id","nipple_"+this.collection.id+"_"+this.id),this.ui.el.appendChild(this.ui.back),this.ui.el.appendChild(this.ui.front),this)},e.prototype.stylize=function(){if(this.options.dataOnly)return this;var t=this.options.fadeTime+"ms",e=c.getVendorStyle("borderRadius","50%"),i=c.getTransitionStyle("transition","opacity",t),n={};return n.el={position:"absolute",opacity:this.options.restOpacity,display:"block",zIndex:999},n.back={position:"absolute",display:"block",width:this.options.size+"px",height:this.options.size+"px",marginLeft:-this.options.size/2+"px",marginTop:-this.options.size/2+"px",background:this.options.color,opacity:".5"},n.front={width:this.options.size/2+"px",height:this.options.size/2+"px",position:"absolute",display:"block",marginLeft:-this.options.size/4+"px",marginTop:-this.options.size/4+"px",background:this.options.color,opacity:".5"},c.extend(n.el,i),c.extend(n.back,e),c.extend(n.front,e),this.applyStyles(n),this},e.prototype.applyStyles=function(t){for(var e in this.ui)if(this.ui.hasOwnProperty(e))for(var i in t[e])this.ui[e].style[i]=t[e][i];return this},e.prototype.addToDom=function(){return this.options.dataOnly||document.body.contains(this.ui.el)?this:(this.options.zone.appendChild(this.ui.el),this)},e.prototype.removeFromDom=function(){return this.options.dataOnly||!document.body.contains(this.ui.el)?this:(this.options.zone.removeChild(this.ui.el),this)},e.prototype.destroy=function(){clearTimeout(this.removeTimeout),clearTimeout(this.showTimeout),clearTimeout(this.restTimeout),this.trigger("destroyed",this.instance),this.removeFromDom(),this.off()},e.prototype.show=function(t){var e=this;return e.options.dataOnly?e:(clearTimeout(e.removeTimeout),clearTimeout(e.showTimeout),clearTimeout(e.restTimeout),e.addToDom(),e.restCallback(),setTimeout(function(){e.ui.el.style.opacity=1},0),e.showTimeout=setTimeout(function(){e.trigger("shown",e.instance),"function"==typeof t&&t.call(this)},e.options.fadeTime),e)},e.prototype.hide=function(t){var e=this;return e.options.dataOnly?e:(e.ui.el.style.opacity=e.options.restOpacity,clearTimeout(e.removeTimeout),clearTimeout(e.showTimeout),clearTimeout(e.restTimeout),e.removeTimeout=setTimeout(function(){var i="dynamic"===e.options.mode?"none":"block";e.ui.el.style.display=i,"function"==typeof t&&t.call(e),e.trigger("hidden",e.instance)},e.options.fadeTime),e.options.restJoystick&&e.restPosition(),e)},e.prototype.restPosition=function(t){var e=this;e.frontPosition={x:0,y:0};var i=e.options.fadeTime+"ms",n={};n.front=c.getTransitionStyle("transition",["top","left"],i);var o={front:{}};o.front={left:e.frontPosition.x+"px",top:e.frontPosition.y+"px"},e.applyStyles(n),e.applyStyles(o),e.restTimeout=setTimeout(function(){"function"==typeof t&&t.call(e),e.restCallback()},e.options.fadeTime)},e.prototype.restCallback=function(){var t=this,e={};e.front=c.getTransitionStyle("transition","none",""),t.applyStyles(e),t.trigger("rested",t.instance)},e.prototype.resetDirection=function(){this.direction={x:!1,y:!1,angle:!1}},e.prototype.computeDirection=function(t){var e,i,n,o=t.angle.radian,r=Math.PI/4,s=Math.PI/2;if(e=o>r&&o<3*r?"up":o>-r&&o<=r?"left":o>3*-r&&o<=-r?"down":"right",i=o>-s&&o<s?"left":"right",n=o>0?"up":"down",t.force>this.options.threshold){var d={};for(var a in this.direction)this.direction.hasOwnProperty(a)&&(d[a]=this.direction[a]);var p={};this.direction={x:i,y:n,angle:e},t.direction=this.direction;for(var a in d)d[a]===this.direction[a]&&(p[a]=!0);if(p.x&&p.y&&p.angle)return t;p.x&&p.y||this.trigger("plain",t),p.x||this.trigger("plain:"+i,t),p.y||this.trigger("plain:"+n,t),p.angle||this.trigger("dir dir:"+e,t)}return t},i.prototype=new t,i.constructor=i,i.id=0,i.prototype.prepareNipples=function(){var t=this,e=t.nipples;e.on=t.on.bind(t),e.off=t.off.bind(t),e.options=t.options,e.destroy=t.destroy.bind(t),e.ids=t.ids,e.id=t.id,e.processOnMove=t.processOnMove.bind(t),e.processOnEnd=t.processOnEnd.bind(t),e.get=function(t){if(void 0===t)return e[0];for(var i=0,n=e.length;i<n;i+=1)if(e[i].identifier===t)return e[i];return!1}},i.prototype.bindings=function(){var t=this;t.bindEvt(t.options.zone,"start"),t.options.zone.style.touchAction="none",t.options.zone.style.msTouchAction="none"},i.prototype.begin=function(){var t=this,e=t.options;if("static"===e.mode){var i=t.createNipple(e.position,t.manager.getIdentifier());i.add(),t.idles.push(i)}},i.prototype.createNipple=function(t,i){var n=this,o=c.getScroll(),r={},s=n.options;if(t.x&&t.y)r={x:t.x-(o.x+n.box.left),y:t.y-(o.y+n.box.top)};else if(t.top||t.right||t.bottom||t.left){var d=document.createElement("DIV");d.style.display="hidden",d.style.top=t.top,d.style.right=t.right,d.style.bottom=t.bottom,d.style.left=t.left,d.style.position="absolute",s.zone.appendChild(d);var a=d.getBoundingClientRect();s.zone.removeChild(d),r=t,t={x:a.left+o.x,y:a.top+o.y}}var p=new e(n,{color:s.color,size:s.size,threshold:s.threshold,fadeTime:s.fadeTime,dataOnly:s.dataOnly,restJoystick:s.restJoystick,restOpacity:s.restOpacity,mode:s.mode,identifier:i,position:t,zone:s.zone,frontPosition:{x:0,y:0}});return s.dataOnly||(c.applyPosition(p.ui.el,r),c.applyPosition(p.ui.front,p.frontPosition)),n.nipples.push(p),n.trigger("added "+p.identifier+":added",p),n.manager.trigger("added "+p.identifier+":added",p),n.bindNipple(p),p},i.prototype.updateBox=function(){var t=this;t.box=t.options.zone.getBoundingClientRect()},i.prototype.bindNipple=function(t){var e,i=this,n=function(t,n){e=t.type+" "+n.id+":"+t.type,i.trigger(e,n)};t.on("destroyed",i.onDestroyed.bind(i)),t.on("shown hidden rested dir plain",n),t.on("dir:up dir:right dir:down dir:left",n),t.on("plain:up plain:right plain:down plain:left",n)},i.prototype.pressureFn=function(t,e,i){var n=this,o=0;clearInterval(n.pressureIntervals[i]),n.pressureIntervals[i]=setInterval(function(){var i=t.force||t.pressure||t.webkitForce||0;i!==o&&(e.trigger("pressure",i),n.trigger("pressure "+e.identifier+":pressure",i),o=i)}.bind(n),100)},i.prototype.onstart=function(t){var e=this,i=e.options;t=c.prepareEvent(t),e.updateBox();var n=function(t){e.actives.length<i.maxNumberOfNipples&&e.processOnStart(t)};return c.map(t,n),e.manager.bindDocument(),!1},i.prototype.processOnStart=function(t){var e,i=this,n=i.options,o=i.manager.getIdentifier(t),r=t.force||t.pressure||t.webkitForce||0,s={x:t.pageX,y:t.pageY},d=i.getOrCreate(o,s);d.identifier!==o&&i.manager.removeIdentifier(d.identifier),d.identifier=o;var a=function(e){e.trigger("start",e),i.trigger("start "+e.id+":start",e),e.show(),r>0&&i.pressureFn(t,e,e.identifier),i.processOnMove(t)};if((e=i.idles.indexOf(d))>=0&&i.idles.splice(e,1),i.actives.push(d),i.ids.push(d.identifier),"semi"!==n.mode)a(d);else{if(!(c.distance(s,d.position)<=n.catchDistance))return d.destroy(),void i.processOnStart(t);a(d)}return d},i.prototype.getOrCreate=function(t,e){var i,n=this,o=n.options;return/(semi|static)/.test(o.mode)?(i=n.idles[0])?(n.idles.splice(0,1),i):"semi"===o.mode?n.createNipple(e,t):(console.warn("Coudln't find the needed nipple."),!1):i=n.createNipple(e,t)},i.prototype.processOnMove=function(t){var e=this,i=e.options,n=e.manager.getIdentifier(t),o=e.nipples.get(n);if(!o)return console.error("Found zombie joystick with ID "+n),void e.manager.removeIdentifier(n);o.identifier=n;var r=o.options.size/2,s={x:t.pageX,y:t.pageY},d=c.distance(s,o.position),a=c.angle(s,o.position),p=c.radians(a),l=d/r;d>r&&(d=r,s=c.findCoord(o.position,d,a)),o.frontPosition={x:s.x-o.position.x,y:s.y-o.position.y},i.dataOnly||c.applyPosition(o.ui.front,o.frontPosition);var u={identifier:o.identifier,position:s,force:l,pressure:t.force||t.pressure||t.webkitForce||0,distance:d,angle:{radian:p,degree:a},instance:o};u=o.computeDirection(u),u.angle={radian:c.radians(180-a),degree:180-a},o.trigger("move",u),e.trigger("move "+o.id+":move",u)},i.prototype.processOnEnd=function(t){var e=this,i=e.options,n=e.manager.getIdentifier(t),o=e.nipples.get(n),r=e.manager.removeIdentifier(o.identifier);o&&(i.dataOnly||o.hide(function(){"dynamic"===i.mode&&(o.trigger("removed",o),e.trigger("removed "+o.id+":removed",o),e.manager.trigger("removed "+o.id+":removed",o),o.destroy())}),clearInterval(e.pressureIntervals[o.identifier]),o.resetDirection(),o.trigger("end",o),e.trigger("end "+o.id+":end",o),e.ids.indexOf(o.identifier)>=0&&e.ids.splice(e.ids.indexOf(o.identifier),1),e.actives.indexOf(o)>=0&&e.actives.splice(e.actives.indexOf(o),1),/(semi|static)/.test(i.mode)?e.idles.push(o):e.nipples.indexOf(o)>=0&&e.nipples.splice(e.nipples.indexOf(o),1),e.manager.unbindDocument(),/(semi|static)/.test(i.mode)&&(e.manager.ids[r.id]=r.identifier))},i.prototype.onDestroyed=function(t,e){var i=this;i.nipples.indexOf(e)>=0&&i.nipples.splice(i.nipples.indexOf(e),1),i.actives.indexOf(e)>=0&&i.actives.splice(i.actives.indexOf(e),1),i.idles.indexOf(e)>=0&&i.idles.splice(i.idles.indexOf(e),1),i.ids.indexOf(e.identifier)>=0&&i.ids.splice(i.ids.indexOf(e.identifier),1),i.manager.removeIdentifier(e.identifier),i.manager.unbindDocument()},i.prototype.destroy=function(){var t=this;t.unbindEvt(t.options.zone,"start"),t.nipples.forEach(function(t){t.destroy()});for(var e in t.pressureIntervals)t.pressureIntervals.hasOwnProperty(e)&&clearInterval(t.pressureIntervals[e]);t.trigger("destroyed",t.nipples),t.manager.unbindDocument(),t.off()},n.prototype=new t,n.constructor=n,n.prototype.prepareCollections=function(){var t=this;t.collections.create=t.create.bind(t),t.collections.on=t.on.bind(t),t.collections.off=t.off.bind(t),t.collections.destroy=t.destroy.bind(t),t.collections.get=function(e){var i;return t.collections.every(function(t){return!(i=t.get(e))}),i}},n.prototype.create=function(t){return this.createCollection(t)},n.prototype.createCollection=function(t){var e=this,n=new i(e,t);return e.bindCollection(n),e.collections.push(n),n},n.prototype.bindCollection=function(t){var e,i=this,n=function(t,n){e=t.type+" "+n.id+":"+t.type,i.trigger(e,n)};t.on("destroyed",i.onDestroyed.bind(i)),t.on("shown hidden rested dir plain",n),t.on("dir:up dir:right dir:down dir:left",n),t.on("plain:up plain:right plain:down plain:left",n)},n.prototype.bindDocument=function(){var t=this;t.binded||(t.bindEvt(document,"move").bindEvt(document,"end"),t.binded=!0)},n.prototype.unbindDocument=function(t){var e=this;Object.keys(e.ids).length&&!0!==t||(e.unbindEvt(document,"move").unbindEvt(document,"end"),e.binded=!1)},n.prototype.getIdentifier=function(t){var e;return t?void 0===(e=void 0===t.identifier?t.pointerId:t.identifier)&&(e=this.latest||0):e=this.index,void 0===this.ids[e]&&(this.ids[e]=this.index,this.index+=1),this.latest=e,this.ids[e]},n.prototype.removeIdentifier=function(t){var e={};for(var i in this.ids)if(this.ids[i]===t){e.id=i,e.identifier=this.ids[i],delete this.ids[i];break}return e},n.prototype.onmove=function(t){return this.onAny("move",t),!1},n.prototype.onend=function(t){return this.onAny("end",t),!1},n.prototype.onAny=function(t,e){var i,n=this,o="processOn"+t.charAt(0).toUpperCase()+t.slice(1);e=c.prepareEvent(e);var r=function(t,e,i){i.ids.indexOf(e)>=0&&(i[o](t),t._found_=!0)},s=function(t){i=n.getIdentifier(t),c.map(n.collections,r.bind(null,t,i)),t._found_||n.removeIdentifier(i)};return c.map(e,s),!1},n.prototype.destroy=function(){var t=this;t.unbindDocument(!0),t.ids={},t.index=0,t.collections.forEach(function(t){t.destroy()}),t.off()},n.prototype.onDestroyed=function(t,e){var i=this;if(i.collections.indexOf(e)<0)return!1;i.collections.splice(i.collections.indexOf(e),1)};var l=new n;return{create:function(t){return l.create(t)},factory:l}});

//const style = "position:fixed;display:block;width:100px;height:100px;left:25px;bottom:20px;background-color:#c8c8c880;z-index:20;border-radius: 50%;border: 3px solid gray;background-image: url('/resources/image/upload.png');"


function initJoystick() {
// create element
let d = document.createElement("DIV");
d.setAttribute("id","np");
d.setAttribute("class","controller");
//d.setAttribute("style",style)
document.querySelector("body").appendChild(d)

// create text overlay
//var p = document.createElement("p")
//p.setAttribute("style","text-align: center;margin-top:40px;font-size:12px Roboto; opacity:.5;");
//p.innerHTML="hold and drag to move"
//d.appendChild(p)
} 

var moveData ="";

// create standard NipplesJS joystick
function createJoystick() {
  initJoystick()
  var options= {
    mode: 'dynamic',
    zone: document.getElementById('np'),
    color: "#0F0000",
    fadeTime: 10
  }

   var manager = nipplejs.create(options);
   bindNipple();

   function bindNipple () {
               manager.on('move', function (evt, data) {
                   moveData = data;
               });
               manager.on('end', function (evt, data) {
                   moveData = "";
               });
             }

  }

  // turn joystick data into WASD movement in AFRAME
  var f; var ang; var x_vec; var y_vec; var cam;

  function updatePosition(data) {
    f = data.force;
    ang = data.angle.radian
    cam = document.getElementById("camera");


    x_vec = Math.cos(ang + 3.14/180*cam.getAttribute('rotation')['y']) ;
    y_vec = Math.sin(ang + 3.14/180*cam.getAttribute('rotation')['y']) ;

    x = cam.getAttribute("position")["x"] + f/15*(x_vec ) ;
    y = cam.getAttribute("position")["y"]
    z = cam.getAttribute("position")["z"] - f/15*(y_vec ) ;

    cam.setAttribute("position",`${x} ${y} ${z}`)
  }

  AFRAME.registerComponent('joystick', {
    init: function() { 
      createJoystick();
    },
    tick: function (time, timeDelta) {
      if (moveData != "") {
        updatePosition(moveData)
      }
    }
  });
}).apply({})
