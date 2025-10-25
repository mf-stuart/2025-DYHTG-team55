const cities = ["ny", "paris", "sky", "venice"]
let numOfWalkers = 30;
let max = 500;
let min = 0;

function getRandomWallCord() {
  let wall = Math.floor(Math.random() * 4);
  let pos = Math.floor((Math.random() * 500) - 250)
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
    // Show background sprite and tile
    document.body.style.background = "#f3f3f3 url(" + this.groundSprite + ")";
    document.body.style.backgroundRepeat = "repeat-y repeat-x";


    // load walkers
    for (let walker of this.walkers) {
      walker.showWalker(walker.spawnPos[0], walker.spawnPos[1]);
    }
  }
}

class Player {
  constructor(sprite) {
    this.sprite = sprite;
    this.currentLevel = 0;
    this.hitbox = 10;
    this.collection = []
    this.image = document.createElement("img");
    document.querySelector("#container").appendChild(this.image);
    this.image.src = this.sprite;
    this.image.style.position = "absolute";
    this.image.style.width = "50px";
    this.image.style.height = "50px";
  }

  showPlayer(left, top) {
    this.image.style.left = left + "px";
    this.image.style.top = top + "px";
    return this.image;
  }

  updatePlayerSprite(newSprite) {
    this.sprite = newSprite;
  }
}

class Walker {
  constructor(sprite, spawnPos) {
    this.sprite = sprite;
    this.spawnPos = spawnPos;
    this.hitbox = 7;
    this.direction = getRandomWallCord();
    this.image = document.createElement("img");
    document.querySelector("#container").appendChild(this.image);
    this.image.src = this.sprite;
    this.image.style.position = "absolute";
    this.image.style.width = "50px";
    this.image.style.height = "50px";
  }

  showWalker(left, top) {
    this.image.style.left = left + "px";
    this.image.style.top = top + "px";
    return this.image;
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


function getLevelsArray() {
  let return_array = [];
  for (const city of cities) {
    let player = new Player("assets/sprites/" + city + "/player.png", 0);
    let walkers = [];
    for (let i = 0; i < numOfWalkers; i++) {
      let random_x = Math.random() * (2*max - min) + min+100;
      let random_y = Math.random() * (max - min) + min;
      walkers.push(new Walker("assets/sprites/" + city + "/walker.png", [random_x, random_y]));
    }
    let groundsprite = "assets/sprites/" + city + "/background.png";
    return_array.push(new Level(player, walkers, getLandmarksArray(city), groundsprite));
  }

  return return_array;
}


function play(levels) {
  
  let finished = false;
  let i = 0;
  let level = levels[i];
  let player = level.player;
  level.loadLevel();
  
  let initialX = 50;
  let initialY = 50;
  player.showPlayer(initialX, initialY);
  
  document.addEventListener("keydown", (e) => {
    if (e.key.toLowerCase() == "w") {
      initialY -= 10;
      player.showPlayer(initialX, initialY);
    }
    
    if (e.key.toLowerCase() == "s") {
      initialY += 10;
      player.showPlayer(initialX, initialY);
    }
    
    if (e.key.toLowerCase() == "a") {
      initialX -= 10;
      player.showPlayer(initialX, initialY);
    }
    
    if (e.key.toLowerCase() == "d") {
      initialX += 10;
      player.showPlayer(initialX, initialY);
    }
  })
  
  return null;
}

let levels = getLevelsArray();

play(levels);
