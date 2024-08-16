import { CGFobject } from "../../lib/CGF.js";

export class MySphere extends CGFobject {
  constructor(scene, slices, stacks, scaleX, scaleY, scaleZ, inverted) {
    super(scene);
    this.latitudeDivs = stacks * 2;
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

        var x = Math.cos(theta) * sinPhi * this.scaleX;
        var y = cosPhi * this.scaleY;
        var z = Math.sin(-theta) * sinPhi * this.scaleZ;
        this.vertices.push(x, y, z);

        this.texCoords.push(textmaplongitude, textmaplatitude);
        
        if (latitude < this.latitudeDivs && longitude < this.longitudeDivs) {
          var current = latitude * latitudeVertices + longitude;
          var next = current + latitudeVertices;
          
          if ( this.inverted == 1){
            this.indices.push( next +1, next, current + 1);
            this.indices.push( next, current, current + 1);
          }
          else {
            this.indices.push( current + 1, current, next);
            this.indices.push( current + 1, next, next +1);
          }
      
        }
        if ( this.inverted == 1){
          this.normals.push(z, y, x);

        }
        else{
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
