
// in the browser use this instead of require():
// 
//   <script src="dist/xrfragment.js"></script>
//	 <script>
//	    var XRF = xrfragment;
//   </script>


console.assert = ((assert) => (a,b) => {
  console.log("\x1b[34m♥ \x1b[36;49mtest: "+b.reason+"\x1B[m")
  assert.call( console, a, b )
  if( !a ) throw 'abort..'

})(console.assert)

/* 
 * parser checks
 */
let frags = xrf.URI.parse('://foo.com/1.gltf#pos=1.0,2.0,3.0&t=0,100').XRF
console.assert( frags.t, {frags, reason:'URI.parse(): t needs to be set'})

let frag = xrf.URI.parse("#foo=1").XRF
console.assert( frag, {reason: 'xrf.URI.parse() should be available'})

