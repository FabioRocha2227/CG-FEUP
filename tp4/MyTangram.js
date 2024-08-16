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

        this.diamond = new MyDiamond(scene);
        this.triangle = new MyTriangle(scene);
        this.parallelogram = new MyParallelogram(scene);
        this.smallTriangle1 = new MyTriangleSmall(scene);
        this.smallTriangle2 = new MyTriangleSmall(scene);
        this.bigTriangle1 = new MyTriangleBig(scene);
        this.bigTriangle2 = new MyTriangleBig(scene);

        this.initMaterials();
    }

    
        initMaterials(){
            // Tangram texture
            this.tangramTex = new CGFappearance(this.scene);
            this.tangramTex.setAmbient(0.1, 0.1, 0.1, 1);
            this.tangramTex.setDiffuse(0.9, 0.9, 0.9, 1);
            this.tangramTex.setSpecular(0.1, 0.1, 0.1, 1);
            this.tangramTex.setShininess(10.0);
            this.tangramTex.loadTexture('images/tangram.png');
            this.tangramTex.setTextureWrap('REPEAT', 'REPEAT');

            this.smallTriangle1.texCoords = [
                0, 0.5,
                0.25, 0.25,
                0, 0,
    
                0, 0.5,
                0.25, 0.25,
                0, 0,
            ];
            this.smallTriangle1.updateTexCoordsGLBuffers();
    
            this.smallTriangle2.texCoords = [
                0.75, 0.75,
                0.5, 0.5,
                0.25, 0.75,
    
                0.75, 0.75,
                0.5, 0.5,
                0.25, 0.75,
            ];
            this.smallTriangle2.updateTexCoordsGLBuffers();
    
            this.bigTriangle1.texCoords = [
                1, 0,
                0.5, 0.5,
                0, 0,
    
                1, 0,
                0.5, 0.5,
                0, 0,
            ];
            this.bigTriangle1.updateTexCoordsGLBuffers();
            
            this.bigTriangle2.texCoords = [
                1, 1,
                0.5, 0.5,
                1, 0,
    
                1, 1,
                0.5, 0.5,
                1, 0,
            ];
            this.bigTriangle2.updateTexCoordsGLBuffers();
        } 
    

    display() {

        this.tangramTex.apply();

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
        
      
        //this.yellowMaterial.apply();
        this.parallelogram.display();

        this.scene.popMatrix();
        // -------------------------------------
        // Purple Small Triangle translated

        this.scene.pushMatrix();
        this.scene.translate(-1, 0, 0);

        //this.purpleMaterial.apply();
        this.smallTriangle1.display();

        this.scene.popMatrix();
        // -------------------------------------
        // Red Small Triangle tranlated and rotated

        this.scene.pushMatrix();

        this.scene.translate(1, 0, 0);
        this.scene.rotate(Math.PI/2, 0, 0, 1);

        //this.redMaterial.apply();
        this.smallTriangle2.display();

        this.scene.popMatrix();
        // -------------------------------------
        // Pink Triangle tranlated

        this.scene.pushMatrix();

        this.scene.translate(2, 0, 0);

        //this.pinkMaterial.apply();
        this.triangle.display();

        this.scene.popMatrix();
        // -------------------------------------
        // Orange Big Triangle Rotated

        this.scene.pushMatrix();

        this.scene.translate(-1.5, -0.5, 0);
        this.scene.rotate((3 * Math.PI)/4, 0, 0, 1);

        //this.orangeMaterial.apply();
        this.bigTriangle1.display();

        this.scene.popMatrix();
        // -------------------------------------
        // Blue Big Triangle Rotated

        this.scene.pushMatrix();

        this.scene.translate(-4.328, -0.5, 0);
        this.scene.rotate((-3 * Math.PI)/4, 0, 0, 1);

        //this.blueMaterial.apply();
        this.bigTriangle2.display();

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

    updateBuffers(complexity){
        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}