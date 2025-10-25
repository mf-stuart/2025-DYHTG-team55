import * as math from 'mathjs';

//page bounds
const minHeight = -250;
const maxHeight = 250;
const minWidth = -250;
const maxWidth = 250;

export function make2Vector(arr) {
    return math.matrix([arr[0]], [arr[1]]);
}

export function add2Vector(vec1, vec2) {
    return math.add(vec2, vec2);
}

export function randomVelocity(speed=1) {
    const min = -1
    const max = 1

    let x_vel = math.random(min, max)
    let y_vel = math.random(min, max)
    let norm = math.sqrt(x_vel**2 + y_vel**2)
    return math.matrix([speed * (x_vel/norm), speed * (y_vel/norm)])

}

export function randomPosition(minh=minHeight, maxh=maxHeight, minw=minWidth, maxw=maxWidth) {
    let x = math.random(minw, maxw);
    let y = math.random(minh, maxh);
    return math.matrix([x, y]);
}

//this returns a rotation matrix for the given rotation angle
export function makeRotMat(theta_rad) {
    return math.matrix(
        [math.cos(theta_rad), math.sin(theta_rad)],
        [-math.sin(theta_rad), math.cos(theta_rad)],
    )
}

export function transfortmVelocity(A, x){
    return math.multiply(A, x);
}

export function randomDtheta(range_rad) {
    return math.random(-range_rad, range_rad)
}

export function randomTheta() {
    return math.random(0, 2*math.pi)
}
