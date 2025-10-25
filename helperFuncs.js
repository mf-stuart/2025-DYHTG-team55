import Landmark from "./ErrorPage.js"

let max = 500;
let min = 0;

const filenames = ["landmark1.png", "landmark2.png", "destination.png"];

function getLandmarksArray(city) {
  let return_array = [];
  for (const filename of filenames) {
    let random_x = Math.random() * (max - min) + min;
    let random_y = Math.random() * (max - min) + min;
    return_array.push(new Landmark("assets/sprites/" + city + "/" + filename, false, (random_x, random_y)));
  }
  return return_array;
}

console.log(getLandmarksArray("ny"))
