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
    Space,
    DirectionalLight,
    ShadowGenerator,
    
  } from "@babylonjs/core";
  //--------------------------------------------
  //middle of code - functions
  function createBox(scene: Scene, px:number,py:number,pz:number,sx:number,sy:number,sz:number) {
    let box = MeshBuilder.CreateBox("box",{size: 1}, scene);
    box.position = new Vector3(px,py,pz);
    box.scaling = new Vector3(sx,sy,sz);
    box.receiveShadows = true;
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
    scene.registerAfterRender(function () {
      box.rotate(new Vector3(2, 6, 4)/*axis*/,
      .2/*angle*/, Space.LOCAL);
      });
      //box.receiveShadows = true;
    return box;
  }
  
  function createLight(scene: Scene) {
    const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
    light.intensity = 0.5;
    
    return light;
  }
  function createdirectionallight(scene: Scene, mesh1:Mesh,mesh2:Mesh){
    var light = new DirectionalLight("dir01", new Vector3(-1, -1, -1), scene);
	light.position = new Vector3(20, 20, 20);
	light.intensity = 0.5;
   light.diffuse = new Color3(150, 150, 150);
    var lightSphere = Mesh.CreateSphere("sphere", 10, 2, scene);
    var lightspheremat = new StandardMaterial("lightspheremat",scene)
   	lightSphere.position = light.position;
	  lightSphere.material = new StandardMaterial("light", scene);
    var shadowGenerator = new ShadowGenerator(1024, light);
    shadowGenerator.addShadowCaster(mesh1);
    shadowGenerator.addShadowCaster(mesh2);
    shadowGenerator.useExponentialShadowMap = true;
   //(1, 1, 0);
     light.intensity = 1;
  }
  
  function createspotlight(scene: Scene,px:number,py:number,pz:number){
    var light = new SpotLight("spotLight", new Vector3(-1, 1, -1), new Vector3(0, -1, 0), Math.PI / 2, 10, scene);
    light.diffuse = new Color3(1, 1, 1);
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
    sphere.position.y = 1;
    sphere.outlineColor = new Color3(1,0,1);
    sphere.receiveShadows = true;
    return sphere;
  }
  function createtexturedsphere(scene:Scene,px:number,py:number,pz:number){
    let earthsphere = MeshBuilder.CreateSphere(
      "earth",
      { diameter: 2, segments: 32 },
      scene,
    );
    earthsphere.position.x = px;
    earthsphere.position.y = py;
    earthsphere.position.z = pz;
    let spheremat = new StandardMaterial("earthmat",scene);
    spheremat.diffuseTexture = new Texture("assets/vintage-world-map-cartography-concept_52683-26377.jpg")
    earthsphere.material = spheremat;
    scene.registerAfterRender(function () {
      earthsphere.rotate(new Vector3(2, 6, 4)/*axis*/,
      .05/*angle*/, Space.LOCAL);
      });
    //earthsphere.receiveShadows = true;
   // sphere.material = new Texture("assets/vintage-world-map-cartography-concept_52683-26377.jpg", scene);
    return earthsphere;
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
    ground.receiveShadows = true;
    return ground;
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
      earthsphere?:Mesh;
    }
  
    let that: SceneData = { scene: new Scene(engine) };
    that.scene.debugLayer.show();
  //create box with pos in first three and scale in last three digits
  that.box = createBox(that.scene,2,5,3,10,5,2);
  that.sphere = createSphere(that.scene);
   // that.spotlight = createspotlight(that.scene,0,6,0);
    //that.light = createLight(that.scene);
    that.ground = createGround(that.scene);
    that.camera = createArcRotateCamera(that.scene);
    that.facebox = createfacedbox(that.scene,6,5,8);
    createskybox(that.scene);
   createdirectionallight(that.scene,that.facebox,that.sphere);
    that.light = createLight(that.scene);
    that.earthsphere = createtexturedsphere(that.scene,1,12,1)
    return that;
  }
