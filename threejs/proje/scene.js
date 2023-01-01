import * as THREE from "three";
import { MTLLoader } from "./MTLLoader";
import { OBJLoader } from "./OBJLoader";

var scene;
var camera;
var renderer;
var params = { color: 0x00ff00};

function createScene() {

 var gui = new dat.GUI();

 scene = new THREE.Scene();
 camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 100);
 renderer = new THREE.WebGLRenderer({physicallyCorrectLights: true, antialias: true, powerPreference:'high-performance'});
 renderer.shadowMap.enabled = true;
renderer.setSize(window.innerWidth,window.innerHeight);
document.getElementById('app').appendChild(renderer.domElement);



createBox('box1',1,1,1, 2, 0.5, 2, 'wood');
createBox('floor',20,1,20, 0, -0.5, 0, 0x00ff00);
createSpotLight();
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 5;

 

//models
const mtlLoader = new MTLLoader();
mtlLoader.load("./models/Tent_Poles_01.mtl", function(material){
material.preload();
const objLoader = new OBJLoader();
objLoader.setMaterials(material);
objLoader.load("./models/Tent_Poles_01.obj", function(mesh){
  mesh.position.set(1, 0, -2);
  mesh.rotation.set(0, 3, 0);
  mtlLoader.castShadow = true;
  scene.add(mesh);


});
});


const textureLoader =new THREE.TextureLoader();
const tilesBaseColor = textureLoader.load('../textures/Metal_Tiles_003_basecolor.jpg');
const tilesNormalMap = textureLoader.load('../textures/Metal_Tiles_003_normal.jpg');
const tilesHeightMap = textureLoader.load('../textures/Metal_Tiles_003_height.png');
const tilesRoughnessMap =textureLoader.load('../textures/Metal_Tiles_003_roughness.jpg'); 
const tilesAmbientOcclusionMap = textureLoader.load('../textures/Metal_Tiles_003_ambientOcclusion.jpg');
const tilesMetallic = textureLoader.load('../textures/Metal_Tiles_003_metallic.jpg');


const plane1 = new THREE.Mesh(new THREE.PlaneGeometry(2,2),
  new THREE.MeshStandardMaterial(
    {
      map : tilesBaseColor
    }

  ))

plane1.position.y= 1
plane1.position.x = 8
plane1.position.z= -7;

scene.add(plane1)

const plane2 = new THREE.Mesh(new THREE.PlaneGeometry(2,2),
  new THREE.MeshStandardMaterial(
    {
      map : tilesBaseColor,
      
    }

  ))

plane2.position.y= 1
plane2.position.x = 5.8
plane2.position.z= -7;

scene.add(plane2)

const plane3 = new THREE.Mesh(new THREE.PlaneGeometry(2,2),
  new THREE.MeshStandardMaterial(
    {
      map : tilesBaseColor,
      
    }

  ))

plane3.position.y= 1
plane3.position.x = 3.6
plane3.position.z= -7;

scene.add(plane3)

const plane4 = new THREE.Mesh(new THREE.PlaneGeometry(2,2),
  new THREE.MeshStandardMaterial(
    {
      map : tilesBaseColor,
      normalMap: tilesNormalMap,
      displacementMap: tilesHeightMap
      
    }

  ))

plane4.position.y= 1
plane4.position.x = 1.6
plane4.position.z= -7;

scene.add(plane4)


const plane5 = new THREE.Mesh(new THREE.PlaneGeometry(2,2),
  new THREE.MeshStandardMaterial(
    {
      map : tilesBaseColor,
      
    }

  ))

plane5.position.y= 1
plane5.position.x = -0.5
plane5.position.z= -7;

scene.add(plane5)

const plane6 = new THREE.Mesh(new THREE.PlaneGeometry(2,2),
  new THREE.MeshStandardMaterial(
    {
      map : tilesBaseColor,
      
    }

  ))

plane6.position.y= 1
plane6.position.x = -2.5
plane6.position.z= -7;

scene.add(plane6)

const plane7 = new THREE.Mesh(new THREE.PlaneGeometry(2,2),
  new THREE.MeshStandardMaterial(
    {
      map : tilesBaseColor,
      
    }

  ))

