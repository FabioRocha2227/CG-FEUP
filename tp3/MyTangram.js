import {CGFappearance, CGFobject} from "../lib/CGF.js";
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

        this.initMaterials();

        this.diamond = new MyDiamond(scene);
        this.triangle = new MyTriangle(scene);
        this.parallelogram = new MyParallelogram(scene);
        this.triangleSmall = new MyTriangleSmall(scene);
        this.triangleBig = new MyTriangleBig(scene);

    }

    initMaterials() {
        // Green Diamond
        this.greenMaterial = new CGFappearance(this.scene);
        this.greenMaterial.setAmbient(0, 255/255, 0, 1);
        this.greenMaterial.setDiffuse(0, 255/255, 0, 1);
        this.greenMaterial.setSpecular(1, 1, 1, 1);
        this.greenMaterial.setShininess(10);

        // Yellow Parallelogram
        this.yellowMaterial = new CGFappearance(this.scene);
        this.yellowMaterial.setAmbient(255/255, 255/255, 0, 1);
        this.yellowMaterial.setDiffuse(255/255, 255/255, 0, 1);
        this.yellowMaterial.setSpecular(1, 1, 1, 1);
        this.yellowMaterial.setShininess(10);

        // Purple small triangle
        this.purpleMaterial = new CGFappearance(this.scene);
        this.purpleMaterial.setAmbient(150/255, 80/255, 190/255, 1);
        this.purpleMaterial.setDiffuse(150/255, 80/255, 190/255, 1);
        this.purpleMaterial.setSpecular(1, 1, 1, 1);
        this.purpleMaterial.setShininess(10);

        // Red small triangle
        this.redMaterial = new CGFappearance(this.scene);
        this.redMaterial.setAmbient(255/255, 0, 0, 1);
        this.redMaterial.setDiffuse(255/255, 0, 0, 1);
        this.redMaterial.setSpecular(1, 1, 1, 1);
        this.redMaterial.setShininess(10);

        // Pink triangle
        this.pinkMaterial = new CGFappearance(this.scene);
        this.pinkMaterial.setAmbient(255/255, 155/255, 207/255, 1);
        this.pinkMaterial.setDiffuse(255/255, 155/255, 207/255, 1);
        this.pinkMaterial.setSpecular(1, 1, 1, 1);
        this.pinkMaterial.setShininess(10);

        // Orange big triangle
        this.orangeMaterial = new CGFappearance(this.scene);
        this.orangeMaterial.setAmbient(255/255, 155/255, 0, 1);
        this.orangeMaterial.setDiffuse(255/255, 155/255, 0, 1);
        this.orangeMaterial.setSpecular(1, 1, 1, 1);
        this.orangeMaterial.setShininess(10);

        // Blue big triangle
        this.blueMaterial = new CGFappearance(this.scene);
        this.blueMaterial.setAmbient(0, 0, 255/255, 1);
        this.blueMaterial.setDiffuse(0, 0, 255/255, 1);
        this.blueMaterial.setSpecular(1, 1, 1, 1);
        this.blueMaterial.setShininess(10);
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

        // this.greenMaterial.apply();
        this.diamond.display();

        this.scene.popMatrix();
        // -------------------------------------
        // Parallelogram translated and rotated

        this.scene.pushMatrix();
        this.scene.translate(-2, 0, 0);
        this.scene.rotate(Math.PI, 1, 0, 0);

        this.yellowMaterial.apply();
        this.parallelogram.display();

        this.scene.popMatrix();
        // -------------------------------------
        // Purple Small Triangle translated

        this.scene.pushMatrix();
        this.scene.translate(-1, 0, 0);

        this.purpleMaterial.apply();
        this.triangleSmall.display();

        this.scene.popMatrix();
        // -------------------------------------
        // Red Small Triangle tranlated and rotated

        this.scene.pushMatrix();

        this.scene.translate(1, 0, 0);
        this.scene.rotate(Math.PI/2, 0, 0, 1);

        this.redMaterial.apply();
        this.triangleSmall.display();

        this.scene.popMatrix();
        // -------------------------------------
        // Pink Triangle tranlated

        this.scene.pushMatrix();

        this.scene.translate(2, 0, 0);

        this.pinkMaterial.apply();
        this.triangle.display();

        this.scene.popMatrix();
        // -------------------------------------
        // Orange Big Triangle Rotated

        this.scene.pushMatrix();

        this.scene.translate(-1.5, -0.5, 0);
        this.scene.rotate((3 * Math.PI)/4, 0, 0, 1);

        this.orangeMaterial.apply();
        this.triangleBig.display();

        this.scene.popMatrix();
        // -------------------------------------
        // Blue Big Triangle Rotated

        this.scene.pushMatrix();

        this.scene.translate(-4.328, -0.5, 0);
        this.scene.rotate((-3 * Math.PI)/4, 0, 0, 1);

        this.blueMaterial.apply();
        this.triangleBig.display();

        this.scene.popMatrix();
        // -------------------------------------
    }

    enableNormalViz() {
        this.diamond.enableNormalViz();
        this.triangle.enableNormalViz();
        this.parallelogram.enableNormalViz();
        this.triangleSmall.enableNormalViz();
        this.triangleBig.enableNormalViz();
    }

    disableNormalViz() {
        this.diamond.disableNormalViz();
        this.triangle.disableNormalViz();
        this.parallelogram.disableNormalViz();
        this.triangleSmall.disableNormalViz();
        this.triangleBig.disableNormalViz();
    }
}