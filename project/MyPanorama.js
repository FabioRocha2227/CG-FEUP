import { CGFobject, CGFtexture, CGFappearance } from '../lib/CGF.js';
import { MySphere } from "./components/MySphere.js"; 

/**
 * MyPanorame
 * @constructor
 * @param scene - Reference to MyScene object
 */

export class MyPanorama extends CGFobject {
    constructor(scene,texture) {
        super(scene);
        this.initBuffers();

        this.texture = texture;

        this.sphere = new MySphere(scene, 40, 40, 200, 200, 200, 1);


        this.createMaterial();
        this.initBuffers();
    }
    createMaterial(){
        this.Material = new CGFappearance(this.scene);
        this.Material.setAmbient(0.0, 0.0, 0.0, 0.0);
        this.Material.setDiffuse(0.0, 0.0, 0.0, 0.0);
        this.Material.setSpecular(0.0, 0.0, 0.0, 0.0);
        this.Material.setEmission(1.0, 1.0, 1.0, 1.0);
        this.Material.setShininess(10.0);
        this.Material.loadTexture(this.texture);
    }

    display(){

        this.Material.setTexture(this.texture);
        this.Material.apply();

        this.scene.pushMatrix();
        this.sphere.display();
        this.scene.popMatrix();
    
       
    }
    
    enableNormalViz() {
        this.sphere.enableNormalViz();
    }

    disableNormalViz() {
        this.sphere.disableNormalViz();
    }


}