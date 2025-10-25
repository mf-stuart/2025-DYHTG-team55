cities = ["ny", "paris", "sky", "venice"]

function getRandomWallCord() {
  wall = Math.floor(Math.random() * 4);
  pos = Math.floor((Math.random() * 500) - 250)
  switch (wall) {
    case 0:
      return (-250, pos);
    case 1:
      return (250, pos);
    case 2:
      return (pos, -250);
    case 3:
      return (pos, 250);
  }
  return (0, 0);
}
class Level {
  constructor(player, walkers, landmarks, groundSprite) {
    this.player = player;
    this.walkers = walkers;
    this.landmarks = landmarks;
    this.groundSprite = groundSprite
  }

    loadLevel() {
        const image = createElement("img");
        image.src = this.groundSprite;
        document.querySelector("#container").appendChild(image);

    }
}

class Player {
  constructor(sprite, currentLevel) {
    this.sprite = sprite;
    this.currentLevel = currentLevel;
    this.hitbox = 10;
    this.collection = []
  }
}

class Walker {
  constructor(sprite, spawnPos) {
    this.sprite = sprite;
    this.spawnPos = spawnPos;
    this.hitbox = 7;
    this.direction = getRandomWallCord();
  }
}

class Landmark {
  constructor(sprite, name, location) {
    this.sprite = sprite;
    this.name = name;
    this.visited = false;
    this.location = location;
    this.hitbox = 10;
  }
}

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


const landmakrsList = getLandmarksArray();
let numOfWalkers = 50;
const player = new Player("assets/WalkingPlayer.png", 0, 10)
let walkers = {};
for (let i = 0; i <= numOfWalkers; i++) {
  walkers[i] = new Walker("assets/ParisWalker.png", 7, getRandomWallCord());
}

function getLevelsArray() {
  let return_array = [];
  for (const city of cities) {
    let player = new Player("assets/sprites/" + city + "/player.png", 1);
    let walkers = [];
    for (let i = 0; i < numOfWalkers; i++) {
      walkers.push(new Walker("assets/sprites/" + city + "/walker.png"));
    }
    let groundsprite = "assets/sprites/" + city + "/background.png";
    return_array.push(new Level(player, walkers, getLandmarksArray(city), groundsprite));
  }

  return return_array;
}

levels = getLevelsArray();

function play(levels, player) {
    finished = false;
    i = 0;
    level = levels[i];
    level.loadLevel();

  return null;
}

play(levels, player);