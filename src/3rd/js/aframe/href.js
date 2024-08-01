window.AFRAME.registerComponent('href', {
  schema: {
  },

  init: function () {
    if( !this.data ) return
    this.el.object3D.traverse( (m) => {
      if( m.geometry ){ 
        m.userData.href = this.data
      }
    })
  }

});

