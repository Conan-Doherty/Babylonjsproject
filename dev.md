# Code Documentation


# Element 5
In Element 5, I have included:
* Arc Rotate Camera
* Imported Mesh
* Animation
* Movement in the form of a sphere that can be rotated with keyboard inputs
* mesh picking with a mesh display to show locations that have been picked
* mesh merging to create the custom mesh of the pin game object
* cloning of mesh to create multiple of the pin objects
* GUI with scene transitions from a main menu to the main game scene

-------------------------------------------------------------------------------------
# TypeScripts created for element
## Main Menu Section
#### main menu creation script
```typescript
function createSceneButton(scene: Scene, name: string, index: string, x: string, y: string, advtex) {
    var panel = new GUI.StackPanel();
    advtex.addControl(panel);
    var title = new GUI.TextBlock(name,index);
    title.text = "Element 5";
    title.left = x;
    title.top = y;
    title.width = "160px";
    title.height = "60px";
    title.color = "white";
    title.fontSize = 20;
    panel.addControl(title);
    var button = GUI.Button.CreateSimpleButton(name, index);
        button.left = x;
        button.top = y;
        button.width = "160px";
        button.height = "60px";
        button.color = "white";
        button.cornerRadius = 20;
        button.background = "Black";
        const buttonClick = new Sound("MenuClickSFX", "./assets/menu-click.wav", scene, null, {
          loop: false, 
          autoplay: false, 
         });
        button.onPointerUpObservable.add(function() {
          buttonClick.play();
          setSceneIndex(1);
          gamemusic(scene);
        });
        panel.addControl(button);
        

    
        return scene;
 
 }
```
this script creates the main menu of the scene with a title and a play button and allows the sound effect and main background music to play on start
#### game music storing and variables script 
```typescript
function gamemusic(scene:Scene){
  const music = new Sound("Music", "assets/611422__gregorquendel__short-synth-intro-background.wav", scene, null, {
    loop: true,
    autoplay: true,
  });}
```
this script is for referencing the main background music and setting it to loop when played
## Game Scene Section
#### imported humanoid model script
```typescript
let currentspeed:number = 0.1;
  let walkspeed:number = 0.1; 
  let runspeed:number = 0.3;
function importPlayerMesh(scene,collider:Mesh,cam:Camera) {
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
mesh.parent = cam;
mesh.position.z = 3;
mesh.position.x = -2;
mesh.position.y = -1;
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
```
this script imports the model to the scene and sets it to animate when the player presses certain buttons
#### action manager script
```typescript
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
```
```typescript
 let keyDownMap: any[] = [];
```
this script is responsible for managing the player inputs along with a declaration outside functions that creates a array for keydown
#### pin creation, cloning and adding of a floating text object
```typescript
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
function addtext(scene:Scene,m:any,s:string){
  var plane = MeshBuilder.CreatePlane("textplane",{width:4,height:2});
  plane.parent = m;
  plane.position.y = 2;
  plane.rotation.x = 2;
  plane.name = s;
  m.name = s;
  var advancedTexture = GUI.AdvancedDynamicTexture.CreateForMesh(plane);
  var button = new GUI.TextBlock();
  button.text = s;
  button.width = 1;
  button.height = 0.4;
  button.color = "white";
  button.fontSize = 200;
  advancedTexture.addControl(button);
  m.isPickable = true;
  
  return scene;
}

function ClonePin(scene:Scene,px:number,py:number,pz:number,s:number,rx:number,ry:number,rz:number,parent:Mesh){
  const tobecloned = CreatePin(scene,px,pz);
  const Clone = tobecloned.clone("clone");
  tobecloned.dispose();
  Clone.parent = parent;
  
  
  Clone.position.x = px;
  Clone.position.z = pz;
  Clone.position.y = py;
  Clone.scaling = new Vector3(s,s,s);
  Clone.rotation = new Vector3(rx,ry,rz);
  
  return Clone;
}
```
these scripts are responsible for creating the merged mesh pin and parenting it to an object with thier own parented text object using a plane
#### creation of earthsphere with inputs script
```typescript
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
  scene.onBeforeRenderObservable.add(()=> { 
    let keydown: boolean = false;
    let shiftdown:boolean = false;
    
    if (keyDownMap["w"] || keyDownMap["ArrowUp"]) {
    
    earthsphere.rotation.x += .02; 
    keydown = true; 
    } 
    if (keyDownMap["a"] || keyDownMap["ArrowLeft"]) {
    
    earthsphere.rotation.y -= .02;
    keydown = true; 
    } 
    if (keyDownMap["s"] || keyDownMap["ArrowDown"]) {
     
    earthsphere.rotation.x -= .02;
    keydown = true; 
    } 
    if (keyDownMap["d"] || keyDownMap["ArrowRight"]) {
    
    earthsphere.rotation.y += .02;
    keydown = true; 
    }
    })
  
  //earthsphere.receiveShadows = true;
 // sphere.material = new Texture("assets/vintage-world-map-cartography-concept_52683-26377.jpg", scene);
  return earthsphere;
}
```
this script is responsible for creating a sphere, texturing it and adding a input checking section that rotates it depending on inputs
#### display box script
```typescript
function adddisplaytxt(scene:Scene){
  var buttonbox = document.createElement('div');
    buttonbox.id = "buttonbox";
    buttonbox.style.position = "absolute";
    buttonbox.style.top = "60px";
    buttonbox.style.left = "85%";
    buttonbox.style.border = "5pt inset blue";
    buttonbox.style.padding = "2pt";
    buttonbox.style.paddingRight = "2pt";
    buttonbox.style.width = "10em";
    buttonbox.style.display = "block";
    document.body.appendChild(buttonbox);

    var tTag = document.createElement('div');
    tTag.id = "choose";
    tTag.textContent = "Place";
    tTag.style.textAlign = "center";
    tTag.style.border = "2pt solid gold";
    tTag.style.marginLeft = "1.5pt";
    tTag.style.marginTop = "3pt";
    tTag.style.marginBottom = "2pt";
    tTag.style.backgroundColor = "dodgerblue";
    tTag.style.width = "96%";
    tTag.style.fontSize = "1.0em";
    tTag.style.color = "white";
    buttonbox.appendChild(tTag);


    var header = document.createElement('div');
    header.id = "header";
    header.textContent = "No Picked Pin";
    header.style.textAlign = "center";
    header.style.border = "2pt solid red";
    header.style.marginLeft = "1.5pt";
    header.style.backgroundColor = "teal";
    header.style.width = "96%";
    header.style.fontSize = "1.0em";
    header.style.color = "black";
    buttonbox.appendChild(header);
    
    window.addEventListener("click", function () {
      // We try to pick an object
      let pickResult = scene.pick(scene.pointerX, scene.pointerY);
      if (pickResult.hit&& pickResult != null) {
              
              header.textContent = pickResult.pickedMesh.name;
              }else{
                 header.textContent = "No Picked Mesh"; 
              }
      })

    
}
```
this script creates a box dispay that is capable of displaying the name of whatever mesh the user click on
# links
* here is a link to the earth texture: [earth_texture](https://img.freepik.com/free-vector/top-view-world-map-background_1308-68322.jpg?w=1480&t=st=1701348007~exp=1701348607~hmac=befac119fb68d4b691e4c3dea5c7237b47773292ea3140c645f99c04b9c6b395)

* here is a link to the babylon documentation site [babylon_documentation](https://doc.babylonjs.com/)