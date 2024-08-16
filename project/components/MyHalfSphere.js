import { CGFobject } from "../../lib/CGF.js";

export class MyHalfSphere extends CGFobject {
  constructor(scene, slices, stacks, scaleX, scaleY, scaleZ, inverted) {
    super(scene);
    this.latitudeDivs = stacks;
    this.longitudeDivs = slices;
    this.scaleX = scaleX;
    this.scaleY = scaleY;
    this.scaleZ = scaleZ;
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
    var phiInc = (Math.PI / 2) / this.latitudeDivs;
    var thetaInc = (Math.PI * 2) / this.longitudeDivs;
    var latitudeVertices = this.longitudeDivs + 1;
  
    for (let latitude = 0; latitude <= this.latitudeDivs; latitude++) {
      var sinPhi = Math.sin(phi);
      var cosPhi = Math.cos(phi);
  
      theta = 0;
      for (let longitude = 0; longitude <= this.longitudeDivs; longitude++) {
        var x = Math.cos(theta) * sinPhi * this.scaleX;
        var y = cosPhi * this.scaleY;
        var z = Math.sin(-theta) * sinPhi * this.scaleZ;
        this.vertices.push(x, y, z);
  
        var s = longitude / this.longitudeDivs;
        var t = 1 - latitude / this.latitudeDivs; // Inverted texture coordinates for the inside
  
        this.texCoords.push(s, t);
  
        if (latitude < this.latitudeDivs && longitude < this.longitudeDivs) {
          var current = latitude * latitudeVertices + longitude;
          var next = current + latitudeVertices;
  
          // Non-inverted indices
          this.indices.push(current, current + 1, next);
          this.indices.push(next, current + 1, next + 1);
  
          // Inverted indices
          this.indices.push(current, next, current + 1);
          this.indices.push(next, next + 1, current + 1);
        }
  
        if (this.inverted === 1) {
          this.normals.push(-z, -y, -x); // Inverted normals for the inside
        } else {
          this.normals.push(x, y, z);
        }
  
        theta += thetaInc;
      }
  
      phi += phiInc;
    }
  
    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
    }  
}
