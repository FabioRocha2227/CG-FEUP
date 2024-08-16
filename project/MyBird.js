import { CGFobject } from "../lib/CGF.js";
import { MyBirdHead } from "./bird/MyBirdHead.js";
import { MyBirdBody } from "./bird/MyBirdBody.js";
import { MyBirdWing } from "./bird/MyBirdWing.js";

/**
 * MyBird
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyBird extends CGFobject {
    constructor(scene, axisYY = 0, velocity = 0, x = 0, y = 3, z = 0) {
        super(scene);

        this.birdHead = new MyBirdHead(scene);
        this.birdBody = new MyBirdBody(scene);
        this.birdRsWing = new MyBirdWing(scene);
        this.birdLsWing = new MyBirdWing(scene);

        this.axisYY = axisYY;
        this.velocity = velocity;
        this.scale = 1;
        this.x = x;
        this.y = y;
        this.z = z;

        this.scene.isFlying = true;

        this.scene.speedFactor = 1;

        this.animStartTimeSecs = 0;

        // Variables relevant to bird oscilating up and down

        this.minOscHeight = 0;
        this.maxOscHeight = 1;
        this.verticalRange= this.maxOscHeight - this.minOscHeight;
        this.animDurationSecsOscilation = 1;
        this.elapsedTimeOscilationSecs = undefined;
        this.deltaTOscilation = undefined;
        this.animValOscilation = 0;

        // Variables relevant to wing flapping movement

        this.minFlapHeight = 0;
        this.maxFlapHeight = 1;
        this.flapRange=this.maxFlapHeight - this.minFlapHeight;
        this.minFlapFrequency = 0.5;
        this.maxFlapFrequency = 3;
        this.flapFrequency = 0.5;
        this.animDurationSecsFlap = 1 / this.flapFrequency;
        this.animValFlap = -1.308997;

    }

    update(timeSinceAppStart)
    {
        var elapsedTimeSecs = timeSinceAppStart - this.animStartTimeSecs;

        if (this.elapsedTimeOscilationSecs == undefined){
            this.elapsedTimeOscilationSecs = timeSinceAppStart;
        }

        if (this.scene.isFlying) {
            // Bird's oscilation up and down
            this.deltaTOscilation = timeSinceAppStart-this.elapsedTimeOscilationSecs; 
            this.animValOscilation = (Math.sin(Math.PI * (this.deltaTOscilation) / this.animDurationSecsOscilation) / 5) * this.verticalRange;
            this.y += this.animValOscilation;

            // Bird's wings flapping
            this.flapFrequency = Math.max(this.minFlapFrequency, Math.min(this.maxFlapFrequency, this.minFlapFrequency + (this.maxFlapFrequency - this.minFlapFrequency) * this.velocity)); // Number of flaps per second
            this.animDurationSecsFlap = 1 / (this.flapFrequency * this.scene.speedFactor);
            this.animValFlap = Math.sin((elapsedTimeSecs / this.animDurationSecsFlap) * 2 * Math.PI);

            // Bird's position update
            this.x += Math.sin(this.axisYY) * this.velocity * this.scene.speedFactor;
            this.z += Math.cos(this.axisYY) * this.velocity * this.scene.speedFactor; 
        }
    }
        
        

    turn(radius) {
        this.axisYY += radius;
    }

    accelerate(acceleration) {
        const maxVelocity = 5;
        const minVelocity = 0;
      
        this.velocity += acceleration;
        this.velocity = Math.max(minVelocity, Math.min(this.velocity, maxVelocity));
    }

    reset(){
        this.axisYY = 0;
        this.velocity = 0;
        this.scale = 1;
        this.x = 0;
        this.y = 3;
        this.z = 0;
    }

    display() {

    // --- General Movement

        this.scene.pushMatrix();
        this.scene.translate(this.x, this.y, this.z);
        this.scene.rotate(this.axisYY, 0, 1, 0);
        this.scene.scale(this.scene.scaleFactor,this.scene.scaleFactor,this.scene.scaleFactor);

    // --- Head Section

        this.scene.pushMatrix();
        this.scene.translate(0, 0.3, 0.8);
        this.scene.scale(0.9, 0.9, 0.9);
        this.birdHead.display();
        this.scene.popMatrix();

        
    // --- Body Section

        this.scene.pushMatrix();
        this.birdBody.display();
        this.scene.popMatrix();
        
    // --- Wings Section

        this.scene.pushMatrix();
        this.scene.translate(-0.35, 0, 0);
        this.scene.rotate(this.animValFlap, 0, 0, 1);
        this.birdRsWing.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.35, 0, 0);
        this.scene.rotate(-this.animValFlap, 0, 0, 1);
        this.scene.scale(-1, 1, 1);
        this.birdLsWing.display();
        this.scene.popMatrix();


        this.scene.popMatrix();
    }

    enableNormalViz() {
        this.birdHead.enableNormalViz();
        this.birdBody.enableNormalViz();
        this.birdRsWing.enableNormalViz();
        this.birdLsWing.enableNormalViz();
    }

    disableNormalViz() {
        this.birdHead.disableNormalViz();
        this.birdBody.disableNormalViz();
        this.birdRsWing.disableNormalViz();
        this.birdLsWing.disableNormalViz();
    }
}
