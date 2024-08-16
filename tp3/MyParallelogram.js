import {CGFobject} from '../lib/CGF.js';
/**
 * MyParallelogram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyParallelogram extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [
            // Triangle one
            0, 0, 0,    // 0
            2, 0, 0,    // 1
            3, 1, 0,    // 2

            // Triangle two
            0, 0, 0,    // 3
            3, 1, 0,    // 4
            1, 1, 0,     // 5

            // Triangle one (other side)
            0, 0, 0,    // 6
            2, 0, 0,    // 7
            3, 1, 0,    // 8

            // Triangle two (other side)
            0, 0, 0,    // 9
            3, 1, 0,    // 10
            1, 1, 0     // 11
        ];

        //Counter-clockwise reference of vertices
        this.indices = [
            0, 1, 2,
            8, 7, 6,
            3, 4, 5,
            11, 10, 9
        ];

        this.normals = [
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
        ];

        //The defined indices (and corresponding vertices)
        //will be read in groups of three to draw triangles
        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
    }
}

