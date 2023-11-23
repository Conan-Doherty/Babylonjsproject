//------------------------------------------------
//importing bbyjs
import setSceneIndex from "./index";
import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import {
    Scene,
    ArcRotateCamera,
    Vector3,
    HemisphericLight,
    MeshBuilder,
    Mesh,
    Light,
    Camera,
    Engine,
    StandardMaterial,
    Texture,
    Vector4,
    SpotLight,
    Color3,
    CubeTexture,
    Space,
    DirectionalLight,
    ShadowGenerator,
    SceneLoader,
    ExecuteCodeAction,
    ActionManager,
    AnimationPropertiesOverride,
    Sound,
    PivotTools,
    TransformNode,
    
    
  } from "@babylonjs/core";
  import * as GUI from "@babylonjs/gui"; 
   import HavokPhysics from "@babylonjs/havok"; 
   import { HavokPlugin, PhysicsAggregate, PhysicsShapeType } from "@babylonjs/core";
   
   //---------------------------------

 
 
 
   
   
   //-------------------------------------------
      //initializing physics engine
      let initializedHavok; 
      HavokPhysics().then((havok) => { 
      initializedHavok = havok; 
      });
      const havokInstance = await HavokPhysics();
      const havokPlugin = new HavokPlugin(true, havokInstance);
 
      globalThis.HK = await HavokPhysics();
  //--------------------------------------------
  //middle of code - functions
  // function createBox(scene: Scene, px:number,py:number,pz:number,sx:number,sy:number,sz:number) {
  //   let box = MeshBuilder.CreateBox("box",{size: 1}, scene);
  //   box.position = new Vector3(px,py,pz);
  //   box.scaling = new Vector3(sx,sy,sz);
  //   box.receiveShadows = true;
  //   const boxAggregate = new PhysicsAggregate(box, PhysicsShapeType.BOX, { mass: 1 }, scene);
  //   return box;
  // }
  //faced box function
  function createLight(scene: Scene) {
    const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
    light.intensity = 0.7;
    
    return light;
  }
  function createdirectionallight(scene: Scene, mesh1:Mesh,intensity:number,dx:number,dy:number,dz:number){
    var light = new DirectionalLight("dir01", new Vector3(dx, dy, dz), scene);
	light.position = new Vector3(20, 20, 20);
	light.intensity = 0.5;
   light.diffuse = new Color3(0.93, 0.95, 0.84);
    var lightSphere = Mesh.CreateSphere("sphere", 10, 2, scene);
    lightSphere.parent = light;
    var lightspheremat = new StandardMaterial("lightspheremat",scene)
   	lightSphere.position = light.position;
	  lightSphere.material = new StandardMaterial("light", scene);
    var shadowGenerator = new ShadowGenerator(1024, light);
    shadowGenerator.addShadowCaster(mesh1);
    //shadowGenerator.addShadowCaster(mesh2);
    shadowGenerator.useExponentialShadowMap = true;
   //(1, 1, 0);
     light.intensity = intensity;
  }
  
  
  function createspotlight(scene: Scene,px:number,py:number,pz:number){
    var light = new SpotLight("spotLight", new Vector3(-1, 1, -1), new Vector3(0, -1, 0), Math.PI / 2, 10, scene);
    light.diffuse = new Color3(0.02, 0.97, 0.81);
    light.specular = new Color3(1, 1, 1);
    light.intensity = 2;
    
    return light;
  }
  function createSphere(scene: Scene,px:number,py:number,pz:number) {
    let sphere = MeshBuilder.CreateSphere(
      "sphere",
      { diameter: 2, segments: 32 },
      scene,
    );
    sphere.position.y = 1;
    sphere.outlineColor = new Color3(1,0,1);
    sphere.receiveShadows = true;
    sphere.position.x = px;
    sphere.position.y = py;
    sphere.position.z = pz;
    return sphere;
  }
  function createskybox(scene:Scene){
    
    var skybox = MeshBuilder.CreateBox("skyBox", {size:1000.0}, scene);
    var skyboxMaterial = new StandardMaterial("skyBox", scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.reflectionTexture = new CubeTexture("assets/skybox", scene);
    skyboxMaterial.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new Color3(0, 0, 0);
    skyboxMaterial.specularColor = new Color3(0, 0, 0);
    skybox.material = skyboxMaterial;			
        
      return scene;
  }
  function createArcRotateCamera(scene: Scene,tar:Mesh) {
    let camAlpha = -Math.PI / 2,
      camBeta = Math.PI / 2.5,
      camDist = 200,
      camTarget = tar.position;
    let camera = new ArcRotateCamera(
      "camera1",
      camAlpha,
      camBeta,
      camDist,
      camTarget,
      scene,
    );
    camera.attachControl(true);
    return camera;
  }
 

     let keyDownMap: any[] = [];
  let currentspeed:number = 0.1;
  let walkspeed:number = 0.1; 
  let runspeed:number = 0.3;
function importPlayerMesh(scene,collider:Mesh, x: number, y: number) {
let tempItem = { flag: false } 

 let item:any = SceneLoader.ImportMesh("", "./Models/", "dummy3.babylon", scene, 
 
 
function(newMeshes,particleSystems,skeletons) {
  let animating: boolean = false; 
let mesh = newMeshes[0]; 
let skeleton = skeletons[0];
skeleton.animationPropertiesOverride = new AnimationPropertiesOverride();
skeleton.animationPropertiesOverride.enableBlending = true; 
skeleton.animationPropertiesOverride.blendingSpeed = 0.05; 
skeleton.animationPropertiesOverride.loopMode = 1;
let walkRange: any = skeleton.getAnimationRange("YBot_Walk");
let runRange: any = skeleton.getAnimationRange("YBot_Run");
let leftRange: any = skeleton.getAnimationRange("YBot_LeftStrafeWalk");
let rightRange: any = skeleton.getAnimationRange("YBot_RightStrafeWalk");
let idleRange: any = skeleton.getAnimationRange("YBot_Idle");
/*
var idleanim = scene.animationGroups.find(a=>a.name === "YBot_Idle");
var idlepara = {name:"idle",anim:idleanim,weight:1};
var walkanim = scene.animationGroups.find(a=>a.name === "YBot_Walk");
var walkpara = {name:"walk",anim:idleanim,weight:1};
var runanim = scene.animationGroups.find(a=>a.name === "YBot_Run");
var runpara = {name:"Run",anim:idleanim,weight:1};
*/
 scene.onBeforeRenderObservable.add(()=> { 
  let keydown: boolean = false;
  
  
  if (keyDownMap["w"] || keyDownMap["ArrowUp"]) {
  
  mesh.rotation.y = 0; 
  keydown = true; 
  } 
  if (keyDownMap["a"] || keyDownMap["ArrowLeft"]) {
  
  mesh.rotation.y = 3 * Math.PI / 2; 
  keydown = true; 
  } 
  if (keyDownMap["s"] || keyDownMap["ArrowDown"]) {
  
  mesh.rotation.y = 2 * Math.PI / 2; 
  keydown = true; 
  } 
  if (keyDownMap["d"] || keyDownMap["ArrowRight"]) {
  
  mesh.rotation.y = Math.PI / 2; 
  keydown = true; 
  }
  if (keydown) {
    if (!animating) {
      
      
      
        animating = true; 
        
        scene.beginAnimation(skeleton, walkRange.from, walkRange.to, true);
      
    
    
    } 
   } else { 
    animating = false; 
    scene.stopAnimation(skeleton);
   } 
   //collision
    if(mesh.intersectsMesh(collider)){
      console.log("Collided");
    }
 });
  // physics collision
  item = mesh; 
  let playerAggregate = new PhysicsAggregate(item, PhysicsShapeType.CAPSULE, { mass: 0
  }, scene);
  playerAggregate.body.disablePreStep = false;
});
 return item;
}
 function actionManager(scene: Scene){
  scene.actionManager = new ActionManager(scene);
  scene.actionManager.registerAction( 
  new ExecuteCodeAction( 
  { 
  trigger: ActionManager.OnKeyDownTrigger, 
  //parameters: 'w' 
  },
  function(evt) {keyDownMap[evt.sourceEvent.key] = true; }
  ) 
  );
  scene.actionManager.registerAction( 
  new ExecuteCodeAction( 
  { 
  trigger: ActionManager.OnKeyUpTrigger
  
  },
  function(evt) {keyDownMap[evt.sourceEvent.key] = false; }
  ) 
  );
  return scene.actionManager; 
 } 
 function CreatePin(scene:Scene,px:number,pz:number){
  const needle = MeshBuilder.CreateCylinder("cone",{diameterBottom:0,tessellation:20,height:2,diameterTop:1},scene);
  const pintop = MeshBuilder.CreateCylinder("pintop",{diameter:1.25,height:0.5},scene);
  var pinmat = new StandardMaterial("pinmat",scene);
  pinmat.diffuseColor = new Color3(1, 0.28, 0);
  needle.material = pinmat;
  pintop.material = pinmat;
  pintop.position.y = 1;
  const Pin:any = Mesh.MergeMeshes([needle,pintop],true,false,undefined,false,true);
  Pin.name = ("Pin");
  Pin.position.y = 1;
  Pin.position.x = px;
  Pin.position.z = pz;
  
  return Pin;
} 
function ClonePin(scene:Scene,px:number,py:number,pz:number,s:number,rx:number,ry:number,rz:number,parent:Mesh){
  const tobecloned = CreatePin(scene,px,pz)
  const Clone = tobecloned.clone("clone");
  tobecloned.dispose();
  Clone.parent = parent;
  var pivot = new TransformNode("root");
  
  Clone.position.x = px;
  Clone.position.z = pz;
  Clone.position.y = py;
  Clone.scaling = new Vector3(s,s,s);
  Clone.rotation = new Vector3(rx,ry,rz);
  return Clone;
}
function createtexturedsphere(scene:Scene,px:number,py:number,pz:number,s:number){
  let earthsphere = MeshBuilder.CreateSphere(
    "earth",
    { diameter: 2, segments: 32 },
    scene,
  );
  earthsphere.position.x = px;
  earthsphere.position.y = py;
  earthsphere.position.z = pz;
  earthsphere.scaling = new Vector3(s,s,s);
  let spheremat = new StandardMaterial("earthmat",scene);
  spheremat.diffuseTexture = new Texture("assets/top-view-world-map-background_1308-68322.jpg")
  earthsphere.material = spheremat;
  
  // scene.registerAfterRender(function () {
  //   earthsphere.rotate(new Vector3(2, 6, 4)/*axis*/,
  //   .05/*angle*/, Space.LOCAL);
  //   });
  //earthsphere.receiveShadows = true;
 // sphere.material = new Texture("assets/vintage-world-map-cartography-concept_52683-26377.jpg", scene);
  return earthsphere;
}
  //------------------------------------------
  //bottom of code - main rendering area for scene
  export default function GameScene(engine: Engine) {
    
    interface SceneData {
      facebox? : Mesh;
      scene: Scene;
      box?: Mesh;
      light?: Light;
      sphere?: Mesh;
      ground?: Mesh;
      camera?: Camera;
      spotlight?:SpotLight;
      importMesh?:any;
      actionManager?:any;
      Pin?:Mesh;
      Clone?:Mesh;
      earthsphere?:Mesh;
    }
  
    let that: SceneData = { scene: new Scene(engine) };
    that.scene.debugLayer.show();
    that.scene.enablePhysics(new Vector3(0, -9.8, 0), havokPlugin);
  // that.scene.enablePhysics(new Vector3(0, -9.8, 0), havokPlugin); //enables physics
  //create box with pos in first three and scale in last three digits
    
    that.sphere = createSphere(that.scene,1,4,7);
    that.sphere = createSphere(that.scene,3,6,8);
     
     
     that.earthsphere = createtexturedsphere(that.scene,0,0,0,100);
     that.camera = createArcRotateCamera(that.scene,that.earthsphere);
     that.Pin = ClonePin(that.scene,0,1,0,0.1,0,0,0,that.earthsphere);
     that.Pin = ClonePin(that.scene,0,0,1,0.1,1.5,0,0,that.earthsphere);
     that.Pin = ClonePin(that.scene,0,0,-1,0.1,-1.5,0,0,that.earthsphere);
     createskybox(that.scene);
     createdirectionallight(that.scene,that.sphere,1,-1,-0.5,-1);
     createdirectionallight(that.scene,that.sphere,0.5,1, -2, 1);
     that.light = createLight(that.scene);
     that.actionManager = actionManager(that.scene);
     return that;
  }
