import {CGFobject, CGFshader, CGFappearance, CGFtexture} from '../lib/CGF.js';
import { MyBillboard } from "./MyBillboard.js"; 



export  class MyTreeRowPatch extends CGFobject {
  constructor(scene,texture1,texture2,x,y,z) {
    super(scene);
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.z = z;
    
    this.distance = 5;
    this.billboard1 = new MyBillboard(this.scene, texture1);
    this.billboard2 = new MyBillboard(this.scene, texture2);

    this.posX = [];
    this.posZ = [];
    this.textures = [];

    this.randomGenerator();
  }

  randomGenerator(){

    for (let row = 0; row < 6; row++) {
        var random1 = Math.random() * (3.0 - 0.2) + 0.2;
        var random2 = Math.random() * (3.0 - 0.2) + 0.2;
        var random3 = Math.floor(Math.random() * 2);

        this.posX.push(this.x + random1);
        this.posZ.push(this.z + random2);
        this.textures.push(random3);
      
        this.z += this.distance;
   }
}

display() {
  for (let i = 0; i < 6; i++) {
    this.scene.pushMatrix();
    
    if (this.textures[i] === 0) {
      this.displayBillboard1(i);
    } else if (this.textures[i] === 1) {
      this.displayBillboard2(i);
    } 
    
    this.scene.popMatrix();
  }
}

displayBillboard1(index) {
  this.billboard1.display(this.posX[index], this.y, this.posZ[index]);
}

displayBillboard2(index) {
  this.billboard2.display(this.posX[index], this.y, this.posZ[index]);
}


}