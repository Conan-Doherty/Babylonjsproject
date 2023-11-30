//------------------------------------------------
//importing bbyjs
import setSceneIndex from "./index";
import "@babylonjs/core/Debug/debugLayer";
//import "@babylonjs/inspector";
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
    CreateText,
    
    
    
  } from "@babylonjs/core";
  import * as GUI from "@babylonjs/gui"; 
   import HavokPhysics from "@babylonjs/havok"; 
   import { HavokPlugin, PhysicsAggregate, PhysicsShapeType } from "@babylonjs/core";
   //---------------------------------
   function createSceneButton(scene: Scene, name: string, index: string, x: string, y: string, advtex) {

    var button = GUI.Button.CreateSimpleButton(name, index);
        button.left = x;
        button.top = y;
        button.width = "160px";
        button.height = "60px";
        button.color = "white";
        button.cornerRadius = 20;
        button.background = "green";
        const buttonClick = new Sound("MenuClickSFX", "./assets/menu-click.wav", scene, null, {
          loop: false, 
          autoplay: false, 
         });
        button.onPointerUpObservable.add(function() {
          buttonClick.play();
          setSceneIndex(1);
          gamemusic(scene);
        });
        advtex.addControl(button);
        return button;
 
 }
 function gamemusic(scene:Scene){
  const music = new Sound("Music", "assets/611422__gregorquendel__short-synth-intro-background.wav", scene, null, {
    loop: true,
    autoplay: true,
  });
  }
  function createLight(scene: Scene) {
    const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
    light.intensity = 0.7;
    
    return light;
  }
  function createspotlight(scene: Scene,px:number,py:number,pz:number){
    var light = new SpotLight("spotLight", new Vector3(-1, 1, -1), new Vector3(0, -1, 0), Math.PI / 2, 10, scene);
    light.diffuse = new Color3(0.02, 0.97, 0.81);
    light.specular = new Color3(1, 1, 1);
    light.intensity = 2;
    
    return light;
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
  function createArcRotateCamera(scene: Scene) {
    let camAlpha = -Math.PI / 2,
      camBeta = Math.PI / 2.5,
      camDist = 10,
      camTarget = new Vector3(0, 0, 0);
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
  const fontData = await (await fetch("/assets/Kenney Blocks_Regular.json")).json();
  function create3dtext(scene:Scene){
    
    const text = MeshBuilder.CreateText(
      "myText",
      "Hello World !! @ #$ % é",
      fontData,
      {
        size: 16,
        resolution: 64,
        depth: 10,
      },
      scene,
    );
    return text;
  }
  //------------------------------------------
  //bottom of code - main rendering area for scene
  export default function MenuScene(engine: Engine) {
    
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
      
    }
  
    let that: SceneData = { scene: new Scene(engine) };
    that.scene.debugLayer.show();
    let advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("myUI",true);
    let button = createSceneButton(that.scene,"but1","Start Game","0px","-75px",advancedTexture);
    create3dtext(that.scene);
      that.camera = createArcRotateCamera(that.scene);
      createskybox(that.scene);
      that.light = createLight(that.scene);
    return that;
  }
