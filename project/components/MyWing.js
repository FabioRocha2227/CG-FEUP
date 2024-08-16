import { CGFobject } from "../../lib/CGF.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";
import { MyTriangleTiny } from "./MyTriangleTiny.js";
/**
 * MyWing
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyWing extends CGFobject {
	constructor(scene) {
		super(scene);

        this.wingTriangle = new MyTriangle(scene);
        this.wingSmallTriangle = new MyTriangleSmall(scene);
        this.wingTinyTriangle = new MyTriangleTiny(scene);
	}
	
	display() {

        this.scene.pushMatrix();
        this.scene.translate(1, 0, 0);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.wingTriangle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(2, 0, 0);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.wingSmallTriangle.display();
        this.scene.popMatrix(); 

        this.scene.pushMatrix();
        this.scene.translate(2.5, 0, 0);
        this.scene.rotate(-Math.PI/2, 0, 1, 0);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.wingTinyTriangle.display();
        this.scene.popMatrix(); 
    }

    enableNormalViz() {
        this.wingTriangle.enableNormalViz();
        this.wingSmallTriangle.enableNormalViz();
        this.wingTinyTriangle.enableNormalViz();
    }

    disableNormalViz() {
        this.wingTriangle.disableNormalViz();
        this.wingSmallTriangle.disableNormalViz();
        this.wingTinyTriangle.disableNormalViz();
    }
}