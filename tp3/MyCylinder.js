import {CGFobject} from '../lib/CGF.js';
/**
 * MyCylinder
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyCylinder extends CGFobject {
    constructor(scene, slices, stacks) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];

        var ang = 0;
        var alphaAng = 2*Math.PI/this.slices;
        var numberOfVertices = this.stacks + 1;
        var divisionSize = 1 / this.stacks;

        for(var i = 0; i < this.slices; i++){
            // All vertices have to be declared for a given face
            // even if they are shared with others, as the normals
            // in each face will be different

            var sa=Math.sin(ang);
            var ca=Math.cos(ang);

            var aux = 0;

            for (var j = 0; j <= this.stacks; j++){
                this.vertices.push(ca, sa, aux);
                aux+=divisionSize;
            }

            // triangle normal computed by cross product of two edges
            var normal= [
                ca,
                sa,
                0
            ];

            // normalization
            var nsize=Math.sqrt(
                normal[0]*normal[0]+
                normal[1]*normal[1]+
                normal[2]*normal[2]
            );
            normal[0]/=nsize;
            normal[1]/=nsize;
            normal[2]/=nsize;

            // push normal once for each vertex of this face
            for (var k = 0; k < numberOfVertices; k++){
                this.normals.push(...normal);
            }

            ang+=alphaAng;
        }
        for(var l = 0; l < this.stacks; l++) {
            for (var m = 0; m < this.slices - 1; m++) {
                this.indices.push(numberOfVertices * m + l, (numberOfVertices * m + numberOfVertices) + l, (numberOfVertices * m + 1) + l);
                    this.indices.push((numberOfVertices * m + numberOfVertices) + l, (numberOfVertices * m + numberOfVertices + 1) + l, (numberOfVertices * m + 1) + l);
            }

            this.indices.push(numberOfVertices * (this.slices - 1), l, (numberOfVertices * (this.slices - 1) + numberOfVertices - 1));
            this.indices.push(l, l + 1, (numberOfVertices * (this.slices - 1) + numberOfVertices - 1));

        }


        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    updateBuffers(complexity){
        this.slices = 3 + Math.round(9 * complexity); //complexity varies 0-1, so slices varies 3-12

        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }

    updateStacks(stacks){
        this.stacks = Math.floor(stacks); //complexity varies 0-1, so slices varies 3-12

        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}

