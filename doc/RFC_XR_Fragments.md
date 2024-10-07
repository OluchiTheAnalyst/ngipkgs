%%%
Title = "XR Fragments"
area = "Internet"
workgroup = "Jens & Leon Internet Engineering Task Force"

[seriesInfo]
name = "XR-Fragments"
value = "draft-XRFRAGMENTS-leonvankammen-00"
stream = "IETF"
status = "informational"

date = 2023-04-12T00:00:00Z

[[author]]
initials="L.R."
surname="van Kammen"
fullname="L.R. van Kammen"

%%%

<!-- for annotated version see: https://raw.githubusercontent.com/ietf-tools/rfcxml-templates-and-schemas/main/draft-rfcxml-general-template-annotated-00.xml -->

<!--{

  <style type="text/css">
  body{
    font-family: monospace;
    max-width: 1000px;
    font-size: 15px;
    padding: 0% 10%;
    line-height: 30px;
    color:#555;
    background:#F7F7F7;
  }
  h1 { margin-top:40px; }
  pre{ line-height:18px; }
  a,a:visited,a:active{ color: #70f; }
  code{
    border: 1px solid #AAA;
    border-radius: 3px;
    padding: 0px 5px 2px 5px;
  }

  pre{
    line-height: 18px;
    overflow: auto;
    padding: 12px;
  }
  pre + code {
    background:#DDD;
  }
  pre>code{
    border:none;
    border-radius:0px;
    padding:0;
  }
  blockquote{
    padding-left: 30px;
    margin: 0;
    border-left: 5px solid #CCC;
  }
  th {
      border-bottom: 1px solid #000;
      text-align: left;
      padding-right:45px;
      padding-left:7px;
      background: #DDD;
  }

  td {
      border-bottom: 1px solid #CCC;
      font-size:13px; 
  }

  </style>

<br>
<h1>XR Fragments</h1>
<br>

<pre>
stream:    IETF
area:      Internet
status:    informational
author:    Leon van Kammen
date:      2023-04-12T00:00:00Z
workgroup: Internet Engineering Task Force
value:     draft-XRFRAGMENTS-leonvankammen-00
</pre>  


}-->

.# Abstract

This draft is a specification for interactive URI-controllable 3D files, enabling [hypermediatic](https://github.com/coderofsalvation/hypermediatic) navigation, to enable a spatial web for hypermedia browsers with- or without a network-connection.<br> 
The specification uses [W3C Media Fragments](https://www.w3.org/TR/media-frags/) and [URI Templates (RFC6570)](https://www.rfc-editor.org/rfc/rfc6570) to promote spatial addressibility, sharing, navigation, filtering and databinding objects for (XR) Browsers.<br>
XR Fragments allows us to better use existing metadata inside 3D scene(files), by connecting it to proven technologies like [URI Fragments](https://en.wikipedia.org/wiki/URI_fragment).<br>
XR Fragments views spatial webs thru the lens of 3D scene URI's, rather than thru code(frameworks) or protocol-specific browsers (webbrowser e.g.).

> XR Fragments is a <b>Meta scene format</b> which leverages heuristic rules derived from any 3D scene or well-established 3D file formats, to extract meaningful features from scene hierarchies.<br>
These heuristics, enable features that are both meaningful and consistent across different scene representations, allowing <b>higher interop</b> between fileformats, 3D editors, viewers and game-engines.

> Almost every idea in this document is demonstrated at [https://xrfragment.org](https://xrfragment.org)

{mainmatter}

# Introduction

How can we add more control to existing text and 3D scenes, without introducing new dataformats?<br>
Historically, there's many attempts to create the ultimate 3D fileformat.<br>
The lowest common denominator is: designers describing/tagging/naming things using **plain text**.<br>
XR Fragments exploits the fact that all 3D models already contain such metadata:

**XR Fragments allows controlling of metadata in 3D scene(files) using URI's**

It solves:

1. addressibility and [hypermediatic](https://github.com/coderofsalvation/hypermediatic) navigation of 3D scenes/objects: [URI Fragments](https://en.wikipedia.org/wiki/URI_fragment) using src/href spatial metadata 
1. Interlinking text & spatial objects by collapsing space into a Word Graph (XRWG) to show [visible links](#visible-links)
1. unlocking spatial potential of the (originally 2D) hashtag (which jumps to a chapter) for navigating XR documents
1. refraining from introducing scripting-engines for mundane tasks (and preventing its inevitable security-headaches)
1. the gap between text an 3d objects: object-names directly map to hashtags (=fragments), which allows 3D to text transcription.

> NOTE: The chapters in this document are ordered from highlevel to lowlevel (technical) as much as possible

# Core principle

**XR Fragments allows controlling 3D models using URLs, based on (non)existing metadata via URI's** 

XR Fragments tries to seek to connect the world of text (semantical web / RDF), and the world of pixels.<br>
Instead of forcing authors to combine 3D/2D objects programmatically (publishing thru a game-editor e.g.), XR Fragments **integrates all** which allows a universal viewing experience.<br>

```
  +───────────────────────────────────────────────────────────────────────────────────────────────+
  │                                                                                               │
  │                          U R N                                                                │
  │ U R L                      |                                                                  │
  │  |       |-----------------+--------|                                                         │
  │  +--------------------------------------------------|                                         │
  │  |                                                                                            │
  │  + https://foo.com/some/foo/scene.glb#someview             <-- http URI (=URL and has URN)    │
  │  |                                                                                            │
  │  + ipfs://cfe0987ec9r9098ecr/cats.fbx#someview             <-- an IPFS URI (=URL and has URN) │
  │                                                                                               │
  │  ec09f7e9cf8e7f09c8e7f98e79c09ef89e000efece8f7ecfe9fe      <-- an interpeer URI               │
  │                                                                                               │
  │                                                                                               │
  │  |------------------------+-------------------------|                                         │
  │                           |                                                                   │
  │                         U R I                                                                 │
  │                                                                                               │
  +───────────────────────────────────────────────────────────────────────────────────────────────+

```

Fact: our typical browser URL's are just **a possible implementation** of URI's (for untapped humancentric potential of URI's [see interpeer.io](https://interpeer.io))

> XR Fragments does not look at XR (or the web) thru the lens of HTML or URLs.<br>But approaches things from a higherlevel feedbackloop/hypermedia browser-perspective.

Below you can see how this translates back into good-old URLs:

```
 +───────────────────────────────────────────────────────────────────────────────────────────────+
 │                                                                                               │
 │   the soul of any URL:       ://macro        /meso           ?micro      #nano                │
 │                                                                                               │
 │                2D URL:       ://library.com  /document       ?search     #chapter             │
 │                                                                                       xrf://  │
 │                4D URL:       ://park.com     /4Dscene.fbx ─> ?other.glb ─> #view ───> hashbus │
 │                                                │                           #filter     │      │
 │                                                │                           #tag        │      │
 │                                                │     (hypermediatic)       #material   │      │
 │                                                │     (  feedback   )       #animation  │      │
 │                                                │     (    loop     )       #texture    │      │
 │                                                │                           #variable   │      │
 │                                                │                                       │      │
 │                                               XRWG <─────────────────────<─────────────+      │
 │                                                │                                       │      │
 │                                                └─ objects  ──────────────>─────────────+      │
 │                                                                                               │
 │                                                                                               │
 +───────────────────────────────────────────────────────────────────────────────────────────────+

```

> ?-linked and #-linked navigation are JUST one possible way to implement XR Fragments: the essential goal is to allow a Hypermediatic FeedbackLoop (HFL) between external and internal 4D navigation.
 
Traditional webbrowsers can become 4D document-ready by:

# The XR Fragments Trinity

XR Fragments utilizes URLs:

1. for 3D viewers/browser to manipulate the camera or objects (via URLbar)
2. as **implicit** metadata to reference (nested) objects **inside** 3D scene-file (local and remote)
3. via **explicit** metadata ('extras') **inside** 3D scene-files (interaction e.g.) or 
4. [optionally for developers] via **explicit** metadata **outside** 3D scene-files (via [sidecarfile](https://en.wikipedia.org/wiki/Sidecar_file))

# List of URI Fragments

| fragment          | type     | example            | info                                                                 |
|-------------------|------------|--------------------|----------------------------------------------------------------------|
| `#pos`            | vector3    | `#pos=0.5,0,0` `#pos=room` `#pos=cam2` | positions/parents camera(rig) (or XR floor) to xyz-coord/object/camera  |
| `#rot`            | vector3    | `#rot=0,90,0`      | rotates camera to xyz-coord 0.5,0,0                                  |
| [Media Fragments](https://www.w3.org/TR/media-frags/) | [media fragment](#media%20fragments%20and%20datatypes) | `#t=0,2&loop`      | play (and loop) 3D animation from 0 seconds till 2 seconds|

# List of **explicit* metadata 

These are the possible 'extras' for 3D nodes and sidecar-files

| key          | type     | example (JSON)         | function            | existing compatibility                 |
|--------------|----------|------------------------|---------------------|----------------------------------------|
| `href`       | string   | `"href": "b.gltf"`     | XR teleport         | custom property in 3D fileformats      |
| `src`        | string   | `"src": "#cube"`       | XR embed / teleport | custom property in 3D fileformats      |
| `tag`        | string   | `"tag": "cubes geo"`   | tag object (for filter-use / XRWG highlighting) | custom property in 3D fileformats      |
| `#`          | string   | `"#": "#mypreset`      | trigger default fragment on load | custom property in 3D fileformats |  

> Supported popular compatible 3D fileformats: `.gltf`, `.obj`, `.fbx`, `.usdz`, `.json` (THREE.js), `.dae` and so on.

## Sidecar-file

> NOTE: sidecar-files break the portability of XR (Fragments) experiences, therefore side-car files are discouraged for consumer usage/sharing. However, they can accomodate developers or applications who (for whatever reason) must not modify the 3D scene-file (a `.glb` e.g.).

For developers, sidecar-file can allow for defining **explicit** XR Fragments metadata, outside of the 3D file.<br> 
This can be done via a JSON-pointers [RFC6901](https://www.rfc-editor.org/rfc/rfc6901) in a JSON [sidecar-file](https://en.wikipedia.org/wiki/Sidecar_file):

* experience.glb 
* experience.json


```json 
{
  "/":{
    "#":                 "#-penguin",
    "aria-description": "description of scene",
  },
  "/room/chair": {
    "href": "#penguin"
  }
}
```

> This would mean: hide object(s) with name or `tag`-value 'penguin' upon scene-load, and show it when the user clicks the chair

So after loading `experience.glb` the existence of `experience.json` is detected, to apply the explicit metadata.<br>
The sidecar will define (or **override** already existing) extras, which can be handy for multi-user platforms (offer 3D scene customization/personalization to users).

> In THREE.js-code this would boil down to:

```javascript
 scene.userData['#'] = "#chair&penguin"
 scene.userData['aria-description'] = "description of scene"
 scene.getObjectByName("room").getObjectByName("chair").userData.href = "#penguin"

 // now the XR Fragments parser can process the XR Fragments userData 'extras' in the scene 
```




# Hypermediatic FeedbackLoop for XR browsers 

`href` metadata traditionally implies **click** AND **navigate**, however XR Fragments adds stateless **click** (`xrf://#....`) or **navigate** (`xrf://#pos=...`)
 as well (which allows many extra interactions which otherwise need a scripting language). This is known as **hashbus**-only events (see image above).

> Being able to use the same URI Fragment DSL for navigation (`href: #foo`) as well as interactions (`href: xrf://#bar`) greatly simplifies implementation, increases HFL, and reduces need for scripting languages.

This opens up the following benefits for traditional & future webbrowsers:

* [hypermediatic](https://github.com/coderofsalvation/hypermediatic) loading/clicking 3D assets (gltf/fbx e.g.) natively (with or without using HTML).
* allowing 3D assets/nodes to publish XR Fragments to themselves/eachother using the `xrf://` hashbus 
* collapsing the 3D scene to an wordgraph (for essential navigation purposes) controllable thru a hash(tag)bus
* completely bypassing the security-trap of loading external scripts (by loading 3D model-files, not HTML-javascriptable resources)


XR Fragments itself are [hypermediatic](https://github.com/coderofsalvation/hypermediatic) and HTML-agnostic, though pseudo-XR Fragment browsers **can** be implemented on top of HTML/Javascript. 

| principle                   | XR 4D URL                                       | HTML 2D URL                           |
|-----------------------------|-------------------------------------------------|---------------------------------------|
| the XRWG                    | wordgraph (collapses 3D scene to tags)          | Ctrl-F (find)                         |
| the hashbus                 | hashtags alter camera/scene/object-projections  | hashtags alter document positions     |
| src metadata                | renders content and offers sourceportation      | renders content                       |
| href metadata               | teleports to other XR document                  | jumps to other HTML document          |
| href metadata               | triggers predefined view                        | Media fragments                       |
| href metadata               | triggers camera/scene/object/projections        | n/a                                   |
| href metadata               | draws visible connection(s) for XRWG 'tag'      | n/a                                   |
| href metadata               | filters certain (in)visible objects             | n/a                                   |
| href metadata               | href="xrf://#-foo&bar"                          | href="javascript:hideFooAndShowBar()` |
|                             | (this does not update topLevel URI)             | (this is non-standard, non-hypermediatic) |

> An important aspect of HFL is that URI Fragments can be triggered without updating the top-level URI (default href-behaviour) thru their own 'bus' (`xrf://#.....`). This decoupling between navigation and interaction prevents non-standard things like (`href`:`javascript:dosomething()`).

# Conventions and Definitions

See appendix below in case certain terms are not clear.

## XR Fragment URL Grammar 

For typical HTTP-like browsers/applications:

```
reserved    = gen-delims / sub-delims
gen-delims  = "#" / "&"
sub-delims  = "," / "="
```

> Example: `://foo.com/my3d.gltf#pos=1,0,0&prio=-5&t=0,100`

| Demo                          | Explanation                     |
|-------------------------------|---------------------------------|
| `pos=1,2,3`                   | vector/coordinate argument e.g. |
| `pos=1,2,3&rot=0,90,0&foo`    | combinators                     |

> this is already implemented in all browsers

Pseudo (non-native) browser-implementations (supporting XR Fragments using HTML+JS e.g.) can use the `?` search-operator to address outbound content.<br>
In other words, the URL updates to: `https://me.com?https://me.com/other.glb` when navigating to `https://me.com/other.glb` from inside a `https://me.com` WebXR experience e.g.<br>
That way, if the link gets shared, the XR Fragments implementation at `https://me.com` can load the latter (and still indicates which XR Fragments entrypoint-experience/client was used).

# Spatial Referencing 3D 

XR Fragments assume the following objectname-to-URIFragment mapping:

```

  my.io/scene.fbx
  +─────────────────────────────+
  │ sky                         │  src: http://my.io/scene.fbx#sky          (includes building,mainobject,floor)
  │ +─────────────────────────+ │ 
  │ │ building                │ │  src: http://my.io/scene.fbx#building     (includes mainobject,floor)
  │ │ +─────────────────────+ │ │
  │ │ │ mainobject          │ │ │  src: http://my.io/scene.fbx#mainobject   (includes floor)
  │ │ │ +─────────────────+ │ │ │
  │ │ │ │ floor           │ │ │ │  src: http://my.io/scene.fbx#floor        (just floor object)
  │ │ │ │                 │ │ │ │
  │ │ │ +─────────────────+ │ │ │
  │ │ +─────────────────────+ │ │
  │ +─────────────────────────+ │
  +─────────────────────────────+

```

> Every 3D fileformat supports named 3D object, and this name allows URLs (fragments) to reference them (and their children objects).

Clever nested design of 3D scenes allow great ways for re-using content, and/or previewing scenes.<br>
For example, to render a portal with a preview-version of the scene, create an 3D object with:

* href: `https://scene.fbx`
* src: `https://otherworld.gltf#mainobject`

> It also allows **sourceportation**, which basically means the enduser can teleport to the original XR Document of an `src` embedded object, and see a visible connection to the particular embedded object. Basically an embedded link becoming an outbound link by activating it.

## Level2: Implicit URI Fragments

These fragments are derived from objectnames (or their extras) within a 3D scene, and trigger certain actions when evaluated by the browser:

|      |fragment               | type     | example           | info                                                                          |
|------|------------------|----------|-------------------|-------------------------------------------------------------------------------|
| **PRESET** | `#<preset>`     | string   | `#cubes`          | evaluates preset (`#foo&bar`) when a scene contains extra  (`#cubes: #foo&bar` e.g.) while URL-browserbar reflects `#cubes`. Only works when metadata-key starts with `#`  |
| **FOCUS** | `#<tag_or_objectname>`       | string   | `#person`         | (and show) object(s) with `tag: person` or name `person` (XRWG lookup)  |
| **FILTERS** | `#[!][-]<tag_or_objectname>[*]`    | string   | `#person` (`#-person`) |  will reset (`!`), show/focus or hide (`-`) focus object(s) with `tag: person` or name `person` by looking up XRWG (`*`=including children) |
| **MATERIALUPDATE** | `#<tag_or_objectname>[*]=<materialname>`   | string=string     | `#car=metallic`| sets material of car to material with name `metallic` (`*`=including children)|
|   |                           |                          | `#soldout*=halfopacity`| set material of objects tagged with `product` to material with name `metallic` |
| **VARIABLE UPDATE** | `#<variable>=<metadata-key>` | string=string | `#foo=bar` | sets [URI Template](https://www.rfc-editor.org/rfc/rfc6570) variable `foo` to the value `#t=0` from **existing** object metadata (`bar`:`#t=0` e.g.), This allows for reactive [URI Template](https://www.rfc-editor.org/rfc/rfc6570) defined in object metadata elsewhere (`src`:`://m.com/cat.mp4#{foo}` e.g., to play media using [media fragment URI](https://www.w3.org/TR/media-frags/#valid-uri)). NOTE: metadata-key should not start with `#` |
| **ANIMATION**  | `#<tag_or_objectname>=<animationname>` | string=string | `#people=walk` `#people=noanim` | assign a different animation to object(s) |

## media fragments and datatypes

> NOTE: below the word 'play' applies to 3D animations embedded in the 3D scene(file) **but also** media defined in `src`-metadata like audio/video-files (mp3/mp4 e.g.)

| type       | syntax | example | info |
|-------------------------------|-----------------------------------|-----------------|----------------------|
| vector2                       | x,y                               | 2,3.0           | 2-dimensional vector |
| vector3                       | x,y,z                             | 2,3.0,4         | 3-dimensional vector |
| temporal W3C media fragment   | t=x                               | 0               | play from 0 seconds to end (and stop) |
| temporal W3C media fragment   | t=x,y                             | 0,2             | play from 0 seconds till 2 seconds (and stop) |
| temporal W3C media fragment * | s=x                               | 1               | set playback speed of audio/video/3D anim |
| temporal W3C media fragment * | [-]loop                           | loop            | enable looped playback of audio/video/3D anim |
|                               |                                   | -loop           | disable looped playback (does not affect playbackstate of media) |
| vector2                       | uv=u,v,uspeed,vspeed              | 0,0             | set uv offset instantly (default speed = `1,1`) |
|                               |                                   | +0.5,+0.5       | scroll instantly by adding 0.5 to the current uv coordinates |
|                               |                                   | 0.2,1,0.1,0.1   | scroll (lerp) to uv coordinate `0,2,1` with `0.1` units per second |
|                               |                                   | 0,0,0,+0.1      | scroll v coordinates with `0.1` units per second (infinitely) |
|                               |                                   | +0.5,+0.5       | scroll instantly by adding 0.5 to the current uv coordinates |
| media parameter (shader uniform) | u:<uniform>=<string|float|vec2|vec3|vec4> | u:color=1,0,0   | set shader uniform value |

> \* = this is extending the [W3C media fragments](https://www.w3.org/TR/media-frags/#mf-advanced) with (missing) playback/viewport-control. Normally `#t=0,2` implies setting start/stop-values AND starting playback, whereas `#s=0&loop` allows pausing a video, speeding up/slowing down media, as well as enabling/disabling looping.

> The rationale for `uv` is that the `xywh` Media Fragment deals with rectangular media, which does not translate well to 3D models (which use triangular polygons, not rectangular) positioned by uv-coordinates. This also explains the absense of a `scale` or `rotate` primitive, which is challenged by this, as well as multiple origins (mesh- or texture).

Example URI's:

* `https://images.org/credits.jpg#uv=0,0,0,+0.1` (infinite vertical texturescrolling)
* `https://video.org/organogram.mp4#t=0&loop&uv=0.1,0.1,0.3,0.3` (animated tween towards region in looped video)
* `https://shaders.org/plasma.glsl#t=0&u:col2=0,1,0` (red-green shader plasma starts playing from time-offset 0)

```
  +──────────────────────────────────────────────────────────+  
  │                                                          │ 
  │  index.gltf#playall                                      │ 
  │    │                                                     │ 
  │    ├ #        : #t=0&shared=play                         │ apply default XR Fragment on load (`t` plays global 3D animation timeline)
  │    ├ play     : #t=0&loop                                │ variable for [URI Templates (RFC6570)](https://www.rfc-editor.org/rfc/rfc6570)
  │    │                                                     │ 
  │    ├── ◻ plane (with material)                           │    
  │    │      └ #: #uv=0,0,0,+0.1                            │ infinite texturescroll `v` of uv·coordinates with 0.1/fps
  │    │                                                     │ 
  │    ├── ◻ plane                                           │    
  │    │      └ src: foo.jpg#uv=0,0,0,+0.1                   │ infinite texturescroll `v` of uv·coordinates with 0.1/fps
  │    │                                                     │ 
  │    ├── ◻ media                                           │   
  │    │      └ src:  cat.mp4#t=l:2,10&uv=0.5,0.5            │ loop cat.mp4 (or mp3/wav/jpg) between 2 and 10 seconds (uv's shifted with 0.5,0.5)
  │    │                                                     │ 
  │    └── ◻ wall                                            │        
  │           ├ href:  #color=blue                           │ updates uniform values (IFS shader e.g.)
  │           ├ blue:  t=0&u:col=0,0,1                       │ variable for [Level1 URI Templates (RFC6570)](https://www.rfc-editor.org/rfc/rfc6570)
  │           └ src:   ://a.com/art.glsl#{color}&{shared}    │ .fs/.vs/.glsl/.wgsl etc shader [Level1 URI Template (RFC6570)](https://www.rfc-editor.org/rfc/rfc6570)
  │                                                          │    
  │                                                          │
  +──────────────────────────────────────────────────────────+

> NOTE: URI Template variables are immutable and respect scope: in other words, the end-user cannot modify `blue` by entering an URL like `#blue=.....` in the browser URL, and `blue` is not accessible by the plane/media-object (however `{play}` would work).

```

# Navigating 3D

| fragment | type | functionality |
|----------|--------|------------------------------|
| <b>#pos</b>=0,0,0 | vector3 |position camera to 0,0,0 (+userheight in VR)  |
| <b>#pos</b>=room | string | position camera to position of objectname `room` (+userheight in VR) |
| <b>#rot</b>=0,90,0 | vector3 | rotate camera    |

[» example implementation](https://github.com/coderofsalvation/xrfragment/blob/main/src/3rd/js/three/xrf/pos.js)<br>
[» discussion](https://github.com/coderofsalvation/xrfragment/issues/5)<br>

Here's the basic **level1** flow (with optional level2 features): 

1. the Y-coordinate of `pos` identifies the floorposition. This means that desktop-projections usually need to add 1.5m (average person height) on top (which is done automatically by VR/AR headsets), except in case of camera-switching.
2. set the position of the camera accordingly to the vector3 values of `#pos`
3. if the referenced `#pos` object is animated, parent the current camera to that object (so it animates too)
4. `rot` sets the rotation of the camera (only for non-VR/AR headsets, however a camera-value overrules this)
5. **level2**: mediafragment `t` in the top-URL sets the playbackspeed and animation-range of the global scene animation
6. before scene load: the scene is cleared
7. **level2**: after scene load: in case the scene (rootnode) contains an `#` default view with a fragment value: execute non-positional fragments via the hashbus (no top-level URL change)
8. **level2**: after scene load: in case the scene (rootnode) contains an `#` default view with a fragment value: execute positional fragment via the hashbus + update top-level URL
9. **level2**: in case of no default `#` view on the scene (rootnode), default player(rig) position `0,0,0` is assumed.
10. in case a `href` does not mention any `pos`-coordinate, the current position will be assumed 

Here's an ascii representation of a 3D scene-graph which contains 3D objects `◻` and their metadata:

```
  +────────────────────────────────────────────────────────+ 
  │                                                        │
  │  index.gltf                                            │
  │    │                                                   │
  │    ├── ◻ buttonA                                       │
  │    │      └ href: #pos=1,0,1&t=100,200                 │
  │    │                                                   │
  │    └── ◻ buttonB                                       │
  │           └ href: other.fbx                            │   <── file─agnostic (can be .gltf .obj etc)
  │                                                        │
  +────────────────────────────────────────────────────────+

```

An XR Fragment-compatible browser viewing this scene, allows the end-user to interact with the `buttonA` and `buttonB`.<br>
In case of `buttonA` the end-user will be teleported to another location and time in the **current loaded scene**, but `buttonB` will **replace the current scene** with a new one, like `other.fbx`, and assume `pos=0,0,0`.

# Top-level URL processing

> Example URL:  `://foo/world.gltf#cube&pos=0,0,0`

The URL-processing-flow for hypermedia browsers goes like this:

1. IF a `#cube` matches a custom property-key (of an object) in the 3D file/scene (`#cube`: `#......`) <b>THEN</b> execute that predefined_view.
2. IF scene operators (`pos`) and/or animation operator (`t`) are present in the URL then (re)position the camera and/or animation-range accordingly.
3. IF no camera-position has been set in <b>step 1 or 2</b> update the top-level URL with `#pos=0,0,0` ([example](https://github.com/coderofsalvation/xrfragment/blob/main/src/3rd/js/three/navigator.js#L31]]))
4. IF a `#cube` matches the name (of an object) in the 3D file/scene then draw a line from the enduser('s heart) to that object (to highlight it).
5. IF a `#cube` matches anything else in the XR Word Graph (XRWG) draw wires to them (text or related objects).


# Embedding XR content using src

`src` is the 3D version of the <a target="_blank" href="https://www.w3.org/html/wiki/Elements/iframe">iframe</a>.<br>
It instances content (in objects) in the current scene/asset, and follows similar logic like the previous chapter, except that it does not modify the camera.

| fragment | type | example value |
|----------|------|---------------|
|`src`| string (uri, hashtag/filter) | `#cube`<br>`#sometag`<br>#cube&-ball_inside_cube`<br>`#-sky&-rain`<br>`#-language&english`<br>`#price=>5`<br>`https://linux.org/penguin.png`<br>`https://linux.world/distrowatch.gltf#t=1,100`<br>`linuxapp://conference/nixworkshop/apply.gltf#-cta&cta_apply`<br>`androidapp://page1?tutorial#pos=0,0,1&t1,100`<br>`foo.mp3#0,0,0`|

Here's an ascii representation of a 3D scene-graph with 3D objects `◻` which embeds remote & local 3D objects `◻` with/out using filters:

```
  +────────────────────────────────────────────────────────+  +─────────────────────────+ 
  │                                                        │  │                         │
  │  index.gltf                                            │  │ ocean.com/aquarium.fbx  │
  │    │                                                   │  │   ├ room                │
  │    ├── ◻ canvas                                        │  │   └── ◻ fishbowl        │
  │    │      └ src: painting.png                          │  │         ├─ ◻ bass       │
  │    │                                                   │  │         └─ ◻ tuna       │
  │    ├── ◻ aquariumcube                                  │  │                         │       
  │    │      └ src: ://rescue.com/fish.gltf#fishbowl      │  +─────────────────────────+
  │    │                                                   │    
  │    ├── ◻ bedroom                                       │   
  │    │      └ src: #canvas                               │
  │    │                                                   │   
  │    └── ◻ livingroom                                    │      
  │           └ src: #canvas                               │
  │                                                        │
  +────────────────────────────────────────────────────────+
```

An XR Fragment-compatible browser viewing this scene, lazy-loads and projects `painting.png` onto the (plane) object called `canvas` (which is copy-instanced in the bed and livingroom).<br>
Also, after lazy-loading `ocean.com/aquarium.gltf`, only the queried objects `fishbowl` (and `bass` and `tuna`) will be instanced inside `aquariumcube`.<br>
Resizing will be happen accordingly to its placeholder object `aquariumcube`, see chapter Scaling.<br>

> Instead of cherrypicking a rootobject `#fishbowl` with `src`, additional filters can be used to include/exclude certain objects. See next chapter on filtering below.

**Specification**:

1. local/remote content is instanced by the `src` (filter) value (and attaches it to the placeholder mesh containing the `src` property) 
2. by default all objects are loaded into the instanced src (scene) object (but not shown yet)
2. <b>local</b> `src` values (`#...` e.g.) starting with a non-negating filter (`#cube` e.g.) will (deep)reparent that object (with name `cube`) as the new root of the scene at position 0,0,0
3. <b>local</b> `src` values should respect (negative) filters (`#-foo&price=>3`)
4. the instanced scene (from a `src` value) should be <b>scaled accordingly</b> to its placeholder object or <b>scaled relatively</b> based on the scale-property (of a geometry-less placeholder, an 'empty'-object in blender e.g.). For more info see Chapter Scaling.
5. <b>external</b> `src` values should be served with appropriate mimetype (so the XR Fragment-compatible browser will now how to render it). The bare minimum supported mimetypes are:
6. `src` values should make its placeholder object invisible, and only flush its children when the resolved content can succesfully be retrieved (see [broken links](#links))
7. <b>external</b> `src` values should respect the fallback link mechanism (see [broken links](#broken-links)
8. when the placeholder object is a 2D plane, but the mimetype is 3D, then render the spatial content on that plane via a stencil buffer. 
9. src-values are non-recursive: when linking to an external object (`src: foo.fbx#bar`), then `src`-metadata on object `bar` should be ignored. 
10. an external `src`-value should always allow a sourceportation icon within 3 meter: teleporting to the origin URI to which the object belongs.
11. when only one object was cherrypicked (`#cube` e.g.), set its position to `0,0,0`
12. when the enduser clicks an href with `#t=1,0,0` (play) will be applied to all src mediacontent with a timeline (mp4/mp3 e.g.)
13. a non-euclidian portal can be rendered for flat 3D objects (using stencil buffer e.g.) in case ofspatial `src`-values (an object `#world3` or URL `world3.fbx` e.g.).

* `model/gltf-binary`
* `model/gltf+json`
* `image/png`
* `image/jpg`
* `text/plain;charset=utf-8`

[» example implementation](https://github.com/coderofsalvation/xrfragment/blob/main/src/3rd/js/three/xrf/src.js)<br>
[» example 3D asset](https://github.com/coderofsalvation/xrfragment/blob/main/example/assets/src.gltf#L192)<br>
[» discussion](https://github.com/coderofsalvation/xrfragment/issues/4)<br>

# Navigating content href portals

navigation, portals & mutations

| fragment |                            type | example value                                                                                                             |
|----------|---------------------------------|---------------------------------------------------------------------------------------------------------------------------|
|`href`    | string (uri or predefined view) | `#pos=1,1,0`<br>`#pos=1,1,0&rot=90,0,0`<br>`://somefile.gltf#pos=1,1,0`<br> |

1. clicking an outbound ''external''- or ''file URI'' fully replaces the current scene and assumes `pos=0,0,0&rot=0,0,0` by default (unless specified)

2. relocation/reorientation should happen locally for local URI's (`#pos=....`) 

3. navigation should not happen ''immediately'' when user is more than 5 meter away from the portal/object containing the href (to prevent accidental navigation e.g.)

4. URL navigation should always be reflected in the client URL-bar (in case of javascript: see [[here](https://github.com/coderofsalvation/xrfragment/blob/dev/src/3rd/js/three/navigator.js) for an example navigator), and only update the URL-bar after the scene (default fragment `#`) has been loaded.

5. In immersive XR mode, the navigator back/forward-buttons should be always visible (using a wearable e.g., see [[here](https://github.com/coderofsalvation/xrfragment/blob/dev/example/aframe/sandbox/index.html#L26-L29) for an example wearable)

6. make sure that the ''back-button'' of the ''browser-history'' always refers to the previous position (see [[here](https://github.com/coderofsalvation/xrfragment/blob/main/src/3rd/js/three/xrf/href.js#L97))

7. ignore previous rule in special cases, like clicking an `href` using camera-portal collision (the back-button could cause a teleport-loop if the previous position is too close)

8. href-events should bubble upward the node-tree (from children to ancestors, so that ancestors can also contain an href), however only 1 href can be executed at the same time.

9. the end-user navigator back/forward buttons should repeat a back/forward action until a `pos=...` primitive is found (the stateless xrf:// href-values should not be pushed to the url-history)

[» example implementation](https://github.com/coderofsalvation/xrfragment/blob/main/src/3rd/js/three/xrf/href.js)<br>
[» example 3D asset](https://github.com/coderofsalvation/xrfragment/blob/main/example/assets/href.gltf#L192)<br>
[» discussion](https://github.com/coderofsalvation/xrfragment/issues/1)<br>

## Walking surfaces 

XR Fragment-compatible viewers can infer this data based scanning the scene for:

1. materialless (nameless & textureless) mesh-objects (without `src` and `href`)

> optionally the viewer can offer thumbstick, mouse or joystick teleport-tools for non-roomscale VR/AR setups.

## UX spec

End-users should always have read/write access to: 

1. the current (toplevel) <b>URL</b> (an URLbar etc)
2. URL-history (a <b>back/forward</b> button e.g.)
3. Clicking/Touching an `href` navigates (and updates the URL) to another scene/file (and coordinate e.g. in case the URL contains XR Fragments).


## Scaling instanced content

Sometimes embedded properties (like `src`) instance new objects.<br>
But what about their scale?<br>
How does the scale of the object (with the embedded properties) impact the scale of the referenced content?<br>

> Rule of thumb: visible placeholder objects act as a '3D canvas' for the referenced scene (a plane acts like a 2D canvas for images e, a cube as a 3D canvas e.g.).

1. <b>IF</b> an embedded property (`src` e.g.) is set on an non-empty placeholder object (geometry of >2 vertices):

* calculate the <b>bounding box</b> of the ''placeholder'' object (maxsize=1.4 e.g.)
* hide the ''placeholder'' object (material e.g.)
* instance the `src` scene as a child of the existing object
* calculate the <b>bounding box</b> of the instanced scene, and scale it accordingly (to 1.4 e.g.)

> REASON: non-empty placeholder object can act as a protective bounding-box (for remote content of which might grow over time e.g.)

2. ELSE multiply the scale-vector of the instanced scene with the scale-vector (a common property of a 3D node) of the <b>placeholder</b> object. 

> TODO: needs intermediate visuals to make things more obvious

# XR Fragment: pos

[[» example implementation|https://github.com/coderofsalvation/xrfragment/blob/main/src/3rd/js/three/xrf/pos.js]]<br>

# XR Fragment: rot

[[» example implementation|https://github.com/coderofsalvation/xrfragment/blob/main/src/3rd/js/three/xrf/pos.js]]<br>

# XR Fragment: t 

[[» example implementation|https://github.com/coderofsalvation/xrfragment/blob/main/src/3rd/js/three/xrf/t.js]]<br>

# XR audio/video integration

To play global audio/video items:

1. add a `src: foo.mp3` or `src: bar.mp4` metadata to a 3D object (`cube` e.g.)
1. to enable auto-play and global timeline ([[#t=|t]]) control: hardcode a [[#t=|t]] XR Fragment: (`src: bar.mp3#t=0&loop` e.g.)
1. to play it, add `href: #cube` somewhere else 
1. to enable enduser-triggered play, use a [[URI Template]] XR Fragment: (`src: bar.mp3#{player}` and `play: t=0&loop` and `href: xrf://#player=play` e.g.)
1. when the enduser clicks the `href`, `#t=0&loop` (play) will be applied to the `src` value

> NOTE: hardcoded framestart/framestop uses sampleRate/fps of embedded audio/video, otherwise the global fps applies. For more info see [[#t|t]].

# XR Fragment filters

Include, exclude, hide/shows objects using space-separated strings:

| example                          | outcome                                                                            |
|----------------------------------|------------------------------------------------------------------------------------|
|  `#-sky`                         | show everything except object named `sky`                                          |
|  `#-language&english`            | hide everything with tag `language`, but show all tag `english` objects            |
|  `#-price&price=>10`             | hide all objects with property `price`, then only show object with price above 10  |
|  `#-house*`                      | hide `house` object and everything inside (=`*`)                                   |

It's simple but powerful syntax which allows filtering the scene using searchengine prompt-style feeling:

1. filters are a way to traverse a scene, and filter objects based on their name, tag- or property-values.

* see [an (outdated) example video here](https://coderofsalvation.github.io/xrfragment.media/queries.mp4) which used a dedicated `q=` variable (now deprecated and usable directly)

## including/excluding

By default, selectors work like photoshop-layers: they scan for matching layer(name/properties) within the scene-graph.
Each matched object (not their children) will be toggled (in)visible when selecting.

| operator | info                                                                                                                          |
|----------|-------------------------------------------------------------------------------------------------------------------------------|
| `-`      | hides object(s) (`#-myobject&-objects` e.g.                                                                                   |
| `=`      | indicates an object-embedded custom property key/value (`#price=4&category=foo` e.g.)                                         |
| `=>` `=<`| compare float or int number (`#price=>4` e.g.)                                                                                |
| `*`      | deepselect: automatically select children of selected object, including local (nonremote) embedded objects (starting with `#`)|

> NOTE 1: after an external embedded object has been instanced (`src: https://y.com/bar.fbx#room` e.g.), filters do not affect them anymore (reason: local tag/name collisions can be mitigated easily, but not in case of remote content).

> NOTE 2: depending on the used 3D framework, toggling objects (in)visible should happen by enabling/disableing writing to the colorbuffer (to allow children being still visible while their parents are invisible).

[» example implementation](https://github.com/coderofsalvation/xrfragment/blob/main/src/3rd/js/three/xrf/q.js)
[» example 3D asset](https://github.com/coderofsalvation/xrfragment/blob/main/example/assets/filter.gltf#L192)
[» discussion](https://github.com/coderofsalvation/xrfragment/issues/3)

## Filter Parser 

Here's how to write a filter parser:

1. create an associative array/object to store filter-arguments as objects
1. detect object id's & properties `foo=1` and `foo` (reference regex= `~/^.*=[><=]?/`  )
1. detect excluders like `-foo`,`-foo=1`,`-.foo`,`-/foo` (reference regex= `/^-/` )
1. detect root selectors like `/foo` (reference regex= `/^[-]?\//` )
1. detect number values like `foo=1` (reference regex= `/^[0-9\.]+$/` )
1. detect operators so you can easily strip keys (reference regex= `/(^-|\*$)/` )
1. detect exclude keys like `-foo`   (reference regex= `/^-/` )
1. for every filter token split string on `=`
1. and we set `root` to `true` or `false` (true=`/` root selector is present)
1. therefore we we set `show` to `true` or `false` (false=excluder `-`)

> An example filter-parser (which compiles to many languages) can be [found here](https://github.com/coderofsalvation/xrfragment/blob/main/src/xrfragment/Filter.hx)

# Visible links

When predefined views, XRWG fragments and ID fragments (`#cube` or `#mytag` e.g.) are triggered by the enduser (via toplevel URL or clicking `href`):

1. draw a wire from the enduser (preferabbly a bit below the camera, heartposition) to object(s) matching that ID (objectname)
2. draw a wire from the enduser (preferabbly a bit below the camera, heartposition) to object(s) matching that `tag` value
3. draw a wire from the enduser (preferabbly a bit below the camera, heartposition) to object(s) containing that in their `src` or `href` value 

The obvious approach for this, is to consult the XRWG ([example](https://github.com/coderofsalvation/xrfragment/blob/feat/macros/src/3rd/js/XRWG.js)), which basically has all these things already collected/organized for you during scene-load.

**UX**

4. do not update the wires when the enduser moves, leave them as is 
5. offer a control near the back/forward button which allows the user to (turn off) control the correlation-intensity of the XRWG

# Text in XR (tagging,linking to spatial objects)

How does XR Fragments interlink text with objects?

> The XR Fragments does this by collapsing space into a **Word Graph** (the **XRWG** [example](https://github.com/coderofsalvation/xrfragment/blob/feat/macros/src/3rd/js/XRWG.js)), augmented by Bib(s)Tex.

Instead of just throwing together all kinds media types into one experience (games), what about their tagged/semantical relationships?<br>
Perhaps the following question is related: why is HTML adopted less in games outside the browser?

Hence:

1. XR Fragments promotes (de)serializing a scene to a (lowercase) XRWG ([example](https://github.com/coderofsalvation/xrfragment/blob/feat/macros/src/3rd/js/XRWG.js))
2. XR Fragments primes the XRWG, by collecting words from the `tag` and name-property of 3D objects.
3. XR Fragments primes the XRWG, by collecting words from **optional** metadata **at the end of content** of text (see default mimetype & Data URI)
4. XR Fragments primes the XRWG, by collecting tags/id's from linked hypermedia (URI fragments for HTML e.g.)
5. The XRWG should be recalculated when textvalues (in `src`) change 
6. HTML/RDF/JSON is still great, but is beyond the XRWG-scope (they fit better in the application-layer, or as embedded src content)
7. Applications don't have to be able to access the XRWG programmatically, as they can easily generate one themselves by traversing the scene-nodes.
8. The XR Fragment focuses on fast and easy-to-generate end-user controllable word graphs (instead of complex implementations that try to defeat word ambiguity)
9. Instead of exact lowercase word-matching, levensteihn-distance-based matching is preferred

Example of generating XRWG out of the XRWG and textdata with hashtags:

```
  http://y.io/z.fbx                                                           | Derived XRWG (expressed as JSON)
  ----------------------------------------------------------------------------+--------------------------------------
                                                                              | Chapter: ['#mydoc']
  +-[src: data:.....]----------------------+   +-[3D mesh]-+                  | one:     ['#mydoc']
  | Chapter one                            |   |    / \    |                  | houses:  ['#castle','#mydoc','#house']
  |                                        |   |   /   \   |                  | baroque: ['#mydoc','#castle']
  | John built houses in baroque style.    |   |  /     \  |                  | castle:  ['#baroque','#house']
  |                                        |   |  |_____|  |                  | john:    ['#john','#mydoc']
  |                                        |   +-----│-----+                  | mydoc:   ['#mydoc']
  |                                        |         │                        |
  |                                        |         ├─ name: castle          | 
  |                                        |         └─ tag: house baroque    | 
  +----------------------------------------+                                  |
                 └─ name: mydoc                [3D mesh-+                     |
                                               |    O   ├─ name: john         |                           
                                               |   /|\  |                     |
                                               |   / \  |                     |    ^ ^ ^
                                               +--------+                     |    | | |  
                                                                              |         
           [remotestorage.io]+  [ localstorage]-+                             | <- the XR Fragment-compatible 
           | XRWG (JSON)     |  | XRWG (JSON    |                             | <- 3D hypermedia viewer should
           |                 |  |               |                             | <- be able to select the active XRWG
           +-----------------+  +---------------+                             |
```  


This allows hasslefree authoring and copy-paste of associations **for and by humans**, but also makes these URLs possible:

| URL example                           | Result                                                                    |
|---------------------------------------|---------------------------------------------------------------------------|
| `https://my.com/foo.gltf#baroque`     | draws lines between 3D mesh `castle`, and `mydoc`'s text `baroque`        |
| `https://my.com/foo.gltf#john`        | draws lines between mesh `john`, and the text `John` of `mydoc`           |
| `https://my.com/foo.gltf#house`       | draws lines between mesh `castle`, and other objects with tag `house` or `todo`  |

> the URI fragment `#john&mydoc&house` would draw a connection between these 3 meshes.

The XRWG allows endusers to show/hide relationships in realtime in XR Browsers at various levels:

* wordmatch **inside** `src` text 
* wordmatch **inside** `href` text
* wordmatch object-names 
* wordmatch object-tagnames 

Spatial wires can be rendered between words/objects etc.<br>
Some pointers for good UX (but not necessary to be XR Fragment compatible):

9. The XR Browser needs to adjust tag-scope based on the endusers needs/focus (infinite tagging only makes sense when environment is scaled down significantly)
10. The XR Browser should always allow the human to view/edit the metadata, by clicking 'toggle metadata' on the 'back' (contextmenu e.g.) of any XR text, anywhere anytime.
12. respect multi-line BiBTeX metadata in text because of [the core principle](#core-principle)
13. Default font (unless specified otherwise) is a modern monospace font, for maximized tabular expressiveness (see [the core principle](#core-principle)).
14. anti-pattern: hardcoupling an XR Browser with a mandatory **markup/scripting-language** which departs from onubtrusive plain text (HTML/VRML/Javascript) (see [the core principle](#core-principle))
15. anti-pattern: limiting human introspection, by abandoning plain text as first tag citizen.

## Default Data URI mimetype 

The `src`-values work as expected (respecting mime-types), however:

The XR Fragment specification advices to bump the traditional default browser-mimetype 

`text/plain;charset=US-ASCII` 

to a hashtag-friendly one:

`text/plain;charset=utf-8;hashtag`

This indicates that:

* utf-8 is supported by default
* words beginning with `#` (hashtags) will prime the XRWG by adding the hashtag to the XRWG, linking to the current sentence/paragraph/alltext (depending on '.') to the XRWG 

Advantages: 

* out-of-the-box (de)multiplex human text and metadata in one go (see [the core principle](#core-principle))
* no network-overhead for metadata (see [the core principle](#core-principle)) 
* ensuring high FPS: realtime HTML/RDF historically is too 'requesty'/'parsy' for game studios
* rich send/receive/copy-paste everywhere by default, metadata being retained (see [the core principle](#core-principle))
* netto result: less webservices, therefore less servers, and overall better FPS in XR 

> This significantly expands expressiveness and portability of human tagged text, by **postponing machine-concerns to the end of the human text** in contrast to literal interweaving of content and markupsymbols (or extra network requests, webservices e.g.).

For all other purposes, regular mimetypes can be used (but are not required by the spec).<br>

## URL and Data URI

```
  +--------------------------------------------------------------+  +------------------------+
  |                                                              |  | author.com/article.txt |
  |  index.gltf                                                  |  +------------------------+
  |    │                                                         |  |                        |
  |    ├── ◻ article_canvas                                      |  | Hello #friends         |
  |    │    └ src: ://author.com/article.txt                     |  |                        |
  |    │                                                         |  +------------------------+
  |    └── ◻ note_canvas                                         |  
  |           └ src:`data:welcome human\n@book{sunday...}`       |  
  |                                                              |  
  |                                                              |
  +--------------------------------------------------------------+
```

The enduser will only see `welcome human` and `Hello friends` rendered verbatim (see mimetype).
The beauty is that text in Data URI automatically promotes rich copy-paste (retaining metadata).
In both cases, the text gets rendered immediately (onto a plane geometry, hence the name '_canvas').
The XR Fragment-compatible browser can let the enduser access visual-meta(data)-fields after interacting with the object (contextmenu e.g.).

> additional tagging using [bibs](https://github.com/coderofsalvation/hashtagbibs): to tag spatial object `note_canvas` with 'todo', the enduser can type or speak `#note_canvas@todo`

# Importing/exporting 

For usecases like importing/exporting/p2p casting a scene, the issue of external files comes into play.

1. export: if the 3D scene contains relative src/href values, rewrite them into absolute URL values.

# Reflection Mapping

Environment mapping is crucial for creating realistic reflections and lighting effects on 3D objects. 
To apply environment mapping efficiently in a 3D scene, traverse the scene graph and assign each object's environment map based on the nearest ancestor's texture map. This ensures that objects inherit the correct environment mapping from their closest parent with a texture, enhancing the visual consistency and realism.

```
  +--------------------------------+  
  |                                |  
  |  index.usdz                    |  
  |    │                           |  
  |    └── ◻ sphere (texture:foo)  | 
  |        └ ◻ cube (texture:bar)  | envMap = foo 
  |         └ ◻ cylinder           | envMap = bar
  +--------------------------------+
```

Most 3D viewers apply one and the same environment map for various models, however this logic 
allows a more natural & automatic strategy for reflection mapping. 

# Transclusion (broken link) resolution

In spirit of Ted Nelson's 'transclusion resolution', there's a soft-mechanism to harden links & minimize broken links in various ways:

1. defining a different transport protocol (https vs ipfs or DAT) in `src` or `href` values can make a difference
2. mirroring files on another protocol using (HTTP) errorcode tags in `src` or `href` properties
3. in case of `src`: nesting a copy of the embedded object in the placeholder object (`embeddedObject`) will not be replaced when the request fails

> due to the popularity, maturity and extensiveness of HTTP codes for client/server communication, non-HTTP protocols easily map to HTTP codes (ipfs ERR_NOT_FOUND maps to 404 e.g.)

For example:

```
  +────────────────────────────────────────────────────────+ 
  │                                                        │
  │  index.gltf                                            │
  │    │                                                   │
  │    │ #: #-offlinetext                                  │
  │    │                                                   │
  │    ├── ◻ buttonA                                       │
  │    │      └ href:     http://foo.io/campagne.fbx       │
  │    │      └ href@404: ipfs://foo.io/campagne.fbx       │
  │    │      └ href@400: #clienterrortext                 │
  │    │      └ ◻ offlinetext                              │
  │    │                                                   │
  │    └── ◻ embeddedObject                          <--------- the meshdata inside embeddedObject will (not)
  │           └ src: https://foo.io/bar.gltf               │    be flushed when the request (does not) succeed.
  │           └ src@404: http://foo.io/bar.gltf            │    So worstcase the 3D data (of the time of publishing index.gltf)
  │           └ src@400: https://archive.org/l2kj43.gltf   │    will be displayed.
  │                                                        │
  +────────────────────────────────────────────────────────+

```

# Topic-based index-less Webrings 

As hashtags in URLs map to the XWRG, `href`-values can be used to promote topic-based index-less webrings.<br>
Consider 3D scenes linking to eachother using these `href` values:

* `href: schoolA.edu/projects.gltf#math`
* `href: schoolB.edu/projects.gltf#math`
* `href: university.edu/projects.gltf#math`

These links would all show visible links to math-tagged objects in the scene.<br>
To filter out non-related objects one could take it a step further using filters:

* `href: schoolA.edu/projects.gltf#math&-topics math`
* `href: schoolB.edu/projects.gltf#math&-courses math`
* `href: university.edu/projects.gltf#math&-theme math`

> This would hide all object tagged with `topic`, `courses` or `theme` (including math) so that later only objects tagged with `math` will be visible 

This makes spatial content multi-purpose, without the need to separate content into separate files, or show/hide things using a complex logiclayer like javascript.

# URI Templates (RFC6570)

XR Fragments adopts Level1 URI **Fragment** expansion to provide safe interactivity.<br>
The following demonstrates a simple video player:

```

  +─────────────────────────────────────────────+
  │                                             │
  │   foo.usdz                                  │          
  │     │                                       │          
  │     │                                       │          
  │     ├── ◻ stopbutton                        │
  │     │      ├ #:    #-stopbutton             │
  │     │      └ href: #player=stop&-stopbutton │  (stop and hide stop-button)
  │     │                                       │          
  │     └── ◻ plane                             │
  │            ├ play: #t=l:0,10                │
  │            ├ stop: #t=0,0                   │
  │            ├ href: #player=play&stopbutton  │  (play and show stop-button)
  │            └ src:  cat.mp4#{player}         │
  │                                             │
  │                                             │
  +─────────────────────────────────────────────+


```

# Additional scene metadata 

XR Fragments does not aim to redefine the metadata-space or accessibility-space by introducing its own cataloging-metadata fields.
Instead, it encourages browsers to scan nodes for the following custom properties:

* [SPDX](https://spdx.dev/) license information
* [ARIA](https://www.w3.org/WAI/standards-guidelines/aria/) attributes (`aria-*: .....`)
* [Open Graph](https://ogp.me) attributes (`og:*: .....`)
* [Dublin-Core](https://www.dublincore.org/specifications/dublin-core/application-profile-guidelines/) attributes(`dc:*: .....`)
* [BibTex](https://bibtex.eu/fields) when known bibtex-keys exist with values enclosed in `{` and `},`

**ARIA** (`aria-description`) is the most important to support, as it promotes accessibility and allows scene transcripts. Please start `aria-description` with a verb to aid transcripts. 

> Example: object 'tryceratops' with `aria-description: is a huge dinosaurus standing on a #mountain` generates transcript `#tryceratops is a huge dinosaurus standing on a #mountain`, where the hashtags are clickable XR Fragments (activating the visible-links in the XR browser).

Individual nodes can be enriched with such metadata, but most importantly the scene node:

| metadata key                                           | example value                                   |
|--------------------------------------------------------|-------------------------------------------------|
| `aria-description`, `og:description`, `dc:description` | `An immersive experience about Triceratops` (*) |
| `SPDX`                                                 | `CC0-1.0`                                       |
| `dc:creator`                                           | `John Doe`                                      |
| `dc:title`, `og:title`                                 | 'Triceratops` (*)                               |
| `og:site_name`                                         | `https://xrfragment.org`                        |
| `dc.publisher`                                         | `NLNET`                                         |
| `dc.date`                                              | `2024-01-01`                                    |  
| `dc.identifier`                                        | `XRFRAGMENT-001`                                |
| `journal` (bibTeX)                                     | `{Future Of Text Vol 3},`                       |

> \* = these are interchangable (only one needs to be defined)

There's no silver bullet when it comes to metadata, so one should support where the metadata is/goes.

> These attributes can be scanned and presented during an `href` or `src` eye/mouse-over.

# Accessibility interface

The addressibility of XR Fragments allows for unique 3D-to-text transcripts, as well as an textual interface to navigate 3D content.<br>
Spec:<br><Br>

1. The enduser must be able to enable an accessibility-mode (which persists across application/webpage restarts)
2. Accessibility-mode must contain a text-input for the user to enter text 
3. Accessibility-mode must contain a flexible textlog for the user to read (via screenreader, screen, or TTS e.g.)
4. the textlog contains `aria-descriptions`, and its narration (Screenreader e.g.) can be skipped (via 2-button navigation)
5. The `back` command should navigate back to the previous URL (alias for browser-backbutton)
6. The `forward` command should navigate back to the next URL (alias for browser-nextbutton)
7. A destination is a 3D node containing an `href` with a `pos=` XR fragment 
8. The `go` command should list all possible destinations
9. The `go left` command should move the camera around 0.3 meters to the left 
10. The `go right` command should move the camera around 0.3 meters to the right
11. The `go forward` command should move the camera 0.3 meters forward (direction of current rotation).
12. The `rotate left` command should rotate the camera 0.3 to the left
13. The `rotate left` command should rotate the camera 0.3 to the right
14. The (dynamic) `go abc` command should navigate to `#pos=scene2` in case there's a 3D node with name `abc` and `href` value `#pos=scene2`
15. The `look` command should give an (contextual) 3D-to-text transcript, by scanning the `aria-description` values of the current `pos=` value (including its children)
16. The `do` command should list all possible `href` values which don't contain an `pos=` XR Fragment
17. The (dynamic) `do abc` command should navigate/execute `https://.../...` in case a 3D node exist with name `abc` and `href` value `https://.../...`


## Two-button navigation

For specific user-profiles, gyroscope/mouse/keyboard/audio/visuals will not be available.<br>
Therefore a 2-button navigation-interface is the bare minimum interface:

1. objects with href metadata can be cycled via a key (tab on a keyboard)
2. objects with href metadata can be activated via a key (enter on a keyboard)
3. the TTS reads the href-value (and/or aria-description if available)

## Overlap with fileformat-specific extensions 

Some 3D scene-fileformats have support for extensions.
What if the functionality of those overlap?
For example, GLTF has the `OMI_LINK` extension which might overlap with XR Fragment's `href`:

>  Priority Order and Precedence, otherwise fallback applies

1.**Extensions Take Precedence**: Since glTF-specific extensions are designed with the format’s 
specific needs and optimizations in mind, they should take precedence over extras metadata 
in cases where both contain overlapping functionality. 
This approach aligns with the idea that extensions are more likely to be interpreted uniformly by glTF-compatible software.

2. **Fallback Fall-through Mechanism**: 
If a glTF implementation does not support a particular extension, the (XRF) extras field can serve as a fallback. This way, metadata provided in extras can still be useful for applications that don't handle certain extensions.

> **Example 1** In case of the OMI_LINK glTF extension (`href: https://nlnet.nl`) and an XR Fragment (`href: #pos=otherroom` or `href: otherplanet.glb`), it is clear that `https://nlnet.nl` should open in a browsertab, whereas the XR Fragment links should teleport the user. If the OMI_LINK contains an XR Fragment (`#pos=` e.g.) a teleport should be performed only (and other [overlapping] metadata should be ignored).

> **Example 2** If an Extensions uses XR Fragments in URI's (`href: #pos=otherroom` or `href: xrf://-walls` in OMI_LINK e.g.), then perform them according to XR Fragment spec (teleport user). But only once:  ignore further overlapping metadata for that usecase.

## Vendor Prefixes 

Vendor-specific metadata in a 3D scenefiles, are similar to vendor-specific [CSS-prefixes](https://en.wikipedia.org/wiki/CSS#Vendor_prefixes) (`-moz-opacity: 0.2` e.g.).
This allows popular 3D engines/frameworks, to initialize specific features when loading a scene/object, in a progressive enhanced way.

Vendor Prefixes allows embedding 3D engines/framework-specific features a 3D file via metadata:

| what             | XR metadata         | Lowest common denominator                             |
|------------------|---------------------|-------------------------------------------------------|
| CSS              | vendor-agnostic     | 2D canvas + object referencing/styling                |
| XR Fragments     | vendor-agnostic     | 3D camera + object(file) load/embed/click/referencing |
| Vendor prefixs   | vendor-**specific** | Specialized Entity-Component implementation           |

> Why? Because not all XR interactions can/should be solved/standardized by embedding XR Fragments into any 3D file.
The lowest common denominator between 3D engines is the 'entity'-part of their entity-component-system (ECS). The 'component'-part can be progressively enhanced via vendor prefixes.

For example, the following metadata can be added to a .glb file, to make an object grabbable in AFRAME:

```
+────────────────────────────────────────────────────────────────────────────────────────────────────────+ 
│ http://y.io/z.glb                             | AFRAME app                                             │ 
│-----------------------------------------------+--------------------------------------------------------│ 
│                                               |                                                        │
│                                               | after loading the glb, john can be placed into the     │ 
│     +-[3D mesh]-+                             | castle via hands, because the author added metadata to │  
│     |    / \    |                             | john via either:                                       │  
│     |   /   \   |                             |                                                        │ 
│     |  /     \  |                             | 1. Blender (custom property-box, no plugins needed)    │ 
│     |  |_____|  |                             |                                                        │  
│     +-----│-----+                             | 2. javascript-code:                                    │  
│           │                                   |                                                        │  
│           ├─ name: castle                     |     for( var com in this.el.components ){              │  
│           └─ tag: house baroque               |       this.el.object3D.userData[`-AFRAME-${com}`] = '' │  
│                                               |     }                                                  │  
│ [3D mesh-+                                    |     // save to z.glb in AFRAME inspector               │ 
│ |        ├─ name: john                        |                                                        │  
│ |    O   ├─ age: 23                           |                                                        │  
│ |   /|\  ├─ -aframe-grabbable:      ''        | > inits 'grabbable' component on object john           │ 
│ |   / \  ├─ -aframe-material.color: '#F0A'    | > inits 'material' component on object john            │  
│ |        ├─ -aframe-text.value:  '{name}{age}'| > inits 'text' component (*) with value 'john'         │  
│ |        ├─ -three-material.fog: false        | > changes material settings in THREE.js app            │ 
│ |        ├─ -godot-Label3D.text: '{name}{age}'| > inits 'Label3D' component (*) in Godot               │  
│ +--------+                                    |                                                        │
│                                               |                                                        │
├─ -GODOT-version:  '4.3'                       | > exporters/authors can report targeted version        │
├─ -AFRAME-version: '1.6.0'                     |                    and (optionally) hint component-repo│
├─ -AFRAME-info:    'https://git.benetou.fr/comps'                                                       │       
│                                               |                                                        │
+────────────────────────────────────────────────────────────────────────────────────────────────────────+ 
```  

* key/value syntax: -`<vendorname>`-`<component|version>`.`<key>`  `[string/boolean/float/int]`-value

String-templatevalues are evaluated as per [URI Templates (RFC6570)](https://www.rfc-editor.org/rfc/rfc6570) Level 1. 

> This 'separating of mechanism from policy' (unix rule) does **somewhat** break portability of an XR experience, but still prevents (E-waste of) handcoded virtual worlds. It allows for (XR experience) metadata to survive in future 3D engines and scene-fileformats.


# Security Considerations

The only dynamic parts are [W3C Media Fragments](https://www.w3.org/TR/media-frags/) and [URI Templates (RFC6570)](https://www.rfc-editor.org/rfc/rfc6570).<br>
The use of URI Templates is limited to pre-defined variables and Level0 fragments-expansion only, which makes it quite safe.<br>
n fact, it is much safer than relying on a scripting language (javascript) which can change URN too.

# FAQ 

**Q:** Why is everything HTTP GET-based, what about POST/PUT/DELETE HATEOS<br>
**A:** Because it's out of scope: XR Fragment specifies a read-only way to surf XR documents. These things belong in the application layer (for example, an XR Hypermedia browser can decide to support POST/PUT/DELETE requests for embedded HTML thru `src` values)

---

**Q:** Why isn't there support for scripting, URI Template Fragments are so limited compared to WASM & javascript
**A:** This is out of scope as it unhyperifies hypermedia, and this is up to XR hypermedia browser-extensions.<br> Historically scripting/Javascript seems to been able to turn webpages from hypermedia documents into its opposite (hyperscripted nonhypermedia documents).<br>In order to prevent this backward-movement (hypermedia tends to liberate people from finnicky scripting) XR Fragment uses [W3C Media Fragments](https://www.w3.org/TR/media-frags/) and [URI Templates (RFC6570)](https://www.rfc-editor.org/rfc/rfc6570), to prevent unhyperifying itself by hardcoupling to a particular markup or scripting language. <br>
XR Fragments supports filtering objects in a scene only, because in the history of the javascript-powered web, showing/hiding document-entities seems to be one of the most popular basic usecases.<br>
Doing advanced scripting & networkrequests under the hood are obviously interesting endavours, but this is something which should not be hardcoupled with XR Fragments or hypermedia.<br>This perhaps belongs more to browser extensions.<br>
Non-HTML Hypermedia browsers should make browser extensions the right place, to 'extend' experiences, in contrast to code/javascript inside hypermedia documents (this turned out as a hypermedia antipattern).

# authors

* Leon van Kammen (@lvk@mastodon.online)
* Jens Finkhäuser (@jens@social.finkhaeuser.de)

# IANA Considerations

This document has no IANA actions.

# Acknowledgments

* [NLNET](https://nlnet.nl)
* [Future of Text](https://futureoftext.org)
* [visual-meta.info](https://visual-meta.info)
* Michiel Leenaars
* Gerben van der Broeke
* Mauve
* Jens Finkhäuser
* Marc Belmont
* Tim Gerritsen
* Frode Hegland
* Brandel Zackernuk
* Mark Anderson

# Appendix: Definitions 

|definition            | explanation                                                                                                                          |
|----------------------|--------------------------------------------------------------------------------------------------------------------------------------|
|human                 | a sentient being who thinks fuzzy, absorbs, and shares thought (by plain text, not markuplanguage)                                   |
|scene                 | a (local/remote) 3D scene or 3D file (index.gltf e.g.)                                                                               |
|3D object             | an object inside a scene characterized by vertex-, face- and customproperty data.                                                    |
|URI                   | some resource at something somewhere via someprotocol (`http://me.com/foo.glb#foo` or `e76f8efec8efce98e6f` [see interpeer.io](https://interpeer.io))|
|URL                   | something somewhere via someprotocol (`http://me.com/foo.glb`)                                                                       |
|URN                   | something at some domain (`me.com/foo.glb`)                                                                                          |
|metadata              | custom properties of text, 3D Scene or Object(nodes), relevant to machines and a human minority (academics/developers)               |
|XR fragment           | URI Fragment with spatial hints like `#pos=0,0,0&t=1,100` e.g.                                                                       |
|the XRWG              | wordgraph (collapses 3D scene to tags)       |
|the hashbus           | hashtags map to camera/scene-projections     |
|spacetime hashtags    | positions camera, triggers scene-preset/time |
|teleportation         | repositioning the enduser to a different position (or 3D scene/file) |
|sourceportation       | teleporting the enduser to the original XR Document of an `src` embedded object. |
|placeholder object    | a 3D object which with src-metadata (which will be replaced by the src-data.) |  
|src                   | (HTML-piggybacked) metadata of a 3D object which instances content                                                                   |
|href                  | (HTML-piggybacked) metadata of a 3D object which links to content                                                                    |
|filter                | URI Fragment(s) which show/hide object(s) in a scene based on name/tag/property (`#cube&-price=>3`)                                          |
|visual-meta           | [visual-meta](https://visual.meta.info) data appended to text/books/papers which is indirectly visible/editable in XR.               |
|requestless metadata  | metadata which never spawns new requests (unlike RDF/HTML, which can cause framerate-dropping, hence not used a lot in games)        |
|FPS                   | frames per second in spatial experiences (games,VR,AR e.g.), should be as high as possible                                           |
|introspective         | inward sensemaking ("I feel this belongs to that")                                                                                   |
|extrospective         | outward sensemaking ("I'm fairly sure John is a person who lives in oklahoma")                                                       |
|`◻`                   | ascii representation of an 3D object/mesh                                                                                            |
|(un)obtrusive         | obtrusive: wrapping human text/thought in XML/HTML/JSON obfuscates human text into a salad of machine-symbols and words              |
|flat 3D object        | a 3D object of which all verticies share a plane                                                                                       |
|BibTeX                | simple tagging/citing/referencing standard for plaintext                                                                             |
|BibTag                | a BibTeX tag                                                                                                                         |
|(hashtag)bibs         | an easy to speak/type/scan tagging SDL ([see here](https://github.com/coderofsalvation/hashtagbibs) which expands to BibTex/JSON/XML |

