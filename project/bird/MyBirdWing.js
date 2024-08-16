import { CGFappearance, CGFobject, CGFtexture } from "../../lib/CGF.js";
import { MyTriangle } from "../components/MyTriangle.js";
import { MyTriangleSmall } from "../components/MyTriangleSmall.js";
import { MyTriangleTiny } from "../components/MyTriangleTiny.js";
import { MyWing } from "../components/MyWing.js";
/**
 * MyBirdWing
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyBirdWing extends CGFobject {
	constructor(scene) {
		super(scene);

        this.wing = new MyWing(scene);

        this.featherTexture = new CGFtexture(this.scene, "textures/feather.jpg");

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
        this.scene.pushMatrix();
        this.appearance.setTexture(this.featherTexture);
        this.appearance.setTextureWrap('REPEAT', 'REPEAT');
        this.appearance.apply();
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.scene.scale(0.5, 1, 0.5);
        this.wing.display();
        this.scene.popMatrix();
    }

    enableNormalViz() {
        this.wing.enableNormalViz();
    }

    disableNormalViz() {
        this.wing.disableNormalViz();
    }
}