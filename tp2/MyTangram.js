import { CGFobject } from "../lib/CGF.js";
import { MyDiamond } from "./MyDiamond.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";
import { MyTriangleBig } from "./MyTriangleBig.js";
/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTangram extends CGFobject {
    constructor(scene) {
        super(scene);

        this.diamond = new MyDiamond(scene);
        this.triangle = new MyTriangle(scene);
        this.parallelogram = new MyParallelogram(scene);
        this.triangleSmall = new MyTriangleSmall(scene);
        this.triangleBig = new MyTriangleBig(scene);

    }

    display() {

        //  Diamond translation
        var diamondTranslate = [
            1.0, 0.0, 0.0, 0.0,
            0.0, 1.0, 0.0, 0.0,
            0.0, 0.0, 1.0, 0.0,
            0.0, 1.0, 0.0, 1.0
        ];

        this.scene.pushMatrix();

        this.scene.multMatrix(diamondTranslate);
        this.diamond.display();

        this.scene.popMatrix();
        // -------------------------------------
        // Parellogram translated and rotated

        this.scene.pushMatrix();
        this.scene.translate(-2, 0, 0);
        this.scene.rotate(Math.PI, 1, 0, 0);

        this.parallelogram.display();

        this.scene.popMatrix();
        // -------------------------------------
        // Purple Small Triangle translated

        this.scene.pushMatrix();
        this.scene.translate(-1, 0, 0);

        this.triangleSmall.display();

        this.scene.popMatrix();
        // -------------------------------------
        // Red Small Triangle tranlated and rotated

        this.scene.pushMatrix();

        this.scene.translate(1, 0, 0);
        this.scene.rotate(Math.PI/2, 0, 0, 1);

        this.triangleSmall.display();

        this.scene.popMatrix();
        // -------------------------------------
        // Pink Triangle tranlated

        this.scene.pushMatrix();

        this.scene.translate(2, 0, 0);

        this.triangle.display();

        this.scene.popMatrix();
        // -------------------------------------
        // Orange Big Triangle Rotated

        this.scene.pushMatrix();

        this.scene.translate(-1.5, -0.5, 0);
        this.scene.rotate((3 * Math.PI)/4, 0, 0, 1);

        this.triangleBig.display();

        this.scene.popMatrix();
        // -------------------------------------
        // Blue Big Triangle Rotated

        this.scene.pushMatrix();

        this.scene.translate(-4.328, -0.5, 0);
        this.scene.rotate((-3 * Math.PI)/4, 0, 0, 1);

        this.triangleBig.display();

        this.scene.popMatrix();
        // -------------------------------------
    }
}