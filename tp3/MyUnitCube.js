import {CGFobject} from '../lib/CGF.js';
/**
 * MyUnitCube
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCube extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [
            // Face 1 ( x = 0.5 )
            0.5, 0.5, -0.5,     // 0
            0.5, -0.5, -0.5,    // 1
            0.5, 0.5, 0.5,      // 2
            0.5, -0.5, 0.5,     // 3

            // Face 2 ( x = -0.5 )
            -0.5, 0.5, -0.5,    // 4
            -0.5, -0.5, -0.5,   // 5
            -0.5, 0.5, 0.5,     // 6
            -0.5, -0.5, 0.5,    // 7

            // Face 3 ( y = 0.5 )
            0.5, 0.5, -0.5,     // 8
            0.5, 0.5, 0.5,      // 9
            -0.5, 0.5, -0.5,    // 10
            -0.5, 0.5, 0.5,     // 11

            // Face 4 ( y = -0.5 )
            0.5, -0.5, -0.5,    // 12
            0.5, -0.5, 0.5,     // 13
            -0.5, -0.5, -0.5,   // 14
            -0.5, -0.5, 0.5,    // 15

            // Face 5 ( z = 0.5 )
            0.5, 0.5, 0.5,      // 16
            0.5, -0.5, 0.5,     // 17
            -0.5, 0.5, 0.5,     // 18
            -0.5, -0.5, 0.5,    // 19

            // Face 6 ( z = -0.5 )
            0.5, 0.5, -0.5,     // 20
            0.5, -0.5, -0.5,    // 21
            -0.5, 0.5, -0.5,    // 22
            -0.5, -0.5, -0.5,   // 23
        ];

        //Counter-clockwise reference of vertices
        this.indices = [
            0, 2, 3,
            0, 3, 1,
            4, 7, 6,
            4, 5, 7,
            8, 10, 11,
            8, 11, 9,
            12, 15, 14,
            12, 13, 15,
            16, 18, 19,
            16, 19, 17,
            20, 23, 22,
            20, 21, 23
        ];

        //The defined indices (and corresponding vertices)
        //will be read in groups of three to draw triangles

        this.normals = [
            // Face 1 ( x = 0.5 )
            1, 0, 0,     // 0
            1, 0, 0,     // 1
            1, 0, 0,     // 2
            1, 0, 0,     // 3

            // Face 2 ( x = -0.5 )
            -1, 0, 0,    // 4
            -1, 0, 0,    // 5
            -1, 0, 0,    // 6
            -1, 0, 0,    // 7

            // Face 3 ( y = 0.5 )
            0, 1, 0,     // 8
            0, 1, 0,     // 9
            0, 1, 0,     // 10
            0, 1, 0,     // 11

            // Face 4 ( y = -0.5 )
            0, -1, 0,     // 12
            0, -1, 0,     // 13
            0, -1, 0,     // 14
            0, -1, 0,     // 15

            // Face 5 ( z = 0.5 )
            0, 0, 1,     // 16
            0, 0, 1,     // 17
            0, 0, 1,     // 18
            0, 0, 1,     // 19

            // Face 6 ( z = -0.5 )
            0, 0, -1,     // 20
            0, 0, -1,     // 21
            0, 0, -1,     // 22
            0, 0, -1,     // 23
        ];

        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
    }
}

