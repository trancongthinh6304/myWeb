// Three JS
window.addEventListener('load', init, false);
function init() {
  createWorld();
  createGUI();
  createPrimitive();
  animation();
}

var Theme = {
  primary: 0xFFFFFF,
  secundary: 0x292733,
  danger: 0xFF0000,
  darker: 0x000000
};

//--------------------------------------------------------------------
var scene, camera, renderer, container;
var _width, _height;
var _primitive;
var shapeGroup = new THREE.Group();
var start = Date.now();

function createWorld() {
  _width = window.innerWidth;
  _height= window.innerHeight;
  //---
  scene = new THREE.Scene();
  scene.background = new THREE.Color(Theme.secundary);
  //---
  camera = new THREE.PerspectiveCamera(35, _width/_height, 1, 1000);
  camera.position.set(0,0,16);
  //---
  renderer = new THREE.WebGLRenderer({antialias:false, alpha:false});
  renderer.setSize(_width, _height);
  renderer.shadowMap.enabled = true;
  //---
  document.body.appendChild(renderer.domElement);
  //---
  window.addEventListener('resize', onWindowResize, false);
}
function onWindowResize() {
  _width = window.innerWidth;
  _height = window.innerHeight;
  renderer.setSize(_width, _height);
  camera.aspect = _width / _height;
  camera.updateProjectionMatrix();
  console.log('- resize -');
}
//--------------------------------------------------------------------
var primitiveElement = function() {
  this.mesh = new THREE.Object3D();
  mat = new THREE.ShaderMaterial( {
    side:THREE.DoubleSide,
    uniforms: {
      time: {
        type: "f",
        value: 0.1
      },
      pointscale: {
        type: "f",
        value: 0.2
      },
      decay: {
        type: "f",
        value: 0.3
      },
      size: {
        type: "f",
        value: 0.3
      },
      displace: {
        type: "f",
        value: 0.3
      },
      complex: {
        type: "f",
        value: 0.0
      },
      waves: {
        type: "f",
        value: 0.10
      },
      eqcolor: {
        type: "f",
        value: 0.0
      },
      rcolor: {
        type: "f",
        value: 0.0
      },
      gcolor: {
        type: "f",
        value: 0.0
      },
      bcolor: {
        type: "f",
        value: 0.0
      },
      fragment: {
        type: "i",
        value: true
      },
      redhell: {
        type: "i",
        value: true
      }
    },
    vertexShader: document.getElementById( 'vertexShader' ).textContent,
    fragmentShader: document.getElementById( 'fragmentShader' ).textContent
  });
  //---
  var wir_mat = new THREE.MeshBasicMaterial({color:Theme.darker});
  var geo = new THREE.IcosahedronBufferGeometry(2, 6);
  var wir = new THREE.IcosahedronBufferGeometry(2.3, 2);
  this.shape = new THREE.Mesh(geo, mat);
  this.point = new THREE.Points(wir, mat);
  //---
  shapeGroup.add(this.point);
  shapeGroup.add(this.shape);
  
  scene.add(shapeGroup);
}
function createPrimitive() {
  _primitive = new primitiveElement();
}

