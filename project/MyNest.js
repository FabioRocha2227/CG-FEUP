import { CGFappearance, CGFobject, CGFtexture } from "../../lib/CGF.js";
import { MyHalfSphere } from "./components/MyHalfSphere.js";

/**
 * MyNest
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyNest extends CGFobject {
    constructor(scene, x, z) {
        super(scene);

        this.nestTexture = new CGFtexture(this.scene, "textures/nest.jpg");

        this.nest = new MyHalfSphere(scene, 20, 10, 3, 1, 3, 0);

        this.x = x;
        this.z = z;
        this.y = -57.05;
    
        this.initMaterials();
    }

    initMaterials() {

        // Nest 
        this.nestAppearance = new CGFappearance(this.scene);
        this.nestAppearance.setAmbient(1, 1, 1, 1);
        this.nestAppearance.setDiffuse(0.9, 0.9, 0.9, 1);
        this.nestAppearance.setSpecular(0.1, 0.1, 0.1, 1);
        this.nestAppearance.setShininess(30); 

    }

    display() {
        this.scene.pushMatrix();
        this.nestAppearance.setTexture(this.nestTexture);
        this.nestAppearance.setTextureWrap('REPEAT', 'REPEAT');
        this.nestAppearance.apply();
        this.scene.translate(this.x, this.y, this.z);
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.nest.display();
        this.scene.popMatrix();
    }

    enableNormalViz() {
        this.nest.enableNormalViz();
    }

    disableNormalViz() {
        this.nest.disableNormalViz();
    }
}
