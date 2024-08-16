import { CGFappearance, CGFobject, CGFtexture } from "../../lib/CGF.js";
import { MyElongatedSphere } from "./components/MyElongatedSphere.js";

/**
 * MyBirdEgg
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyBirdEgg extends CGFobject {
    constructor(scene, x, z) {
        super(scene);

        this.eggTexture = new CGFtexture(this.scene, "textures/egg.jpg");

        this.egg = new MyElongatedSphere(scene, 40, 40, 1, 1, 1.8, 1, 1, 1.3, 0);

        this.rotation = 0;
        this.x = x;
        this.z = z;
        this.y = -57.5;
    
        this.initMaterials();
    }

    initMaterials() {

        // Egg spots 
        this.eggAppearance = new CGFappearance(this.scene);
        this.eggAppearance.setAmbient(1, 1, 1, 1);
        this.eggAppearance.setDiffuse(0.9, 0.9, 0.9, 1);
        this.eggAppearance.setSpecular(0.1, 0.1, 0.1, 1);
        this.eggAppearance.setShininess(30); 

    }

    generateRandomPosition() {
        const minX = this.x;
        const maxX = this. x + 30;
        const minZ = this.z;
        const maxZ = this.z + 30;
      
        this.x = minX + Math.random() * (maxX - minX);
        this.z = minZ + Math.random() * (maxZ - minZ);
        this.rotation = Math.random() * (Math.PI / 4 - 1) + 1;
    }

    display() {
        this.scene.pushMatrix();
        this.eggAppearance.setTexture(this.eggTexture);
        this.eggAppearance.setTextureWrap('REPEAT', 'REPEAT');
        this.eggAppearance.apply();
        this.scene.translate(this.x, this.y, this.z);
        this.scene.rotate(this.rotation, 1, 0, 0);
        this.scene.scale(0.25, 0.25, 0.25);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.egg.display();
        this.scene.popMatrix();
    }

    enableNormalViz() {
        this.egg.enableNormalViz();
    }

    disableNormalViz() {
        this.egg.disableNormalViz();
    }
}
