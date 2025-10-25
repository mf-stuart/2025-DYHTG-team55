import * as vecmaths from "./vector-maths";
import * as vecmaths from "./vector-maths";
import * as vecmaths from "./vector-maths";
import * as vecmaths from "./vector-maths";
import * as vecmaths from "./vector-maths";

const defaultRadius = 2;
// ~1 degree
const defaultDtheta = 0.0174533;
const defaultSpeed = 1;


class Mover {
    constructor(pos, vel, facing, dtheta=defaultDtheta, radius=defaultRadius) {
        this.pos = pos;
        this.vel = vel;
        this.facing = facing;
        this.dtheta = dtheta;
        this.radius = radius;

    }
}

class MoverFactoy {

    constructor(radius=defaultRadius, dtheta_range_rad=defaultDtheta, speed=defaultSpeed) {
        this._dtheta_range_rad = dtheta_range_rad;
        this._radius = radius;
        this._speed = speed;
    }

    get dtheta_range_rad() {
        return this._dtheta_range_rad;
    }
    set dtheta_range_rad(value) {
        this._dtheta_range_rad = value;
    }

    get radius() {
        return this._radius;
    }
    set radius(value) {
        this._radius = value;
    }

    get speed() {
        return this._speed;
    }
    set speed(value) {
        this._speed = value;
    }

    randomMover() {
        let theta = vecmaths.randomTheta();
        let dtheta = vecmaths.randomDtheta(this._dtheta_range_rad);
        let vel = vecmaths.randomVelocity(this._speed);
        let pos = vecmaths.randomPosition();
        return new Mover(pos, vel, theta, dtheta, this._radius);
    }
}