var options = {
  perlin: {
    speed: 0.4,
    size: 0.7,
    perlins: 1.0,
    decay: 1.20,
    displace: 0.3,
    complex: 1.0,
    waves: 0.7,
    eqcolor: 10.0,
    rcolor: 0.32,
    gcolor: 0.05,
    bcolor: 0.85,
    fragment: true,
    points: true,
    redhell: false
  },
  perlinRandom: function() {
    TweenMax.to(this.perlin, 2, {
      //decay: Math.random() * 1.0,
      waves: Math.random() * 10.0,
      complex: Math.random() * 1.0,
      displace: Math.random() * 2.5,
      ease:Elastic.easeOut
    });
  },
  random: function() {
    //this.perlin.redhell = Math.random() >= 0.5; // 10 1 0.1 1.2
    TweenMax.to(this.perlin, 1, {
      eqcolor: 11.0,
      rcolor: Math.random() * 1.5,
      gcolor: Math.random() * 0.5,
      bcolor: Math.random() * 1.5,
      ease:Quart.easeInOut
    });
  },
  normal: function() {
    this.perlin.redhell = true; // 10 1 0.1 1.2
    TweenMax.to(this.perlin, 1, {
      size: 0.7,
      waves: 0.6,
      complex: 1.0,
      displace: 0.3,
      eqcolor: 10.0,
      rcolor: 0.32,
      gcolor: 0.05,
      bcolor: 0.85,
      ease:Quart.easeInOut
    });
  },
  darker: function() {
    this.perlin.redhell = false; // 10 1 0.1 1.2
    TweenMax.to(this.perlin, 1, {
      //speed: 0.5,
      eqcolor: 9.0,
      rcolor: 0.4,
      gcolor: 0.05,
      bcolor: 0.6,
      ease:Quart.easeInOut
    });
  },
  ocean: function() {
    this.perlin.redhell = false; // 10 1 0.1 1.2
    //this.perlin.speed = 0.83;
    
    TweenMax.to(this.perlin, 1, {
      size: 0.7,
      waves: 0.6,
      complex: 1.0,
      displace: 0.3,
      eqcolor: 10.0,
      rcolor: 0.32,
      gcolor: 0.05,
      bcolor: 0.85,
      ease:Quart.easeInOut
    });
  },
  forest: function() {
    this.perlin.redhell = true; // 10 1 0.1 1.2
    //this.perlin.speed = 0.1;
    
    TweenMax.to(this.perlin, 1, {
      size: 0.7,
      waves: 0.6,
      complex: 1.0,
      displace: 0.3,
      eqcolor: 10.0,
      rcolor: 0.32,
      gcolor: 0.65,
      bcolor: 0.85,
      ease:Quart.easeInOut
    });
  },
  pinky: function() {
    this.perlin.redhell = true; // 10 1 0.1 1.2
    //this.perlin.speed = 0.25;
    
    TweenMax.to(this.perlin, 1, {
      size: 1.0,
      waves: 3.0,
      complex: 0.65,
      displace: 0.5,
      eqcolor: 9.5,
      rcolor: 4,
      gcolor: 1.5,
      bcolor: 1.5,
      ease:Quart.easeInOut
    });
  }
}

function createGUI() {
  var gui = new dat.GUI();
    
  var perlinGUI = gui.addFolder('Shape Setup');
  perlinGUI.add(options, 'perlinRandom').name('• Random Shape');
  perlinGUI.add(options.perlin, 'speed', 0.1, 1.0).name('Speed').listen();
  perlinGUI.add(options.perlin, 'size', 0.0, 3.0).name('Size').listen();
  //perlinGUI.add(options.perlin, 'decay', 0.0, 1.0).name('Decay').listen();
  perlinGUI.add(options.perlin, 'waves', 0.0, 20.0).name('Waves').listen();
  perlinGUI.add(options.perlin, 'complex', 0.1, 1.0).name('Complex').listen();
  perlinGUI.add(options.perlin, 'displace', 0.1, 2.5).name('Displacement').listen();
  //perlinGUI.open();
  
  var colorGUI = gui.addFolder('Color');
  colorGUI.add(options, 'random').name('• Random colors');
  colorGUI.add(options, 'normal').name('• Normal colors');
  colorGUI.add(options, 'darker').name('• Dark colors');
  colorGUI.add(options.perlin, 'eqcolor', 0.0, 30.0).name('Hue').listen();
  colorGUI.add(options.perlin, 'rcolor', 0.0, 2.5).name('R').listen();
  colorGUI.add(options.perlin, 'gcolor', 0.0, 2.5).name('G').listen();
  colorGUI.add(options.perlin, 'bcolor', 0.0, 2.5).name('B').listen();
  colorGUI.add(options.perlin, 'redhell', true).name('Electroflow');
  
  //colorGUI.open();
  
  gui.add(options, 'ocean').name('• Ocean');
  gui.add(options, 'forest').name('• Forest');
  gui.add(options, 'pinky').name('• Pinky');
  gui.add(options.perlin, 'points', true).name('Points');
}

//--------------------------------------------------------------------
function animation() {
  var performance = Date.now() * 0.003;
  //---
  //_primitive.shape.visible = !options.perlin.points;
  _primitive.point.visible = options.perlin.points;
  //---
  mat.uniforms['time'].value = (options.perlin.speed / 1000) * (Date.now() - start);
  
  mat.uniforms['pointscale'].value =    options.perlin.perlins;
  mat.uniforms['decay'].value =         options.perlin.decay;
  mat.uniforms['size'].value =          options.perlin.size;
  mat.uniforms['displace'].value =      options.perlin.displace;
  mat.uniforms['complex'].value =       options.perlin.complex;
  mat.uniforms['waves'].value =         options.perlin.waves;
  mat.uniforms['fragment'].value =      options.perlin.fragment;
  
  mat.uniforms['redhell'].value =       options.perlin.redhell;
  mat.uniforms['eqcolor'].value =       options.perlin.eqcolor;
  mat.uniforms['rcolor'].value =        options.perlin.rcolor;
  mat.uniforms['gcolor'].value =        options.perlin.gcolor;
  mat.uniforms['bcolor'].value =        options.perlin.bcolor;
  //---
  requestAnimationFrame(animation);
  renderer.render(scene, camera);
}