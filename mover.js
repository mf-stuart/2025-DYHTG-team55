
import * as vecmaths from "./vector-maths";

const defaultRadius = 2;

// ~1 degree
const defaultDtheta = 0.0174533;
const defaultSpeed = 1;

class Mover {
    constructor(pos, vel, facing, sprite, radius=defaultRadius) {
        this._pos = vecmaths.make2Vector(pos);
        this._vel = vecmaths.make2Vector(vel);
        this._facing = facing;
        this._sprite = sprite;
        this._radius = radius;
    }

    findNextVelocity() {

    }

    findNextPosition(foundVelocity) {
        return vecmaths.add2Vector(this._pos, foundVelocity);
    }

    collisionCheck(actors) {

    }

    updateVelocity() {

    }

    updatePosition() {

    }

    updateFacing() {

    }

}

class Player extends Mover{
    constructor(pos, vel, facing, sprite, currentLevel, radius=defaultRadius) {
        super(pos,vel,facing,sprite,radius);
        this.currentLevel = currentLevel;
    }
}

class Walker extends Mover{
    constructor(pos, vel, facing, sprite, dtheta=defaultDtheta, radius=defaultRadius) {
        super(pos,vel,facing,sprite,radius);
        this._dtheta = dtheta;
    }

    findNextVelocity() {
        let rotMat = vecmaths.makeRotMat(this._dtheta);
        return vecmaths.transfortmVelocity(rotMat, this._vel);
    }

}

// ---- useless as of now
class MoverFactoy {
    constructor(sprite, radius=defaultRadius, speed=defaultSpeed) {
        this._sprite = sprite;
        this._radius = radius;
        this._speed = speed;
    }

    get sprite() {
        return this._sprite;
    }
    set sprite(value) {
        this._sprite = value;
    }
    get radius() {
        return this._radius;
    }
    set radius(value) {
        this._radius = value;
    }
    get dtheta_range_rad() {
        return this._dtheta_range_rad;
    }
    set dtheta_range_rad(value) {
        this._dtheta_range_rad = value;
    }
    get speed() {
        return this._speed;
    }
    set speed(value) {
        this._speed = value;
    }

    randomMover() {
        let theta = vecmaths.randomTheta();
        let vel = vecmaths.randomVelocity(this._speed);
        let pos = vecmaths.randomPosition();
        return new Mover(pos, vel, theta, this._sprite, this._radius);
    }

    randomMoverSetPosition(pos) {
        let theta = vecmaths.randomPosition();
        let vel = vecmaths.randomVelocity(this._speed);
        return new Mover(pos, vel, theta, this._radius)
    }

}

class PlayerFactory {
    constructor(sprite, currentLevel, radius=defaultRadius) {
        this._sprite = sprite;
        this._currentLevel = currentLevel;
        this._radius = radius;
    }

    placePlayer(spawnPos) {
        let vel = [0,0]
        let facing = 0
        let sprite = this._sprite
        let currentLevel = this._currentLevel
        let radius = this._radius
        return new Player(spawnPos, vel, facing, this._sprite, this._currentLevel, this._radius);
    }
}

class WalkerFactory {
    constructor(sprite, radius=defaultRadius) {
        this._sprite = sprite;
        this._radius = radius;
    }

    placeWanderingWalker(spawnPos) {
        let vel = vecmaths.randomVelocity();
        let facing = vecmaths.randomTheta();
        let dtheta = vecmaths.randomDtheta();
        return new Walker(spawnPos, vel, facing, this._sprite, dtheta, this._radius)
    }

}