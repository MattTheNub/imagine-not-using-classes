const canvas = document.getElementById('gameScreen');
const ctx = canvas.getContext('2d');
let player;
let controller;
let loop;
let boxReady = false;
let floorReady = false;
const floorImage = new Image();
let wallReady = false;
const wallImage = new Image();
const boxImage = new Image();
ctx.imageSmoothingEnabled = false;
boxImage.onload = function() {
  boxReady = true;
};
boxImage.src = 'box.png';
floorImage.onload = function() {
  floorReady = true;
};
floorImage.src = 'flooooR.png';
wallImage.onload = function() {
  wallReady = true;
};
wallImage.src = 'WALLLL.png';
/* prettier disable */
const gameMap = [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
    1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1,
    1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
];
const collisionMap = [
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1,
  1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1,
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
  1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1,
  1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1,
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
  1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1,
  1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
];
/* prettier enable */

Map = {
  tW: 50,
  tH: 50,
  mW: 16,
  mH: 16
};

function drawGame() {
  for (let j = 0; j < Map.mH; ++j) {
    for (let i = 0; i < Map.mW; ++i) {
      switch (gameMap[j * Map.mW + i]) {
        case 0:
          if (floorReady) {
            ctx.drawImage(floorImage, i * Map.tW, j * Map.tW, 50, 50);
          }
          break;
        default:
          if (wallReady) {
            ctx.drawImage(wallImage, i * Map.tW, j * Map.tW, 50, 50);
          }
      }
    }
  }
};
player = {
  height: 50,
  width: 50,
  x: 375,
  y: 350,
  xv: 0,
  yv: 0
};

controller = {
  left: false,
  right: false,
  up: false,
  down: false,
  keyListener: function(event) {
    let key_state = event.type == 'keydown' ? true : false;

    switch (event.keyCode) {
      case 37:
        controller.left = key_state;
        break;
      case 38:
        controller.up = key_state;
        break;
      case 39:
        controller.right = key_state;
        break;
      case 40:
        controller.down = key_state;
        break;
    }
  }
};

loop = function() {
  if (controller.right) {
    if (player.xv < 7) {
      player.xv += 0.5;
    } else {
      player.xv = 6;
    }
  }

  if (controller.left) {
    if (player.xv > -7) {
      player.xv -= 0.5;
    } else {
      player.xv = -6;
    }
  }

  if (controller.up) {
    if (player.yv > -7) {
      player.yv -= 0.5;
    } else {
      player.yv = -7;
    }
  }

  if (controller.down) {
    if (player.yv < 7) {
      player.yv += 0.5;
    } else {
      player.yv = 7;
    }
  }

  player.x += player.xv;
  if (collisionMap[(Map.mW * (Math.floor(player.y / 50)) + Math.floor(player.x / 50))] ===  1) {
    player.x -= player.xv
    player.xv = 0
  };
  console.log (gameMap[(Map.mW * (Math.floor(player.y / 40)) + Math.floor(player.x / 50) - 1)]);
  player.y += player.yv;
  if (collisionMap[(Map.mW * (Math.floor(player.y / 50)) + Math.floor(player.x / 50))] ===  1) {
    player.y -= player.yv
    player.yv = 0
  };
  if (controller.left || controller.right) {
  } else {
    // i do not understand why you made these physics the way you did. like why
    player.xv *= 0.85;
  }
  if (controller.up || controller.down) {
  } else {
    player.yv *= 0.85;
  }

  //ColliSior
  left = Math.round(player.x) + player.width / 2;
  top = Math.round(player.y) + player.height / 2;
  right = Math.round(player.x) - player.width / 2;
  bottom = Math.round(player.y) - player.height / 2;
  
  drawGame();
  if (boxReady) {
    ctx.drawImage(boxImage, player.x, player.y);
  }
  window.requestAnimationFrame(loop);
};

window.addEventListener('keydown', controller.keyListener);
window.addEventListener('keyup', controller.keyListener);
window.requestAnimationFrame(loop);
