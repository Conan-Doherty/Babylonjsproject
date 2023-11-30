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
* 

-------------------------------------------------------------------------------------
# TypeScripts created for element
### main menu creation script
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
### 
```typescript
function gamemusic(scene:Scene){
  const music = new Sound("Music", "assets/611422__gregorquendel__short-synth-intro-background.wav", scene, null, {
    loop: true,
    autoplay: true,
  });
```
this script is for referencing the main background music and setting it to loop when played
###

# links
* here is a link to the earth texture: [earth_texture](https://img.freepik.com/free-vector/top-view-world-map-background_1308-68322.jpg?w=1480&t=st=1701348007~exp=1701348607~hmac=befac119fb68d4b691e4c3dea5c7237b47773292ea3140c645f99c04b9c6b395)

* here is a link to the babylon documentation site [babylon_documentation](https://doc.babylonjs.com/)