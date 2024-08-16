import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MyPanorama } from "./MyPanorama.js";
import { MyBird } from "./MyBird.js";
import { MyTerrain } from "./MyTerrain.js";
import { MyBirdEgg } from "./MyBirdEgg.js";
import { MyNest } from "./MyNest.js";
import { MyBillboard } from "./MyBillboard.js";
import { MyTreeRowPatch } from "./MyTreeRowPatch.js"
import { MyTreeGroupPatch } from "./MyTreeGroupPatch.js"


/**
 * MyScene
 * @constructor
 */
export class MyScene extends CGFscene {
  constructor() {
    super();
  }
  init(application) {
    super.init(application);
    
    this.initCameras();
    this.initLights();

    //Background color
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    // Textures
    this.enableTextures(true);

    this.texture = new CGFtexture(this, "images/terrain.jpg");
    this.appearance = new CGFappearance(this);
    this.appearance.setTexture(this.texture);
    this.appearance.setTextureWrap('REPEAT', 'REPEAT');

    this.texture_earth = new CGFtexture(this, "images/earth.jpg");
    this.appearance_2 = new CGFappearance(this);
    this.appearance_2.setTexture(this.texture_earth);
    this.appearance_2.setTextureWrap('REPEAT', 'REPEAT');

    this.texpanorama = new CGFtexture(this, "images/panorama4.jpg");
     
    this.texBill1 = new CGFtexture(this, "images/billboardtree.png");
    this.texBill2 = new CGFtexture(this, "images/billboardtree22.png");


    //Initialize scene objects
    this.axis = new CGFaxis(this);
    this.panorama = new MyPanorama(this,this.texpanorama);
    this.bird = new MyBird(this);
    this.terrain = new MyTerrain(this,30);
    this.eggs = [];

    for (let i = 0; i < 6; i++) {
      this.egg = new MyBirdEgg(this, 30, -30);
      this.egg.generateRandomPosition();
      this.eggs.push(this.egg);
    }

    this.eggs.push(new MyBirdEgg(this, 30, -30));

    this.nest = new MyNest(this, 30, -30);

    this.billboard = new MyBillboard(this,this.texBill1);
    this.treeRow = new MyTreeRowPatch(this,this.texBill1,this.texBill2,35,-58,-30);
    this.treeGroup = new MyTreeGroupPatch(this,this.texBill1,this.texBill2,45,-58,-10);


    //Objects connected to MyInterface
    this.displayAxis = true;
    this.scaleFactor = 1;
    this.displayNormals = false;
    this.displayPanorama = true;
    this.displayBird = true;
    this.displayTerrain = true;
    this.displayEggs = true;
    this.displayNest = true;
    this.displaybillboard = true;
    this.displaytreeGroup = true;
    this.displaytreeRow = true;

    this.objects = [this.panorama, this.bird, this.eggs, this.nest];

    // Labels and ID's for object selection on MyInterface
    this.objectIDs = {'Panorama': 0, 'Bird': 1, 'Eggs': 2, 'Nest': 3};

    //Other variables connected to MyInterface
    this.selectedObject = 0;

    // animation
    this.setUpdatePeriod(50);
    this.appStartTime = Date.now();

  }
  initLights() {
    this.lights[0].setPosition(15, 0, 5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
  }
  initCameras() {
    this.camera = new CGFcamera(
      1.5,
      0.1,
      1000,
      vec3.fromValues(50, 10, 15),
      vec3.fromValues(0, 0, 0)
    );
  }
  setDefaultAppearance() {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
  }

  restoreVariables(){
    this.displayNormals = false;
  }

  update(t) {

    this.checkKeys();

    // Continuous animation based on current time and app start time 
    var timeSinceAppStart=(t-this.appStartTime)/1000.0;

    // delegate animations to objects
    this.bird.update(timeSinceAppStart);
  }

  checkKeys() {
    var text = "Keys pressed: ";
    var keysPressed = false;

    //Check for key codes e.g in https://keycode.info/
    if (this.gui.isKeyPressed("KeyW")) {
      text += " W ";
      this.bird.accelerate(0.05);
      keysPressed = true;
    }

    if (this.gui.isKeyPressed("KeyS")) {
      text += " S ";
      this.bird.accelerate(-0.05);
      keysPressed = true;
    }
    if (this.gui.isKeyPressed("KeyA")) {
      text += " A ";
      this.bird.turn(0.1);
      keysPressed = true;
    }
    if (this.gui.isKeyPressed("KeyD")) {
      text += " D ";
      this.bird.turn(-0.1);
      keysPressed=true;
    }
    if (this.gui.isKeyPressed("KeyR")) {
      text += " R ";
      this.bird.reset();
      keysPressed=true;
    }

    if (keysPressed)
      console.log(text);

  }

  display() {
    // ---- BEGIN Background, camera and axis setup
    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    // Initialize Model-View matrix as identity (no transformation
    this.updateProjectionMatrix();
    this.loadIdentity();
    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();

    // Draw axis
    if (this.displayAxis) this.axis.display();

    // ---- BEGIN Primitive drawing section



    // --- Panorama Section
    if (this.displayPanorama){
      this.pushMatrix();
      this.panorama.display();
      this.popMatrix();
    }

    // --- Bird Section

    if (this.displayBird){
      this.pushMatrix();
      this.translate(30,-57,-30);
      this.bird.display();
      this.popMatrix();
    }

    // --- Terrain Section
    if (this.displayTerrain){
      this.pushMatrix();
      this.terrain.display();
      this.popMatrix();
    }

    // --- Egg Section

    if (this.displayEggs){
      this.eggs.forEach((egg) => {
        this.pushMatrix();
        egg.display();
        this.popMatrix();
      });
    }

    // --- Nest Section

    if (this.displayNest){
      this.pushMatrix();
      this.nest.display();
      this.popMatrix();
    }
    // --- Billboard Section

    if ( this.displaybillboard) this.billboard.display(60,-58,-30);
    if ( this.displaytreeRow) this.treeRow.display();
    if ( this.displaytreeGroup) this.treeGroup.display();


    // --- Normals Section
    if (this.displayNormals) {
      if (this.selectedObject === '2') {
        this.eggs.forEach((egg) => {
          egg.enableNormalViz();
        });
      } else {
        this.objects[this.selectedObject].enableNormalViz();
      }
    } else {
      if (this.selectedObject === '2') {
        this.eggs.forEach((egg) => {
          egg.disableNormalViz();
        });
      } else {
        this.objects[this.selectedObject].disableNormalViz();
      }
    }
	
    // ---- END Primitive drawing section
  }
}

