import { CGFappearance, CGFobject, CGFtexture } from "../../lib/CGF.js";
import { MyPyramid } from "../components/MyPyramid.js";
import { MySphere } from "../components/MySphere.js";

/**
 * MyBirdHead
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyBirdHead extends CGFobject {
    constructor(scene) {
        super(scene);

        this.eyeTexture = new CGFtexture(this.scene, "textures/eye.jpg");
        this.featherTexture = new CGFtexture(this.scene, "textures/feather.jpg");

        this.head = new MySphere(scene, 40, 40, 0.5, 0.5, 0.5, 0);
        this.eye = new MySphere(scene, 40, 40, 0.15, 0.15, 0.15, 0);
        this.beak = new MyPyramid(scene, 4, 1, 0.5, 0.2);
    
        this.initMaterials();
    }

    initMaterials() {

        // Head spheres 
        this.sphereAppearance = new CGFappearance(this.scene);
        this.sphereAppearance.setAmbient(1, 1, 1, 1);
        this.sphereAppearance.setDiffuse(0.9, 0.9, 0.9, 1);
        this.sphereAppearance.setSpecular(0.1, 0.1, 0.1, 1);
        this.sphereAppearance.setShininess(30); 

        // Yellow 
        this.yellowMaterial = new CGFappearance(this.scene);
        this.yellowMaterial.setAmbient(255/255, 255/255, 0, 1);
        this.yellowMaterial.setDiffuse(255/255, 255/255, 0, 1);
        this.yellowMaterial.setSpecular(1, 1, 1, 1);
        this.yellowMaterial.setShininess(30);
    }

    display() {
        
        //Head
        this.scene.pushMatrix();
        this.sphereAppearance.setTexture(this.featherTexture);
        this.sphereAppearance.setTextureWrap('REPEAT', 'REPEAT');
        this.sphereAppearance.apply();
        this.head.display();
        this.scene.popMatrix();

        //Eyes
        this.scene.pushMatrix();
        this.scene.translate(-0.15, 0.25, 0.3);
        this.scene.rotate(Math.PI / 2, 0, 0, 1);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.sphereAppearance.setTexture(this.eyeTexture);
        this.sphereAppearance.apply();
        this.eye.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.15, 0.25, 0.3);
        this.scene.rotate(Math.PI / 2, 0, 0, 1);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.sphereAppearance.setTexture(this.eyeTexture);
        this.sphereAppearance.apply();
        this.eye.display();
        this.scene.popMatrix();

        //Beak
        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0.42);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.yellowMaterial.apply();
        this.beak.display();
        this.scene.popMatrix();
    }

    enableNormalViz() {
        this.eye.enableNormalViz();
        this.beak.enableNormalViz();
        this.head.enableNormalViz();
    }

    disableNormalViz() {
        this.eye.disableNormalViz();
        this.beak.disableNormalViz();
        this.head.disableNormalViz();
    }
}
