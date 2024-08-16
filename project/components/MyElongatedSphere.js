import { CGFobject } from "../../lib/CGF.js";

export class MyElongatedSphere extends CGFobject {
  constructor(scene, slices, stacks, scaleX1, scaleY1, scaleZ1, scaleX2, scaleY2, scaleZ2, inverted) {
    super(scene);
    this.latitudeDivs = stacks * 2;
    this.longitudeDivs = slices;
    this.scaleX1 = scaleX1;
    this.scaleY1 = scaleY1;
    this.scaleZ1 = scaleZ1;
    this.scaleX2 = scaleX2;
    this.scaleY2 = scaleY2;
    this.scaleZ2 = scaleZ2;
    this.inverted = inverted;
    this.initBuffers();
  }

  initBuffers() {
    this.vertices = [];
    this.indices = [];
    this.normals = [];
    this.texCoords = [];

    var phi = 0;
    var theta = 0;
    var phiInc = Math.PI / this.latitudeDivs;
    var thetaInc = (2 * Math.PI) / this.longitudeDivs;
    var latitudeVertices = this.longitudeDivs + 1;

    var textmaplatitude = 0;
    var textmaplongitude = 0;
    var textmaplongpart = 1 / this.longitudeDivs;
    var textmaplatpart = 1 / this.latitudeDivs;

    for (let latitude = 0; latitude <= this.latitudeDivs; latitude++) {
      var sinPhi = Math.sin(phi);
      var cosPhi = Math.cos(phi);

      textmaplongitude = 0;
      theta = 0;
      for (let longitude = 0; longitude <= this.longitudeDivs; longitude++) {
        var x, y, z;

        if (longitude < this.longitudeDivs / 2) {
          x = Math.cos(theta) * sinPhi * this.scaleX1;
          y = cosPhi * this.scaleY1;
          z = Math.sin(-theta) * sinPhi * this.scaleZ1;
        } else {
          x = Math.cos(theta) * sinPhi * this.scaleX2;
          y = cosPhi * this.scaleY2;
          z = Math.sin(-theta) * sinPhi * this.scaleZ2;
        }

        this.vertices.push(x, y, z);

        this.texCoords.push(textmaplongitude, textmaplatitude);

        if (latitude < this.latitudeDivs && longitude < this.longitudeDivs) {
          var current = latitude * latitudeVertices + longitude;
          var next = current + latitudeVertices;

          if (this.inverted == 1) {
            this.indices.push(next + 1, next, current + 1);
            this.indices.push(next, current, current + 1);
          } else {
            this.indices.push(current + 1, current, next);
            this.indices.push(current + 1, next, next + 1);
          }
        }

        if (this.inverted == 1) {
          this.normals.push(z, y, x);
        } else {
          this.normals.push(x, y, z);
        }

        theta += thetaInc;
        textmaplongitude += textmaplongpart;
      }
      phi += phiInc;
      textmaplatitude += textmaplatpart;
    }

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
  }
}