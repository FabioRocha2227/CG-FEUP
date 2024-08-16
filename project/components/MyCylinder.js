import {CGFobject} from '../../lib/CGF.js';
/**
 * MyCylinder
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyCylinder extends CGFobject {
    constructor(scene, slices, size, radius) {
        super(scene);
        this.slices = slices;
        this.size = size;
        this.radius = radius;
        this.initBuffers();
    }

    initBuffers() {
        this.lateralFace = [];
        this.vertices = [];
        this.indices = [];
        this.normals = [];

        var ang = 0;
        var alphaAng = 2*Math.PI/this.slices;

        for(var i = 0; i < this.slices; i++){
            // All vertices have to be declared for a given face
            // even if they are shared with others, as the normals
            // in each face will be different

            var sa=Math.sin(ang) / (1/this.radius);
            var saa=Math.sin(ang+alphaAng) / (1/this.radius);
            var ca=Math.cos(ang) / (1/this.radius);
            var caa=Math.cos(ang+alphaAng) / (1/this.radius);

            this.vertices.push(ca, sa, 0);
            this.vertices.push(caa, saa, 0);
            this.vertices.push(ca, sa, this.size);
            this.vertices.push(caa, saa, this.size);

            // Relevant vertice for lateral face
            this.lateralFace.push(ca, sa, this.size);

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

            // push normal once for each vertex of this triangle
            this.normals.push(...normal);
            this.normals.push(...normal);
            this.normals.push(...normal);
            this.normals.push(...normal);

            this.indices.push((4*i), (4*i+1), (4*i+2));
            this.indices.push((4*i+1), (4*i+3), (4*i+2));

            ang+=alphaAng;
        }
        
        // Lateral face

        // Adding vertices used to make the lateral
        this.vertices.push(...this.lateralFace);
        
        // Define the number of vertices in your polygon
        // Each vertex has x, y, and z coordinates
        var totalNumVertices = this.vertices.length / 3;
        var numVertices = this.lateralFace.length / 3;
        var centerIndex = totalNumVertices;
        this.vertices.push(0, 0, this.size);

        for (var i = totalNumVertices - numVertices; i < totalNumVertices - 1; i++) {
            this.indices.push(centerIndex, i, i + 1);
            // For the last vertex, connect it to the first and second vertices
            if (i === totalNumVertices - 2)
              this.indices.push(centerIndex, totalNumVertices - 1, totalNumVertices - numVertices);
        }

        for(var i = 0; i < numVertices; i++) {
            this.normals.push(0, 0, 1);
        }
        console.log(this.lateralFace);

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}
