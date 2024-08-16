import {CGFobject} from '../lib/CGF.js';
/**
 * MyPrism
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyPrism extends CGFobject {
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
        var numberOfVertices = (this.stacks + 1) * 2;
        var divisionSize = 1 / this.stacks;

        for(var i = 0; i < this.slices; i++){
            // All vertices have to be declared for a given face
            // even if they are shared with others, as the normals
            // in each face will be different

            var sa=Math.sin(ang);
            var saa=Math.sin(ang+alphaAng);
            var ca=Math.cos(ang);
            var caa=Math.cos(ang+alphaAng);

            var aux = 0;

            for (var j = 0; j <= this.stacks; j++){
                this.vertices.push(ca, sa, aux);
                this.vertices.push(caa, saa, aux);
                aux+=divisionSize;
            }


            // triangle normal computed by cross product of two edges
            var normal= [
                -sa + saa,
                ca - caa,
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

            this.indices.push((numberOfVertices*i), (numberOfVertices*i+1), (numberOfVertices*i+numberOfVertices-2));
            this.indices.push((numberOfVertices*i+1), (numberOfVertices*i+numberOfVertices-1), (numberOfVertices*i+numberOfVertices-2));

            ang+=alphaAng;
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