plane7.position.y= 1
plane7.position.x = -4.5
plane7.position.z= -7;

scene.add(plane7)

const plane8 = new THREE.Mesh(new THREE.PlaneGeometry(2,2),
  new THREE.MeshStandardMaterial(
    {
      map : tilesBaseColor,
      
    }

  ))

plane8.position.y= 1
plane8.position.x = -6.5
plane8.position.z= -7;

plane1.castShadow = true;
scene.add(plane8)


const directionalLight = new THREE.DirectionalLight(0xffffff,1);
directionalLight.position.x += 20
directionalLight.position.y += 20
directionalLight.position.z += 20
directionalLight.castShadow = true;
scene.add(directionalLight);







scene.background = new THREE.Color(0x2b16d4);
//const textureLoader = new THREE.TextureLoader();



//CAMERA
var cf=gui.addFolder('Camera');
cf.add(camera.position, 'x', -20, 20);
cf.add(camera.position, 'y', -20, 20);
cf.add(camera.position, 'z', -20, 20);
cf.add(camera, 'fov', 0, 100);
cf.add(camera, 'far', 0, 100);
cf.add(camera, 'near', 0, 100);
cf.add(camera, 'aspect', 0, 3);
cf.add(camera, 'zoom', 0, 3);

camera.lookAt(new THREE.Vector3(1, 0, 0));


var fp =gui.addFolder('position');
var fr =gui.addFolder('rotation');
var fc =gui.addFolder('color');

fp.add(scene.getObjectByName('box1').position, 'x', 0, 5);
fp.add(scene.getObjectByName('box1').position, 'y', 0, 5);
fp.add(scene.getObjectByName('box1').position, 'z', 0, 5);

fr.add(scene.getObjectByName('box1').rotation, 'x', 0, 5);
fr.add(scene.getObjectByName('box1').rotation, 'y', 0, 5);
fr.add(scene.getObjectByName('box1').rotation, 'z', 0, 5);

fc.addColor(params, 'color').onChange(function () {scene.getObjectByName('box1').material.color.set(params.color) });
render();
}


function render() {
    renderer.render(scene,camera);
    scene.getObjectByName('box1').rotation.x += 0.01;
    requestAnimationFrame(render);
}

function createBox(name, w, h, d, x, y, z, color){
var flakeCount = 9000;
var flakeGeometry = new THREE.TetrahedronGeometry(0.035); // radius
var flakeMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
var snow = new THREE.Group();

for (let i = 0; i < flakeCount; i++) {
  var flakeMesh = new THREE.Mesh(flakeGeometry, flakeMaterial);
  flakeMesh.position.set(
    (Math.random() - 0.5) * 40,
    (Math.random() - 0.5) * 20,
    (Math.random() - 0.5) * 40
  );
  snow.add(flakeMesh);
}
scene.add(snow);



var flakeArray = snow.children;
//TREE
    var tree = new THREE.Group();
    var trunkGeometry = new THREE.CylinderGeometry(0.2, 0.2, 1);
    var trunkMaterial = new THREE.MeshPhongMaterial({ color: 0x49311c });
    var trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);

var leavesGeometry = new THREE.ConeGeometry(1.2, 2, 6);
var leavesMaterial = new THREE.MeshPhongMaterial({ color: 0x3d5e3a });
var leavesBottom = new THREE.Mesh(leavesGeometry, leavesMaterial);
leavesBottom.position.y = 1.2;
tree.add(leavesBottom);

var leavesMiddle = new THREE.Mesh(leavesGeometry, leavesMaterial);
leavesMiddle.position.y = 2.2;
tree.add(leavesMiddle);

var leavesTop = new THREE.Mesh(leavesGeometry, leavesMaterial);
leavesTop.position.y = 3.2;
tree.add(leavesTop);

tree.position.y = -0.3;
tree.position.x = -5;
tree.position.z = -2;
tree.castShadow = true;


//tree 2
var tree2 = new THREE.Group();
var trunkGeometry2 = new THREE.CylinderGeometry(0.2, 0.2, 1);
var trunkMaterial2 = new THREE.MeshPhongMaterial({ color: 0x49311c });
var trunk2 = new THREE.Mesh(trunkGeometry2, trunkMaterial2);

