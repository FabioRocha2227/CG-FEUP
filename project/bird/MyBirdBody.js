import { CGFappearance, CGFobject, CGFtexture } from "../../lib/CGF.js";
import { MySphere } from "../components/MySphere.js";


/**
 * MyBirdBody
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyBirdBody extends CGFobject {
    constructor(scene) {
        super(scene);

        this.featherTexture = new CGFtexture(this.scene, "textures/feather.jpg");   

        this.body = new MySphere(scene, 100, 100, 0.5, 0.5, 0.7, 0);
        
        this.initMaterials();
    }

    initMaterials() {

        // Body 
        this.appearance = new CGFappearance(this.scene);
        this.appearance.setAmbient(1, 1, 1, 1);
        this.appearance.setDiffuse(0.9, 0.9, 0.9, 1);
        this.appearance.setSpecular(0.1, 0.1, 0.1, 1);
        this.appearance.setShininess(30); 
    }

    display() {

        //Body
        this.scene.pushMatrix();
        this.appearance.setTexture(this.featherTexture);
        this.appearance.setTextureWrap('REPEAT', 'REPEAT');
        this.appearance.apply();
        this.scene.rotate(-Math.PI/10, 0, 0, 1);
        this.body.display();
        this.scene.popMatrix();
    }

    enableNormalViz() {
        this.body.enableNormalViz();
    }

    disableNormalViz() {
        this.body.disableNormalViz();
    }
}
