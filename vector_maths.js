import * as math from 'mathjs';

function make_walker_initial_velocity() {
    const min = -1
    const max = 1

    let x_vel = math.random(min, max)
    let y_vel = math.random(min, max)
    let norm = math.sqrt(x_vel**2 + y_vel**2)
    return [x_vel/norm, y_vel/norm]

}

function make_rot_mat(initial_angle_rad){

    let theta = 0

    let rotmat = math.matrix(
        [math.cos(theta), math.sin(theta)],
        [-1 * math.sin(theta), math.cos(theta)],
    )


}