var leavesGeometry2 = new THREE.ConeGeometry(1.2, 2, 6);
var leavesMaterial2 = new THREE.MeshPhongMaterial({ color: 0x3d5e3a });
var leavesBottom2 = new THREE.Mesh(leavesGeometry2, leavesMaterial2);
leavesBottom2.position.y = 1.2;
tree2.add(leavesBottom2);

var leavesMiddle2 = new THREE.Mesh(leavesGeometry2, leavesMaterial2);
leavesMiddle2.position.y = 2.2;
tree2.add(leavesMiddle2);

var leavesTop2 = new THREE.Mesh(leavesGeometry2, leavesMaterial2);
leavesTop2.position.y = 3.2;
tree2.add(leavesTop2);

tree2.position.y = -0.3;
tree2.position.x = -5;
tree2.position.z = -6;

//tree 3
var tree3 = new THREE.Group();
var trunkGeometry3 = new THREE.CylinderGeometry(0.2, 0.2, 1);
var trunkMaterial3 = new THREE.MeshPhongMaterial({ color: 0x49311c });
var trunk3 = new THREE.Mesh(trunkGeometry2, trunkMaterial2);

var leavesGeometry3 = new THREE.ConeGeometry(1.2, 2, 6);
var leavesMaterial3 = new THREE.MeshPhongMaterial({ color: 0x3d5e3a });
var leavesBottom3 = new THREE.Mesh(leavesGeometry3, leavesMaterial3);
leavesBottom3.position.y = 1.2;
tree3.add(leavesBottom3);

var leavesMiddle3 = new THREE.Mesh(leavesGeometry3, leavesMaterial3);
leavesMiddle3.position.y = 2.2;
tree3.add(leavesMiddle3);

var leavesTop3 = new THREE.Mesh(leavesGeometry3, leavesMaterial3);
leavesTop3.position.y = 3.2;
tree3.add(leavesTop3);

tree3.position.y = -0.3;
tree3.position.x = 5;
tree3.position.z = -6;

tree3.add(trunk3);
scene.add(tree3);


//tree 4
var tree4 = new THREE.Group();
var trunkGeometry4 = new THREE.CylinderGeometry(0.2, 0.2, 1);
var trunkMaterial4 = new THREE.MeshPhongMaterial({ color: 0x49311c });
var trunk4 = new THREE.Mesh(trunkGeometry4, trunkMaterial4);

var leavesGeometry4 = new THREE.ConeGeometry(1.2, 2, 6);
var leavesMaterial4 = new THREE.MeshPhongMaterial({ color: 0x3d5e3a });
var leavesBottom4 = new THREE.Mesh(leavesGeometry4, leavesMaterial4);
leavesBottom4.position.y = 1.2;
tree4.add(leavesBottom4);

var leavesMiddle4 = new THREE.Mesh(leavesGeometry4, leavesMaterial4);
leavesMiddle4.position.y = 2.2;
tree4.add(leavesMiddle4);

var leavesTop4 = new THREE.Mesh(leavesGeometry2, leavesMaterial2);
leavesTop4.position.y = 3.2;
tree4.add(leavesTop2);

tree4.position.y = -0.3;
tree4.position.x = 5;
tree4.position.z = -2;

tree4.add(trunk4);
scene.add(tree4);



var geometry = new THREE.BoxGeometry(w, h, d);
var material = new THREE.MeshBasicMaterial({ color: 0xffffff });
var loader = new THREE.TextureLoader();
material.map = loader.load('../textures/mor.png');
//material.aoMap = loader.load('../textures/cicek.jpeg');
material.transparent = true;
material.opacity = 0.5;
var mesh = new THREE.Mesh(geometry, material);
mesh.position.set(x, y, z);
mesh.name = name;
mesh.castShadow = true;
mesh.receiveShadow = true;



tree.add(trunk);
tree2.add(trunk2);
scene.add(mesh);
scene.add(tree);
scene.add(tree2);

}



function createSpotLight(){
    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(1, 1, 4);
    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 4096;
    spotLight.shadow.mapSize.height = 4096;
    scene.add(spotLight);
}






createScene();