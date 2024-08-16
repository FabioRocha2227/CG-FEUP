import {CGFobject, CGFshader, CGFappearance, CGFtexture} from '../lib/CGF.js';
import {MyPlane} from './MyPlane.js';

export class MyTerrain extends CGFobject {

  constructor(scene){
      super(scene);
      this.scene = scene;
      this.initBuffers();
  }

  initBuffers() {
  
      this.plane = new MyPlane(this.scene,30);

      this.appearance = new CGFappearance(this.scene);
	  this.appearance.setAmbient(0.3, 0.3, 0.3, 1);
	  this.appearance.setDiffuse(0.7, 0.7, 0.7, 1);
	  this.appearance.setSpecular(0.0, 0.0, 0.0, 1);
      this.appearance.setShininess(120);

      this.texTerrain = new CGFtexture(this.scene, "images/terrain.jpg");
      this.texTerrainMap = new CGFtexture(this.scene, "images/heightmap4.jpg");
      this.texTerrainColors= new CGFtexture(this.scene, "images/altimetry.png");

      this.appearance.setTexture(this.texture);

      this.shaders = new CGFshader(this.scene.gl, "shaders/terrainTexture.vert", "shaders/terrainTexture.frag");
     
      this.shaders.setUniformsValues({heightScale: 0.3});
      this.shaders.setUniformsValues({altColorScale: 0.3});
      this.shaders.setUniformsValues({uSampler2: 1});
      this.shaders.setUniformsValues({uSampler3: 2});    

  }
  display() {

      this.appearance.apply();
      this.scene.pushMatrix();
      this.scene.setActiveShader(this.shaders);
      this.texTerrain.bind(0);
      this.texTerrainMap.bind(1);
      this.texTerrainColors.bind(2);
      this.scene.rotate(0.5*Math.PI, 0, 1, 0);
      this.scene.translate(0, -90, 0);
      this.scene.rotate(-0.5*Math.PI, 1, 0, 0);
      this.scene.scale(400, 400, 400);
      this.plane.display();

      this.scene.setActiveShader(this.scene.defaultShader);

      this.scene.popMatrix();
  }

}