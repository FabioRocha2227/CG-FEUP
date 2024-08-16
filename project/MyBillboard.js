import {CGFobject, CGFshader, CGFappearance, CGFtexture} from '../lib/CGF.js';
import { MyQuad } from "./components/MyQuad.js"; 


export  class MyBillboard extends CGFobject {
  constructor(scene,texture) {
    super(scene);
    this.scene = scene;
    this.texture = texture;
    this.initBuffers();
  }

  initBuffers() {

  this.tree = new MyQuad(this.scene);

  this.appearance = new CGFappearance(this.scene);
  this.appearance.setTexture(this.texture);
  this.appearance.setTextureWrap('REPEAT', 'REPEAT');
  this.appearance.setAmbient(2, 2, 2, 1);
  this.appearance.setDiffuse(0.9, 0.9, 0.9, 1);
  this.appearance.setSpecular(0.0, 0.0, 0.0, 1);
  this.appearance.setShininess(10.0);

}

display(x,y,z){

  this.scene.pushMatrix();

  // Calcula a orientação do quad em relação à câmera
  var cameraPosition = this.scene.camera.position;
  var billboardToCamera = vec3.fromValues(cameraPosition[0] - x, 0, cameraPosition[2] - z);
  var billboardToCameraNormalized = vec3.normalize(billboardToCamera, billboardToCamera);

  // Calcula a rotação necessária para orientar o quad para a câmera
  var angle = Math.acos(-billboardToCameraNormalized[0], -billboardToCameraNormalized[2]);
  this.scene.translate(x, y, z);
  
  //this.scene.rotate(angle, 0, 1, 0);
  this.scene.rotate(angle, 0, 1, 0);
  this.scene.rotate(-Math.PI / 2, 0, 1, 0);
  this.scene.scale(5, 5, 5);
  this.scene.translate(0,0.5,0);

  this.appearance.apply();

  this.tree.display();
  this.scene.popMatrix();


}
}