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

    function loadLevel() {

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
  constructor(sprite, spawnPos, hitbox = 7, direction) {
    this.sprite = sprite;
    this.spawnPos = spawnPos;
    this.hitbox = hitbox;
    this.direction = getRandomWallCord();
  }
}

class Landmark {
  constructor(sprite, name, visited = false, location, hitbox = 10) {
    this.sprite = sprite;
    this.name = name;
    this.visited = visited;
    this.location = location;
    this.hitbox = hitbox;
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


const landmakrsList = {
  "Paris": [new Landmark("assets/Louvre.png", "Louvre", false, (200, 50), 10), new Landmark()]
}
let numOfWalkers = 50;
const player = new Player("assets/WalkingPlayer.png", 0, 10)
let walkers = {};
for (let i = 0; i <= numOfWalkers; i++) {
  walkers[i] = new Walker("assets/ParisWalker.png", 7, getRandomWallCord());
}

let levels = [
  new Level(player, walkers, landmarksList["Paris"], "assets/groundSprite.png"),
];

function play() {
  finished = false;
  i = 0;
  level = levels[i];
  while (!finished) {
    level.loadLevel();
  }

  return null;
}

