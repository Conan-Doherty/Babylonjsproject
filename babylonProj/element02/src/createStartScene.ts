//------------------------------------------------
//importing bbyjs
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
    Sprite,
    SpriteManager,
    DirectionalLight,
    ShadowGenerator,
  } from "@babylonjs/core";
  //--------------------------------------------
  //middle of code - functions
  function createBox(scene: Scene, px:number,py:number,pz:number,sx:number,sy:number,sz:number) {
    let box = MeshBuilder.CreateBox("box",{size: 1}, scene);
    box.position = new Vector3(px,py,pz);
    box.scaling = new Vector3(sx,sy,sz);
    return box;
  }
  //faced box function
  function createfacedbox(scene: Scene,px:number,py:number,pz:number){
    const mat = new StandardMaterial("mat");
    const texture = new Texture("https://assets.babylonjs.com/environments/numbers.jpg");
    mat.diffuseTexture = texture;
    var columns = 6;
    var rows = 1;

    const faceUV = new Array(6);

    for (let i = 0; i < 6; i++) {
        faceUV[i] = new Vector4(i / columns, 0, (i + 1) / columns, 1 / rows);
    }

    const options = {
        faceUV: faceUV,
        wrap: true
    };
    let box = MeshBuilder.CreateBox("tiledbox",options,scene);
    box.material = mat;
    box.position = new Vector3(px,py,pz);
    return box;
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
  function createSphere(scene: Scene) {
    let sphere = MeshBuilder.CreateSphere(
      "sphere",
      { diameter: 2, segments: 32 },
      scene,
    );
    sphere.position.y = 10;
    sphere.position.x = 10;
    sphere.outlineColor = new Color3(1,0,1);
    //sphere.receiveShadows = true;
    return sphere;
  }
  function createheightmap(scene: Scene){
    var groundMaterial = new StandardMaterial("ground", scene);
    groundMaterial.diffuseTexture = new Texture("assets/scotland_texture.JPG", scene);

    var ground = Mesh.CreateGroundFromHeightMap("ground", "assets/scotland_texture_invertedgrayscale.jpg", 200, 200, 3000, 0, 3, scene, false);
    ground.material = groundMaterial;
    ground.receiveShadows = true;
    return scene;
  }
  function createTrees(scene: Scene) {
    const spriteManagerTrees = new SpriteManager("treesManager", 
   "assets/palmtree.png", 2000, {width: 512, height: 1024}, scene);
    //We create trees at random positions
    for (let i = 0; i < 150; i++) {
    const tree = new Sprite("tree", spriteManagerTrees);
    tree.position.x = Math.random() * (-18);
    tree.position.z = Math.random() * 18; 
    tree.position.y = 1.5; 
    } 
    for (let i = 0; i < 250; i++) {
    const tree = new Sprite("tree", spriteManagerTrees);
    tree.position.x = Math.random() * (40) + 10; 
    tree.position.z = Math.random() * 60 + 8; 
    tree.position.y = 1.5; 
    } 
    return spriteManagerTrees; 
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
  
  function createGround(scene: Scene) {
    let ground = MeshBuilder.CreateGround(
      "ground",
      { width: 6, height: 6 },
      scene,
    );
    return ground;
  }
  function createdirectionallight(scene: Scene, mesh1:Mesh){
    var light = new DirectionalLight("dir01", new Vector3(-1, -1, -1), scene);
	light.position = new Vector3(20, 20, 20);
	light.intensity = 0.5;
   light.diffuse = new Color3(0.07, 0.87, 0.87);
    var lightSphere = Mesh.CreateSphere("sphere", 10, 2, scene);
    var lightspheremat = new StandardMaterial("lightspheremat",scene)
   	lightSphere.position = light.position;
	  lightSphere.material = new StandardMaterial("light", scene);
    var shadowGenerator = new ShadowGenerator(1024, light);
    shadowGenerator.addShadowCaster(mesh1);
    
    shadowGenerator.useExponentialShadowMap = true;
   //(1, 1, 0);
     light.intensity = 1;
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
  function CreatePin(scene:Scene,px:number,pz:number){
    const needle = MeshBuilder.CreateCylinder("cone",{diameterBottom:0,tessellation:20,height:2,diameterTop:1},scene);
    const pintop = MeshBuilder.CreateCylinder("pintop",{diameter:1.25,height:0.5},scene);
    var pinmat = new StandardMaterial("pinmat",scene);
    pinmat.diffuseColor = new Color3(1, 0.28, 0);
    needle.material = pinmat;
    pintop.material = pinmat;
    pintop.position.y = 1;
    const Pin = Mesh.MergeMeshes([needle,pintop]);
    Pin.name = ("Pin");
    
    needle.dispose;
    pintop.dispose;
    Pin.position.y = 1;
    Pin.position.x = px;
    Pin.position.z = pz;
    
    return scene;
  } 
  function CreateClone(scene:Scene,name:string,px:number,pz:number){
    var mesh = scene.getNodeByName("Pin");
    const Clone = mesh.clone("clone");
    Clone.position.x = px;
    Clone.position.z = pz;
    return scene;
  }
  //------------------------------------------
  //bottom of code - main rendering area for scene
  export default function createStartScene(engine: Engine) {
    interface SceneData {
      facebox? : Mesh;
      scene: Scene;
      box?: Mesh;
      light?: Light;
      sphere?: Mesh;
      ground?: Mesh;
      camera?: Camera;
      spotlight?:SpotLight;
      trees?:SpriteManager;
      
    }
  
    let that: SceneData = { scene: new Scene(engine) };
    CreatePin(that.scene,-19,-70);
    CreateClone(that.scene,"Pin",2,4);
    that.scene.debugLayer.show();
    that.light = createLight(that.scene);
    that.camera = createArcRotateCamera(that.scene);
    that.trees = createTrees(that.scene);
    that.sphere = createSphere(that.scene);
    createheightmap(that.scene);
    createskybox(that.scene);
    createdirectionallight(that.scene,that.sphere);
    return that;
  }
