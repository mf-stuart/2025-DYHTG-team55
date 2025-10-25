const cities = ["ny", "sky", "venice", "paris"]
let numOfWalkers = 30;
let max = 500;
let min = 0;
const playerMoveSpeed = 10;
const walkerMoveSpeed = 5;

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


    for (let landmark of this.landmarks) {
        landmark.showLandmark();
    }
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
    this.image.style.left = "-100px";
    this.image.src = this.sprite;
    this.image.style.position = "absolute";
    this.image.style.width = "50px";
    this.image.style.height = "50px";
    this.currentLocation = [0,0];
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
    this.image = document.createElement("img");
    document.querySelector("#container").appendChild(this.image);
    this.image.style.left = "-100px";
    this.image.src = this.sprite;
    this.image.style.position = "absolute";
    this.image.style.width = "50px";
    this.image.style.height = "50px";
    this.moveDirection = Math.floor(Math.random() * 4);
  }

  showWalker(left, top) {
    this.image.style.left = left + "px";
    this.image.style.top = top + "px";
    return this.image;
  }

  randomlyMove() {
    //change direction
    if (Math.random() < 0.1){
      this.moveDirection = Math.floor(Math.random() * 4);
    }
    switch (this.moveDirection){
      case (0)://moving right
        this.spawnPos[0] += walkerMoveSpeed;
        if (this.spawnPos[0] > max * 2){
          this.spawnPos[0] -= walkerMoveSpeed;
        }
        break;
        case (1)://moving down
        this.spawnPos[1] += walkerMoveSpeed;
        this.image.style.transform = "scaleX(1)"; 
        if (this.spawnPos[1] > max){
          this.spawnPos[1] -= walkerMoveSpeed;
        }
        break;
      case (2)://moving up
        this.spawnPos[0] -= walkerMoveSpeed;
        if (this.spawnPos[0] < 0){
          this.spawnPos[0] += walkerMoveSpeed;
        }
        break;
      case (3)://moving left
        this.spawnPos[1] -= walkerMoveSpeed;
        this.image.style.transform = "scaleX(-1)"; 
        if (this.spawnPos[1] < 0){
          this.spawnPos[1] += walkerMoveSpeed;
        }
        break;
      }
      this.showWalker(this.spawnPos[0], this.spawnPos[1]);
  }
}

class Landmark {
  constructor(sprite, name, location) {
    this.sprite = sprite;
    this.name = name;
    this.visited = false;
    this.location = location;
    this.hitbox = 10;
    this.image = document.createElement("img");
    document.querySelector("#container").appendChild(this.image);
    this.image.style.left = "-100px";
    this.image.src = this.sprite;
    this.image.style.position = "absolute";
    this.image.style.width = "50px";
    this.image.style.height = "50px";
  }

  collisionCheck(player) {
        let sum = player.hitbox + this.hitbox;
        let difference = [player.currentLocation[0] - this.location[0], player.currentLocation[1] - this.location[1]];
        let length = (difference[0]**2 + difference[1]**2)**0.5;

        if (length < sum) {
            this.visited = true;
            console.log(this.name + ' has been hit!')
        }
    }

  showLandmark() {
    this.image.style.left = this.location[0] + "px";
    this.image.style.top = this.location[1] + "px";
    return this.image;
  }



}


const filenames = ["landmark1.png", "landmark2.png", "destination.png"];

function getLandmarksArray(city) {
  let return_array = [];
  for (const filename of filenames) {
    let random_x = Math.random() * ((max - min) + min)*2;
    let random_y = Math.random() * (max - min) + min;
    return_array.push(new Landmark("assets/sprites/" + city + "/" + filename, false, [random_x, random_y]));
  }
  return return_array;
}

function getLevelsArray() {
  let return_array = [];
  for (const city of cities) {
    let player = new Player("assets/sprites/" + city + "/player.png", 0);
    let walkers = [];
    for (let i = 0; i < numOfWalkers; i++) {
      let random_x = Math.random() * (2 * max - min) + min + 100;
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


  let playerX = 50;
  let playerY = 50;
  player.showPlayer(playerX, playerY);
  player.currentLocation = [playerX, playerY];

  document.addEventListener("keydown", (e) => {
    if (e.key.toLowerCase() == "w") {
      playerY -= playerMoveSpeed;
      if (playerY < 0){
        playerY += playerMoveSpeed
      }
      player.showPlayer(playerX, playerY);
      player.currentLocation = [playerX, playerY];
      for (let walker of level.walkers) {
        walker.randomlyMove();
      }
      for (let landmark of level.landmarks) {
          landmark.collisionCheck(player);
      }
    }


    if (e.key.toLowerCase() == "s") {
      playerY += playerMoveSpeed;
            if (playerY > max){
        playerY -= playerMoveSpeed
      }
      player.showPlayer(playerX, playerY);
      player.currentLocation = [playerX, playerY];
      for (let walker of level.walkers) {
        walker.randomlyMove();
      }
      for (let landmark of level.landmarks) {
            landmark.collisionCheck(player);
      }
    }

    if (e.key.toLowerCase() == "a") {
      playerX -= playerMoveSpeed;
            if (playerX < 0){
        playerX += playerMoveSpeed
      }
      let img = player.showPlayer(playerX, playerY);
      player.currentLocation = [playerX, playerY];
      img.style.transform = "scaleX(-1)";
      for (let walker of level.walkers) {
        walker.randomlyMove();
      }
      for (let landmark of level.landmarks) {
        landmark.collisionCheck(player);
     }
    }

    if (e.key.toLowerCase() == "d") {
      playerX += playerMoveSpeed;
            if (playerX > max * 2){
        playerX -= playerMoveSpeed
      }
      let img = player.showPlayer(playerX, playerY);
      player.currentLocation = [playerX, playerY];
      img.style.transform = "scaleX(1)";
      for (let walker of level.walkers) {
        walker.randomlyMove();
      }
      for (let landmark of level.landmarks) {
          landmark.collisionCheck(player);
          if (landmark.visited){
            for (let walker of level.walkers){
                walker.showWalker(-500, 0);
            }
            for (let curLandmark of level.landmarks){
                curLandmark.showLandmark(-500, 0);
            }
            player.showPlayer(-500, 0);
            i++;
            level = levels[i];
            player = level.player;
            level.loadLevel();
          }
      }
    }
  })

  return null;
}

let levels = getLevelsArray();

play(levels);
